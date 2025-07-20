import Placement from '../models/placementModel.js';
import path from 'path';
import fs from 'fs';
import xlsx from 'xlsx';
import { fileURLToPath } from 'url';

// Controller for handling placement submissions
export const createPlacement = async (req, res) => {
    try {
        // Check if all required fields are present
        const requiredFields = [
            'fullName', 'email', 'mobile', 'alternateMobile', 'rollNo', 
            'prnNO', 'parentName', 'parentMobileNo', 'parentOccupation',
            'yourDOB', 'gender', 'address', 'city', 'branch', 
            'yearOfPassing', 'firstYearOrDirectSecondYear', 
            'sscPercentage', 
            'feSem1', 'feSem2', 'seSem3', 'seSem4', 'teSem5', 'teSem6',
            'activeBacklogs', 'numOfYD', 'careerObjective', 
            'onCampusPlacement', 'onCampusTraining', 'offers',
            'linkedinAccount', 'techknown', 'langknown', 'relocate'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0 || !req.files?.cv || !req.files?.photo) {
            return res.status(400).json({ 
                success: false, 
                message: `Missing required fields: ${missingFields.join(', ')}${!req.files?.cv ? ', cv' : ''}${!req.files?.photo ? ', photo' : ''}` 
            });
        }

        // Process file uploads
        const cvFile = req.files.cv;
        const photoFile = req.files.photo;
        
        // Validate file types
        const validImageTypes = ['image/jpeg', 'image/png'];
        const validFileTypes = [...validImageTypes, 'application/pdf'];
        
        if (!validFileTypes.includes(cvFile.mimetype)) {
            return res.status(400).json({
                success: false,
                message: 'CV must be in JPG, PNG, or PDF format'
            });
        }
        
        if (!validImageTypes.includes(photoFile.mimetype)) {
            return res.status(400).json({
                success: false,
                message: 'Photo must be in JPG or PNG format'
            });
        }

        // Convert boolean string values to actual booleans
        const booleanFields = ['onCampusPlacement', 'onCampusTraining', 'relocate'];
        booleanFields.forEach(field => {
            if (typeof req.body[field] === 'string') {
                req.body[field] = req.body[field].toLowerCase() === 'true';
            }
        });

        // ⭐️ Convert empty numeric optional fields to null
        const optionalNumericFields = ['hscPercentage', 'diplomaPercentage'];
        optionalNumericFields.forEach(field => {
            if (req.body[field] === '') {
                req.body[field] = null;
            }
        });

        // Create placement record with all fields
        const placement = await Placement.create({
            ...req.body,
            cv: cvFile.data,
            cvMimeType: cvFile.mimetype,
            photo: photoFile.data,
            photoMimeType: photoFile.mimetype
        });

        res.status(201).json({
            success: true,
            message: 'Placement information submitted successfully',
            data: {
                id: placement.id,
                fullName: placement.fullName,
                email: placement.email
            }
        });
    } catch (error) {
        console.error('Error submitting placement information:', error);

        // Handle Sequelize validation errors
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: validationErrors
            });
        }

        // Handle unique constraint errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Simple handler for testing file uploads (photo and cv)
export const savePlacementData = (req, res) => {
    try {
        const cvFile = req.files?.['cv']?.[0];
        const photoFile = req.files?.['photo']?.[0];

        if (!cvFile || !photoFile) {
            return res.status(400).json({ 
                success: false,
                message: 'CV or photo file missing' 
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',
            cv: {
                originalname: cvFile.originalname,
                mimetype: cvFile.mimetype,
                size: cvFile.size
            },
            photo: {
                originalname: photoFile.originalname,
                mimetype: photoFile.mimetype,
                size: photoFile.size
            }
        });
    } catch (error) {
        console.error('Error saving placement data:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get all placements (for admin use)
export const getAllPlacements = async (req, res) => {
    try {
        const placements = await Placement.findAll({
            attributes: { exclude: ['cv', 'photo'] } // Exclude binary data
        });
        
        res.status(200).json({
            success: true,
            count: placements.length,
            data: placements
        });
    } catch (error) {
        console.error('Error fetching placements:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get a single placement by ID
export const getPlacementById = async (req, res) => {
    try {
        const placement = await Placement.findByPk(req.params.id, {
            attributes: { exclude: ['cv', 'photo'] } // Exclude binary data for performance
        });
        
        if (!placement) {
            return res.status(404).json({
                success: false,
                message: 'Placement record not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: placement
        });
    } catch (error) {
        console.error('Error fetching placement:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get CV or photo for a placement
export const getPlacementFile = async (req, res) => {
    try {
        const { id, fileType } = req.params;
        
        if (!['cv', 'photo'].includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file type requested'
            });
        }
        
        const placement = await Placement.findByPk(id, {
            attributes: [fileType, `${fileType}MimeType`]
        });
        
        if (!placement) {
            return res.status(404).json({
                success: false,
                message: 'Placement record not found'
            });
        }
        
        // Set the appropriate content type
        res.setHeader('Content-Type', placement[`${fileType}MimeType`]);
        
        // Send the file
        res.send(placement[fileType]);
    } catch (error) {
        console.error(`Error fetching ${req.params.fileType}:`, error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const uploadPlacementData = (req, res) => {
  try {
    console.log('Received file:', req.file?.originalname);
    console.log('File size:', req.file?.size);
    console.log('File buffer exists:', !!req.file?.buffer);

    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const buffer = req.file.buffer;
    if (!buffer) return res.status(400).json({ error: 'No buffer found in uploaded file.' });

    const originalName = req.file.originalname.toLowerCase();
    let wb;

    if (originalName.endsWith('.csv')) {
      const csvStr = buffer.toString('utf8');
      wb = xlsx.read(csvStr, { type: 'string' });
    } else {
      wb = xlsx.read(buffer, { type: 'buffer' });
    }

    if (!wb.SheetNames.length) {
      return res.status(400).json({ error: 'No sheets found in the file.' });
    }

    const ws = wb.Sheets[wb.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(ws);

    if (!jsonData.length) {
      return res.status(400).json({ error: 'No data found in the file.' });
    }

    uploadedDataFrame = jsonData;

    return res.status(200).json({
      preview: jsonData.slice(0, 5),
      columns: Object.keys(jsonData[0] || {})
    });
  } catch (err) {
    console.error('Error during upload:', err); // Log full error
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
      stack: err.stack
    });
  }
}

export const columnFilters = (req, res) => {
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
}

export const applyColumnChanges = (req, res) => {
  const { selectColumns } = req.body;
  if (!uploadedDataFrame) return res.status(400).json({ error: 'No data available. Upload first.' });

  const filteredData = uploadedDataFrame.map(r => {
    const newRow = {};
    selectColumns.forEach(col => (newRow[col] = r[col]));
    return newRow;
  });

  res.status(200).json({ filtered_data: filteredData });
}

export const generateExcel = (req, res) => {
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
}