import { Sequelize } from 'sequelize';
import process from 'process';
import { config } from 'dotenv';
config();

// Your CA certificate content
const caCert = `
-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUOrJ2/VPkeXA002ILp7zkIhBjaCUwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1NWZhZTcxNjktMDI4ZS00MWJjLWJmOGUtYzJjYmFlZDIx
NGNjIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwNDE2MTYzMjIwWhcNMzUwNDE0MTYz
MjIwWjBAMT4wPAYDVQQDDDU1ZmFlNzE2OS0wMjhlLTQxYmMtYmY4ZS1jMmNiYWVk
MjE0Y2MgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAIL/y//+YTAYn6bDB/Qwc+ZQXd3cKCFkeiZRkTI5uIuQvrCUDQXLNjaZ
EHzbMF/k8bPvhX5QyqRJ5xJtM024zGW/KMpps0VsMVmYtZayZNSF0a6uXgkaZPj/
WZ4ZRfHiVA3fue4NWYQkjTpJ9QBBWZDEsnHAPVqghNuhX39m6iNrsabw0fk6RmcQ
W5bjZoICIOz9/zxW8/wH3TsABsXhUvtb02qo4aaBd9mum4gOU9gJECwrWEieAcbF
oSJZVPmL8l88iSvVd4D4J31T63+G2xFQuzemGKa/gXAMMr6+/XW+BB2BtDMhFFI5
K52J8iU3J3RiAm/IYo3Towk17B+gJbp5feX+/Z+k4RWv+viYOUQj9chC0P2tNaTv
vGCSDqo6XS0tRNDGMYnn4L/qaLpK5rhkxajtuldui8TwgrCUx8h+YLdLXB1xo9KM
w8tU8G3H7ZZtZx9viJG2gDAG3zcb2dPMnyGx/I0NnHbpNiM02/tQJal+Oe+kirEn
hzbowqjLgwIDAQABoz8wPTAdBgNVHQ4EFgQUvtYejhBLIeeZoirDZvklo56k1k4w
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
AGsYoMIsUI/ALP3CJ0JkekW+hYlm2ul5rT1HFOsKWDylfx0bSML0dwU2k5exFQtp
6xEa5d9IAI1KUYllLsMfq5s5lvGAQ31sOWeoLFbeVucxsOHk1eX7nWHF5GcBmPxb
Y8TZNT1xf+DhE7473A0cuN2m7zF6GQ5Ofm/hgdl+Xvj9HXUDXpBCk5rGz9iUQ8dw
vZqT3sIthG8aK9ytqddyyJwncQPHxbqJF+FAeTVT+tWmiABtp8AIZlrjktJkp5Uo
U32IQuekjA1B4AxIsl1NoGz4Gyuj2FtqkT/xRehr82ud9LFt5RNNFiTqV2MdWa0d
8lXHZEq5icMVA8Tb99+J8L2LDUlEzUIDuaIeMm9Cj3iHEidcuEuE+JlslRxCU7tM
mh4PJXi1xOYMt65Kcz1ouAqWKhFHJJGlf5vIdXBh//SS3HlYud1PyPHVaO7AiAKZ
qppIhhXnKHv349FzHAQ+QtA2UqZtpk8NDYICyIX98mcjAdbZ/DvSHwr8Eb11chpp
pw==
-----END CERTIFICATE-----
`;

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
        ca: caCert
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 10000
    },
    connectTimeout: 60000,
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
