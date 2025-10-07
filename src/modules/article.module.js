const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ["dinh-duong", "suc-khoe", "tam-ly", "van-dong"], required: true },
    thumbnail: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    author: { type: String, default: "Admin" },
});

export default mongoose.model("Article", articleSchema);
