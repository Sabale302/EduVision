/* eslint-disable no-unused-vars */
// profileController.js
import process from 'process';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const jwtSecret = process.env.JWT_SECRET;

export const getProfile = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received Token:', token); // Check if the token is correctly passed in the request header
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        console.log('Decoded Token:', decoded);

        const userId = decoded.userId;

        User.findOne({ where: { id: userId } })
            .then(user => {
                if (!user) return res.status(404).json({ error: 'User not found' });

                // Return user data excluding sensitive information (e.g., password)
                res.json({
                    username: user.username,
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                });
            })
            .catch(err => res.status(500).json({ error: 'Server error' }));
    });
};


export const updateProfilefun = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received Token:', token);  // Check if the token is correctly passed in the request header
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        console.log('Decoded Token:', decoded); 

        const userId = decoded.userId;
        const { full_name , phone, address} = req.body;
        User.update(
            { full_name, phone, address },
            { where: { id: userId } }
        )
        .then(() => res.status(200).send('Profile updated successfully'))
        .catch(err => res.status(500).json({ error: 'Server error' }));
        
    });
};

