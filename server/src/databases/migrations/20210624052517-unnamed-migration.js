'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orders = queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

      },
      id_trip: {
        type: Sequelize.INTEGER,
        references: {
          model: 'trips',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      numbers_people: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      schedule_initial: {
        allowNull: false,
        type: Sequelize.DATE
      },
      schedule_end: {
        allowNull: false,
        type: Sequelize.DATE
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: false,
    })

    return orders;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders')
  }
};
