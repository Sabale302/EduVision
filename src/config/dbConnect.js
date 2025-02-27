import { Sequelize } from "sequelize";
import process from 'process';
import { config } from 'dotenv'
config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST, // Access host from environment variable
        dialect: "mysql",
    }
);

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

connectDatabase();

export default sequelize;