# ⚡ The Pixel Mind Backend (API)

The Pixel Mind Backend is a Node.js + Express API that powers The Pixel Mind App – a full-featured e-commerce platform with user authentication, category and product management, and a shopping cart system. This backend handles authentication, CRUD operations for products and categories, and cart management, and connects with MongoDB Atlas as the database.

---

## ✨ Features

**JWT-based Authentication (with Cookies)**
- Signup/Login system with secure token handling
- Protected routes for authenticated users only

**Category & Product Management**
- Add, update, delete, and retrieve categories and products
- Image validation and category reference handling

**Cart Management**
- Add, remove, and retrieve user cart items
- Automatic quantity updates for existing products

**Data Validation**
- Strong validation for user input and product data
- Password strength enforcement

**Modular & Scalable Structure**
- Clean separation of routes, models, middlewares, and utils

---

## 🛠️ Tech Stack

**Frontend:** React.js / Vite, Tailwind CSS, Redux, Axios  
**Backend:** Node.js + Express.js, MongoDB Atlas (Mongoose), JWT, Bcrypt, Validator, Cookie-parser, dotenv, CORS configured  
**Tools & Deployment:** VSCode, Postman, Git & GitHub, Vercel / Render  

---

## 📂 Project Structure

ThePixelMind_BE/
├── config/
│ └── database.js # MongoDB connection
├── middlewares/
│ └── auth.js # JWT validation middleware
├── models/
│ ├── user.js # User schema
│ ├── product.js # Product schema
│ ├── category.js # Category schema
│ └── cart.js # Cart schema
├── routes/
│ ├── authRouter.js # Signup/Login/Logout routes
│ ├── authCheckRouter.js # Protected route to check authentication
│ ├── categoryRouter.js # CRUD routes for categories
│ ├── productRouter.js # CRUD routes for products
│ └── cartRouter.js # Routes to manage user's cart
├── utils/
│ └── validation.js # Input validation for users and products
├── app.js # Express app entry point
├── .env # Environment variables
├── package.json
└── package-lock.json

yaml
Copy code

---

## ⚙️ Installation & Setup

1. **Clone the Backend**
```bash
git clone https://github.com/deft-n-dusk/ThePixelMind_BE.git
cd ThePixelMind_BE
Install dependencies

bash
Copy code
npm install
Setup environment variables
Create a .env file in the root directory with:

ini
Copy code
PORT=2713
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start backend server

bash
Copy code
npm start
# or for development with auto-reload
npm run dev
Access backend

Default URL: http://localhost:2713

🌐 Live Demo
Frontend: The Pixel Mind Live

📂 Repositories
Frontend: GitHub - Frontend

Backend: GitHub - Backend

📝 API Endpoints
Auth Routes
Method	Endpoint	Description	Request Body
POST	/signup	Register a new user	firstName, lastName, emailId, password
POST	/login	Login user	emailId, password
POST	/logout	Logout user	None
GET	/check	Check authentication (protected)	None

Category Routes (Protected)
Method	Endpoint	Description	Request Body
POST	/category/add	Add new category	name, description
GET	/category/all	Get all categories	None
GET	/category/:id	Get category by ID	None
PATCH	/category/update/:id	Update category by ID	name and/or description
DELETE	/category/delete/:id	Delete category by ID	None

Product Routes (Protected)
Method	Endpoint	Description	Request Body
POST	/product/add	Add new product	title, price, description, categoryId, imageURL
GET	/products	Get all products	None
GET	/product/:id	Get product by ID	None
PATCH	/product/:id	Update product by ID	title, price, description, category, imageURL
DELETE	/product/:id	Delete product by ID	None

Cart Routes (Protected)
Method	Endpoint	Description	Request Body
POST	/cart/add	Add item to cart	productId, quantity
DELETE	/cart/remove/:productId	Remove item from cart	None
GET	/cart	Get current user's cart	None

