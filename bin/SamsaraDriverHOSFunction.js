const { SamsaraDriverHOS } = require('../models');
const getDates = require('./utils/getDates');

const SamsaraDriverHOSFunction = function (sdk) {
    sdk.getHosDailyLogs(getDates(3, 'rfc-date'))
        .then(res => {
            res.data.forEach(driver => {
                SamsaraDriverHOS.create({
                    name: driver.driver.name,
                    username: driver.driver.externalIds.TmwId,
                    driveDistanceMeters: driver.distanceTraveled.driveDistanceMeters,
                    activeDurationMs: driver.dutyStatusDurations.activeDurationMs,
                    onDutyDurationMs: driver.dutyStatusDurations.onDutyDurationMs,
                    driveDurationMs: driver.dutyStatusDurations.driveDurationMs,
                    offDutyDurationMs: driver.dutyStatusDurations.offDutyDurationMs,
                    sleeperBerthDurationMs: driver.dutyStatusDurations.sleeperBerthDurationMs,
                    yardMoveDurationMs: driver.dutyStatusDurations.yardMoveDurationMs,
                    personalConveyanceDurationMs: driver.dutyStatusDurations.personalConveyanceDurationMs,
                    waitingTimeDurationMs: driver.dutyStatusDurations.waitingTimeDurationMs,
                    start_time: driver.startTime,
                    end_time: driver.endTime
                }).then(dbDriverData => console.log(dbDriverData.name + ' completed!'))
                    .catch(err => console.log(err));
            })
        })
        .catch(err => console.error(err));
}

module.exports = SamsaraDriverHOSFunction;