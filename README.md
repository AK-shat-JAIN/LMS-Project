# 📚 Coursify - Learning Management System

Coursify is a Fullstack MERN (MongoDB, Express, React, Node.js) application that provides a Learning Management System (LMS) platform for educators and students. Educators can create, manage, and sell courses, while students can browse, purchase, and learn from a variety of educational materials. The platform provides a seamless user experience with features like course enrollment, progress tracking, and secure payments.

---

## 🚀 Features

- **👨‍🏫 Course Creation and Management**: Educators can create, edit, and delete courses, complete with detailed descriptions, pricing, and content.
- **🛒 Purchase and Enrollment**: Students can browse courses, view detailed descriptions, and purchase courses using secure payment methods.
- **📈 Progress Tracking**: Students can track their progress through course modules and view their completion status.
- **🔐 User Authentication & Authorization**: Implemented using JWT (JSON Web Tokens) for secure login, registration, and role-based access for admins, instructors, and students.
- **💬 Real-Time Chat**: Students can communicate with instructors for any course-related queries.
- **🎥 Video Streaming**: Courses include video lectures that can be streamed directly on the platform.
- **🎯 User Dashboard**: Different dashboards for Admin, Instructor, and Student to manage courses, students, and settings.
- **💳 Payment Gateway Integration**: Integrated with payment gateways for secure course purchase.
- **📱 Responsive Design**: Fully optimized for both mobile and desktop views.

---

## 🛠️ Tech Stack

- **Frontend**: React, Redux, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe / PayPal
- **Version Control**: Git
- **Deployment**: Heroku / Netlify

---

## 🗺️ API Routes

### Public Routes

- **GET** `/api/courses` - View all available courses
- **GET** `/api/courses/:id` - View details of a specific course
- **POST** `/api/users/register` - Register a new user (Student or Instructor)
- **POST** `/api/users/login` - User login

### Student Routes

- **GET** `/api/users/me` - Get the logged-in user's profile (Student)
- **POST** `/api/courses/enroll/:courseId` - Enroll in a course
- **GET** `/api/courses/my-courses` - Get a list of all enrolled courses

### Instructor Routes

- **POST** `/api/courses/create` - Create a new course
- **PUT** `/api/courses/edit/:id` - Edit an existing course
- **DELETE** `/api/courses/delete/:id` - Delete a course

### Admin Routes

- **GET** `/api/admin/users` - Manage all users
- **GET** `/api/admin/courses` - Manage all courses
- **DELETE** `/api/admin/users/delete/:id` - Delete a user

---

## 💻 Installation

To set up and run Coursify on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AK-shat-JAIN/LMS-Project.git
   cd LMS-Project

2. **Install server-side dependencies:**

    ```bash
    cd server
    npm install

3. **Install client-side dependencies:**

    ```bash
    cd client
    npm install
    
4. **Set up environment variables:**
Create a .env file in the root of the server directory with the following variables:

    ```bash
    MONGO_URI=<your_mongoDB_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    STRIPE_SECRET_KEY=<your_stripe_secret_key>
    
5. **Run the application:**

   Start both the backend and the frontend. You can do this by opening two terminal windows or using `concurrently` for simultaneous start-up.

   - For the backend (in the `server` folder):

     ```bash
     npm run dev
     ```

   - For the frontend (in the `client` folder):

     ```bash
     npm start
     ```

6. **Access the application:**

   Once both the client and server are running, open your browser and navigate to:
`http://localhost:3000`

---


## 🖼️ Screenshots

- **Home Page**:
  ![image](https://github.com/user-attachments/assets/a44e26f4-3070-41d7-9e49-e24269ae03d9)

- **Course Details**:
  ![image](https://github.com/user-attachments/assets/cabd57ad-a381-49f0-932c-7bb2dd678905)


---

## 👥 Contributors

- **AK-shat JAIN** - [GitHub](https://github.com/AK-shat-JAIN)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
