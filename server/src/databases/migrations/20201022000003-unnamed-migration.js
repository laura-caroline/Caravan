'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = queryInterface.createTable('users',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      hierarchy: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      timestamps: false,
    })
    return users;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};
