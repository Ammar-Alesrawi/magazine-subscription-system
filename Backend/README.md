# 📚 Digital Magazine Subscription Management System

A backend API to manage digital magazine subscriptions, users, publishers, payments, comments, and roles — built using **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**.

---

## 🚀 Features

- 🔐 Role-based access control (Admin, Publisher, Subscriber)
- 📚 Manage magazines, articles, and comments
- 💳 Handle subscriptions and payments
- 📈 Send periodic email reports to admin (using cron jobs)
- 🔒 JWT authentication & authorization middleware
- 🧾 Activity logging for user actions

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** + **Prisma ORM**
- **JWT** for secure authentication
- **bcrypt** for password hashing
- **node-cron** for scheduled jobs
- **nodemailer** for sending emails

---

## 📁 Project Structure

project/ │ └───Backend/ ├── config/ ├── controllers/ ├── routes/ ├── services/ ├── middlewares/ ├── utils/ └── app.js

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/Ammar-Alesrawi/magazine-subscription-system.git
cd project/Backend

### 2.  Install dependencies

npm install

### 3. Create a .env file

# Database configuration
DATABASE_URL="postgresql://postgres:your_db_password@localhost:5432/Magazine_db"
PORT="5000"

# Email configuration (used for sending reports)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_email_app_password"
EMAIL_FROM="your_email@gmail.com"
ADMIN_EMAIL="admin_email@gmail.com"

# JWT Secret
JWT_SECRET="your_super_secret_jwt_key"

### 4. Run development server

npm run dev


🔄 Cron Job
A cron job sends a report of active subscriptions and payment info to the admin email every day.

📌 For testing purposes, you can change the schedule to run every 10 seconds like this:

cron.schedule("*/10 * * * * *", () => {
  sendReportToAdmin();
});

Developed by Ammar

This project is a backend service only. You can integrate it with any frontend or mobile client.





