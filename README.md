# Multi-Provider Centralized Authentication System

A **MERN stack authentication system** that demonstrates how **Node.js integrates with MongoDB** to manage a centralized user identity while supporting multiple authentication providers.

This project allows users to register and login using:

* Email + Password
* Google OAuth
* GitHub OAuth
* Microsoft OAuth

All authentication providers are linked to **one centralized user record in MongoDB**, demonstrating how backend logic manages multiple identity providers.

---

# Tech Stack

**Frontend**

* React (Vite)
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

**OAuth Providers**

* Google OAuth
* GitHub OAuth
* Microsoft OAuth

**Email Service**

* Resend (for email verification)

---

# Project Architecture

```
client/
 ├── src/
 │   ├── pages/
 │   ├── api/
 │   └── components/

server/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── models/
 ├── utils/
 └── config/
```

The backend follows a modular structure separating:

* Controllers (business logic)
* Routes (API endpoints)
* Middleware (authentication)
* Models (MongoDB schemas)
* Utilities (OAuth logic, token generation)

---

# Features

## Email Authentication

* User registration with username, email and password
* Email verification using **Resend**
* Secure password hashing with **bcrypt**
* Login using **email or username**

## OAuth Authentication

Users can authenticate using:

* Google
* GitHub
* Microsoft

OAuth authentication automatically:

* Creates a new user if the email does not exist
* Prompts account linking if the email already exists
* Redirects to username setup if profile is incomplete

---

# Username Onboarding

OAuth users are created without a username initially.

After authentication, users are redirected to:

```
/choose-username
```

This ensures every user has a unique username before accessing the system.

---

# Centralized User Identity

All authentication providers are stored in a **single MongoDB document**.

Example user document:

```json
{
  "email": "user@example.com",
  "username": "devil",
  "providers": {
    "local": { "passwordHash": "..." },
    "google": { "googleId": "123" },
    "github": { "githubId": "456" },
    "microsoft": { "microsoftId": "789" }
  }
}
```

This allows a single user account to support multiple login methods.

---

# Linked Accounts

The profile page displays which authentication providers are connected to the user account.

Example:

```
Email / Password   ✓
Google             ✓
GitHub             ✗
Microsoft          ✓
```

This demonstrates the centralized multi-provider architecture.

---

# API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-email
POST /api/auth/set-username
POST /api/auth/link-oauth
```

## OAuth

```
GET /api/auth/google
GET /api/auth/google/callback

GET /api/auth/github
GET /api/auth/github/callback

GET /api/auth/microsoft
GET /api/auth/microsoft/callback
```

## User

```
GET /api/user/profile
```

Requires:

```
Authorization: Bearer <token>
```

---

# Installation

Clone the repository:

```
git clone https://github.com/your-username/multi-provider-centralized-authentication-system.git
```

Install dependencies:

### Backend

```
cd server
npm install
```

### Frontend

```
cd client
npm install
```

---

# Environment Variables

Create `.env` inside the `server` folder.

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

FRONTEND_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

RESEND_API_KEY=
```

---

# Running the Project

Start backend:

```
cd server
npm run dev
```

Start frontend:

```
cd client
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

Backend runs on:

```
http://localhost:5000
```

---

# Learning Purpose

This project demonstrates:

* Node.js integration with MongoDB
* Secure authentication architecture
* OAuth integration with multiple providers
* Centralized user identity management
* JWT-based authentication

---

# Author

Karan
