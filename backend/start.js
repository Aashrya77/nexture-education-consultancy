const fs = require('fs');
const path = require('path');

// Check if .env file exists, if not copy from env.local
const envPath = path.join(__dirname, '.env');
const envLocalPath = path.join(__dirname, 'env.local');

if (!fs.existsSync(envPath) && fs.existsSync(envLocalPath)) {
  fs.copyFileSync(envLocalPath, envPath);
  console.log('✅ Environment file created from env.local');
}

// Start the server
require('./server.js');
