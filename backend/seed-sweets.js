require('dotenv').config();
const mongoose = require('mongoose');
const Sweet = require('./src/models/Sweet');

const demoSweets = [
  {
    name: 'Rasgulla',
    category: 'Indian Sweet',
    price: 150,
    quantity: 50,
    description: 'Soft and spongy cottage cheese balls soaked in sugar syrup',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400'
  },
  {
    name: 'Gulab Jamun',
    category: 'Indian Sweet',
    price: 180,
    quantity: 45,
    description: 'Deep-fried milk solid balls soaked in sweet rose-flavored syrup',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400'
  },
  {
    name: 'Jalebi',
    category: 'Indian Sweet',
    price: 120,
    quantity: 60,
    description: 'Crispy and syrupy spiral-shaped sweet made from fermented batter',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400'
  },
  {
    name: 'Ladoo',
    category: 'Indian Sweet',
    price: 200,
    quantity: 40,
    description: 'Traditional round sweets made from flour, ghee, and sugar',
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400'
  },
  {
    name: 'Barfi',
    category: 'Indian Sweet',
    price: 250,
    quantity: 35,
    description: 'Dense milk-based sweet with various flavors like pistachio and cashew',
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400'
  },
  {
    name: 'Kaju Katli',
    category: 'Premium Sweet',
    price: 400,
    quantity: 25,
    description: 'Premium diamond-shaped cashew fudge with silver leaf',
    imageUrl: 'https://images.unsplash.com/photo-1628686848860-9b6bbfcdfdce?w=400'
  },
  {
    name: 'Mysore Pak',
    category: 'South Indian Sweet',
    price: 280,
    quantity: 30,
    description: 'Rich and crumbly sweet made from gram flour, ghee, and sugar',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a0b0e2e0a68d?w=400'
  },
  {
    name: 'Peda',
    category: 'Indian Sweet',
    price: 160,
    quantity: 55,
    description: 'Soft and creamy milk-based sweet traditionally flavored with cardamom',
    imageUrl: 'https://images.unsplash.com/photo-1591980597801-c2c1c2d2e5a1?w=400'
  }
];

async function seedSweets() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing sweets
    const existingCount = await Sweet.countDocuments();
    console.log(`📊 Found ${existingCount} existing sweets`);
    
    if (existingCount > 0) {
      console.log('🗑️  Clearing existing sweets...');
      await Sweet.deleteMany({});
      console.log('✅ Cleared existing sweets');
    }

    // Insert demo sweets
    console.log('🍬 Inserting demo sweets...');
    const result = await Sweet.insertMany(demoSweets);
    console.log(`✅ Successfully added ${result.length} demo sweets!`);
    
    console.log('\n📋 Added sweets:');
    result.forEach((sweet, index) => {
      console.log(`${index + 1}. ${sweet.name} - ₹${sweet.price} (Stock: ${sweet.quantity})`);
    });

    mongoose.connection.close();
    console.log('\n🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding sweets:', error.message);
    process.exit(1);
  }
}

seedSweets();
