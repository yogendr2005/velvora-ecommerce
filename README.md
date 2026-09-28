# Velvora - Full-Stack Ecommerce App

A full-stack ecommerce application built with **React, Node.js, Express, MongoDB and Razorpay**.

🌐 **Live Demo:** https://velvoraecommerce.netlify.app  
⚙️ **Backend API:** https://velvora-ecommerce-1.onrender.com  
💻 **GitHub:** https://github.com/yogendr2005/velvora-ecommerce

> The backend is deployed on Render's free tier and may take a few seconds to wake up when it receives its first request.

---

## 📸 Screenshots

### Home

![Velvora Home](screenshots/home.png)

### Product Details

![Velvora Product Details](screenshots/product-details.png)

### Shopping Cart

![Velvora Shopping Cart](screenshots/cart.png)

### Checkout

![Velvora Checkout](screenshots/checkout.png)

> Screenshots are stored in the `screenshots/` directory.

---

## ✨ Features

### Frontend

- User registration and login
- JWT-based authentication
- Current user authentication
- Product listing
- Product search
- Category filtering
- Product details
- Shopping cart
- Product quantity management
- Wishlist
- Checkout
- Cash on Delivery
- Razorpay Card and UPI payments
- Order history
- User profile
- Responsive ecommerce UI
- Toast notifications
- Loading states

### Backend

- RESTful APIs with Express.js
- MongoDB with Mongoose
- JWT authentication
- Password hashing with bcrypt
- Product CRUD operations
- Category management
- Cart management
- Wishlist management
- Order management
- User profile management
- Razorpay payment integration
- Razorpay payment signature verification
- Product stock management
- Centralized error handling
- 404 handling middleware

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Redux Toolkit, React Router, React Toastify, React Icons |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Razorpay |
| Database | MongoDB |
| Payments | Razorpay |
| Frontend Deployment | Netlify |
| Backend Deployment | Render |

---

## 📁 Project Structure

```text
velvora-ecommerce/
│
├── backEnd/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeds/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontEnd/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── index.html
│
├── screenshots/
│   ├── home.png
│   ├── product-details.png
│   ├── cart.png
│   └── checkout.png
│
├── .gitignore
└── README.md
