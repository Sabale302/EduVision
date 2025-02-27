import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/manageUserController.js';

const router = express.Router();

router.get('/', getAllUsers);          // Fetch all users
router.delete('/:role_id', deleteUser);     // Delete user by ID

export default router;
