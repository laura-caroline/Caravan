
module.exports = (sequelize, DataTypes) => {
  const trips_includes = sequelize.define('trips_includes', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_trip: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'trips',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    name: {
      alllowNull: false,
      type: DataTypes.STRING,

    }
  },
    {
      timestamps: false,
    })

  trips_includes.associate = (models) => {
    trips_includes.belongsTo(models.trips, { foreignKey: 'id_trip' })
  }

  return trips_includes

}