const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // avatar: String,
    dueDate: Date, // ngày dự sinh
    baby: {
        name: String,
        gender: String
    },
    pregnancyWeek: Number, // tuần thai hiện tại
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
