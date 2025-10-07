const diarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    mood: { type: String, enum: ["happy", "tired", "normal", "sad"], default: "normal" },
    photos: [String],
    healthData: {
        weight: Number,
        bloodPressure: String,
        fetalMovement: Number, // số lần thai máy
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Diary", diarySchema);
