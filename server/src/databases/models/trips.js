

module.exports = (sequelize, DataTypes) => {
    const trips = sequelize.define('trips', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_product: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        id_price: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        id_city: {
            type: DataTypes.INTEGER,
            references: {
                model: 'citys',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        uf: {
            allowNull: false,
            type: DataTypes.STRING
        },

        value: {
            allowNull: false,
            type: DataTypes.FLOAT,

        },
        duration: {
            allowNull: false,
            type: DataTypes.DATE,

        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schedule_initial: {
            allowNull: false,
            type: DataTypes.DATE,
        },

        schedule_end: {
            allowNull: false,
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false,
    })

    trips.associate = (models) => {
        trips.belongsTo(models.citys, { foreignKey: 'id_city' })
        trips.hasMany(models.orders, {foreignKey: 'id_trip'})
        trips.hasMany(models.trips_includes, { foreignKey: 'id_trip' })
        trips.hasMany(models.trips_not_includes, { foreignKey: 'id_trip' })
        trips.hasMany(models.days_disponibles, { foreignKey: 'id_trip' })
    }

    return trips;
}