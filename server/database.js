require("dotenv").config();

const { CONNECTION_STRING } = process.env;
// console.log(CONNECTION_STRING);
const { Sequelize } = require("sequelize");

const capstonedb = new Sequelize(CONNECTION_STRING);

module.exports = capstonedb;
