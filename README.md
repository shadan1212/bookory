# 📚 Bookory - Online Bookstore WebApp

Bookory is a full-stack Online Bookstore built with the MERN stack. It allows users to browse, search, and buy books, while admins can add and manage the inventory.

### 🏠 Homepage

![Homepage](./frontend/screenshots/homepage.png)

---

## 🚀 Features

### 👤 User Features

- User registration and login (JWT-based)
- Browse all books
- View book details
- Add books to cart
- Search/filter by title or author

### 🔐 Admin Features

- Admin login
- Add/update/delete books
- Role-based access control
- Protected admin routes (backend + frontend)

## 🛠️ Tech Stack

### Frontend

- React + Vite
- Tailwind CSS
- Zustand (state management)
- Axios

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT for Authentication
- Role-based Access Middleware
- Cloudinary for images

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/shadan1212/bookory.git
cd bookory
```

2. Install dependencies for both frontend and backend:

```bash
cd backend
npm install
cd ../frontend
npm install
```

3. Configure environment variables: Create a `.env` file in the backend directory with the following variables. Make sure you get your CLOUD_NAME, API_KEY and API_SECRET by signing on Cloudinary.

```bash
PORT = 5000
MONGO_URI=your_mongodb_uri
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_random_secret
CLOUD_NAME=cloudinary_cloud_name
API_KEY=cloudinary_apikey
API_SECRET=cloudinary_apisecret
```

4. Start the development servers:

For backend:

```bash
cd backend
npm run dev
```

For Frontend:

```bash
cd frontend
npm run dev
```

5. Open your browser and visit http://localhost:5173 to access Bookory.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add new feature"
```

4. Push to your branch:

```bash
git push origin feature-name
```

5. Open a pull request.
