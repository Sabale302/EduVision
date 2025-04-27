import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import process from 'process';

const jwtSecret = process.env.JWT_SECRET;

export const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findByPk(decoded.userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: 'Invalid token' });
  }
};

export const updateProfilefun = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { full_name, phone, address } = req.body;

    const [updated] = await User.update(
      { full_name, phone, address },
      { where: { id: decoded.userId } }
    );

    if (updated) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found or no changes made' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
