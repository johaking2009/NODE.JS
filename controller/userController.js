const User = require('../models/User');

// Barcha foydalanuvchilarni olish
exports.getAllUsers = async (req, res) => {
  try {
    const foydalanuvchilar = await User.find();
    res.status(200).json(foydalanuvchilar);
  } catch (err) {
    res.status(500).json({ error: 'Foydalanuvchilarni olishda xatolik', details: err.message });
  }
};