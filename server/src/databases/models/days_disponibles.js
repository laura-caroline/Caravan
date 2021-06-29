module.exports = (sequelize, DataTypes) => {
  const days_disponibles = sequelize.define('days_disponibles', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_trip: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'trips', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    day: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
  })


  days_disponibles.associate = (models) => {
    days_disponibles.belongsTo(models.trips, { foreignKey: 'id_trip' })
  }
  
  return days_disponibles;
}