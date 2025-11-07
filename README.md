# EzyBuy – Mock E-Commerce Cart

## Overview
EzyBuy is a full-stack mock e-commerce cart application developed as part of the Vibe Commerce internship screening assignment.  
The project demonstrates full-stack integration between React (frontend) and Node.js with Express (backend).  
It allows users to browse products, add or remove items from the cart, view totals, and perform a mock checkout with a receipt.

## Features
- Display a list of mock products.
- Add or remove items from the cart.
- View the cart with item quantities and total price.
- Perform mock checkout and view a generated receipt.
- Simple responsive layout for desktop and mobile.
- REST API-based communication between frontend and backend.

## Tech Stack
**Frontend:** React (Vite), Axios  
**Backend:** Node.js, Express, CORS  
**Database:** Mock in-memory data

## Folder Structure
EzyBuy/
├── backend/
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
└── README.md

## API Endpoints
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/products` | Retrieve list of available products |
| POST | `/api/cart` | Add an item to the cart |
| GET | `/api/cart` | Retrieve cart items and total |
| DELETE | `/api/cart/:id` | Remove an item from the cart |
| POST | `/api/checkout` | Mock checkout returning total and timestamp |

## Installation & Setup

### Backend
```bash
cd backend
npm install
npm start
Runs on: http://localhost:5000

### Frontend
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

Demo Video
Watch Project Demo on Loom
https://www.loom.com/share/c3d1e0bdc85f43b293bea53a381795fb

## Screenshots
### Products Page and Cart Page
![Products Page and Cart](./screenshots/screenshot1.png)
### Checkout Form
![Checkout Form](./screenshots/screenshot2.png)
### Checkout Receipt
![Checkout Receipt](./screenshots/screenshot3.png)

Author
Name: Saksham Singh