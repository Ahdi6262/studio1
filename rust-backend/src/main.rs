use actix_web::{get, web, App, HttpServer, Responder, HttpResponse};
use serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc, TimeZone};
use std::sync::Mutex;
use actix_cors::Cors;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct ApiPostAuthor {
    name: String,
    avatar_url: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct ApiBlogPost {
    id: String,
    slug: String,
    title: String,
    summary: String,
    image_url: String,
    author: ApiPostAuthor,
    published_at: Option<DateTime<Utc>>,
    tags: Vec<String>,
    content: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct ApiCourseInstructor {
  name: String,
  bio: String,
  avatar_url: String,
}
#[derive(Serialize, Deserialize, Debug, Clone)]
struct ApiCourseLesson {
  title: String,
  duration: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
enum CourseLevel {
    Beginner,
    Intermediate,
    Advanced,
}
impl Default for CourseLevel {
    fn default() -> Self { CourseLevel::Beginner }
}


#[derive(Serialize, Deserialize, Debug, Clone, Default)]
struct ApiCourse {
  id: String,
  title: String,
  description: String,
  image_url: String,
  author_name: String, 
  instructor: Option<ApiCourseInstructor>,
  rating: Option<f64>,
  student_count: Option<i32>,
  price: String,
  category: String,
  level: String, // Simplified to string for mock data
  duration: Option<String>,
  lessons: Option<Vec<ApiCourseLesson>>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
struct ApiProject {
  id: String,
  title: String,
  description: String,
  long_description: Option<String>,
  image_url: String,
  tags: Vec<String>,
  technologies: Option<Vec<String>>,
  live_link: Option<String>,
  repo_link: Option<String>,
  date: Option<DateTime<Utc>>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
struct ApiLeaderboardEntry {
  id: String,
  rank: i32,
  name: String,
  avatar_url: String,
  points: i32,
  achievements: Vec<String>,
}


struct AppState {
    posts: Mutex<Vec<ApiBlogPost>>,
    courses: Mutex<Vec<ApiCourse>>,
    projects: Mutex<Vec<ApiProject>>,
    leaderboard: Mutex<Vec<ApiLeaderboardEntry>>,
}

impl AppState {
    fn new() -> Self {
        let mock_posts = vec![
            ApiBlogPost {
                id: "1".to_string(),
                slug: "getting-started-with-nextjs-14".to_string(),
                title: "Getting Started with Next.js 14 (from Rust)".to_string(),
                summary: "A comprehensive guide from the Rust backend.".to_string(),
                image_url: "https://picsum.photos/seed/blog1rust/600/400".to_string(),
                author: ApiPostAuthor { name: "Rust Admin".to_string(), avatar_url: "https://picsum.photos/seed/rustadmin/40/40".to_string() },
                published_at: Some(Utc.with_ymd_and_hms(2024, 7, 21, 12, 0, 0).unwrap()),
                tags: vec!["Next.js".to_string(), "Rust".to_string()],
                content: Some("<p>This is the full content served from the Rust backend.</p>".to_string()),
            },
            ApiBlogPost {
                id: "2".to_string(),
                slug: "mastering-tailwind-css-techniques".to_string(),
                title: "Mastering Tailwind CSS (from Rust)".to_string(),
                summary: "Unlock Tailwind with Rust insights.".to_string(),
                image_url: "https://picsum.photos/seed/blog2rust/600/400".to_string(),
                author: ApiPostAuthor { name: "Rust Writer".to_string(), avatar_url: "https://picsum.photos/seed/rustwriter/40/40".to_string() },
                published_at: Some(Utc.with_ymd_and_hms(2024, 7, 19, 12, 0, 0).unwrap()),
                tags: vec!["TailwindCSS".to_string(), "Rust".to_string()],
                content: Some("<p>Tailwind content from Rust.</p>".to_string()),
            },
        ];
        let mock_courses = vec![
            ApiCourse {
                id: "1".to_string(),
                title: "Advanced Rust Web Development".to_string(),
                description: "Master modern web technologies with Rust, Actix, and Tokio.".to_string(),
                image_url: "https://picsum.photos/seed/courserust1/600/300".to_string(),
                author_name: "Jane Doe (Rust Expert)".to_string(),
                instructor: Some(ApiCourseInstructor { name: "Jane Doe".to_string(), bio: "Lead Rust Engineer".to_string(), avatar_url: "https://picsum.photos/seed/instructorrust1/100/100".to_string() }),
                rating: Some(4.9),
                student_count: Some(1500),
                price: "$199".to_string(),
                category: "Web Development".to_string(),
                level: "Advanced".to_string(),
                duration: Some("10 Weeks".to_string()),
                lessons: Some(vec![ApiCourseLesson { title: "Intro to Actix".to_string(), duration: "1h".to_string() }]),
                ..Default::default()
            },
        ];
         let mock_projects = vec![
            ApiProject {
                id: "1".to_string(),
                title: "Rust E-commerce API".to_string(),
                description: "A full-featured e-commerce API built with Rust.".to_string(),
                long_description: Some("This project showcases a scalable e-commerce backend using Actix-web, SQLx, and PostgreSQL.".to_string()),
                image_url: "https://picsum.photos/seed/projectrust1/600/400".to_string(),
                tags: vec!["Rust".to_string(), "Actix-web".to_string(), "API".to_string()],
                technologies: Some(vec!["Rust".to_string(), "Actix-web".to_string(), "SQLx".to_string(), "PostgreSQL".to_string()]),
                live_link: Some("#".to_string()),
                repo_link: Some("#".to_string()),
                date: Some(Utc.with_ymd_and_hms(2024, 6, 1, 0, 0, 0).unwrap()),
                ..Default::default()
            },
        ];
        let mock_leaderboard = vec![
            ApiLeaderboardEntry {
                id: "1".to_string(),
                rank: 1,
                name: "Rustacean Prime".to_string(),
                avatar_url: "https://picsum.photos/seed/rustuser1/40/40".to_string(),
                points: 12000,
                achievements: vec!["Ferris Follower".to_string(), "Concurrency King".to_string()],
                ..Default::default()
            },
        ];


        AppState {
            posts: Mutex::new(mock_posts),
            courses: Mutex::new(mock_courses),
            projects: Mutex::new(mock_projects),
            leaderboard: Mutex::new(mock_leaderboard),
        }
    }
}

#[get("/api/posts")]
async fn get_posts(data: web::Data<AppState>) -> impl Responder {
    let posts = data.posts.lock().unwrap();
    HttpResponse::Ok().json(posts.clone())
}

#[get("/api/posts/{slug}")]
async fn get_post_by_slug(data: web::Data<AppState>, slug: web::Path<String>) -> impl Responder {
    let posts = data.posts.lock().unwrap();
    let found_post = posts.iter().find(|p| p.slug == *slug);
    match found_post {
        Some(post) => HttpResponse::Ok().json(post.clone()),
        None => HttpResponse::NotFound().body("Post not found"),
    }
}

#[get("/api/courses")]
async fn get_courses(data: web::Data<AppState>) -> impl Responder {
    let courses = data.courses.lock().unwrap();
    HttpResponse::Ok().json(courses.clone())
}

#[get("/api/courses/{id}")]
async fn get_course_by_id(data: web::Data<AppState>, id: web::Path<String>) -> impl Responder {
    let courses = data.courses.lock().unwrap();
    let found_course = courses.iter().find(|c| c.id == *id);
    match found_course {
        Some(course) => HttpResponse::Ok().json(course.clone()),
        None => HttpResponse::NotFound().body("Course not found"),
    }
}

#[get("/api/projects")]
async fn get_projects(data: web::Data<AppState>) -> impl Responder {
    let projects = data.projects.lock().unwrap();
    HttpResponse::Ok().json(projects.clone())
}

#[get("/api/projects/{id}")]
async fn get_project_by_id(data: web::Data<AppState>, id: web::Path<String>) -> impl Responder {
    let projects = data.projects.lock().unwrap();
    let found_project = projects.iter().find(|p| p.id == *id);
    match found_project {
        Some(project) => HttpResponse::Ok().json(project.clone()),
        None => HttpResponse::NotFound().body("Project not found"),
    }
}

#[get("/api/leaderboard")]
async fn get_leaderboard(data: web::Data<AppState>) -> impl Responder {
    let leaderboard = data.leaderboard.lock().unwrap();
    HttpResponse::Ok().json(leaderboard.clone())
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let app_state = web::Data::new(AppState::new());

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:9002") // Allow Next.js frontend
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![actix_web::http::header::AUTHORIZATION, actix_web::http::header::ACCEPT])
            .allowed_header(actix_web::http::header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(app_state.clone())
            .service(get_posts)
            .service(get_post_by_slug)
            .service(get_courses)
            .service(get_course_by_id)
            .service(get_projects)
            .service(get_project_by_id)
            .service(get_leaderboard)
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
