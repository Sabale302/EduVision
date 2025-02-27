// profileRoutes.js
import express from 'express';
import { updateProfilefun, getProfile } from '../controllers/updateprofileController.js';

const router = express.Router();
router.put('/updateProfile', updateProfilefun);
router.get('/', getProfile);
export default router;
