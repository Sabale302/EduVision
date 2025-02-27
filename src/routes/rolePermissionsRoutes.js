// rolePermissionsRoutes.js
import express from 'express';
import { savePermissions , getPermissions} from '../controllers/rolePermissionsController.js';

const router = express.Router();

// Route to save permissions
router.post('/:groupName', savePermissions);
router.get('/:groupName', getPermissions);

export default router;
