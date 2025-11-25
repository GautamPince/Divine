const axios = require('axios'); // You'll need to install axios: npm install axios

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
    try {
        console.log('Testing API...');

        // 1. Signup
        console.log('1. Testing Signup...');
        const userEmail = `test${Date.now()}@example.com`;
        const signupRes = await axios.post(`${API_URL}/auth/signup`, {
            name: 'Test User',
            email: userEmail,
            password: 'password123'
        });
        console.log('Signup Success:', signupRes.data.email);
        const token = signupRes.data.token;

        // 2. Login
        console.log('2. Testing Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: userEmail,
            password: 'password123'
        });
        console.log('Login Success:', loginRes.data.token ? 'Token received' : 'No token');

        // 3. Create Product (Admin only - might fail if user is not admin, but let's try GET first)
        console.log('3. Testing Get Products...');
        const productsRes = await axios.get(`${API_URL}/products`);
        console.log('Get Products Success:', productsRes.data.length, 'products found');

        console.log('API Test Completed Successfully!');
    } catch (error) {
        console.error('API Test Failed:', error.response ? error.response.data : error.message);
    }
}

testAPI();
