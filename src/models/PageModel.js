import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const Page = sequelize.define('Page', {
    id: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true,},
    page_name: {type: DataTypes.STRING(50),allowNull: false,unique: true,},
}, 
{
    timestamps: false,
});

export default Page;
