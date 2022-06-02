const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SamsaraDriverEfficiency extends Model { };

SamsaraDriverEfficiency.init(
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
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalDistanceDrivenMeters: {
            type: DataTypes.INTEGER
        },
        totalDriveTimeDurationMs: {
            type: DataTypes.INTEGER
        },
        totalIdleTimeDurationMs: {
            type: DataTypes.INTEGER
        },
        totalPowerTakeOffDurationMs: {
            type: DataTypes.INTEGER
        },
        totalFuelConsumedMl: {
            type: DataTypes.INTEGER
        },
        greenBandDrivingDurationMs: {
            type: DataTypes.INTEGER
        },
        coastingDurationMs: {
            type: DataTypes.INTEGER
        },
        anticipationBrakeEventCount: {
            type: DataTypes.INTEGER
        },
        totalBrakeEventCount: {
            type: DataTypes.INTEGER
        },
        start_time : {
            type: DataTypes.STRING,
            allowNull: false
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'samsaraDriverEfficiency'
    }
)

module.exports = SamsaraDriverEfficiency;