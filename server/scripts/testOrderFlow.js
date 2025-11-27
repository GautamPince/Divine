const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testOrderFlow = async () => {
    try {
        console.log('--- Starting Order Management Flow Test ---');

        // 0. Register User (if not exists)
        console.log('\n0. Registering User...');
        try {
            await axios.post(`${API_URL}/auth/signup`, {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
            console.log('User registered.');
        } catch (e) {
            console.log('User already exists (or signup failed), proceeding to login...');
        }

        // 1. Login as User
        console.log('\n1. Logging in as User...');
        const userLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'password123'
        });
        const userToken = userLogin.data.token;
        console.log('User logged in.');

        // 2. Create an Order (to ensure we have data)
        console.log('\n2. Creating a Test Order...');
        const orderData = {
            orderItems: [
                { id: 1, qty: 2, price: 50 } // Assuming product ID 1 exists
            ],
            shippingAddress: { address: '123 Test St', city: 'Test City' },
            paymentMethod: 'COD',
            totalPrice: 100
        };
        const createOrder = await axios.post(`${API_URL}/orders`, orderData, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        const orderId = createOrder.data.id;
        console.log(`Order created. ID: ${orderId}, Status: ${createOrder.data.status}`);

        // 3. Verify User Order History
        console.log('\n3. Verifying User Order History...');
        const myOrders = await axios.get(`${API_URL}/orders/myorders`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        const foundOrder = myOrders.data.find(o => o.id === orderId);
        if (foundOrder) {
            console.log('Order found in User History.');
        } else {
            console.error('Order NOT found in User History!');
        }

        // 4. Login as Admin
        console.log('\n4. Logging in as Admin...');
        const adminLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@divine.com',
            password: 'admin123'
        });
        const adminToken = adminLogin.data.token;
        console.log('Admin logged in.');

        // 5. Admin: Update Order Status
        console.log(`\n5. Admin updating Order #${orderId} status to 'Delivered'...`);
        await axios.put(`${API_URL}/orders/${orderId}/status`, { status: 'Delivered' }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('Order status updated.');

        // 6. Verify Status Update (as User)
        console.log('\n6. Verifying Status Update as User...');
        const myOrdersUpdated = await axios.get(`${API_URL}/orders/myorders`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        const updatedOrder = myOrdersUpdated.data.find(o => o.id === orderId);
        console.log(`Order Status: ${updatedOrder.status}`);
        if (updatedOrder.status === 'Delivered') {
            console.log('SUCCESS: Status update verified.');
        } else {
            console.error('FAILURE: Status update NOT reflected.');
        }

        // 7. Login as Vendor (Optional Check)
        console.log('\n7. Logging in as Vendor...');
        const vendorLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'vendor@tirupati.com',
            password: 'vendor123'
        });
        const vendorToken = vendorLogin.data.token;
        console.log('Vendor logged in.');

        // 8. Verify Vendor Order View
        console.log('\n8. Verifying Vendor Order View...');
        const vendorOrders = await axios.get(`${API_URL}/orders/vendor`, {
            headers: { Authorization: `Bearer ${vendorToken}` }
        });
        console.log(`Vendor sees ${vendorOrders.data.length} orders.`);
        // Note: This might be 0 if the product ID 1 doesn't belong to this vendor, but the endpoint should work.

    } catch (error) {
        console.error('TEST FAILED:', error.response ? error.response.data : error.message);
    }
};

testOrderFlow();
