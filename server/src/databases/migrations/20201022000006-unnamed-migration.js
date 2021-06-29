'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users_trips = queryInterface.createTable('users_trips', {
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
        onUpdate: 'CASCADE',
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
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
      numbers_people: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      end_price: {
        allowNull: false,
        type: Sequelize.FLOAT
      }

    },
    {
      timestamps: false,
    })
    
    return users_trips;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_trips')
  }
};
