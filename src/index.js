import express from "express";
import sequelize from "./config/dbConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import Faculty from './models/facultyModel.js';
import authRoutes from "./routes/authRoutes.js";
import updateprofileRoutes from './routes/updateprofileRoutes.js';
import rolePermissionsRoutes from './routes/rolePermissionsRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import manageUserRoutes from './routes/manageUserRoutes.js';
import placementRoutes from './routes/placementRoutes.js';
import User from './models/userModel.js'
import fileUpload from 'express-fileupload';

dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// File upload middleware
app.use(fileUpload({
    limits: { 
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    },
    abortOnLimit: true,
    createParentPath: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/profile', updateprofileRoutes);
app.use('/api/role-permissions', rolePermissionsRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/manage-users', manageUserRoutes);
app.use('/api/placements', placementRoutes);
// Verify database connection
sequelize.authenticate()
    .then(() => console.log("Database connected successfully."))
    .catch((error) => console.error("Database connection failed:", error));

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(error => console.error('Error syncing database:', error));


    // Test route
app.get('/', (req, res) => {
    res.send('Placement API is running...');
});

// Endpoint to count total users
app.get('/api/total-users', async (req, res) => {
    try {
        const totalUsers = await User.count()
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to receive faculty data
app.post('/api/saveFacultyData', async (req, res, next) => {
    try {
        const facultyData = req.body;
        const newFaculty = await Faculty.create(facultyData);
        res.status(200).json({ message: 'Faculty data saved successfully', data: newFaculty });
    } catch (error) {
        console.error('Error saving faculty data:', error);
        next(error); 
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message || err);
    res.status(500).json({ error: err.message || "Server error" });
});


// Start the server
const PORT = 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
}); 