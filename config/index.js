require('dotenv').config();

const env = process.env.NODE_ENV || "development";

const setEnv = () => {

  if (env === "development" || env === "test") {
    // const config = require("./config.json");
    // const envConfig = config[env];
    const envConfig = {
      PORT: process.env.PORT,
      MONGODB_URI: process.env.MONGODB_URI
    }
    console.log(envConfig);
  
    Object.keys(envConfig).forEach((key) => {
      process.env[key] = envConfig[key];
    });
  }
  
}

module.exports = setEnv;

