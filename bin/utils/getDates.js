const dayjs = require("dayjs");

const getDates = function (dayOffset, format) {
    let end_time = dayjs().subtract(-dayOffset, 'day').set('hour', 4).set('minute', 0).set('second', 0);
    let start_time = end_time.subtract(1, 'day');
    if (format === 'rfc-full') {
        return { startTime: start_time.format('YYYY-MM-DDTHH:mm:ss[Z]'), endTime: end_time.format('YYYY-MM-DDTHH:mm:ss[Z]') };
    } else if(format === 'rfc') {
        console.log({ startTime: start_time.format('YYYY-MM-DD'), endTime: end_time.format('YYYY-MM-DD') });
        return { startTime: start_time.format('YYYY-MM-DD'), endTime: end_time.format('YYYY-MM-DD') };
    } else {
        throw new Error('Invalid Date Format');
    }
}

module.exports = getDates;