# 🎓 EduFlow – High-Fidelity Learning Management System

**EduFlow** is a feature-rich, full-stack LMS designed to bridge the gap between content creators and learners. Built with the **MERN stack**, it features a sophisticated triple-tier authentication system (Student, Instructor, Admin), real-time progress tracking, and a professional-grade administrative suite.

---

## 🚀 Live Demo

🔗 **Frontend:** [https://edu-flow-lime.vercel.app/]

🔗 **Backend API:** [https://eduflow-o1gf.onrender.com/api/v1]

> [!IMPORTANT]
> Cold Start Notice: This project is hosted on a free-tier instance (Render). If the site hasn't been visited recently, the initial request may take up to 50 seconds to spin up the server. Please allow a moment for the courses and data to populate.

> Note on OTPs: While the core functionality is fully implemented, the Render Free Tier may cause delays (up to 60s) during SMTP handshakes (Sign-up/Email updates). For the best experience, please use the provided credentials below.

### 🧪 Demo Credentials

Experience the different roles within the ecosystem:

| Role | ID | Password |
| --- | --- | --- |
| **Admin** | **admin_core** | 1234567890 |
| **Instructor** | **learnwithjane** | 1234567890 |
| **Student** | **ishaan_malhotra** | 1234567890 |

---

### 📺 Platform Overview & User Journey

<div align="center">
    <h3><em>Demo: Exploring the Admin Dashboard</em></h3>
  <video src="https://github.com/user-attachments/assets/042afe15-00c0-48b2-83e1-19b546930664" width="100%" autoplay loop muted playsinline></video>
</div>
<div align="center">
  <h3><em>Demo: Instructor Course Update (Adding Sections and Videos)</em></h3>
  <video src="https://github.com/user-attachments/assets/250f74de-f35c-49ea-a907-4e0fb193d0a1" width="100%" autoplay loop muted playsinline></video>
</div>
<div align="center">
  <h3><em>Demo: Student Course Enrollment</em></h3>
  <video src="https://github.com/user-attachments/assets/efb4ca12-d03c-49c0-9e27-d276d0c8f20c" width="100%" autoplay loop muted playsinline></video>
</div>
<div align="center">
  <h3><em>Demo: Register OTP Flow</em></h3>
  <video src="https://github.com/user-attachments/assets/7ed1ce63-80e3-4899-a310-139b56ad426d" width="100%" autoplay loop muted playsinline></video>
</div>
<div align="center">
  <h3><em>Demo: Home Page</em></h3>
  <video src="https://github.com/user-attachments/assets/b5ffed11-2c15-442e-9a99-6530e02b12c9" width="100%" autoplay loop muted playsinline></video>
</div>

---

## 🛠️ The Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 18, Tailwind CSS, Shadcn/UI, Redux Toolkit, RTK Query |
| **Backend** | Node.js, Express.js, Nodemailer (OTP Service) |
| **Database** | MongoDB + Mongoose ODM |
| **Storage** | Cloudinary (Media), Multer (Buffer handling) |
| **Auth** | JWT (Access & Refresh Token Rotation) |

---

## 🔐 Advanced Authentication & Security

EduFlow prioritizes data integrity and user security through a rigorous onboarding flow:

- **Dual-Factor Verification:** Integrated **OTP email verification** via Nodemailer for registration and data updates to eliminate bot accounts.
- **Role-Specific Requirements:** Instructors are mandated to provide a professional profile picture and age verification during signup.
- **JWT Architecture:** Implemented secure state management using Access and Refresh tokens to maintain session persistence without compromising security.

---

## 👥 Multi-Tenant User Experience

### 👨‍🎓 Students (The Learners)

- **Data-Driven Dashboard:** Visualizes active learning stats, including total credits, enrollment count, and **Average Course Progress**.
- **Smart Enrollment:** Public course browsing with restricted video access until enrollment is confirmed.
- **Persistence:** Granular progress tracking based on video completion counts.
- **Account Autonomy:** Full profile management, including secure credential updates and account deletion.
- **Search Filter:** A search bar to search for specific courses using the names or tags for quick access.

### 👨‍🏫 Instructors (The Creators)

- **Revenue Analytics:** A dedicated instructor dashboard tracking total students reached and platform-wide revenue.
- **Course Lifecycle Management:** Full **CRUD** capabilities for courses, sections, and video lessons.
- **Draft/Publish Workflow:** Granular control over content visibility; courses remain in 'Draft' mode until the instructor triggers a public release.
- **Dual-Role Capability:** A unique architecture allowing instructors to enroll in and consume other courses as students.
- **Data Responsibility:** Deleting an instructor account triggers a **Cascading Delete** of all associated course content.

### 🛡️ Admin (The Controller)

- **Platform Oversight:** Global view of all users, revenue metrics, and content (including drafts).
- **Category Management:** Full CRUD control over course categories to maintain platform organization.
- **Moderation Power:** Authority to delete any user or course. Deleting an instructor account automatically cleanses the database of their hosted content.
- **Bypassed Access:** Admin privileges allow for content auditing without the need for manual enrollment.

---

## 🚀 Performance & Design Patterns

- **State Management:** Utilized **Redux Toolkit Query (RTK Query)** for efficient data fetching, caching, and state synchronization between the frontend and the MongoDB database.
- **Utility-First UI:** Styled with **Tailwind CSS** and **Shadcn** for a modern, responsive aesthetic that adapts to mobile and desktop seamlessly.
- **RESTful Architecture:** Built with clean, modular Express routes ensuring scalable backend logic.

---

## 🚀 Challenges and Solutions

Building EduFlow wasn't just about CRUD operations; it was about managing complex state, security, and data integrity at scale. Below are the core engineering hurdles I overcame to reach a production standard.

1) Granular Role-Based Access Control (RBAC)
Implementing a multi-tier security wrapper was a significant architectural challenge. I engineered a cohesive frontend guard system that dynamically permits or restricts access based on user roles (Admin, Instructor, Student). I successfully synchronized the backend JWT logic with a secure React-based routing wrapper to ensure zero unauthorized access to sensitive sections.

2) Advanced Cache Management with RTK Query
Transitioning from standard Redux to RTK Query introduced a steep learning curve regarding the global cache. I encountered a critical sync issue where different user roles were viewing "stale" cached data. I mastered the Tags & Invalidation system. By strategically implementing providesTags and invalidatesTags, I ensured the UI reflects real-time data updates without unnecessary API refetching, maintaining high performance and data accuracy.

3) Dynamic Content Architecture (Multi-Section Course Creator)
The "Course Builder" required a highly flexible UI where instructors could manually add an unlimited number of sections and lessons.
I developed a sophisticated nested state logic that allows users to dynamically inject data points. This required balancing React's rendering performance with a complex, multi-layered data entry system.

4) Nested UI Components, State-Driven UI & Promise Management
Building a seamless Accordion-based curriculum player was a UI/UX challenge. Linking specific video files to their corresponding lesson IDs required precise mapping. For integrating Shadcn/UI dialogs and modals, I had to synchronize UI states with asynchronous backend promises. I implemented a robust feedback loop using Shadcn and Sonner. This ensures that the UI only closes or updates once the backend promise is resolved, preventing "UI flickering" and improving the overall Functional Stability.

5) Database Integrity & Cascading Updates
With multiple linked collections (Users, Courses, Enrollments), I faced the challenge of "Data Drifting." Deleting a course meant I had to ensure students weren't left with broken enrollment links. I engineered Cascading Update/Delete logic at the database level. I learned to manage cross-collection dependencies to ensure that if a primary record is modified, all related data across the system remains consistent and valid.

---

## 🛠️ Setup & Installation  

Follow these steps to run **EduFlow** locally on your system 👇  

### Clone the repository and Run these commands
- ```git clone https://github.com/RITIK-coder-1/EduFlow.git```
- ```cd EduFlow```

### Set up the Client
- ```cd client```
- ```npm install```
- ```touch .env```

##### Now add this line to your .env file 👇
- ``` VITE_RENDER_SERVER="https://eduflow-o1gf.onrender.com/api/v1"```

##### Once done, start the client:
- ```npm run dev```

### Set up the Server in a different terminal
- ```cd ../server```
- ```npm install```
- ```touch .env```

##### Now add these lines to your .env file (Make sure to include the actual values based on your mongodb database, mail host and cloudinary cloud)👇
- ```MONGO_URI=""```
- ```PORT=3001```
- ```DB_NAME=""```
- ```MAIL_HOST="smtp.gmail.com"``` 
- ```MAIL_USER=""```
- ```MAIL_PASS=""```
- ```ACCESS_TOKEN_SECRET=""```
- ```REFRESH_TOKEN_SECRET=""```
- ```ACCESS_TOKEN_EXPIRY="1h"```
- ```REFRESH_TOKEN_EXPIRY="10d"```
- ```CLOUDINARY_CLOUD_NAME=""```
- ```CLOUDINARY_API_KEY=""```
- ```CLOUDINARY_API_SECRET=""```
- ```ADMIN_EMAIL=""```
- ```ADMIN_PASSWORD=""```
- ```VERCEL_CLIENT="https://edu-flow-lime.vercel.app"```

##### Once done, start the server:
- ```npm run dev```

---

## 🙌 Author  

**Ritik Mahapatra**  
🎯 Full Stack Web Application Developer  

- 💼 [GitHub](https://github.com/RITIK-coder-1)
- 💼 [LinkedIn](https://www.linkedin.com/in/ritik-mahapatra/)
- ✉️ [Email](mailto:ritikprofessional111@gmail.com)
