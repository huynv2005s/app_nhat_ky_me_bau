const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ["dinh-duong", "suc-khoe", "tam-ly", "van-dong"], required: true },
    // thumbnail: String,
    // createdAt: { type: Date, default: Date.now },
    author: { type: String, default: "Admin" },
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);
