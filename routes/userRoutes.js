const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Rasm yuklash uchun storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rasm papkasini yaratish
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// GET /api/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Foydalanuvchilarni olishda xatolik', error: err.message });
  }
});

// POST /api/users (rasm bilan)
router.post('/users', upload.single('rasm'), async (req, res) => {
  try {
    const { ism, familya, telefon } = req.body;
    const rasm = req.file ? req.file.filename : null;
    const user = new User({ ism, familya, telefon, rasm });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Foydalanuvchi qo‘shishda xatolik', error: err.message });
  }
});

// PUT /api/users/:id (rasm bilan)
router.put('/users/:id', upload.single('rasm'), async (req, res) => {
  try {
    const { ism, familya, telefon } = req.body;
    let updateData = { ism, familya, telefon };
    if (req.file) updateData.rasm = req.file.filename;
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Foydalanuvchini tahrirlashda xatolik', error: err.message });
  }
});

// DELETE /api/users/:id (rasmni ham o‘chiradi)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user && user.rasm) {
      fs.unlinkSync(path.join('uploads', user.rasm));
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'O‘quvchi o‘chirildi' });
  } catch (err) {
    res.status(400).json({ message: 'O‘chirishda xatolik', error: err.message });
  }
});

// Rasmni ko‘rsatish uchun static route
router.use('/rasmlar', express.static('uploads'));

module.exports = router;