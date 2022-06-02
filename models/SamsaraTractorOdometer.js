const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SamsaraTractorOdometer extends Model { };

SamsaraTractorOdometer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        obdOdometerMeters: {
            type: DataTypes.INTEGER
        },
        gpsOdometerMeters: {
            type: DataTypes.INTEGER
        },
        obdOdometerMetersTime: {
            type: DataTypes.STRING
        },
        gpsOdometerMetersTime: {
            type: DataTypes.STRING
        },
        search_time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'samsaraTractorOdometer'
    }
)

module.exports = SamsaraTractorOdometer;