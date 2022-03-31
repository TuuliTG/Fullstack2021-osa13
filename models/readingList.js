const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readingList'
})

module.exports = ReadingList