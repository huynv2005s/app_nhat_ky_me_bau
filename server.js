const express = require("express");
const dotenv = require("dotenv");
const userModule = require("./src/modules/user.module");
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');
dotenv.config(); // đọc file .env

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Kết nối MongoDB

app.get("/", (req, res) => {
    res.send("App nhật ký mẹ bầu đang hoạt động 💖");
});
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        console.log(req.body);
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const existing = await userModule.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already in use' });

        const user = new userModule({ email, password, name });
        await user.save();

        return res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const user = await userModule.findOne({ email, password });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });



        // Tạo token
        const payload = { id: user._id, email: user.email };
        const accessToken = jwt.sign(payload, "my-app", { expiresIn: "7d" || '1h' });

        // (Tuỳ chọn) tạo refresh token và lưu vào DB
        // const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // user.refreshToken = refreshToken;
        // await user.save();

        return res.json({
            message: 'Login successful',
            accessToken,
            // refreshToken
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
app.use("/api/diaries", require("./src/modules/diary/diary.router"));
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));