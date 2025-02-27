import express from 'express';
import { getRoles, addRole, deleteRole } from '../controllers/roleController.js';

const router = express.Router();

// Route to fetch all roles
router.get('/', getRoles);

// Route to add a new role
router.post('/', addRole);

// Route to delete a role by ID
router.delete('/:role_id', deleteRole);

export default router;
