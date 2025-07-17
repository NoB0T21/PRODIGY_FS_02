# 🧑‍💼 Employee Management System

A simple and responsive Employee Management web application built with **Next.js**, **Node.js**, and **TypeScript**, supporting basic **CRUD operations**. This project allows an admin to manage employee records, including image uploads using Supabase.

## 🔗 Live Demo

**🌐 Deployed on Vercel**: [Click here to view](https://employeemanagement-sage.vercel.app)

---

## ✨ Features

- 📄 Create, Read, Update, Delete (CRUD) operations for employees
- 🖼 Upload and display employee images via Supabase CDN
- 🔐 Admin authentication
- 💻 Fully responsive (mobile + desktop)
- 🚀 Deployed on Vercel for fast global access

---

## 🛠 Tech Stack

| Tech         | Purpose                       |
|--------------|-------------------------------|
| Next.js      | Frontend framework            |
| TypeScript   | Type safety for both FE & BE  |
| Node.js      | Backend API with Express      |
| Tailwind CSS | Styling framework             |
| MongoDB      | Employee data storage         |
| Supabase     | Image upload & CDN delivery   |

---

## 🔐 Admin Login

Use the following credentials to log in:

```text
Email: admin@gmail.com
Password: pass-123
```

## 📸 Image Uploads
Employee photos are uploaded to Supabase Storage.
Images are served via CDN for performance.
Preview available before uploading.

## 📦 Installation
1. **Download the project files** and open them in your code editor.
2. **Configure Backend `.env` File**
   - In the `backend` folder, create a `.env` file with the following:
     ```env
     PORT=4000
     SECRET_KEY=your_secret_here
     MONGO_URL=your_mongodb_url/employee_management
     SUPABASE_KEY=your_supabase_key
     SUPABASE_URL=your_supabase_url
     BUCKET=your_Bucket_name
     CLIENT_URL=http://localhost:3000
     ```
   - **Do NOT** share this file publicly.

✅ **Backend is now configured!**

2. **Configure Frontend `.env` File**
   - In the `frontend` folder, create a `.env` file with the following:
     ```env
     NEXT_PUBLIC_BASE_URL=http://localhost:4000
     ```
   - **Do NOT** share this file publicly.

✅ **Frontend is now configured!**

3. **install Dependencies**
     ```terminal
    npm install
    # or
    yarn install
     ```

3. **Run Project**

    open terminal in backend folder
     ```terminal
    npm start
     ```
     open terminal in frontend folder
     ```terminal
    npm run dev
    ```
## 🗂 Project Structure
```Project Structure
.
├── app/                  # Next.js app router pages
│   ├── login/            # Admin login page
│   ├── employees/        # CRUD interface
├── components/           # Reusable UI components
├── lib/                  # Utility helpers
├── public/               # Static assets
├── .env                  # Environment variables
└── ...
```

## 🙋‍♂️ Author
**Aryan Gawade**
- 🔗 [LinkedIn](https://www.linkedin.com/in/aryan-gawade-3723672ab/)
- 🔗 [GitHub URL](https://github.com/NoB0T21)