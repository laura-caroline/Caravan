'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const trips = queryInterface.createTable('trips', {
      id: {
        allowNull:false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_city: {
        type: Sequelize.INTEGER,
        references: {model: 'citys', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_product:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      name:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      uf:{
        allowNull:false,
        type: Sequelize.STRING
      },

      value: {
        allowNull: false,
        type: Sequelize.FLOAT,
        
      },
      duration: {
          allowNull: false,
          type: Sequelize.DATE,
        
      },
      image: { 
          type: Sequelize.STRING,
          allowNull: false 
      },
      schedule_initial:{
        allowNull: false,
        type: Sequelize.DATE,
        
    },

    schedule_end:{
        allowNull: false,
        type: Sequelize.DATE,
    }},
    {
      timestamps: false,
    })
    return trips
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('trips')
     
  }
};
