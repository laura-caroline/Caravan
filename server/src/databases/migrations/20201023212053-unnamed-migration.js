'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const trips_not_includes = queryInterface.createTable('trips_not_includes', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      id_trip: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'trips',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    },
    {
      timestamps: false,
    })

    return trips_not_includes;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('trips_not_includes')
  }
};
