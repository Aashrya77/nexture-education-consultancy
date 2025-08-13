# Nexture Education - Full-Stack React Application

A comprehensive education consultancy platform built with React.js frontend and Node.js/Express/MongoDB backend.

## 🚀 Features

### Frontend (React SPA)
- **Modern UI/UX**: Professional design with custom CSS (no Tailwind)
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **Interactive Pages**: 
  - Homepage with hero, stats, features, testimonials
  - About page with company story, values, team
  - Study Abroad page with country explorer
  - Test Preparation page with detailed course info
  - Blog page with filtering and search
  - Contact page with comprehensive form
  - Consultation booking with multi-step wizard

### Backend (Node.js/Express/MongoDB)
- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT-based auth with role-based access
- **Database Models**: Contact, Consultation, Blog, User
- **Email Integration**: Automated notifications and confirmations
- **Admin Dashboard**: User management, analytics, reports
- **Security**: Rate limiting, CORS, input validation

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router v6
- Custom CSS with CSS Variables
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer for emails
- Express Validator
- Helmet for security

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

1. **Clone and Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

2. **Environment Configuration**
   ```bash
   # Copy environment files
   cp env.local .env.local
   cp backend/env.local backend/.env
   
   # Update MongoDB connection in backend/.env
   MONGODB_URI=mongodb://localhost:27017/nexture-education
   ```

3. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in backend/.env
   ```

4. **Initialize Database**
   ```bash
   cd backend
   npm run init-db
   ```

5. **Start Servers**
   ```bash
   # Option 1: Use setup script (recommended)
   node setup-fullstack.js
   
   # Option 2: Manual start
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   npm start
   ```

### Application URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🗄️ Database Setup

### MongoDB Options

1. **Local MongoDB**
   - Install MongoDB Community Server
   - Start service: `net start MongoDB` (Windows)
   - Connect to: `mongodb://localhost:27017`

2. **MongoDB Atlas (Cloud)**
   - Create free account at mongodb.com/atlas
   - Create cluster and get connection string
   - Update `MONGODB_URI` in backend/.env

3. **Docker**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

### Sample Data
The `npm run init-db` command creates:
- Admin user (admin@nexture-education.com / admin123)
- Sample counselor users
- Sample blog posts

## 🔐 Authentication

### Default Admin Credentials
- **Email**: admin@nexture-education.com
- **Password**: admin123

### User Roles
- **Admin**: Full access to all features
- **Counselor**: Consultation management
- **Staff**: Basic access

## 📡 API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/consultation` - Book consultation
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:slug` - Get single blog post
- `POST /api/auth/login` - User login

### Protected Endpoints (Admin)
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - User management
- `GET /api/contact` - Contact management
- `GET /api/consultation` - Consultation management

## 🎨 Frontend Structure

```
src/
├── components/           # Reusable components
│   ├── Header.js
│   ├── Footer.js
│   └── ui/              # UI components
├── pages/               # Page components
│   ├── HomePage.js
│   ├── AboutPage.js
│   ├── ContactPage.js
│   └── ConsultationPage.js
├── services/            # API service layer
│   └── api.js
└── App.js              # Main app component
```

## 🔧 Backend Structure

```
backend/
├── models/             # MongoDB models
│   ├── User.js
│   ├── Contact.js
│   ├── Consultation.js
│   └── Blog.js
├── routes/             # API routes
│   ├── auth.js
│   ├── contact.js
│   ├── consultation.js
│   ├── blog.js
│   └── admin.js
├── middleware/         # Custom middleware
│   └── auth.js
├── utils/              # Utility functions
│   └── email.js
└── server.js          # Express server
```

## 🧪 Testing the Integration

1. **Contact Form**
   - Visit http://localhost:3000/contact
   - Fill and submit the form
   - Check backend logs for API calls

2. **Consultation Booking**
   - Visit http://localhost:3000/consultation
   - Complete the multi-step form
   - Verify email notifications (if configured)

3. **Blog System**
   - Visit http://localhost:3000/blog
   - Browse posts and categories
   - Test search functionality

4. **Admin Features** (requires MongoDB)
   - Login with admin credentials
   - Access admin dashboard
   - Manage contacts and consultations

## 📧 Email Configuration

Update `backend/.env` with your email settings:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@nexture-education.com
```

## 🚀 Deployment

### Frontend (React)
```bash
npm run build
# Deploy build/ folder to hosting service
```

### Backend (Node.js)
```bash
# Set production environment
NODE_ENV=production

# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name "nexture-backend"
```

### Environment Variables (Production)
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure production MongoDB URI
- Set up email service credentials

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check connection string
   - Verify network connectivity

2. **CORS Errors**
   - Check `FRONTEND_URL` in backend/.env
   - Verify API base URL in frontend

3. **Email Not Sending**
   - Configure email credentials
   - Check spam folders
   - Verify SMTP settings

4. **Port Already in Use**
   - Change PORT in backend/.env
   - Update API_URL in frontend

## 📝 Development Notes

- Frontend runs on port 3000
- Backend runs on port 5000
- MongoDB default port 27017
- All forms include validation
- API responses follow consistent format
- Error handling implemented throughout

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

---

**Nexture Education** - Empowering students to achieve their international education dreams! 🎓
