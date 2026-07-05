# genAi-project

## Overview
This project is a full-stack interview preparation web application built with a React frontend and an Express/MongoDB backend. The app is designed to help users register, log in, generate interview reports, and manage AI-assisted interview sessions.

## Main Goal
The main goal of this project is to provide a modern interview preparation experience by combining user authentication, resume upload or interview data handling, and AI-driven insights or reports. It is built to demonstrate how a generative AI-powered backend can support a responsive and secure React client interface.

## Tech Stack
- Frontend
  - React
  - Vite
  - Tailwind CSS
  - React Router DOM
  - Axios
- Backend
  - Node.js
  - Express
  - MongoDB with Mongoose
  - JWT authentication
  - Multer for file uploads
  - PDF parsing and Puppeteer for handling documents
  - Zod for input validation
  - Google GenAI SDK (`@google/genai`)

## Project Structure
- `backend/` — Express server, authentication, interview routes, AI services, and MongoDB models
- `client/` — React app with auth and interview feature pages, custom hooks, and context stores

## Why this project?
This repository showcases how to connect a React-based user interface with a secure Node.js backend and AI services. It is useful for interview coaching, generating structured interview feedback, and building a practical example of a gen AI-enabled full-stack application.

## Running the project
- Backend: `npm install` and `npm run dev` inside `backend/`
- Frontend: `npm install` and `npm run dev` inside `client/`

> Note: Additional configuration may be required for database connection strings, JWT secrets, and Google GenAI credentials.
