const sequelize = require('./config/connection');
const { SamsaraDriverEfficiency } = require('./models');
const getDates = require('./utils/getDates');
require('dotenv').config();

const sdk = require('api')('@samsara-dev-rel/v2019.01.01#d5k23zl3dr5d7e');

sdk.auth(process.env.SAMSARA_AUTH);

sequelize.sync({ force: false }).then(() => {
    sdk.getDriverEfficiency(getDates())
        .then(res => {
            console.log(res.data.summaryStartTime, res.data.summaryEndTime);
            res.data.driverSummaries.forEach(summary => {
                SamsaraDriverEfficiency.create({
                    name: summary.driver.name,
                    username: summary.driver.username,
                    totalDistanceDrivenMeters: summary.totalDistanceDrivenMeters,
                    totalDriveTimeDurationMs: summary.totalDriveTimeDurationMs,
                    totalIdleTimeDurationMs: summary.totalIdleTimeDurationMs,
                    totalPowerTakeOffDurationMs: summary.totalPowerTakeOffDurationMs,
                    totalFuelConsumedMl: summary.totalFuelConsumedMl,
                    greenBandDrivingDurationMs: summary.greenBandDrivingDurationMs,
                    coastingDurationMs: summary.coastingDurationMs,
                    anticipationBrakeEventCount: summary.anticipationBrakeEventCount,
                    totalBrakeEventCount: summary.totalBrakeEventCount,
                    start_time: res.data.summaryStartTime,
                    end_time: res.data.summaryEndTime
                }).then(dbDriverData => console.log(dbDriverData.name + ' completed!'))
                    .catch(err => console.log(err));
            })
        })
        .catch(err => console.error(err));
});