const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Nexture Education Full-Stack Setup\n');

// Check if environment files exist
const checkEnvFiles = () => {
  const frontendEnv = path.join(__dirname, 'env.local');
  const backendEnv = path.join(__dirname, 'backend', 'env.local');
  
  console.log('📋 Checking environment configuration...');
  
  if (fs.existsSync(frontendEnv)) {
    console.log('✅ Frontend environment file found');
  } else {
    console.log('❌ Frontend environment file missing');
  }
  
  if (fs.existsSync(backendEnv)) {
    console.log('✅ Backend environment file found');
  } else {
    console.log('❌ Backend environment file missing');
  }
  
  console.log('');
};

// Start backend server
const startBackend = () => {
  return new Promise((resolve, reject) => {
    console.log('🔧 Starting backend server...');
    
    const backend = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, 'backend'),
      stdio: 'pipe',
      shell: true
    });
    
    backend.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[Backend] ${output.trim()}`);
      
      if (output.includes('Server is running on port')) {
        console.log('✅ Backend server started successfully\n');
        resolve(backend);
      }
    });
    
    backend.stderr.on('data', (data) => {
      const error = data.toString();
      console.error(`[Backend Error] ${error.trim()}`);
      
      if (error.includes('ECONNREFUSED') || error.includes('MongoDB')) {
        console.log('⚠️  MongoDB connection failed - Backend will run in limited mode');
        console.log('📖 See backend/MONGODB_SETUP.md for MongoDB setup instructions\n');
        resolve(backend);
      }
    });
    
    backend.on('error', (error) => {
      console.error('❌ Failed to start backend:', error);
      reject(error);
    });
    
    // Timeout after 10 seconds
    setTimeout(() => {
      console.log('⏰ Backend startup timeout - continuing anyway\n');
      resolve(backend);
    }, 10000);
  });
};

// Start frontend server
const startFrontend = () => {
  return new Promise((resolve, reject) => {
    console.log('🎨 Starting frontend server...');
    
    const frontend = spawn('npm', ['start'], {
      cwd: __dirname,
      stdio: 'pipe',
      shell: true
    });
    
    frontend.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[Frontend] ${output.trim()}`);
      
      if (output.includes('webpack compiled') || output.includes('Local:')) {
        console.log('✅ Frontend server started successfully\n');
        resolve(frontend);
      }
    });
    
    frontend.stderr.on('data', (data) => {
      const error = data.toString();
      if (!error.includes('Warning')) {
        console.error(`[Frontend Error] ${error.trim()}`);
      }
    });
    
    frontend.on('error', (error) => {
      console.error('❌ Failed to start frontend:', error);
      reject(error);
    });
    
    // Timeout after 30 seconds
    setTimeout(() => {
      console.log('⏰ Frontend startup timeout - check manually\n');
      resolve(frontend);
    }, 30000);
  });
};

// Main setup function
const setupFullStack = async () => {
  try {
    checkEnvFiles();
    
    console.log('🔄 Installing dependencies...\n');
    
    // Install frontend dependencies
    console.log('📦 Installing frontend dependencies...');
    await new Promise((resolve, reject) => {
      const npmInstall = spawn('npm', ['install'], {
        cwd: __dirname,
        stdio: 'inherit',
        shell: true
      });
      
      npmInstall.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Frontend dependencies installed\n');
          resolve();
        } else {
          reject(new Error('Frontend npm install failed'));
        }
      });
    });
    
    // Install backend dependencies
    console.log('📦 Installing backend dependencies...');
    await new Promise((resolve, reject) => {
      const npmInstall = spawn('npm', ['install'], {
        cwd: path.join(__dirname, 'backend'),
        stdio: 'inherit',
        shell: true
      });
      
      npmInstall.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Backend dependencies installed\n');
          resolve();
        } else {
          reject(new Error('Backend npm install failed'));
        }
      });
    });
    
    // Start servers
    const backend = await startBackend();
    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
    const frontend = await startFrontend();
    
    console.log('🎉 Full-stack application is running!\n');
    console.log('📍 Application URLs:');
    console.log('   Frontend: http://localhost:3000');
    console.log('   Backend:  http://localhost:5000');
    console.log('   API:      http://localhost:5000/api/health\n');
    
    console.log('🧪 Test the integration:');
    console.log('   1. Visit http://localhost:3000');
    console.log('   2. Try the Contact form');
    console.log('   3. Try booking a Consultation');
    console.log('   4. Check the browser console for API calls\n');
    
    console.log('⚠️  Note: If MongoDB is not running, forms will show errors.');
    console.log('📖 See backend/MONGODB_SETUP.md for database setup.\n');
    
    console.log('🛑 Press Ctrl+C to stop both servers');
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down servers...');
      backend.kill();
      frontend.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
};

// Run setup
setupFullStack();
