# Inventory Management System

A full-stack inventory management application for adding, viewing, editing, and deleting product records. The application uses a React and Vite frontend, an Express and Node.js backend, and MongoDB through Mongoose.

## Features

- Add products with a name, category, price, quantity, and minimum stock value.
- Display saved products in a table sorted by newest creation date first.
- Edit an existing product from the product table.
- Delete products after confirmation.
- Retrieve products whose quantity is less than or equal to their minimum stock value through the low-stock API endpoint.
- Validate required product fields and non-negative numeric values through the Mongoose schema and frontend form inputs.

The current frontend does not display a separate low-stock view; the low-stock functionality is available through the backend API and frontend service function.

## Technologies Used

### Frontend

- React 19
- Vite
- Axios
- JavaScript (JSX)
- CSS

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- CORS
- dotenv
- Nodemon for development

## Project Structure

```text
Inventory Management System/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── Controllers/
│   │   └── productController.js  # Product request handlers
│   ├── models/
│   │   └── Product.js            # Product Mongoose schema
│   ├── routes/
│   │   └── productRoutes.js      # Product API routes
│   ├── .env                      # Local backend configuration
│   ├── package.json
│   └── server.js                 # Express application entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductList.jsx
│   │   ├── services/
│   │   │   └── productService.js # Axios API calls
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## How the Application Works

1. The backend loads environment variables and connects to MongoDB when the server starts.
2. Express exposes the product routes under `/products` and accepts JSON request bodies.
3. The React frontend runs through Vite and communicates with the backend using Axios at `http://localhost:5000/products`.
4. The product form converts price, quantity, and minimum stock values to numbers before sending them to the API.
5. The product table loads products when it mounts and refreshes after an update or deletion.
6. Mongoose validates product data before it is stored in MongoDB.

## Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Community Server running locally, or access to a MongoDB deployment
- A web browser

## Installation

Clone or download the project, then install dependencies separately for the backend and frontend:

```bash
cd "Inventory Management System/backend"
npm install

cd "../frontend"
npm install
```

## Environment Variables and `.env` Setup

Create a file named `.env` inside the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/product
```

`PORT` controls the backend port. If it is not provided, the server uses port `5000`. `MONGO_URI` is the MongoDB connection string used by Mongoose.

Do not upload `.env` to GitHub. It may contain database credentials or other private configuration. The backend `.gitignore` already excludes this file.

The frontend currently uses the fixed backend URL `http://localhost:5000/products` in `frontend/src/services/productService.js`; no frontend `.env` variable is required by the current implementation.

## MongoDB Setup

1. Install MongoDB Community Server, or use an existing MongoDB deployment.
2. Start the MongoDB service.
3. Confirm that the connection string in `backend/.env` points to the correct MongoDB instance.
4. The application connects to the `product` database from the example URI. Mongoose creates the database and product collection when product data is first stored.

## Running the Backend

From the `backend` directory:

```bash
npm run dev
```

This starts the server with Nodemon. To run without automatic restarts, use:

```bash
npm start
```

The backend is available at `http://localhost:5000` by default. Visiting the root URL returns `Inventory Management API is running`.

## Running the Frontend

From the `frontend` directory:

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`. The backend should be running first so the product requests can succeed.

## API Endpoints

The API base URL is `http://localhost:5000` by default.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Check that the API is running. |
| `POST` | `/products` | Create a product. |
| `GET` | `/products` | Get all products, newest first. |
| `GET` | `/products/low-stock` | Get products where `quantity <= minStock`. |
| `PUT` | `/products/:id` | Update a product by MongoDB ID. |
| `DELETE` | `/products/:id` | Delete a product by MongoDB ID. |

### Product Request Body

`POST /products` and `PUT /products/:id` accept JSON such as:

```json
{
	"name": "Wireless Mouse",
	"category": "Electronics",
	"price": 25.99,
	"quantity": 12,
	"minStock": 5
}
```

## CRUD Operations

- **Create:** `POST /products` stores a new product and returns status `201`.
- **Read:** `GET /products` returns all products. `GET /products/low-stock` returns products at or below their minimum stock.
- **Update:** `PUT /products/:id` updates a product and returns the updated record.
- **Delete:** `DELETE /products/:id` removes a product.

Products contain the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `name` | String | Required product name. |
| `category` | String | Required product category. |
| `price` | Number | Required, minimum value `0`. |
| `quantity` | Number | Required, minimum value `0`. |
| `minStock` | Number | Required, minimum value `0`. |
| `createdAt` | Date | Automatically assigned when the product is created. |

## Future Enhancements

Potential improvements for future versions include:

- Add a visible low-stock section or filter to the frontend.
- Move the frontend API URL into a frontend environment variable.
- Add authentication and role-based access control.
- Add search, filtering, and pagination for larger product lists.
- Improve form and API error messages for invalid input.
- Add automated frontend and backend tests.
- Add product images, suppliers, and stock movement history.
