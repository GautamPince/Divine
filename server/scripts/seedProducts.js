const { sequelize, Product } = require('../models');

const dummyProducts = [
    {
        name: "Tirupati Laddu",
        description: "The world-famous Srivari Laddu Prasadam from Tirumala Venkateswara Temple. Made with gram flour, cashew nuts, cardamom, ghee, sugar, and sugar candy.",
        price: 50.00,
        category: "Sweets",
        temple: "Tirumala Venkateswara Temple",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Laddu.jpg/800px-Laddu.jpg",
        rating: 4.8,
        stock: 500
    },
    {
        name: "Palani Panchamirtham",
        description: "A divine jam-like prasadam made from five ingredients: banana, jaggery, cow ghee, honey, and cardamom. From the Palani Murugan Temple.",
        price: 120.00,
        category: "Jam",
        temple: "Palani Murugan Temple",
        image: "https://www.templepurohit.com/wp-content/uploads/2016/04/Palani-Panchamirtham.jpg",
        rating: 4.9,
        stock: 200
    },
    {
        name: "Sabarimala Aravana Payasam",
        description: "A rich and dark kheer made of rice, jaggery, and ghee. The main prasadam of Lord Ayyappa at Sabarimala.",
        price: 150.00,
        category: "Payasam",
        temple: "Sabarimala Temple",
        image: "https://i.ytimg.com/vi/q1e2f3g4h5i/maxresdefault.jpg",
        rating: 4.7,
        stock: 300
    },
    {
        name: "Mahaprasad (Jagannath Puri)",
        description: "The 56 Bhog offered to Lord Jagannath. Includes rice, dal, vegetables, and sweets cooked in earthen pots.",
        price: 250.00,
        category: "Meal",
        temple: "Jagannath Temple, Puri",
        image: "https://odishabytes.com/wp-content/uploads/2019/07/Mahaprasad.jpg",
        rating: 5.0,
        stock: 100
    },
    {
        name: "Vaishno Devi Peda",
        description: "Delicious dried fruit and nut based prasad from the holy shrine of Mata Vaishno Devi.",
        price: 80.00,
        category: "Sweets",
        temple: "Vaishno Devi Temple",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/9/MZ/UY/OD/4946723/vaishno-devi-prasad-500x500.jpg",
        rating: 4.6,
        stock: 400
    },
    {
        name: "Ambalapuzha Palpayasam",
        description: "A legendary sweet milk porridge offered at the Ambalapuzha Sri Krishna Temple in Kerala.",
        price: 100.00,
        category: "Payasam",
        temple: "Ambalapuzha Sri Krishna Temple",
        image: "https://www.keralatourism.org/images/cuisine/large/ambalapuzha_palpayasam_20131031103212_1.jpg",
        rating: 4.9,
        stock: 150
    }
];

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        console.log('Seeding products...');

        // Clear existing products to ensure clean slate
        await Product.destroy({ where: {} });

        await Product.bulkCreate(dummyProducts);

        console.log('Products seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Unable to connect to the database or seed data:', error);
        process.exit(1);
    }
};

seedDatabase();
