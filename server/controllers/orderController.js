const { Order, OrderItem, Product } = require('../models');

exports.addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = await Order.create({
            userId: req.user.id,
            totalAmount: totalPrice,
            shippingAddress: JSON.stringify(shippingAddress),
            paymentMethod,
            status: req.body.status || 'pending',
        });

        for (const item of orderItems) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.id,
                quantity: item.qty,
                price: item.price,
            });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: Product,
                    through: { attributes: ['quantity', 'price'] },
                },
            ],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: Product,
                    through: { attributes: ['quantity', 'price'] },
                },
                'User',
            ],
            order: [['createdAt', 'DESC']],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getVendorOrders = async (req, res) => {
    try {
        const vendorId = req.user.id;
        // Find orders that have at least one product belonging to this vendor
        const orders = await Order.findAll({
            include: [
                {
                    model: Product,
                    where: { vendorId }, // Filter products by vendor
                    through: { attributes: ['quantity', 'price'] },
                    required: true, // Inner join to ensure order has vendor's products
                },
                'User',
            ],
            order: [['createdAt', 'DESC']],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
