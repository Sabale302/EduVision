import express from 'express';
import { getRoles, addRole, deleteRole } from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getRoles); // Route to fetch all roles
router.post('/', addRole); // Route to add a new role
router.delete('/:role_id', deleteRole); // Route to delete a role by ID

export default router;
