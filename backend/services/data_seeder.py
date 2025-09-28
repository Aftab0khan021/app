from datetime import date, timedelta, datetime
from database import get_collection
import asyncio

# Mock data for seeding
MOCK_DATA = {
    "personal_info": {
        "name": "Aftab Pathan",
        "title": "Aspiring Software Engineer",
        "location": "Bhopal, Madhya Pradesh, India",
        "email": "paftab320@gmail.com",
        "phone": "+91 7089036313",
        "linkedin": "https://linkedin.com/in/aftab-khan-389282285",
        "github": "https://github.com/Aftab0khan021",
        "bio": "Passionate software engineer with a strong foundation in computer science and hands-on experience in building clean, efficient, and user-centric software solutions. Currently pursuing B-Tech with expertise in full-stack development and cloud technologies.",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        "resume": "/resume-aftab-pathan.pdf",
        "status": "available"
    },
    "projects": [
        {
            "title": "Cab-Match",
            "description": "A comprehensive cab-sharing platform built with modern web technologies, featuring real-time ride tracking, secure authentication, and interactive maps for seamless user experience.",
            "short_description": "Cab-sharing platform with real-time tracking and interactive maps",
            "image": "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85",
            "images": [
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85",
                "https://images.pexels.com/photos/9558775/pexels-photo-9558775.jpeg",
                "https://images.unsplash.com/photo-1503252947848-7338d3f92f31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMG1vY2t1cHxlbnwwfHx8fDE3NTg5ODAxNDB8MA&ixlib=rb-4.1.0&q=85"
            ],
            "live_url": "https://cab-match.vercel.app",
            "github_url": "https://github.com/Aftab0khan021/cab-match",
            "technologies": ["React", "FastAPI", "MongoDB Atlas", "JWT", "Maps API", "WebSocket", "Tailwind CSS"],
            "features": [
                "Real-time ride tracking with interactive maps",
                "Secure JWT-based authentication system",
                "Role-based access control for riders and drivers",
                "Responsive UI for seamless mobile experience",
                "MongoDB Atlas for scalable data storage",
                "RESTful API architecture with FastAPI"
            ],
            "category": "Full-Stack Web Application",
            "status": "completed",
            "start_date": "2024-04-01",
            "end_date": "2024-06-30"
        },
        {
            "title": "AI-Resume-Analyser",
            "description": "An intelligent resume analysis platform that leverages AI to parse, analyze, and provide insights on resumes. Built with full-stack architecture and deployed on cloud platforms.",
            "short_description": "AI-powered resume analysis and parsing platform",
            "image": "https://images.pexels.com/photos/6625655/pexels-photo-6625655.png",
            "images": [
                "https://images.pexels.com/photos/6625655/pexels-photo-6625655.png",
                "https://images.unsplash.com/photo-1585229259079-05ab82f93c7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMG1vY2t1cHxlbnwwfHx8fDE3NTg5ODAxNDB8MA&ixlib=rb-4.1.0&q=85",
                "https://images.unsplash.com/photo-1601972602237-8c79241e468b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85"
            ],
            "live_url": "https://bit.ly/4ncTTHC",
            "github_url": "https://github.com/Aftab0khan021/ai-resume-analyser",
            "technologies": ["React", "FastAPI", "MongoDB Atlas", "Python", "AI/ML", "Pandas", "NumPy", "Vercel", "Render"],
            "features": [
                "Intelligent resume parsing and text extraction",
                "AI-powered skills and experience analysis",
                "Interactive dashboard for resume insights",
                "File upload with drag-and-drop functionality",
                "Cloud deployment with environment configurations",
                "RESTful API for seamless frontend integration"
            ],
            "category": "AI/ML Web Application",
            "status": "completed",
            "start_date": "2024-01-01",
            "end_date": "2024-03-31"
        }
    ],
    "experiences": [
        {
            "title": "Software Developer Intern",
            "company": "Walmart",
            "location": "Remote",
            "type": "Virtual Internship",
            "start_date": date(2024, 6, 1),
            "end_date": date(2024, 8, 31),
            "current": False,
            "description": "Designed scalable software modules with clean architecture, built optimized data structures improving runtime efficiency, and created database schemas to enhance data retrieval performance.",
            "achievements": [
                "Designed scalable software modules with clean architecture",
                "Built optimized data structures, improving runtime efficiency by 25%",
                "Created database schemas to improve data retrieval performance",
                "Collaborated with cross-functional teams in agile environment"
            ],
            "skills": ["Python", "Data Structures", "Algorithm Optimization", "Database Design", "Agile"]
        },
        {
            "title": "Software Development Engineer",
            "company": "Accenture",
            "location": "Remote",
            "type": "Virtual Internship",
            "start_date": date(2024, 3, 1),
            "end_date": date(2024, 5, 31),
            "current": False,
            "description": "Migrated applications to AWS/GCP cloud infrastructure, improved performance through debugging & optimization, and conducted comprehensive UAT & security testing.",
            "achievements": [
                "Migrated applications to AWS/GCP cloud infrastructure",
                "Improved application performance by 30% through debugging & optimization",
                "Conducted UAT & security testing including IAM policies",
                "Implemented CI/CD pipelines for automated deployment"
            ],
            "skills": ["AWS", "GCP", "Cloud Migration", "Performance Optimization", "Security Testing", "IAM"]
        }
    ],
    "skills": [
        {"category": "Programming Languages", "name": "Python", "level": 90},
        {"category": "Programming Languages", "name": "JavaScript", "level": 85},
        {"category": "Programming Languages", "name": "C/C++", "level": 80},
        {"category": "Web Technologies", "name": "React", "level": 95},
        {"category": "Web Technologies", "name": "FastAPI", "level": 90},
        {"category": "Web Technologies", "name": "HTML", "level": 95},
        {"category": "Web Technologies", "name": "CSS", "level": 90},
        {"category": "Web Technologies", "name": "Tailwind CSS", "level": 92},
        {"category": "Web Technologies", "name": "Node.js", "level": 85},
        {"category": "Web Technologies", "name": "Express.js", "level": 83},
        {"category": "Databases", "name": "MongoDB", "level": 85},
        {"category": "Databases", "name": "SQL", "level": 80},
        {"category": "Databases", "name": "MongoDB Atlas", "level": 88},
        {"category": "Cloud & DevOps", "name": "AWS", "level": 80},
        {"category": "Cloud & DevOps", "name": "GCP", "level": 75},
        {"category": "Cloud & DevOps", "name": "Docker", "level": 70},
        {"category": "Cloud & DevOps", "name": "Git", "level": 85},
        {"category": "Cloud & DevOps", "name": "GitHub", "level": 82},
        {"category": "ML Libraries", "name": "Scikit-learn", "level": 75},
        {"category": "ML Libraries", "name": "Pandas", "level": 80},
        {"category": "ML Libraries", "name": "NumPy", "level": 78},
        {"category": "ML Libraries", "name": "Matplotlib", "level": 70},
        {"category": "Tools & IDEs", "name": "VS Code", "level": 90},
        {"category": "Tools & IDEs", "name": "Linux", "level": 85},
        {"category": "Tools & IDEs", "name": "Windows", "level": 80}
    ],
    "education": [
        {
            "degree": "Bachelor of Technology (B-Tech)",
            "field": "Computer Science & Engineering",
            "institution": "Lakshmi Narian College of Technology Excellence",
            "location": "Raisen Road, Bhopal, Madhya Pradesh",
            "start_date": date(2022, 7, 1),
            "end_date": date(2026, 6, 30),
            "current": True,
            "gpa": "8.5/10",
            "description": "Comprehensive computer science program covering software engineering, data structures, algorithms, and modern development practices.",
            "achievements": [
                "Consistent academic performer with 8.5+ GPA",
                "Active participant in coding competitions",
                "Member of technical societies and programming clubs"
            ]
        }
    ],
    "certifications": [
        {
            "title": "Web Development",
            "issuer": "IBM SkillsBuild",
            "date": date(2024, 3, 15),
            "credential_id": "IBM-WD-2024",
            "description": "Comprehensive web development certification covering HTML, CSS, JavaScript, and modern frameworks.",
            "skills": ["HTML", "CSS", "JavaScript", "React", "Node.js"]
        },
        {
            "title": "Introduction to Artificial Intelligence",
            "issuer": "IBM SkillsBuild",
            "date": date(2024, 4, 20),
            "credential_id": "IBM-AI-2024",
            "description": "Foundational AI concepts, machine learning algorithms, and practical applications.",
            "skills": ["Machine Learning", "AI Concepts", "Python", "Data Analysis"]
        },
        {
            "title": "Cloud Foundation",
            "issuer": "AWS Academy",
            "date": date(2024, 5, 10),
            "credential_id": "AWS-CF-2024",
            "description": "Core AWS services, cloud computing fundamentals, and best practices.",
            "skills": ["AWS", "Cloud Computing", "EC2", "S3", "IAM"]
        },
        {
            "title": "Python Foundation",
            "issuer": "Infosys Springboard",
            "date": date(2023, 12, 5),
            "credential_id": "IS-PY-2023",
            "description": "Python programming fundamentals, data structures, and object-oriented programming.",
            "skills": ["Python", "OOP", "Data Structures", "Algorithms"]
        }
    ],
    "blog_posts": [
        {
            "title": "Building Scalable Web Applications with React and FastAPI",
            "slug": "building-scalable-web-applications-react-fastapi",
            "excerpt": "Learn how to create robust full-stack applications using React for the frontend and FastAPI for the backend, with practical examples and best practices.",
            "content": "Full blog content about building scalable web applications...",
            "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
            "tags": ["React", "FastAPI", "Full-Stack", "Web Development"],
            "published_at": datetime(2024, 7, 15, 10, 0, 0),
            "read_time": "8 min read",
            "featured": True,
            "status": "published"
        },
        {
            "title": "Cloud Migration Strategies: AWS vs GCP",
            "slug": "cloud-migration-strategies-aws-vs-gcp",
            "excerpt": "A comprehensive comparison of AWS and GCP for cloud migration, covering costs, services, and implementation strategies.",
            "content": "Full blog content about cloud migration strategies...",
            "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
            "tags": ["AWS", "GCP", "Cloud Migration", "DevOps"],
            "published_at": datetime(2024, 7, 10, 9, 30, 0),
            "read_time": "12 min read",
            "featured": False,
            "status": "published"
        },
        {
            "title": "AI in Resume Analysis: Building Smart Parsing Systems",
            "slug": "ai-resume-analysis-smart-parsing-systems",
            "excerpt": "Explore how AI and machine learning can revolutionize resume parsing and analysis, with practical implementation examples.",
            "content": "Full blog content about AI in resume analysis...",
            "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
            "tags": ["AI", "Machine Learning", "Python", "Resume Analysis"],
            "published_at": datetime(2024, 7, 5, 14, 15, 0),
            "read_time": "10 min read",
            "featured": True,
            "status": "published"
        }
    ],
    "testimonials": [
        {
            "name": "Rajesh Kumar",
            "position": "Senior Software Engineer",
            "company": "Walmart",
            "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            "text": "Aftab demonstrated exceptional problem-solving skills and delivered clean, scalable code. His ability to optimize data structures significantly improved our application performance.",
            "rating": 5
        },
        {
            "name": "Priya Sharma",
            "position": "Technical Lead",
            "company": "Accenture",
            "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            "text": "Working with Aftab was a pleasure. He quickly adapted to cloud technologies and delivered a 30% performance improvement in our migration project.",
            "rating": 5
        },
        {
            "name": "Dr. Amit Verma",
            "position": "Professor",
            "company": "LNCTE",
            "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            "text": "Aftab is one of our most dedicated students. His passion for learning and ability to apply theoretical concepts to real-world projects is commendable.",
            "rating": 5
        }
    ]
}

async def seed_database():
    """Seed the database with initial data"""
    try:
        # Seed personal info
        personal_collection = await get_collection("personal_info")
        existing_personal = await personal_collection.find_one()
        if not existing_personal:
            await personal_collection.insert_one(MOCK_DATA["personal_info"])
            print("✅ Personal info seeded")
        
        # Seed projects
        projects_collection = await get_collection("projects")
        for project in MOCK_DATA["projects"]:
            existing = await projects_collection.find_one({"title": project["title"]})
            if not existing:
                await projects_collection.insert_one(project)
        print(f"✅ {len(MOCK_DATA['projects'])} projects seeded")
        
        # Seed experiences
        experiences_collection = await get_collection("experiences")
        for experience in MOCK_DATA["experiences"]:
            existing = await experiences_collection.find_one({"title": experience["title"], "company": experience["company"]})
            if not existing:
                await experiences_collection.insert_one(experience)
        print(f"✅ {len(MOCK_DATA['experiences'])} experiences seeded")
        
        # Seed skills
        skills_collection = await get_collection("skills")
        for skill in MOCK_DATA["skills"]:
            existing = await skills_collection.find_one({"name": skill["name"], "category": skill["category"]})
            if not existing:
                await skills_collection.insert_one(skill)
        print(f"✅ {len(MOCK_DATA['skills'])} skills seeded")
        
        # Seed education
        education_collection = await get_collection("education")
        for edu in MOCK_DATA["education"]:
            existing = await education_collection.find_one({"degree": edu["degree"], "institution": edu["institution"]})
            if not existing:
                await education_collection.insert_one(edu)
        print(f"✅ {len(MOCK_DATA['education'])} education records seeded")
        
        # Seed certifications
        certifications_collection = await get_collection("certifications")
        for cert in MOCK_DATA["certifications"]:
            existing = await certifications_collection.find_one({"title": cert["title"], "issuer": cert["issuer"]})
            if not existing:
                await certifications_collection.insert_one(cert)
        print(f"✅ {len(MOCK_DATA['certifications'])} certifications seeded")
        
        # Seed blog posts
        blog_collection = await get_collection("blog_posts")
        for post in MOCK_DATA["blog_posts"]:
            existing = await blog_collection.find_one({"slug": post["slug"]})
            if not existing:
                await blog_collection.insert_one(post)
        print(f"✅ {len(MOCK_DATA['blog_posts'])} blog posts seeded")
        
        # Seed testimonials
        testimonials_collection = await get_collection("testimonials")
        for testimonial in MOCK_DATA["testimonials"]:
            existing = await testimonials_collection.find_one({"name": testimonial["name"], "company": testimonial["company"]})
            if not existing:
                await testimonials_collection.insert_one(testimonial)
        print(f"✅ {len(MOCK_DATA['testimonials'])} testimonials seeded")
        
        print("🎉 Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")

if __name__ == "__main__":
    from database import connect_to_mongo, close_mongo_connection
    
    async def main():
        await connect_to_mongo()
        await seed_database()
        await close_mongo_connection()
    
    asyncio.run(main())