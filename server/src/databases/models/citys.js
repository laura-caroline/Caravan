
module.exports = (sequelize, DataTypes)=>{
    const citys = sequelize.define('citys', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            
        },
    },
    {
        timestamps: false,
    })
    
    citys.associate = (models)=>{
        citys.hasMany(models.trips, {foreignKey: 'id_city'})
    }

    return citys;
}