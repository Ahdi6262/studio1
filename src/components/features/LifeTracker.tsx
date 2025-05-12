
"use client";

import { useState, useEffect, useMemo } from 'react';
import type { LifeStage } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Settings, Edit2, Save, Trash2, PlusCircle } from 'lucide-react';
import { format, addYears, differenceInWeeks, startOfWeek, addWeeks, getYear, isBefore, isEqual } from 'date-fns';
import { cn } from '@/lib/utils';

const defaultLifeStages: LifeStage[] = [
  { name: 'Childhood', color: 'bg-sky-500', endAge: 12 },
  { name: 'Teenage', color: 'bg-indigo-500', endAge: 19 },
  { name: 'Early Adulthood', color: 'bg-emerald-500', endAge: 35 },
  { name: 'Midlife', color: 'bg-amber-500', endAge: 55 },
  { name: 'Late Adulthood', color: 'bg-rose-500', endAge: 75 },
  { name: 'Senior', color: 'bg-purple-500', endAge: 100 }, // Default end, overridden by expectedLifespan
];

interface WeekBoxProps {
  weekDate: Date;
  birthDate: Date;
  lifeStageColor: string;
  isPast: boolean;
  isNextBirthdayWeek: boolean;
  currentAgeInWeeks: number;
}

const WeekBox: React.FC<WeekBoxProps> = ({ weekDate, birthDate, lifeStageColor, isPast, isNextBirthdayWeek, currentAgeInWeeks }) => {
  const weekNumberInLife = differenceInWeeks(weekDate, startOfWeek(birthDate)) +1;
  const yearNumber = getYear(weekDate) - getYear(birthDate);
  
  const tooltipContent = `Week ${weekNumberInLife} (Age ${yearNumber}) - ${format(weekDate, 'MMM d, yyyy')}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'h-3 w-3 md:h-2.5 md:w-2.5 rounded-sm cursor-pointer transition-all duration-150 ease-in-out',
            isPast ? lifeStageColor : 'bg-muted/30',
            isPast && 'hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-white',
            !isPast && 'hover:bg-muted/60',
            isNextBirthdayWeek && 'ring-2 ring-offset-1 ring-offset-background ring-primary scale-125 z-10 relative'
          )}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 text-xs shadow-lg">
        {tooltipContent}
        {isNextBirthdayWeek && <p className="font-bold text-primary">Next Birthday Week!</p>}
      </PopoverContent>
    </Popover>
  );
};


export default function LifeTracker() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date(1990, 0, 1)); // Jan 1, 1990
  const [expectedLifespan, setExpectedLifespan] = useState(85); // Years
  const [lifeStages, setLifeStages] = useState<LifeStage[]>(defaultLifeStages);
  const [weeklyNotification, setWeeklyNotification] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<LifeStage | null>(null);
  const [editingStageIndex, setEditingStageIndex] = useState<number | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    // Ensure current date is only set on client to avoid hydration mismatch for "today"
    setCurrentDate(new Date());
  }, []);


  const totalWeeks = useMemo(() => expectedLifespan * 52, [expectedLifespan]);
  const currentAgeInWeeks = useMemo(() => birthDate ? differenceInWeeks(currentDate, birthDate) : 0, [currentDate, birthDate]);

  const weeksArray = useMemo(() => {
    if (!birthDate) return [];
    return Array.from({ length: totalWeeks }, (_, i) => addWeeks(startOfWeek(birthDate), i));
  }, [birthDate, totalWeeks]);

  const getLifeStageColorForAge = (ageInYears: number): string => {
    let adjustedLifeStages = [...lifeStages].sort((a, b) => a.endAge - b.endAge);
    adjustedLifeStages[adjustedLifeStages.length-1].endAge = expectedLifespan; // ensure last stage covers till end

    for (const stage of adjustedLifeStages) {
      if (ageInYears <= stage.endAge) {
        return stage.color;
      }
    }
    return adjustedLifeStages[adjustedLifeStages.length - 1]?.color || 'bg-gray-500'; // Fallback
  };
  
  const nextBirthday = useMemo(() => {
    if (!birthDate) return null;
    const today = currentDate;
    let _nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (isBefore(_nextBirthday, today) || isEqual(_nextBirthday, today)) {
      _nextBirthday = addYears(_nextBirthday, 1);
    }
    return _nextBirthday;
  }, [birthDate, currentDate]);

  const nextBirthdayWeekStartDate = useMemo(() => {
    if (!nextBirthday) return null;
    return startOfWeek(nextBirthday);
  }, [nextBirthday]);


  const handleStageEdit = (stage: LifeStage, index: number) => {
    setEditingStage({...stage});
    setEditingStageIndex(index);
  }

  const handleSaveStage = () => {
    if(editingStage && editingStageIndex !== null) {
      const updatedStages = [...lifeStages];
      updatedStages[editingStageIndex] = editingStage;
      setLifeStages(updatedStages);
    }
    setEditingStage(null);
    setEditingStageIndex(null);
  }
  
  const handleAddStage = () => {
    const newStage: LifeStage = { name: 'New Stage', color: 'bg-gray-400', endAge: (lifeStages[lifeStages.length-1]?.endAge || 0) + 10 };
    setLifeStages([...lifeStages, newStage]);
  }

  const handleDeleteStage = (index: number) => {
    const updatedStages = lifeStages.filter((_, i) => i !== index);
    setLifeStages(updatedStages);
  }


  if (!birthDate) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-lg text-muted-foreground mb-4">Please set your birth date in settings to use the Life Tracker.</p>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button><Settings className="mr-2 h-4 w-4" /> Open Settings</Button>
            </DialogTrigger>
            {/* DialogContent will be same as below, can be componentized */}
        </Dialog>
      </div>
    );
  }
  
  const years = Array.from({ length: expectedLifespan + 1 }, (_, i) => i); // 0 to expectedLifespan


  return (
    <Card className="w-full p-4 md:p-6 bg-card shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Your Life in Weeks</h2>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-card">
            <DialogHeader>
              <DialogTitle>Life Tracker Settings</DialogTitle>
              <DialogDescription>Personalize your life calendar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="birthDate" className="text-right text-foreground">Birth Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal bg-background/50",
                        !birthDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card">
                    <Calendar
                      mode="single"
                      selected={birthDate}
                      onSelect={setBirthDate}
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={currentDate.getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lifespan" className="text-right text-foreground">Expected Lifespan (Years)</Label>
                <Input id="lifespan" type="number" value={expectedLifespan} onChange={(e) => setExpectedLifespan(parseInt(e.target.value, 10) || 0)} className="col-span-3 bg-background/50" />
              </div>
              
              <h4 className="text-md font-semibold mt-4 col-span-4 text-foreground">Life Stages:</h4>
              {lifeStages.map((stage, index) => (
                <div key={index} className="grid grid-cols-12 items-center gap-2 col-span-4 border-b border-border pb-2">
                   {editingStageIndex === index && editingStage ? (
                    <>
                      <Input value={editingStage.name} onChange={e => setEditingStage({...editingStage, name: e.target.value})} placeholder="Stage Name" className="col-span-4 bg-background/50"/>
                      <Input value={editingStage.color.replace('bg-','')} onChange={e => setEditingStage({...editingStage, color: `bg-${e.target.value}`})} placeholder="Color (e.g. blue-500)" className="col-span-3 bg-background/50"/>
                      <Input type="number" value={editingStage.endAge} onChange={e => setEditingStage({...editingStage, endAge: parseInt(e.target.value)})} placeholder="End Age" className="col-span-2 bg-background/50"/>
                      <Button size="icon" variant="ghost" onClick={handleSaveStage} className="text-green-500 hover:text-green-400 col-span-1"><Save className="h-4 w-4"/></Button>
                    </>
                   ) : (
                    <>
                      <span className="col-span-4 truncate text-foreground">{stage.name}</span>
                      <div className={cn("w-4 h-4 rounded-full col-span-3", stage.color)}></div>
                      <span className="col-span-2 text-foreground">{stage.endAge} yrs</span>
                      <Button size="icon" variant="ghost" onClick={() => handleStageEdit(stage, index)} className="text-primary hover:text-primary/80 col-span-1"><Edit2 className="h-4 w-4"/></Button>
                    </>
                   )}
                  <Button size="icon" variant="ghost" onClick={() => handleDeleteStage(index)} className="text-destructive hover:text-destructive/80 col-span-1"><Trash2 className="h-4 w-4"/></Button>
                </div>
              ))}
              <Button onClick={handleAddStage} variant="outline" className="col-span-4 mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <PlusCircle className="mr-2 h-4 w-4"/> Add Stage
              </Button>

              <div className="flex items-center space-x-2 col-span-4 mt-4">
                <Switch id="weeklyNotification" checked={weeklyNotification} onCheckedChange={setWeeklyNotification} />
                <Label htmlFor="weeklyNotification" className="text-foreground">Weekly Reflection Notification</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsSettingsOpen(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="text-sm text-muted-foreground mb-4">
        Each box represents one week of your life. Filled boxes are past weeks. Current age: {Math.floor(currentAgeInWeeks / 52)} years and {currentAgeInWeeks % 52} weeks.
        {nextBirthday && <p>Next birthday: {format(nextBirthday, 'PPP')}</p>}
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-1 gap-y-2 items-start overflow-x-auto pb-4 pr-4">
        {years.map(year => (
           (year % 5 === 0 || year === 0 || year === expectedLifespan) && (
            <React.Fragment key={`year-marker-${year}`}>
                <div className="text-xs text-muted-foreground text-right pr-1 sticky left-0 bg-card z-10 h-3 md:h-2.5 flex items-center">
                  {year % 5 === 0 || year === 0 ? year : ''}
                </div>
                <div className="col-start-2"></div> {/* Empty cell for alignment */}
            </React.Fragment>
           )
        ))}

        {/* Empty cell for top-left corner of the grid of weeks */}
        <div className="sticky left-0 bg-card z-10"></div>

        {/* Week boxes */}
        <div 
          className="grid gap-px md:gap-0.5" 
          style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}
        >
        {weeksArray.map((weekDate, index) => {
          const ageInYears = differenceInWeeks(weekDate, birthDate) / 52;
          const lifeStageColor = getLifeStageColorForAge(ageInYears);
          const isPastWeek = index < currentAgeInWeeks;
          const isNextBdayWeek = nextBirthdayWeekStartDate ? isEqual(weekDate, nextBirthdayWeekStartDate) : false;

          return (
            <WeekBox
              key={index}
              weekDate={weekDate}
              birthDate={birthDate}
              lifeStageColor={lifeStageColor}
              isPast={isPastWeek}
              isNextBirthdayWeek={isNextBdayWeek}
              currentAgeInWeeks={currentAgeInWeeks}
            />
          );
        })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <span className="text-sm text-muted-foreground mr-2">Legend:</span>
        {lifeStages.map(stage => (
          <div key={stage.name} className="flex items-center gap-1 text-xs">
            <div className={cn("w-3 h-3 rounded-sm", stage.color)}></div>
            <span className="text-foreground">{stage.name} (עד גיל {stage.endAge})</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
