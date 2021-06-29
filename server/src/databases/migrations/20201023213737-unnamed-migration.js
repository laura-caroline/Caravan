'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const days_disponibles = queryInterface.createTable('days_disponibles', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_trip: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'trips', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      day: {
        allowNull: false,
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
    })
    return days_disponibles;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('days_disponibles')
  }
};
