module.exports = (sequelize, DataTypes) => {
  const trips_not_includes = sequelize.define('trips_not_includes', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, 
  {
    timestamps: false,
  })

  trips_not_includes.associate = (models) => {
    trips_not_includes.belongsTo(models.trips, { foreignKey: 'id_trip' })
  }
  
  return trips_not_includes;

}