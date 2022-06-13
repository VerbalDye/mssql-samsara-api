const { SamsaraTractorOdometer } = require('../models');
const getDates = require('./utils/getDates');

const SamsaraTractorOdometerFunction = function (sdk, x) {
    sdk.getVehicleStats({ time: getDates(x, 'rfc-time'), types: 'gpsOdometerMeters,obdOdometerMeters'})
        .then(res => {
            res.data.forEach(tractor => {
                if(!tractor.obdOdometerMeters) {
                    tractor.obdOdometerMeters = { value: null, time: null };
                }
                if(!tractor.gpsOdometerMeters) {
                    tractor.gpsOdometerMeters = { value: null, time: null };
                }
                SamsaraTractorOdometer.create({
                    name: tractor.name,
                    obdOdometerMeters: tractor.obdOdometerMeters.value,
                    gpsOdometerMeters: tractor.gpsOdometerMeters.value,
                    obdOdometerMetersTime: tractor.obdOdometerMeters.time,
                    gpsOdometerMetersTime: tractor.gpsOdometerMeters.time,
                    search_time: getDates(x, 'rfc-time')
                }).then(dbDriverData => console.log(dbDriverData.name + ' completed!'))
                    .catch(err => console.log(err));
            })
        })
        .catch(err => console.error(err));
}

module.exports = SamsaraTractorOdometerFunction;