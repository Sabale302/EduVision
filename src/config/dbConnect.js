import { Sequelize } from "sequelize";
import process from 'process';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(path.resolve(), process.env.SSL_CA_PATH))
      },
      connectTimeout: 10000
    },
    logging: console.log // optional for debugging
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
