import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // `User` is your Sequelize model
import process from 'process';


export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const jwtSecret = process.env.JWT_SECRET;

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

        // Send token back to the client
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error:', error: error.message });
    }
};


export const signup = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role,
        });

        res.status(201).json({ message: 'Signup successful!', username: newUser.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signup.' });
    }
};
