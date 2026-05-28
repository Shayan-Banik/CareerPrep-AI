
//For demonstration purposes, we are using dummy data for the resume, job description, and self-description. In a real application, this data would likely be stored in a database or fetched from an API.


const resume = `
# Dummy Resume Data

## Personal Information

Full Name: Arjun Mehta
Phone Number: +91 9876543210
Email Address: [arjunmehta.dev@gmail.com](mailto:arjunmehta.dev@gmail.com)
Location: Bangalore, Karnataka, India
LinkedIn: linkedin.com/in/arjunmehta
GitHub: github.com/arjunmehta
Portfolio: arjunmehta.dev

---

## Professional Summary

Motivated and detail-oriented Computer Science graduate with strong skills in full-stack web development, backend systems, and AI-integrated applications. Experienced in building scalable MERN stack projects, REST APIs, and authentication systems. Passionate about problem-solving, clean code practices, and developing real-world applications. Seeking an entry-level software engineering role to contribute technical expertise and continue learning modern technologies.

---

## Technical Skills

### Programming Languages

* JavaScript
* Python
* Java
* C++

### Frontend Technologies

* React.js
* Next.js
* HTML5
* CSS3
* Bootstrap

### Backend Technologies

* Node.js
* Express.js

### Databases

* MongoDB
* PostgreSQL
* MySQL

### Tools & Platforms

* Git
* GitHub
* Postman
* VS Code
* Docker

### Cloud & AI

* Firebase
* Gemini API
* OpenAI API

---

## Work Experience

### Software Development Intern

TechNova Solutions Pvt. Ltd.
June 2025 – August 2025
Bangalore, India

Responsibilities:

* Developed RESTful APIs using Node.js and Express.js
* Integrated MongoDB database for scalable data storage
* Collaborated with frontend developers to optimize API performance
* Improved dashboard loading speed by 25%
* Participated in Agile sprint planning and code reviews

Technologies Used:

* Node.js
* Express.js
* MongoDB
* React.js

---

## Projects

### AI Resume Builder

Description:
Developed a full-stack AI-powered resume builder application that generates ATS-friendly resumes using Gemini API integration.

Features:

* AI-generated professional summaries
* User authentication system
* Resume PDF export
* Dynamic resume templates

Technologies:

* Next.js
* Node.js
* MongoDB
* Gemini API

GitHub:
github.com/arjunmehta/ai-resume-builder

Live Demo:
airesumebuilder.vercel.app

---

### Task Management System

Description:
Built a MERN stack task manager application with secure authentication and real-time task tracking.

Features:

* JWT authentication
* Task creation and updates
* Responsive dashboard
* User profile management

Technologies:

* React.js
* Express.js
* MongoDB
* Node.js

GitHub:
github.com/arjunmehta/task-manager

---

### E-Commerce Backend API

Description:
Created a scalable backend API for an e-commerce platform with product management and payment integration.

Features:

* Product CRUD operations
* Stripe payment gateway integration
* Order management system
* Admin authentication

Technologies:

* Node.js
* Express.js
* PostgreSQL

GitHub:
github.com/arjunmehta/ecommerce-api

---

## Education

Bachelor of Technology (B.Tech) in Computer Science Engineering
Indian Institute of Technology, Delhi
2022 – 2026
CGPA: 8.5

Relevant Coursework:

* Data Structures & Algorithms
* Database Management Systems
* Operating Systems
* Computer Networks

---

## Certifications

* Full Stack Web Development – Udemy
* JavaScript Algorithms and Data Structures – freeCodeCamp
* Introduction to Cloud Computing – Coursera

---

## Achievements

* Solved 500+ coding problems on LeetCode
* Finalist in National Level Hackathon 2025
* Built and deployed 10+ full-stack projects

---

## Languages Known

* English
* Hindi

---

## Interests

* Web Development
* Artificial Intelligence
* Open Source Contribution
* Cricket

`

const jobDescription = `
# Job Description: Software Engineer (Entry-Level)

## Company Overview

TechNova Solutions is a leading technology company specializing in innovative software solutions for businesses worldwide. We are committed to fostering a collaborative and inclusive work environment where creativity and technical excellence thrive. Our team is passionate about building cutting-edge applications that solve real-world problems and drive digital transformation.

## Position Summary

We are seeking a motivated and detail-oriented Software Engineer (Entry-Level) to join our dynamic development team. The ideal candidate will have a strong foundation in computer science principles, proficiency in full-stack web development, and a passion for learning new technologies. As a Software Engineer at TechNova Solutions, you will work on exciting projects that leverage modern technologies, including AI integration, to create impactful software solutions.

## Key Responsibilities

* Develop and maintain web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js)
* Design and implement RESTful APIs for seamless frontend-backend communication
* Integrate AI services ( e.g., Gemini API, OpenAI API) to enhance application functionality
* Collaborate with cross-functional teams to define, design, and ship new features
* Write clean, maintainable, and efficient code following best practices
* Participate in code reviews and contribute to team knowledge sharing
* Troubleshoot and debug applications to optimize performance and user experience
* Stay up-to-date with emerging technologies and industry trends

## Qualifications

* Bachelor’s degree in Computer Science, Software Engineering, or a related field
* Strong programming skills in JavaScript and familiarity with Python or Java is a plus
* Experience with frontend frameworks (React.js) and backend technologies (Node.js, Express.js)
* Knowledge of databases (MongoDB, PostgreSQL) and RESTful API design
* Familiarity with AI services (Gemini API, OpenAI API) is a strong advantage
* Excellent problem-solving skills and attention to detail
* Strong communication skills and ability to work collaboratively in a team environment
* Eagerness to learn new technologies and grow as a software engineer

## Benefits 

* Competitive salary
* Flexible working hours
* Competitive benefits package
* Professional development opportunities
* Competitive work environment
* Opportunity to work on innovative projects with cutting-edge technologies

## How to Apply

Interested candidates are encouraged to submit their resume and a cover letter detailing their relevant experience and why they are a good fit for the role to [email protected].
`

const selfDescription = `
# Self Description

I am a passionate and driven Computer Science graduate with a strong foundation in full-stack web development and a keen interest in artificial intelligence. Throughout my academic journey, I have honed my skills in JavaScript, Python, and Java, and have gained hands-on experience with technologies such as React.js, Node.js, Express.js, and MongoDB. My projects have allowed me to explore the integration of AI services like the Gemini API, enabling me to create innovative applications that solve real-world problems.

I am a proactive learner who thrives in collaborative environments and enjoys tackling complex challenges. My experience as a software development intern has equipped me with practical knowledge of building scalable applications and working effectively within a team. I am eager to contribute my technical expertise and enthusiasm for software engineering to a dynamic organization where I can continue to grow and make a meaningful impact.

`

export { resume, jobDescription, selfDescription };