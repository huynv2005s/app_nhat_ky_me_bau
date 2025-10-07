const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Lấy URI từ file .env
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("❌ Thiếu biến môi trường MONGO_URI trong file .env");
        }

        // Kết nối MongoDB Cloud
        const conn = await mongoose.connect(uri);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Dừng server nếu lỗi kết nối
    }
};

module.exports = connectDB;
