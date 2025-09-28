import express from "express";
import sequelize from "./config/dbConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Faculty from "./models/facultyModel.js";
import authRoutes from "./routes/authRoutes.js";
import updateprofileRoutes from "./routes/updateprofileRoutes.js";
import rolePermissionsRoutes from "./routes/rolePermissionsRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import manageUserRoutes from "./routes/manageUserRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
import User from "./models/userModel.js";
import fileUpload from "express-fileupload";
import facultyRoutes from "./routes/facultyRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "./.env" });

const app = express();

// CORS setup
const allowedOrigins = ["https://www.kbpcsedept.in"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman / curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// File upload middleware
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
    abortOnLimit: true,
    createParentPath: true,
  })
);

// API Routes
app.use("/api/faculty", facultyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", updateprofileRoutes);
app.use("/api/role-permissions", rolePermissionsRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/manage-users", manageUserRoutes);
app.use("/api/placements", placementRoutes);

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully."))
  .catch((error) => console.error("❌ Database connection failed:", error));

sequelize
  .sync()
  .then(() => console.log("✅ Database synced"))
  .catch((error) => console.error("❌ Error syncing database:", error));

// Test route
app.get("/api", (req, res) => {
  res.send("Placement API is running...");
});

// Count total users endpoint
app.get("/api/total-users", async (req, res) => {
  try {
    const totalUsers = await User.count();
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Receive faculty data endpoint
app.post("/api/saveFacultyData", async (req, res, next) => {
  try {
    const facultyData = req.body;
    const newFaculty = await Faculty.create(facultyData);
    res
      .status(200)
      .json({ message: "Faculty data saved successfully", data: newFaculty });
  } catch (error) {
    console.error("Error saving faculty data:", error);
    next(error);
  }
});

// ------------------- React Build Setup -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React static files
app.use(express.static(path.join(__dirname, "build")));

// Catch-all route for React Router
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// ---------------------------------------------------------

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message || err);
  res.status(500).json({ error: err.message || "Server error" });
});

// Start server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at port ${PORT}`);
});
