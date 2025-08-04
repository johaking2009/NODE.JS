const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Foydalanuvchilarni olish
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(user => ({ ...user.toObject(), id: user._id })));
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
  }
});

// Yangi foydalanuvchi qo'shish
router.post('/', async (req, res) => {
  const { ism, familya, telefon } = req.body;
  try {
    const newUser = new User({ ism, familya, telefon });
    const savedUser = await newUser.save();
    res.status(201).json({ ...savedUser.toObject(), id: savedUser._id });
  } catch (error) {
    res.status(400).json({ message: 'Ma\'lumot saqlashda xatolik', error: error.message });
  }
});

// Foydalanuvchini tahrirlash
router.put('/:id', async (req, res) => {
  const { ism, familya, telefon } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ism, familya, telefon },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }
    res.json({ ...updatedUser.toObject(), id: updatedUser._id });
  } catch (error) {
    res.status(400).json({ message: 'Tahrirlashda xatolik', error: error.message });
  }
});

// Foydalanuvchini o'chirish
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }
    res.json({ message: 'Foydalanuvchi muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: 'O\'chirishda xatolik', error: error.message });
  }
});

module.exports = router;  