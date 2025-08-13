# MongoDB Setup Instructions

## Option 1: Install MongoDB Locally (Recommended)

### Windows Installation:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service
5. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```

### Alternative: MongoDB Compass (GUI)
- Download MongoDB Compass for a visual interface
- Connect to: `mongodb://localhost:27017`

## Option 2: Use MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string
5. Update `backend/env.local` with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexture-education
   ```

## Option 3: Use Docker (If you have Docker installed)

```bash
# Run MongoDB in Docker container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Stop MongoDB container
docker stop mongodb

# Start MongoDB container
docker start mongodb
```

## Quick Start Commands

After MongoDB is running:

```bash
# Initialize database with sample data
cd backend
npm run init-db

# Start backend server
npm run dev

# In another terminal, start frontend
cd ..
npm start
```

## Verify Setup

1. Backend health check: http://localhost:5000/api/health
2. Frontend: http://localhost:3000
3. Test contact form and consultation booking

## Default Admin Credentials

- Email: admin@nexture-education.com
- Password: admin123

## Troubleshooting

- Ensure MongoDB is running on port 27017
- Check firewall settings
- Verify connection string in env.local
- Check MongoDB logs for errors
