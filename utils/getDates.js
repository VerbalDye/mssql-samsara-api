const dayjs = require("dayjs");

const getDates = function() {
    let end_time = dayjs().set('hour', 4).set('minute', 0).set('second', 0);
    let start_time = end_time.subtract(1, 'day');
    return { startTime: start_time.format('YYYY-MM-DDTHH:mm:ss[Z]'), endTime: end_time.format('YYYY-MM-DDTHH:mm:ss[Z]')};
}

module.exports = getDates;