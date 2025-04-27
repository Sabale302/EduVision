import express from 'express';
import { getProfile, updateProfilefun } from '../controllers/updateprofileController.js';

const router = express.Router();

router.get('/', getProfile);
router.put('/updateProfile', updateProfilefun);

export default router;
