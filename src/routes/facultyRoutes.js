// backend/src/routes/facultyRoutes.js
import express from 'express';
import Faculty from '../models/facultyModel.js';
const router = express.Router();

// Endpoint to fetch all faculty data
router.get('/faculty', async (req, res) => {
    try {
        const facultyData = await Faculty.findAll(); // Fetch all faculties
        res.json(facultyData);
    } catch (error) {
        console.error('Error fetching faculty data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
