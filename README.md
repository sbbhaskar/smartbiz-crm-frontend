# SmartBiz CRM

SmartBiz CRM is a lightweight, full-stack Customer Relationship Management system designed for small teams and individual professionals. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it supports essential features like user authentication, task assignment, role-based access control, and admin tools.

## 🚀 Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Deployment Ready:** Vercel (Frontend) + Render (Backend)

---

## ✨ Features

- ✅ Register/Login with JWT auth
- ✅ Role-based dashboard (admin/user)
- ✅ Task management (CRUD + assign to users)
- ✅ SweetAlert notifications
- ✅ Dark mode toggle 🌙
- ✅ Mobile responsive layout 📱
- ✅ Export tasks to CSV/JSON
- ✅ Admin dashboard for user management
- ✅ User blocking (no task actions)
- ✅ Clean UI with Tailwind CSS

---

## 🛠️ Setup Instructions

1. Clone the repository
2. Set up environment variables:
    - `.env` for backend:
        ```
        MONGODB_URI=yourMongoURI
        JWT_SECRET=yourSecret
        PORT=3000
        ```
    - `.env` for frontend:
        ```
        VITE_API_URL=http://localhost:3000/api
        ```
3. Start backend:
    ```bash
    cd backend
    npm install
    npm start
    ```

4. Start frontend:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

## 📦 Production Deployment

- **Frontend:** Vercel
- **Backend:** Render
- Replace all localhost API URLs with environment variable `VITE_API_URL`

---

## 👨‍💻 Developer

Made with clarity, code, and caffeine by Bhaskar Banerjee ✨  
*Date generated: 2025-07-17 16:55:59*

---
