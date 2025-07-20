import express from 'express';
import mysql from 'mysql2';
import multer from 'multer';
import cors from 'cors';

import {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  getPlacementFile,
  savePlacementData,
  columnFilters,
  applyColumnChanges,
  generateExcel,
  uploadPlacementData
} from '../controllers/placementController.js';

const router = express.Router();
router.use(cors());

const upload = multer({ storage: multer.memoryStorage() });
const fileUpload = multer({ dest: 'uploads/' });

// MySQL connection pool
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

let uploadedDataFrame = null;

router.post('/', createPlacement); // Create new placement record
router.get('/', getAllPlacements); // Get all placements (for admin)
router.get('/:id', getPlacementById); // Get a specific placement by ID
router.get('/:id/:fileType', getPlacementFile); // Get CV or photo for a placement

router.post('/upload', upload.single('file'), uploadPlacementData); // Upload Placement Data (Excel / CSV)
router.get('/generate-excel', generateExcel); // Excel generator (faculty info)
router.post('/filter', columnFilters); // Apply Column Filters
router.post('/apply-column-changes', applyColumnChanges); // Apply Selected Columns
router.post('/save', fileUpload.fields([{ name: 'cv' }, { name: 'photo' }]), savePlacementData); // Placement form submission (CV + Photo)


export default router;
