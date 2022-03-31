const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_list', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        }
    })
    await queryInterface.createTable('blogs_list', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        blog_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'blogs', key: 'id' },
        },
        reading_list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'reading_list', key: 'id' },
        },
        read: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false
        }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs_list')
    await queryInterface.dropTable('reading_list')
  },
}