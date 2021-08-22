require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

console.log("Environment = " + env)
module.exports = {
  port: process.env.PORT || 5000,
  dbpath: process.env.DB_PATH,
  latestApiVersion: process.env.API_VERSION
}
