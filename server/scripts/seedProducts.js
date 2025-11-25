const { sequelize, Product } = require('../models');

const products = [
    {
        name: "Tirupati Laddu",
        temple: "Tirumala Tirupati Devasthanams",
        description: "The world-famous Srivari Laddu, a sacred offering from the seven hills. Made with pure ghee, gram flour, sugar, cashews, cardamom, and raisins.",
        price: 501,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Tirupati_Laddu.jpg/800px-Tirupati_Laddu.jpg",
        category: "Sweets",
        rating: 4.9,
        tag: "Bestseller"
    },
    {
        name: "Kashi Mahaprasad",
        temple: "Kashi Vishwanath Temple",
        description: "Sacred dry prasad from the holy city of Varanasi. Contains dry fruits, mishri, and sacred vibhuti.",
        price: 351,
        image: "https://tse3.mm.bing.net/th?id=OIP.M_s3qXk_g2Y-k_k_k_k_kQHaHa&pid=Api",
        category: "Dry Prasad",
        rating: 4.8,
        tag: "Sacred"
    },
    {
        name: "Vaishno Devi Prasad",
        temple: "Mata Vaishno Devi Shrine",
        description: "Blessed offerings from the holy shrine. Includes dry fruits, puffed rice, and a sacred coin.",
        price: 451,
        image: "https://tse1.mm.bing.net/th?id=OIP.M_s3qXk_g2Y-k_k_k_k_kQHaHa&pid=Api",
        category: "Dry Prasad",
        rating: 4.9,
        tag: "Popular"
    },
    {
        name: "Puri Mahaprasad",
        temple: "Jagannath Puri Temple",
        description: "The famous Khaja and dry sweets from the Lord's kitchen (Ananda Bazar).",
        price: 251,
        image: "https://tse2.mm.bing.net/th?id=OIP.M_s3qXk_g2Y-k_k_k_k_kQHaHa&pid=Api",
        category: "Sweets",
        rating: 4.7,
        tag: "Traditional"
    },
    {
        name: "Sabarimala Aravana",
        temple: "Sabarimala Temple",
        description: "Sacred Payasam made with rice, jaggery, and ghee. A divine offering for Lord Ayyappa.",
        price: 301,
        image: "https://tse4.mm.bing.net/th?id=OIP.M_s3qXk_g2Y-k_k_k_k_kQHaHa&pid=Api",
        category: "Payasam",
        rating: 4.8,
        tag: "Seasonal"
    },
    {
        name: "Dwarka Prasad",
        temple: "Dwarkadhish Temple",
        description: "Traditional dry sweets and magaj laddu from the kingdom of Lord Krishna.",
        price: 401,
        image: "https://tse1.mm.bing.net/th?id=OIP.M_s3qXk_g2Y-k_k_k_k_kQHaHa&pid=Api",
        category: "Sweets",
        rating: 4.6,
        tag: "New"
    }
];

const seedProducts = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Sync models (ensure table exists)
        await sequelize.sync();

        // Clear existing products
        await Product.destroy({ where: {} });
        console.log('Existing products cleared.');

        // Add new products
        await Product.bulkCreate(products);
        console.log('Products seeded successfully.');

        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
