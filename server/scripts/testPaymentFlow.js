const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testPaymentFlow = async () => {
    try {
        console.log('--- Starting Payment Flow Test ---');

        // 1. Login as User
        console.log('\n1. Logging in as User...');
        const userLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'password123'
        });
        const userToken = userLogin.data.token;
        console.log('User logged in.');

        // 2. Process Mock Payment
        console.log('\n2. Processing Mock Payment...');
        const paymentRes = await axios.post(`${API_URL}/payment/process`, {
            amount: 500,
            paymentMethod: 'Credit Card'
        }, {
            headers: { Authorization: `Bearer ${userToken}` }
        });

        if (paymentRes.data.success) {
            console.log(`Payment Successful! TXN ID: ${paymentRes.data.transactionId}`);
        } else {
            throw new Error('Payment failed');
        }

        // 3. Create Order with Payment Details
        console.log('\n3. Creating Order with Payment Details...');
        const orderData = {
            orderItems: [{ id: 1, qty: 1, price: 500 }],
            shippingAddress: { address: '123 Pay St', city: 'Cashless City' },
            paymentMethod: 'ONLINE',
            totalPrice: 500,
            transactionId: paymentRes.data.transactionId,
            status: 'paid' // In a real app, backend would verify this, but for mock we trust client or webhook
        };

        const createOrder = await axios.post(`${API_URL}/orders`, orderData, {
            headers: { Authorization: `Bearer ${userToken}` }
        });

        console.log(`Order Created. ID: ${createOrder.data.id}, Status: ${createOrder.data.status}`);

        // 4. Verify Order Status
        // Note: Our current simple backend might default to 'pending' unless we explicitly handle 'paid' status in create
        // Let's check what the backend actually saved.
        const myOrders = await axios.get(`${API_URL}/orders/myorders`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        const savedOrder = myOrders.data.find(o => o.id === createOrder.data.id);
        console.log(`Saved Order Status: ${savedOrder.status}`);

    } catch (error) {
        console.error('TEST FAILED:', error.response ? error.response.data : error.message);
    }
};

testPaymentFlow();
