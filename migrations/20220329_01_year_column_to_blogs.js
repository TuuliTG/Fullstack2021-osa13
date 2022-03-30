const { DataTypes, INTEGER } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.addColumn('blogs', 'year', {
        type: DataTypes.INTEGER,
        
        validate: {
            min: 1991,
            max: parseInt(new Date().getFullYear())
        },
        allowNull: false
      })
    },
    down: async ({ context: queryInterface}) => {
        await queryInterface.removeColumn('blogs', 'year')
    }
}
