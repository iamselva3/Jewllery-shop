# Jewllery-shop


🧠 Tech Stack

Frontend: React, React Router, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose

Others: dotenv, cors

Access the App :

Client App: http://localhost:3000

Backend API: http://localhost:5000

🔧 Admin Panel
The Admin has full control over the product inventory. Admin functionalities include:

Create Products: Add new products with details such as name, price, description, etc.

Read Products: View a list of all available products.

Update Products: Modify product information when needed.

Delete Products: Remove products from the catalog.

This allows the admin to fully manage the store from the backend interface.

🛍️ Client Side
The Client (user) side is built for customer interaction. Users can:

View All Products: Browse a catalog of items with images and prices.

Search Products: Use a search bar to quickly find desired products.

Add to Cart: Add selected products to a shopping cart.

The frontend offers a smooth and responsive shopping experience, giving users easy access to the product list and shopping features.

🔐 Authentication (JWT)
JWT (JSON Web Tokens) is used for secure authentication.

When users (admin or client) log in, a JWT token is issued.

The token is stored and sent with requests to protect private routes.

This ensures only authorized users can access admin features like adding or deleting products.

💡 Highlights
🔐 Secure login with JWT

🔄 Full CRUD operations for products

👥 Role-based access (Admin vs Client)

📦 Clean UI with user-friendly navigation


Instructions For local run:

Front end :
npm start 

Back end:
node /index.js

Database:

you should change the port number on .env file 8000 ---> 7000


