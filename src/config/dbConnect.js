import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import { config } from 'dotenv';
config();

// Directly use path to ca.pem assuming it's in the 'certs' folder in your project root
const caCertPath = path.resolve('./ca.pem');

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT, // Don't forget this if you're using a custom port like 25891
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(caCertPath)
      }
    },
    pool: {
      acquire: 30000,
      idle: 10000,
    }
  }
);

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}

connectDatabase();

export default sequelize;
