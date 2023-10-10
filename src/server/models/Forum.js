const db = require('../util/database')
const {DataTypes} = require('sequelize')

const Forum = db.define('forum', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  title: DataTypes.STRING,
  prompt: DataTypes.STRING({length: 3000}),
})

module.exports = Forum