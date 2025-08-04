const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ Xato: MONGO_URI .env faylida aniqlanmagan!');
  process.exit(1);
}

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB muvaffaqiyatli ulandi!'))
  .catch((err) => {
    console.error('❌ MongoDB ulanishda xatolik:', err.message);
    process.exit(1);
  });

// ROUTES
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Salom, server ishlayapti!');
});

app.use((req, res) => {
  res.status(404).json({ message: '📍 Ushbu sahifa topilmadi!' });
});

app.use((err, req, res, next) => {
  console.error('❌ Server xatosi:', err.stack);
  res.status(500).json({ message: '🔧 Serverda kutilmagan xatolik yuz berdi', error: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} da ishga tushdi`);
});