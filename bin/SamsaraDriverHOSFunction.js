const { SamsaraDriverHOS } = require('../models');
const getDates = require('./utils/getDates');

const SamsaraDriverHOSFunction = function async(sdk, endCursor) {
    try {
        let options = { startDate: getDates(4, 'rfc-date'), endDate: getDates(3, 'rfc-date') };
        if (endCursor) {
            options.endCursor = endCursor;
        }

        const res = await sdk.getHosDailyLogs(options);

        res.data.forEach(driver => {
            const dbDriverData = await SamsaraDriverHOS.create({
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
            })
            console.log(dbDriverData.name + ' Completed!')
        })

        if (res.data.pagiation.hasNextPage) {
            SamsaraDriverHOSFunction(sdk, res.data.pagiation.endCursor);
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = SamsaraDriverHOSFunction;