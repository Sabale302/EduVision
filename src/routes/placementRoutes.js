import express from 'express';
import mysql from 'mysql2';
import multer from 'multer';
import xlsx from 'xlsx';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  getPlacementFile,
  savePlacementData
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

// Create new placement record
router.post('/', createPlacement);

// Get all placements (for admin)
router.get('/', getAllPlacements);

// Get a specific placement by ID
router.get('/:id', getPlacementById);

// Get CV or photo for a placement
router.get('/:id/:fileType', getPlacementFile);

// Excel generator (faculty info)
router.get('/generate-excel', (req, res) => {
  const query = 'SELECT * FROM faculties';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(results);
    xlsx.utils.book_append_sheet(wb, ws, 'FacultyData');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const outputDir = path.join(__dirname, 'output');

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    const filePath = path.join(outputDir, 'faculty_data.xlsx');
    xlsx.writeFile(wb, filePath);

    res.download(filePath);
  });
});

// Upload Placement Data (Excel / CSV)
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const buffer = req.file.buffer;
    const originalName = req.file.originalname.toLowerCase();

    let wb;

    if (originalName.endsWith('.csv')) {
      // Parse CSV string instead of binary buffer
      const csvStr = buffer.toString('utf8');
      wb = xlsx.read(csvStr, { type: 'string' }); // key difference for CSV
    } else {
      wb = xlsx.read(buffer, { type: 'buffer' }); // for .xlsx
    }

    if (!wb.SheetNames.length) {
      return res.status(400).json({ error: 'No sheets found in file.' });
    }

    const ws = wb.Sheets[wb.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(ws);

    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      return res.status(400).json({ error: 'File is empty or invalid format.' });
    }

    uploadedDataFrame = jsonData;

    res.status(200).json({
      preview: jsonData.slice(0, 5),
      columns: Object.keys(jsonData[0] || {})
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to parse uploaded file', message: err.message });
  }
});

// Apply Column Filters
router.post('/filter', (req, res) => {
  if (!uploadedDataFrame) return res.status(400).json({ error: 'No data available. Upload first.' });

  const { filters } = req.body;
  let filteredData = [...uploadedDataFrame];

  try {
    filters.forEach(({ column, operator, value, range }) => {
      switch (operator) {
        case 'equals':
          filteredData = filteredData.filter(r => r[column] === value);
          break;
        case 'contains':
          filteredData = filteredData.filter(r => String(r[column]).includes(value));
          break;
        case 'greater_than':
          filteredData = filteredData.filter(r => Number(r[column]) > Number(value));
          break;
        case 'less_than':
          filteredData = filteredData.filter(r => Number(r[column]) < Number(value));
          break;
        case 'between':
          filteredData = filteredData.filter(r =>
            Number(r[column]) >= Number(range.min) && Number(r[column]) <= Number(range.max)
          );
          break;
        default:
          break;
      }
    });

    res.json({ filtered_preview: filteredData.slice(0, 5) });
  } catch (err) {
    res.status(500).json({ error: 'Error applying filters' });
  }
});

// Apply Selected Columns
router.post('/apply-column-changes', (req, res) => {
  const { selectColumns } = req.body;
  if (!uploadedDataFrame) return res.status(400).json({ error: 'No data available. Upload first.' });

  const filteredData = uploadedDataFrame.map(r => {
    const newRow = {};
    selectColumns.forEach(col => (newRow[col] = r[col]));
    return newRow;
  });

  res.status(200).json({ filtered_data: filteredData });
});

// Placement form submission (CV + Photo)
router.post('/save', fileUpload.fields([{ name: 'cv' }, { name: 'photo' }]), savePlacementData); // ✅ Now this works

export default router;
