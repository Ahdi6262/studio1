
export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} HEX THE ADD HUB. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
