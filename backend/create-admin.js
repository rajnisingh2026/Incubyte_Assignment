require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@sweetshop.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@sweetshop.com');
      console.log('Password: Admin@123');
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    const admin = new User({
      username: 'admin',
      email: 'admin@sweetshop.com',
      password: 'Admin@123',
      role: 'admin'
    });

    await admin.save();
    console.log('\n✅ Admin user created successfully!');
    console.log('\n📧 Email: admin@sweetshop.com');
    console.log('🔑 Password: Admin@123');
    console.log('👤 Role: admin\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
