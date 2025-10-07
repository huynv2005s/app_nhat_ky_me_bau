const express = require("express");
const router = express.Router();
const Diary = require("../diary.module");
const { verifyToken } = require("../../middleware/auth");
// Tạo nhật ký mới
router.post("/", verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const newDiary = new Diary({ userId: req.user.id, title, content });
        await newDiary.save();
        return res.status(201).json({ message: "Diary created", diary: newDiary });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
// Lấy tất cả nhật ký của user
router.get("/", verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const newDiary = await Diary.find({ userId: id });
        return res.status(201).json({ message: "Diary created", diary: newDiary });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
// Lấy nhật ký theo ID
router.get("/:id", verifyToken, async (req, res) => { });
// Cập nhật nhật ký
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const diary = await Diary.findById(id);
        if (!diary) {
            return res.status(404).json({ message: "Diary not found" });
        }
        if (diary.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        diary.title = title;
        diary.content = content;
        await diary.save();
        return res.status(200).json({ message: "Diary updated", diary });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
// Xoá nhật ký
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const diary = await Diary.findById(id);
        if (!diary) {
            return res.status(404).json({ message: "Diary not found" });
        }
        if (diary.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await diary.remove();
        return res.status(200).json({ message: "Diary deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;    