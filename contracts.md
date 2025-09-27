# Portfolio API Contracts & Integration Plan

## Overview
This document outlines the API contracts, data models, and integration plan for the Aftab Pathan portfolio website.

## Data Models

### 1. Personal Information
```json
{
  "id": "ObjectId",
  "name": "string",
  "title": "string", 
  "location": "string",
  "email": "string",
  "phone": "string",
  "linkedin": "string",
  "github": "string",
  "bio": "string",
  "avatar": "string",
  "resume": "string",
  "status": "string", // "available", "busy", "unavailable"
  "updated_at": "datetime"
}
```

### 2. Projects
```json
{
  "id": "ObjectId",
  "title": "string",
  "description": "string",
  "short_description": "string",
  "image": "string",
  "images": ["string"],
  "live_url": "string",
  "github_url": "string",
  "technologies": ["string"],
  "features": ["string"],
  "category": "string",
  "status": "string", // "completed", "in-progress", "planned"
  "start_date": "date",
  "end_date": "date",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 3. Experience
```json
{
  "id": "ObjectId",
  "title": "string",
  "company": "string",
  "location": "string",
  "type": "string", // "full-time", "part-time", "internship", "contract"
  "start_date": "date",
  "end_date": "date",
  "current": "boolean",
  "description": "string",
  "achievements": ["string"],
  "skills": ["string"],
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 4. Skills
```json
{
  "id": "ObjectId",
  "category": "string", // "Programming Languages", "Web Technologies", etc.
  "name": "string",
  "level": "number", // 0-100
  "years_experience": "number",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 5. Education
```json
{
  "id": "ObjectId",
  "degree": "string",
  "field": "string",
  "institution": "string",
  "location": "string",
  "start_date": "date",
  "end_date": "date",
  "current": "boolean",
  "gpa": "string",
  "description": "string",
  "achievements": ["string"],
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 6. Certifications
```json
{
  "id": "ObjectId",
  "title": "string",
  "issuer": "string",
  "date": "date",
  "credential_id": "string",
  "description": "string",
  "skills": ["string"],
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 7. Blog Posts
```json
{
  "id": "ObjectId",
  "title": "string",
  "slug": "string",
  "excerpt": "string",
  "content": "string",
  "image": "string",
  "tags": ["string"],
  "published_at": "datetime",
  "read_time": "string",
  "featured": "boolean",
  "status": "string", // "draft", "published", "archived"
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 8. Testimonials
```json
{
  "id": "ObjectId",
  "name": "string",
  "position": "string",
  "company": "string",
  "image": "string",
  "text": "string",
  "rating": "number", // 1-5
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 9. Contact Messages
```json
{
  "id": "ObjectId",
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "status": "string", // "new", "read", "replied"
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## API Endpoints

### Public APIs (Portfolio Website)

#### Personal Information
- `GET /api/personal` - Get personal information

#### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/featured` - Get featured projects

#### Experience
- `GET /api/experience` - Get all experience

#### Skills
- `GET /api/skills` - Get all skills grouped by category

#### Education
- `GET /api/education` - Get education information

#### Certifications
- `GET /api/certifications` - Get all certifications

#### Blog
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/{slug}` - Get blog post by slug
- `GET /api/blog/featured` - Get featured blog posts

#### Testimonials
- `GET /api/testimonials` - Get all testimonials

#### Contact
- `POST /api/contact` - Submit contact message

### Admin APIs (Content Management)

#### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Get current admin user

#### Personal Information (Admin)
- `PUT /api/admin/personal` - Update personal information

#### Projects (Admin)
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects/{id}` - Update project
- `DELETE /api/admin/projects/{id}` - Delete project

#### Experience (Admin)
- `POST /api/admin/experience` - Create new experience
- `PUT /api/admin/experience/{id}` - Update experience
- `DELETE /api/admin/experience/{id}` - Delete experience

#### Skills (Admin)
- `POST /api/admin/skills` - Create new skill
- `PUT /api/admin/skills/{id}` - Update skill
- `DELETE /api/admin/skills/{id}` - Delete skill

#### Education (Admin)
- `POST /api/admin/education` - Create new education
- `PUT /api/admin/education/{id}` - Update education
- `DELETE /api/admin/education/{id}` - Delete education

#### Certifications (Admin)
- `POST /api/admin/certifications` - Create new certification
- `PUT /api/admin/certifications/{id}` - Update certification
- `DELETE /api/admin/certifications/{id}` - Delete certification

#### Blog (Admin)
- `POST /api/admin/blog` - Create new blog post
- `PUT /api/admin/blog/{id}` - Update blog post
- `DELETE /api/admin/blog/{id}` - Delete blog post

#### Testimonials (Admin)
- `POST /api/admin/testimonials` - Create new testimonial
- `PUT /api/admin/testimonials/{id}` - Update testimonial
- `DELETE /api/admin/testimonials/{id}` - Delete testimonial

#### Contact Messages (Admin)
- `GET /api/admin/messages` - Get all contact messages
- `PUT /api/admin/messages/{id}` - Update message status

## Frontend Integration Plan

### Mock Data Replacement
Currently using mock data from `/app/frontend/src/data/mock.js`. This will be replaced with API calls:

1. **Personal Info**: Replace `personalInfo` import with API call to `/api/personal`
2. **Projects**: Replace `projects` import with API call to `/api/projects`
3. **Experience**: Replace `experiences` import with API call to `/api/experience`
4. **Skills**: Replace `skills` import with API call to `/api/skills`
5. **Education**: Replace `education` import with API call to `/api/education`
6. **Certifications**: Replace `certifications` import with API call to `/api/certifications`
7. **Blog**: Replace `blogPosts` import with API call to `/api/blog`
8. **Testimonials**: Replace `testimonials` import with API call to `/api/testimonials`

### API Integration Steps

1. **Create API Service Layer**:
   - Create `/app/frontend/src/services/api.js` for centralized API calls
   - Handle authentication for admin routes
   - Error handling and loading states

2. **Update Components**:
   - Replace static imports with API calls using React hooks
   - Add loading spinners and error states
   - Implement data fetching in useEffect hooks

3. **State Management**:
   - Use React Context or local state for global data
   - Implement caching where appropriate
   - Handle real-time updates for admin panel

4. **Admin Panel**:
   - Implement authentication flow
   - Create forms for CRUD operations
   - Add file upload functionality for images
   - Implement rich text editor for blog posts

### Database Seeding

Initial data will be seeded from the mock data to populate the database:

1. Personal information from `personalInfo`
2. Projects from `projects` array
3. Experience from `experiences` array
4. Skills from `skills` object
5. Education from `education` array
6. Certifications from `certifications` array
7. Blog posts from `blogPosts` array
8. Testimonials from `testimonials` array

## Implementation Priority

1. **Phase 1**: Basic CRUD APIs for all models
2. **Phase 2**: Database seeding with initial data
3. **Phase 3**: Frontend API integration
4. **Phase 4**: Admin authentication and panel
5. **Phase 5**: Advanced features (search, filtering, file uploads)
6. **Phase 6**: Performance optimization and caching

## Testing Strategy

1. **Backend**: Unit tests for models and API endpoints
2. **Frontend**: Integration tests for API calls and user flows
3. **E2E**: Full user journey testing
4. **Manual**: Admin panel functionality testing

This contract ensures seamless integration between frontend and backend while maintaining clean separation of concerns and scalable architecture.