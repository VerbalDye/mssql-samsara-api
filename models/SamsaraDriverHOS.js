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
            type: DataTypes.STRING
        },
        driveDistanceMeters: {
            type: DataTypes.INTEGER
        },
        activeDurationMs: {
            type: DataTypes.INTEGER
        },
        onDutyDurationMs: {
            type: DataTypes.INTEGER
        },
        driveDurationMs: {
            type: DataTypes.INTEGER
        },
        offDutyDurationMs: {
            type: DataTypes.INTEGER
        },
        sleeperBerthDurationMs: {
            type: DataTypes.INTEGER
        },
        yardMoveDurationMs: {
            type: DataTypes.INTEGER
        },
        personalConveyanceDurationMs: {
            type: DataTypes.INTEGER
        },
        waitingTimeDurationMs: {
            type: DataTypes.INTEGER
        },
        start_time: {
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
        modelName: 'samsaraDriverHOS'
    }
)

module.exports = SamsaraDriverEfficiency;