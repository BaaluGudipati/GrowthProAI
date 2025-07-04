GrowthProAI Business Dashboard - Full Stack Intern Assignment
GitHub Repository:
Frontend Deployment:
Backend Deployment: 

Setup Instructions
Clone Repository: https://github.com/BaaluGudipati/GrowthProAI
Frontend Hosted Link :https://growth-pro-ai-one.vercel.app/
Backed Render Link :
Backend Setup:

Navigate to backend: cd backend

Install dependencies: npm install

Start server: npm start (runs on http://localhost:5000)

Frontend Setup:

Navigate to frontend: cd frontend

Install dependencies: npm install

Start application: npm start (runs on http://localhost:3000)

Environment Configuration:

Create .env in backend: PORT=5000

Create .env in frontend: REACT_APP_API_URL=http://localhost:5000

API Endpoints:

POST /business-data: Submit business data (JSON: {"name": "Business", "location": "City"})

GET /regenerate-headline: Regenerate SEO headline (?name=...&location=...)

Features Implemented
Core Requirements: Business input form, SEO headline display/regeneration, Google rating simulation

Bonuses: Full deployment (Vercel + Render), loading spinners, React Context state management, form validation

UI/UX: Responsive design with Tailwind CSS, modern dashboard layout, interactive elements

Project Structure
backend/: Node.js/Express server with API endpoints

frontend/: React application with components, context, and services

Business data stored in-memory using React state management

Technologies Used
Frontend: React, Tailwind CSS, Context API, Axios

Backend: Node.js, Express, CORS

Deployment: Vercel (frontend), Render (backend)
