require('dotenv').config()
const {Sequelize} = require('sequelize')
const {CONNECTION_STRING} = process.env

const db = new Sequelize(CONNECTION_STRING)

module.exports = db