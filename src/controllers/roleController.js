import Role from '../models/RoleModel.js';

// Get all roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch roles' });
    }
};

// Add a new role
export const addRole = async (req, res) => {
    const { role_name } = req.body;

    if (!role_name) {
        return res.status(400).json({ message: 'Role name is required' });
    }

    try {
        const newRole = await Role.create({ role_name });
        res.status(201).json(newRole);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create role' });
    }
};

// Delete a role by ID
export const deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findByPk(roleId);  // Correct the method to find the role

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        await role.destroy();  // Correct the method to destroy the role
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ message: 'Failed to delete role', error: error.message });
    }
};
