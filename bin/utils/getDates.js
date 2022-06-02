const dayjs = require("dayjs");

const getDates = function (dayOffset, format) {
    let date = dayjs().subtract(dayOffset, 'day').set('hour', 4).set('minute', 0).set('second', 0);
    if (format === 'rfc-time') {
        return date.format('YYYY-MM-DDTHH:mm:ss[Z]');
    } else if(format === 'rfc-date') {
        return date.format('YYYY-MM-DD');
    } else {
        throw new Error('Invalid Date Format');
    }
}

module.exports = getDates;