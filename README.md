# Velvora

Velvora is a full-stack ecommerce web application built with React, Node.js, Express, MongoDB, and Razorpay.

The project includes product browsing, authentication, cart management, wishlist, checkout, orders, stock management, and Razorpay payment integration.

## Features

### Frontend

- User registration and login
- JWT-based authentication
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

- RESTful APIs
- Express.js server
- MongoDB with Mongoose
- JWT authentication
- Password hashing with bcrypt
- Product CRUD operations
- Category APIs
- Cart APIs
- Wishlist APIs
- Order APIs
- User APIs
- Razorpay payment integration
- Razorpay payment signature verification
- Product stock management
- Error handling middleware
- 404 handling middleware

## Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- React Router
- React Toastify
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Razorpay

## Project Structure

```text
Ecommerce/
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
├── .gitignore
└── README.md