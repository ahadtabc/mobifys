import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@mobifys.in';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Admin@123', 10);
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        phone: '+91 907-424-3208',
        passwordHash,
        role: 'super_admin',
        status: 'active',
        isBlocked: false,
        mustChangePassword: false,
      });
      console.log('Super Admin created: admin@mobifys.in / Admin@123');
    } else {
      console.log('Super Admin already exists.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeder Error:', error);
    process.exit(1);
  }
};

seedData();