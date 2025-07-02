const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// JSON body uchun middleware
app.use(express.json());

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB muvaffaqiyatli ulandi!');
}).catch((err) => {
  console.error('❌ MongoDB ulanishda xatolik:', err.message);
});

// ROUTES
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Asosiy route
app.get('/', (req, res) => {
  res.send('Salom, server ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} da ishga tushdi`);
});