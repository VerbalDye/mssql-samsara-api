const { SamsaraDriverEfficiency } = require('../models');
const getDates = require('./utils/getDates');

const SamsaraDriverEfficiencyFunction = function (sdk) {
    sdk.getDriverEfficiency(getDates(0, 'rfc-full'))
        .then(res => {
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
}

module.exports = SamsaraDriverEfficiencyFunction;