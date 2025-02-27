import express from 'express';
import multer from 'multer';
import { savePlacementData } from '../controllers/placementController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/save', upload.fields([{ name: 'cv' }, { name: 'photo' }]), savePlacementData);

export default router;
