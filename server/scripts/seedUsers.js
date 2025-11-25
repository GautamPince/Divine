const { sequelize, User } = require('../models');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Admin User
        const adminSalt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', adminSalt);
        const admin = await User.findOne({ where: { email: 'admin@divine.com' } });
        if (!admin) {
            await User.create({
                name: 'Divine Admin',
                email: 'admin@divine.com',
                password: adminPassword,
                role: 'admin'
            });
            console.log('Admin user created: admin@divine.com / admin123');
        } else {
            console.log('Admin user already exists.');
        }

        // Vendor User
        const vendorSalt = await bcrypt.genSalt(10);
        const vendorPassword = await bcrypt.hash('vendor123', vendorSalt);
        const vendor = await User.findOne({ where: { email: 'vendor@tirupati.com' } });
        if (!vendor) {
            await User.create({
                name: 'Tirupati Vendor',
                email: 'vendor@tirupati.com',
                password: vendorPassword,
                role: 'vendor'
            });
            console.log('Vendor user created: vendor@tirupati.com / vendor123');
        } else {
            console.log('Vendor user already exists.');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
