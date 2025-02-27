import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('Student', 'Faculty', 'Admin', 'HOD', 'TPO', 'Superadmin','Principal'), defaultValue: 'Student' },
    full_name: { type: DataTypes.STRING, allowNull: true },  // Allow null if you are not always updating this field
    phone: { type: DataTypes.STRING, allowNull: true },      // Allow null for optional field
    address: { type: DataTypes.STRING, allowNull: true }     // Allow null for optional field
});

export default User;
