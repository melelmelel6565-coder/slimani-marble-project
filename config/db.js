const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const db = process.env.mongodb+srv://<db_username>:<db_password>@cluster0.ykneilq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
