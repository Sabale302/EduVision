/* eslint-disable no-unused-vars */
import express from "express";
import sequelize from "./config/dbConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import Faculty from './models/facultyModel.js';
import authRoutes from "./routes/authRoutes.js";
import updateprofileRoutes from './routes/updateprofileRoutes.js';
import rolePermissionsRoutes from './routes/rolePermissionsRoutes.js';

dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/profile', updateprofileRoutes);
app.use('/api/role-permissions', rolePermissionsRoutes);

// Verify database connection
sequelize.authenticate()
    .then(() => console.log("Database connected successfully."))
    .catch((error) => console.error("Database connection failed:", error));

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(error => console.error('Error syncing database:', error));

// Endpoint to receive faculty data
app.post('/api/saveFacultyData', async (req, res, next) => {
    try {
        const facultyData = req.body;
        const newFaculty = await Faculty.create(facultyData);
        res.status(200).json({ message: 'Faculty data saved successfully', data: newFaculty });
    } catch (error) {
        console.error('Error saving faculty data:', error);
        next(error); // Pass the error to the error handler
    }
});

// Global error handling middleware
app.use((res) => {
    res.status(500).json({ error: 'Server error' });
});

// Start the server
const PORT = 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

