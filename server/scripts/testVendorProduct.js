const axios = require('axios');

const testVendorProduct = async () => {
    try {
        // 1. Login as Vendor
        console.log('Logging in as Vendor...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'vendor@tirupati.com',
            password: 'vendor123'
        });
        const token = loginRes.data.token;
        console.log('Login successful. Token obtained.');

        // 2. Create Product
        console.log('Creating Product...');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const productData = {
            name: 'Script Vendor Laddu',
            description: 'Created via script',
            price: 100,
            category: 'Sweets',
            temple: 'Tirupati',
            image: 'https://via.placeholder.com/150'
        };

        const createRes = await axios.post('http://localhost:5000/api/products', productData, config);
        console.log('Product created successfully:', createRes.data);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

testVendorProduct();
