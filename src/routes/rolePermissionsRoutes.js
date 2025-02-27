/* eslint-disable no-unused-vars */
 
// rolePermissionsRoutes.js
import express from 'express';
import { savePermissions } from '../controllers/rolePermissionsController.js';

const router = express.Router();

// Route to save permissions
router.post('/:groupName', savePermissions);
router.get('/:groupName', getRolePermissions);

// fetch from MySQL database
const getRolePermissions = async (_req, res) => {
    try {
        const rolePermissions = await rolePermissions.findAll();
        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role permissions' });
    }
}

// update in MySQL database
const updateRolePermissions = async (req, res) => {
    try {
        const rolePermissions = req.body;
        await rolePermissions.destroy({ where: {} });
        await rolePermissions.bulkCreate(rolePermissions);
        res.status(200).json({ message: 'Role permissions updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role permissions' });
    }
}

router.get('/', getRolePermissions);
router.post('/', updateRolePermissions);

// Route to save permissions
router.post('/:groupName', savePermissions);

export default router;
