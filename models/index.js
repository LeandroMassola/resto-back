const {config} = require('../models/config')
const {Sequelize} = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect:'mysql'
})

sequelize.authenticate()
.then(()=> console.log('conectado a mysql'))
.catch(error=> console.log('error al conectar' + error))

module.exports = sequelize