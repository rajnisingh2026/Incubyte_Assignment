# 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop with user authentication, inventory management, and purchase functionality.

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Jest** & **Supertest** for testing

### Frontend
- **React** with React Router
- **Axios** for API calls
- **Context API** for state management
- **CSS3** for styling

## 📁 Project Structure

```
Incubyte/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js         # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js   # Authentication logic
│   │   │   └── sweetController.js  # Sweet CRUD operations
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── User.js             # User schema
│   │   │   └── Sweet.js            # Sweet schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # Auth endpoints
│   │   │   └── sweetRoutes.js      # Sweet endpoints
│   │   ├── tests/                  # Test files
│   │   └── server.js               # Express server setup
│   ├── .env                        # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/               # Login & Register components
│   │   │   ├── Dashboard/          # Dashboard components
│   │   │   └── Admin/              # Admin components
│   │   ├── context/
│   │   │   └── AuthContext.js      # Authentication context
│   │   ├── services/
│   │   │   └── api.js              # Axios configuration
│   │   ├── pages/
│   │   │   └── Dashboard.js        # Main dashboard page
│   │   └── App.js                  # Main app component
│   ├── .env                        # Frontend environment variables
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
cd Incubyte
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Make sure .env file exists with:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# NODE_ENV=development

# Start the backend server
npm start
# OR for development with auto-reload
npm run dev
```

#### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Make sure .env file exists with:
# REACT_APP_API_URL=http://localhost:5000/api

# Start the React app
npm start
```

The frontend will open automatically at `http://localhost:3000`

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm test
```

The test suite includes:
- ✅ User model validation tests
- ✅ Sweet model validation tests
- ✅ Authentication endpoint tests
- ✅ Sweet controller tests (CRUD operations)
- ✅ Purchase and restock functionality tests

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets (Protected Routes)
- `GET /api/sweets` - Get all sweets
- `POST /api/sweets` - Add a new sweet (Authenticated)
- `GET /api/sweets/search` - Search sweets with filters
- `PUT /api/sweets/:id` - Update a sweet (Authenticated)
- `DELETE /api/sweets/:id` - Delete a sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase a sweet (Authenticated)
- `POST /api/sweets/:id/restock` - Restock a sweet (Admin only)

## 👤 User Roles

### Regular User
- View all sweets
- Search and filter sweets
- Purchase sweets (if in stock)

### Admin User
- All regular user capabilities
- Add new sweets
- Update sweet information
- Delete sweets
- Restock inventory

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## ✅ Fixed Issues

1. **Test Configuration**: Added `dotenv` configuration to all test files to properly load environment variables
2. **File Structure**: Fixed corrupted `AddSweetModal.js` component
3. **Database Connection**: Ensured proper MongoDB connection in all test files
4. **Authentication**: JWT authentication middleware working correctly
5. **CORS**: Enabled CORS for frontend-backend communication

## 🎯 Features

- ✨ User authentication with JWT
- 🔒 Role-based access control (User/Admin)
- 📦 Inventory management
- 🔍 Search and filter functionality
- 🛒 Purchase system with stock validation
- 📊 Real-time stock updates
- 📱 Responsive design

## 📸 Testing the Application

1. **Register a new user** at `/register`
2. **Login** with your credentials at `/login`
3. **View sweets** in the dashboard
4. **Search** for specific sweets
5. **Purchase** sweets (reduces inventory)
6. **Admin**: Add, update, delete, and restock sweets

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Check your `MONGODB_URI` in the `.env` file
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify network connection

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Verify CORS is enabled in backend

### Tests failing
- Ensure MongoDB connection is active
- Check `.env` file exists in backend directory
- Run `npm install` to ensure all dependencies are installed

## 📄 License

ISC

## 👨‍💻 Development

- Run backend: `cd backend && npm run dev`
- Run frontend: `cd frontend && npm start`
- Run tests: `cd backend && npm test`

---

**Made with ❤️ for Incubyte**
