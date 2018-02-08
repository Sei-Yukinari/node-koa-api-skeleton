import path from 'path';

require('dotenv').load();

const ENV = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, 'environments', ENV);
const envConfig = require(envPath);

const config = Object.assign({
  [ENV]: true,
  env: ENV,
}, envConfig);

export default config;
