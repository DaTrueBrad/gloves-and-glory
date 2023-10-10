const db = require('../util/database')
const {DataTypes} = require('sequelize')

const User = db.define('user', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  username: DataTypes.STRING({length: 20}),
  password: DataTypes.STRING
})

module.exports = User