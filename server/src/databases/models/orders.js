

module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

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
        id_trip: {
            type: DataTypes.INTEGER,
            references: { 
                model: 'trips', 
                key: 'id' 
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        numbers_people: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
        schedule_initial: {
            allowNull: false,
            type: DataTypes.DATE
        },
        schedule_end: {
            allowNull: false,
            type: DataTypes.DATE
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    }, 
    {
        timestamps: false,
    })

    orders.associate = (models) => {
        orders.belongsTo(models.users, { foreignKey: 'id_user'}),
        orders.belongsTo(models.trips, { foreignKey: 'id_trip'}),
        orders.hasMany(models.payments, {foreignKey: 'id_order'})

    }
    
    return orders;
}