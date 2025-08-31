# ⚡ The Pixel Mind Backend

The Pixel Mind Backend is a Node.js + Express API that powers The Pixel Mind App – a full-featured e-commerce platform with user authentication, category and product management, and a shopping cart system.

This backend handles authentication, CRUD operations for products and categories, and cart management, and connects with MongoDB Atlas as the database.

## 🌐 Live Demo

**Frontend:** [The Pixel Mind Live](https://the-pixel-mind-fe.vercel.app/)

## 📂 Repositories

**Frontend:** [GitHub - Frontend](https://github.com/deft-n-dusk/ThePixelMind-Frontend)  
**Backend:** [GitHub - Backend](https://github.com/deft-n-dusk/ThePixelMind-Backend)

## ✨ Features

### JWT-based Authentication (with Cookies)
- Signup/Login system with secure token handling
- Protected routes for authenticated users only

### Category & Product Management
- Add, update, delete, and retrieve categories and products
- Image validation and category reference handling

### Cart Management
- Add, remove, and retrieve user cart items
- Automatic quantity updates for existing products

### Data Validation
- Strong validation for user input and product data
- Password strength enforcement

### Modular & Scalable Structure
- Clean separation of routes, models, middlewares, and utils

## 🛠️ Tech Stack

**Frontend:**
- React.js / Vite
- Tailwind CSS
- Redux
- Axios

**Backend:**
- Node.js + Express.js
- MongoDB Atlas (via Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- Validator for input validation
- Cookie-parser for cookie handling
- dotenv for environment variables
- CORS configured for frontend integration

**Tools & Deployment:**
- VSCode
- Postman
- Git & GitHub
- Vercel / Render

## 📂 Project Structure

```text
ThePixelMind_BE/
├── config/
│   └── database.js           # MongoDB connection
├── middlewares/
│   └── auth.js               # JWT validation middleware
├── models/
│   ├── user.js               # User schema
│   ├── product.js            # Product schema
│   ├── category.js           # Category schema
│   └── cart.js               # Cart schema
├── routes/
│   ├── authRouter.js         # Signup/Login/Logout routes
│   ├── authCheckRouter.js    # Protected route to check authentication
│   ├── categoryRouter.js     # CRUD routes for categories
│   ├── productRouter.js      # CRUD routes for products
│   └── cartRouter.js         # Routes to manage user's cart
├── utils/
│   └── validation.js         # Input validation for users and products
├── app.js                    # Express app entry point
├── .env                      # Environment variables
├── package.json
└── package-lock.json


## ⚙️ Installation & Setup

### Clone the Backend
```bash
git clone https://github.com/deft-n-dusk/ThePixelMind_BE.git
cd ThePixelMind_BE

Install dependencies
bash
npm install

Setup environment variables
Create a .env file in the root directory with the following:
PORT=2713
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start backend server
bash
npm start



# 📡 The Pixel Mind Backend - API Endpoints

This document contains all available API endpoints for **The Pixel Mind Backend**, which powers the **The Pixel Mind App** – an e-commerce platform with authentication, product, category, and cart management.

---

## 🔑 Authentication Routes

| Method | Endpoint       | Description                              | Auth Required | Request Body |
|--------|---------------|------------------------------------------|--------------|--------------|
| `POST` | `/signup`     | Register a new user                      | ❌ No        | `firstName`, `lastName`, `emailId`, `password` |
| `POST` | `/login`      | Login user and get token                 | ❌ No        | `emailId`, `password` |
| `POST` | `/logout`     | Logout user (clear auth cookie)          | ✅ Yes       | None         |
| `GET`  | `/check`      | Check if user is authenticated           | ✅ Yes       | None         |

---

## 🏷️ Category Routes

| Method | Endpoint                      | Description                     | Auth Required | Request Body |
|--------|------------------------------|--------------------------------|--------------|--------------|
| `POST` | `/category/add`              | Add a new category             | ✅ Yes       | `name`, `description` |
| `GET`  | `/category/all`              | Get all categories             | ✅ Yes       | None         |
| `GET`  | `/category/:id`              | Get category by ID             | ✅ Yes       | None         |
| `PATCH`| `/category/update/:id`       | Update category by ID          | ✅ Yes       | `name`, `description` |
| `DELETE`| `/category/delete/:id`      | Delete category by ID          | ✅ Yes       | None         |

---

## 🛒 Product Routes

| Method | Endpoint               | Description                           | Auth Required | Request Body |
|--------|----------------------|-------------------------------------|--------------|--------------|
| `POST` | `/product/add`       | Add a new product                   | ✅ Yes       | `title`, `price`, `description`, `categoryId`, `imageURL` |
| `GET`  | `/products`          | Get all products (with category)    | ✅ Yes       | None         |
| `GET`  | `/product/:id`       | Get product by ID                   | ✅ Yes       | None         |
| `PATCH`| `/product/:id`       | Update product by ID                | ✅ Yes       | `title`, `price`, `description`, `category`, `imageURL` |
| `DELETE`| `/product/:id`      | Delete product by ID                | ✅ Yes       | None         |

---

## 🛍️ Cart Routes

| Method | Endpoint                      | Description                              | Auth Required | Request Body |
|--------|------------------------------|------------------------------------------|--------------|--------------|
| `POST` | `/cart/add`                  | Add an item to cart                      | ✅ Yes       | `productId`, `quantity` |
| `GET`  | `/cart`                      | Get logged-in user's cart                | ✅ Yes       | None         |
| `DELETE`| `/cart/remove/:productId`   | Remove an item from cart by product ID   | ✅ Yes       | None         |

---
