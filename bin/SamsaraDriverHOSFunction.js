const { SamsaraDriverHOS } = require('../models');
const getDates = require('./utils/getDates');

const SamsaraDriverHOSFunction = async function (sdk, endCursor) {
    try {
        let options = { startDate: getDates(3, 'rfc-date'), endDate: getDates(3, 'rfc-date') };

        if (endCursor) {
            options.after = endCursor;
        }

        const res = await sdk.getHosDailyLogs(options);

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
            }).then(dbDriverData => {
                console.log(dbDriverData.name + ' Completed!');
            })
        })
        
        if (res.pagination.hasNextPage) {
            SamsaraDriverHOSFunction(sdk, res.pagination.endCursor);
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = SamsaraDriverHOSFunction;