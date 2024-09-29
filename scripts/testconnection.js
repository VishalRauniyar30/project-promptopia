const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const testConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // Note: useNewUrlParser and useUnifiedTopology are deprecated
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
    } finally {
        await mongoose.disconnect(); // Disconnect after testing
    }
};

testConnection();
