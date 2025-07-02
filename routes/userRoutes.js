const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ POST - yangi foydalanuvchi qo‘shish
router.post('/users', async (req, res) => {
  try {
    const { ism, familya, telefon } = req.body;

    // Telefon raqam bo'yicha tekshirish (agar kerak bo'lsa)
    const existingUser = await User.findOne({ telefon });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu telefon raqam allaqachon mavjud!' });
    }

    const yangiFoydalanuvchi = new User({ ism, familya, telefon });
    await yangiFoydalanuvchi.save();

    res.status(201).json({
      message: '✅ Foydalanuvchi muvaffaqiyatli saqlandi',
      user: yangiFoydalanuvchi
    });
  } catch (err) {
    res.status(500).json({ error: '❌ Serverda xatolik', details: err.message });
  }
});

// ✅ GET - barcha foydalanuvchilarni olish
router.get('/users', async (req, res) => {
  try {
    const foydalanuvchilar = await User.find();
    res.status(200).json(foydalanuvchilar);
  } catch (err) {
    res.status(500).json({ error: '❌ Foydalanuvchilarni olishda xatolik', details: err.message });
  }
});

module.exports