import Role from './RoleModel.js';
import Page from './PageModel.js';
import Permission from './PermissionModel.js';

// Define relationships
Role.hasMany(Permission, { foreignKey: 'role_id', onDelete: 'CASCADE' });
Page.hasMany(Permission, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Permission.belongsTo(Role, { foreignKey: 'role_id' });
Permission.belongsTo(Page, { foreignKey: 'page_id' });

export { Role, Page, Permission };
