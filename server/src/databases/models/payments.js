
module.exports = (sequelize, DataTypes)=>{
    const payments = sequelize.define('payments',{
        id: {
          allowNull:false,
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        id_user: {
          type: DataTypes.INTEGER,
          references: {
              model: 'users',
              key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'

      },
        id_order: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model:'orders', 
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        value: {
          allowNull: false,
          type: DataTypes.FLOAT,
        },
        payment_performed: {
          allowNull:false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      },
      {
        timestamps:false,
        freezeTableName: true
      })

      payments.associate = (models)=>{
        payments.belongsTo(models.orders, {foreignKey: 'id_order'})
        payments.belongsTo(models.users, {foreignKey: 'id_user'})

      }
      
      return payments;
}