const db = require('../util/database')
const {DataTypes} = require('sequelize')

const Comment = db.define('comment', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  comment: DataTypes.STRING,

})

module.exports = Comment