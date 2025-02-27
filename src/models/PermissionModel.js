import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';
import Role from './RoleModel.js';// Import the Role model
import Page from './PageModel.js'; // Import the Page model

const Permission = sequelize.define('Permission', {
    id: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true,},
    role_id: {type: DataTypes.INTEGER,allowNull: false,references: { model: Role,key: 'id',},onDelete: 'CASCADE',},
    page_id: {type: DataTypes.INTEGER,allowNull: false,references: {model: Page,key: 'id',},onDelete: 'CASCADE',},
    can_view: {type: DataTypes.BOOLEAN,defaultValue: false,},
    can_create: {type: DataTypes.BOOLEAN,defaultValue: false,},
    can_update: {type: DataTypes.BOOLEAN,defaultValue: false,},
    can_delete: {type: DataTypes.BOOLEAN,defaultValue: false,},
    can_print: {type: DataTypes.BOOLEAN,defaultValue: false,},
}, 
{
    timestamps: false,
    indexes: [{ unique: true,fields: ['role_id', 'page_id'],}],
});

Permission.belongsTo(Role, { foreignKey: 'role_id' });
Permission.belongsTo(Page, { foreignKey: 'page_id' });

export default Permission;
