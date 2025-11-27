exports.processPayment = async (req, res) => {
    try {
        const { amount, paymentMethod } = req.body;

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock success response
        res.json({
            success: true,
            transactionId: 'TXN_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            message: 'Payment processed successfully',
            amount,
            paymentMethod
        });
    } catch (error) {
        res.status(500).json({ message: 'Payment failed', error: error.message });
    }
};
