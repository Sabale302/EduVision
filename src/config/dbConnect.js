import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import { config } from 'dotenv';

config();

// Resolve the path to ca.pem at project root
const caCertPath = path.resolve('ca.pem');

// Debugging logs (remove once working)
console.log("✅ CA Cert path:", caCertPath);
console.log("✅ CA file exists:", fs.existsSync(caCertPath));

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT, // Ensure this is set in Render's environment
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(caCertPath)
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
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
