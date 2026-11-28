import bcrypt from 'bcryptjs';
import './src/config/env.js';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';

const seedData = async () => {
  try {
    await connectDB();

    const adminEmail = 'ahadtabc@gmail.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Admin@123', 10);
      await User.create({
        name: 'Admin Ahad',
        email: adminEmail,
        phone: '+91 9074243208',
        passwordHash,
        role: 'admin',
        status: 'active',
      });
      console.log('Admin created');
    } else {
      console.log('Admin already exists.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeder Error:', error);
    process.exit(1);
  }
};

seedData();
