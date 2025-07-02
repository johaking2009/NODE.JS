import dbConnect from './dbConnect';
import User from './User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const users = await User.find();
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { ism, familya, telefon } = req.body;
    const existingUser = await User.findOne({ telefon });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu telefon raqam allaqachon mavjud!' });
    }
    const user = new User({ ism, familya, telefon });
    await user.save();
    return res.status(201).json(user);
  }

  res.status(405).json({ message: 'Method not allowed' });
}