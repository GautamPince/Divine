const { sequelize, Product } = require('../models');

const checkProduct = async () => {
    try {
        await sequelize.authenticate();
        const product = await Product.findOne({ where: { name: 'Test Product' } });
        if (product) {
            console.log('Product found:', product.toJSON());
        } else {
            console.log('Product NOT found.');
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkProduct();
