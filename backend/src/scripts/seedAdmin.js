import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";

async function seedAdmin() {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  await connectDB();

  let admin = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (admin) {
    admin.name = ADMIN_NAME;
    admin.role = "admin";
    admin.isVerified = true;
    admin.isBlocked = false;
    admin.password = ADMIN_PASSWORD; // re-hashed by the pre-save hook
    await admin.save();
    console.log(`Admin updated: ${admin.email}`);
  } else {
    admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
      isVerified: true,
    });
    console.log(`Admin created: ${admin.email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin();