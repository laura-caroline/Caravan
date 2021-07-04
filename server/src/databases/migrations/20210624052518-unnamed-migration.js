'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const payments = queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      id_order: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      value: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      payment_performed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: false,
    })

    return payments;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payments')
  }
};
