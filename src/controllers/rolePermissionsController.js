import { Role, Page, Permission } from '../models/associations.js';

// Controller function to save permissions
export const savePermissions = async (req, res) => {
    const { rolePermissions } = req.body;  // Updated data structure: rolePermissions as object
    const { groupName } = req.params;  // Capture groupName from URL parameter

    console.log("Received rolePermissions:",rolePermissions);
    console.log(rolePermissions);
    console.log(groupName);

    // Validate the rolePermissions structure
    if (typeof rolePermissions !== 'object' || Object.keys(rolePermissions).length === 0) {
        return res.status(400).json({ message: 'Invalid permissions structure' });
    }

    try {
        // Find the role by name
        const role = await Role.findOne({ where: { role_name: groupName } });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        const roleId = role.role_id;

        // Loop over each page and operation to save permissions
        for (const [pageId, operations] of Object.entries(rolePermissions)) {
            const page = await Page.findByPk(pageId);
            if (!page) {
                continue;  // Skip invalid pages
            }

            // Clear existing permissions for the role and page
            await Permission.destroy({ where: { role_id: roleId, page_id: pageId } });

            // Save new permissions for the current page
            const permissionData = {
                role_id: roleId,
                page_id: pageId,
                can_view: operations.can_view || false,
                can_create: operations.can_create || false,
                can_update: operations.can_update || false,
                can_delete: operations.can_delete || false,
                can_print: operations.can_print || false,
            };

            // Create the new permission
            await Permission.create(permissionData);
        }

        res.status(200).json({ message: 'Permissions saved successfully' });
    } catch (error) {
        console.error("Error saving permissions:", error);
        res.status(500).json({ message: 'Failed to save permissions' });
    }
};

export const getPermissions = async (req, res) => {
    const { groupName } = req.params;
    console.log("Fetching permissions for role:", groupName);

    try {
        // Check if groupName is received correctly
        if (!groupName) {
            console.error("Error: groupName is undefined");
            return res.status(400).json({ message: 'Invalid group name' });
        }

        // Find the role by name
        const role = await Role.findOne({ where: { role_name: groupName } });

        if (!role) {
            console.error(`Error: Role '${groupName}' not found`);
            return res.status(404).json({ message: `Role '${groupName}' not found` });
        }

        console.log("Role found:", role);

        // Ensure role ID is fetched correctly
        const roleId = role.role_id;  
        console.log("Role ID:", roleId);

        // Fetch permissions for the role
        const permissions = await Permission.findAll({ where: { role_id: roleId } });

        if (!permissions || permissions.length === 0) {
            console.warn(`Warning: No permissions found for role '${groupName}'`);
        }

        console.log("Permissions retrieved:", permissions);

        // Format the permissions data
        const rolePermissions = {};
        permissions.forEach(permission => {
            rolePermissions[permission.page_id] = {
                can_view: permission.can_view,
                can_create: permission.can_create,
                can_update: permission.can_update,
                can_delete: permission.can_delete,
                can_print: permission.can_print,
            };
        });

        res.status(200).json({ rolePermissions });
    } catch (error) {
        console.error("Error fetching permissions:", error);
        res.status(500).json({ message: 'Failed to fetch permissions', error: error.message });
    }
};