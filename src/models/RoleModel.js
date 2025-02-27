import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const Role = sequelize.define('Role', {
    id: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true,},
    role_name: {type: DataTypes.STRING(50),allowNull: false,unique: true,},
}, 
{
    timestamps: false, // Disable timestamps if not needed
});

export default Role;
