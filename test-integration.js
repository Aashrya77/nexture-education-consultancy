const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

console.log('🧪 Nexture Education - Full-Stack Integration Test\n');

const API_BASE = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:3000';

// Test data
const testContact = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@test.com',
  phone: '+1-555-0123',
  country: 'United States',
  subject: 'Test Contact Form',
  serviceType: 'study-abroad',
  urgency: 'medium',
  message: 'This is a test message from the integration test.'
};

const testConsultation = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@test.com',
  phone: '+1-555-0124',
  country: 'Canada',
  currentEducation: 'bachelors-completed',
  interestedCountries: ['United States', 'Canada'],
  timeline: '1year',
  budget: '40k-60k',
  serviceType: 'study-abroad',
  preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
  preferredTime: '2:00 PM',
  communicationMode: 'video',
  currentStatus: 'researching',
  message: 'This is a test consultation booking.'
};

// Helper function to make API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const result = await response.json();
    
    return {
      status: response.status,
      success: response.ok,
      data: result
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
};

// Test functions
const testHealthCheck = async () => {
  console.log('🔍 Testing backend health check...');
  const result = await apiRequest('/health');
  
  if (result.success) {
    console.log('✅ Backend health check passed');
    console.log(`   Status: ${result.data.status}`);
    console.log(`   Environment: ${result.data.environment}`);
  } else {
    console.log('❌ Backend health check failed');
    console.log(`   Error: ${result.error || 'Unknown error'}`);
  }
  
  return result.success;
};

const testContactAPI = async () => {
  console.log('\n📧 Testing contact form API...');
  const result = await apiRequest('/contact', 'POST', testContact);
  
  if (result.success) {
    console.log('✅ Contact form submission successful');
    console.log(`   Message: ${result.data.message}`);
  } else {
    console.log('❌ Contact form submission failed');
    console.log(`   Status: ${result.status}`);
    console.log(`   Error: ${result.data?.message || result.error}`);
  }
  
  return result.success;
};

const testConsultationAPI = async () => {
  console.log('\n📅 Testing consultation booking API...');
  const result = await apiRequest('/consultation', 'POST', testConsultation);
  
  if (result.success) {
    console.log('✅ Consultation booking successful');
    console.log(`   Message: ${result.data.message}`);
    console.log(`   Booking ID: ${result.data.data?.id}`);
  } else {
    console.log('❌ Consultation booking failed');
    console.log(`   Status: ${result.status}`);
    console.log(`   Error: ${result.data?.message || result.error}`);
  }
  
  return result.success;
};

const testBlogAPI = async () => {
  console.log('\n📝 Testing blog API...');
  const result = await apiRequest('/blog?limit=3');
  
  if (result.success) {
    console.log('✅ Blog API working');
    console.log(`   Posts found: ${result.data.data?.posts?.length || 0}`);
    console.log(`   Total posts: ${result.data.data?.pagination?.total || 0}`);
  } else {
    console.log('❌ Blog API failed');
    console.log(`   Status: ${result.status}`);
    console.log(`   Error: ${result.data?.message || result.error}`);
  }
  
  return result.success;
};

const testFrontendConnection = async () => {
  console.log('\n🎨 Testing frontend connection...');
  
  try {
    const response = await fetch(FRONTEND_URL);
    if (response.ok) {
      console.log('✅ Frontend server accessible');
      console.log(`   URL: ${FRONTEND_URL}`);
    } else {
      console.log('❌ Frontend server not accessible');
      console.log(`   Status: ${response.status}`);
    }
    return response.ok;
  } catch (error) {
    console.log('❌ Frontend connection failed');
    console.log(`   Error: ${error.message}`);
    return false;
  }
};

const checkEnvironmentFiles = () => {
  console.log('\n📋 Checking environment configuration...');
  
  const frontendEnv = fs.existsSync(path.join(__dirname, 'env.local'));
  const backendEnv = fs.existsSync(path.join(__dirname, 'backend', 'env.local'));
  
  console.log(`   Frontend env.local: ${frontendEnv ? '✅' : '❌'}`);
  console.log(`   Backend env.local: ${backendEnv ? '✅' : '❌'}`);
  
  return frontendEnv && backendEnv;
};

const checkDependencies = () => {
  console.log('\n📦 Checking dependencies...');
  
  const frontendNodeModules = fs.existsSync(path.join(__dirname, 'node_modules'));
  const backendNodeModules = fs.existsSync(path.join(__dirname, 'backend', 'node_modules'));
  
  console.log(`   Frontend node_modules: ${frontendNodeModules ? '✅' : '❌'}`);
  console.log(`   Backend node_modules: ${backendNodeModules ? '✅' : '❌'}`);
  
  return frontendNodeModules && backendNodeModules;
};

// Main test function
const runIntegrationTests = async () => {
  console.log('Starting comprehensive integration tests...\n');
  
  const results = {
    environment: checkEnvironmentFiles(),
    dependencies: checkDependencies(),
    health: await testHealthCheck(),
    frontend: await testFrontendConnection(),
    contact: await testContactAPI(),
    consultation: await testConsultationAPI(),
    blog: await testBlogAPI()
  };
  
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test.charAt(0).toUpperCase() + test.slice(1)}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed! Your full-stack integration is working perfectly!');
    console.log('\n🚀 Next Steps:');
    console.log('   1. Visit http://localhost:3000 to see your application');
    console.log('   2. Test the contact form and consultation booking');
    console.log('   3. Explore the blog and other pages');
    console.log('   4. Set up MongoDB for full database functionality');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Ensure both servers are running');
    console.log('   2. Check environment configuration');
    console.log('   3. Verify MongoDB connection (if using database features)');
    console.log('   4. Check console logs for detailed error messages');
  }
  
  console.log('\n📖 For detailed setup instructions, see README.md');
  console.log('📖 For MongoDB setup, see backend/MONGODB_SETUP.md');
};

// Run tests
runIntegrationTests().catch(error => {
  console.error('\n❌ Integration test failed:', error);
  process.exit(1);
});
