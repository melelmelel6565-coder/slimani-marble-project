const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

// Load env vars
dotenv.config();

const db = process.env.MONGO_URI;

const setup = async () => {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
    
    // !!! --- قم بتغيير هذه البيانات --- !!!
    const adminEmail = "bayrem@gmail.com";
    const adminPassword = "bayrem//6575";
    // !!! ----------------------------- !!!

    try {
        let admin = await Admin.findOne({ email: adminEmail });

        if (admin) {
            console.log('Admin user already exists.');
            mongoose.disconnect();
            return;
        }

        admin = new Admin({
            email: adminEmail,
            password: adminPassword
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(adminPassword, salt);

        await admin.save();
        
        console.log('Admin user created successfully!');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        
    } catch (err) {
        console.error(err.message);
    } finally {
        mongoose.disconnect();
    }
};

setup();
