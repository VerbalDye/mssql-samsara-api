const { SamsaraDriverEfficiency } = require('../models');
const getDates = require('./utils/getDates');

const SamsaraDriverEfficiencyFunction = async function (sdk, x) {
    sdk.getDriverEfficiency({ startTime: getDates(1 + x, 'rfc-time'), endTime: getDates(x, 'rfc-time') })
        .then(res => {
            console.log(res);
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
                    cruiseControlDurationMs: summary.coastingDurationMs,
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