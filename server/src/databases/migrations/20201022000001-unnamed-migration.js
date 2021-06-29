'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const citys = queryInterface.createTable('citys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        
      },
    },
    {
      timestamps:false,
    })
    return citys;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('citys')
  }
};
