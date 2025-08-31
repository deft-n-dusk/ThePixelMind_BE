# ⚡ The Pixel Mind Backend (API)

**The Pixel Mind Backend** is a Node.js + Express API that powers **The Pixel Mind App** – a full-featured e-commerce platform with user authentication, category and product management, and a shopping cart system.

This backend handles authentication, CRUD operations for products and categories, and cart management, and connects with **MongoDB Atlas** as the database.

---

## ✨ Features

- **JWT-based Authentication (with Cookies)**
  - Signup/Login system with secure token handling
  - Protected routes for authenticated users only

- **Category & Product Management**
  - Add, update, delete, and retrieve categories and products
  - Image validation and category reference handling

- **Cart Management**
  - Add, remove, and retrieve user cart items
  - Automatic quantity updates for existing products

- **Data Validation**
  - Strong validation for user input and product data
  - Password strength enforcement

- **Modular & Scalable Structure**
  - Clean separation of routes, models, middlewares, and utils

---

## 🛠️ Tech Stack

**Frontend:**
- React.js / Vite
- Tailwind CSS
- Redux 
- Axios 

**Backend:**
- Node.js + Express.js – Server & Routing
- MongoDB Atlas (via Mongoose)
- JWT (JSON Web Token) – Authentication
- Bcrypt – Password hashing
- Validator – Input validation
- Cookie-parser – Cookie handling
- dotenv – Environment variables
- CORS configured for frontend integration

**Tools & Deployment:**
- VSCode
- Postman for API testing
- Git & GitHub
- Vercel / Render (for deployment)

---

## 📂 Project Structure

ThePixelMind_BE/
│
├── config/
│ └── database.js # MongoDB connection
│
├── middlewares/
│ └── auth.js # JWT validation middleware
│
├── models/
│ ├── user.js # User schema
│ ├── product.js # Product schema
│ ├── category.js # Category schema
│ └── cart.js # Cart schema
│
├── routes/
│ ├── authRouter.js # Signup/Login/Logout routes
│ ├── authCheckRouter.js # Protected route to check authentication
│ ├── categoryRouter.js # CRUD routes for categories
│ ├── productRouter.js # CRUD routes for products
│ └── cartRouter.js # Routes to manage user's cart
│
├── utils/
│ └── validation.js # Input validation for users and products
│
├── app.js # Express app entry point
├── .env # Environment variables
├── package.json
└── package-lock.json



---

## ⚙️ Installation & Setup

1. **Clone the Backend**
```bash


