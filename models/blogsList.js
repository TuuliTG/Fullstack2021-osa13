const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class BlogsList extends Model {}

BlogsList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blogsList'
})

module.exports = BlogsList