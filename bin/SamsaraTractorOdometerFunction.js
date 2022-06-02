const { SamsaraTractorOdometer } = require('../models');
const getDates = require('./utils/getDates');

const SamsaraTractorOdometerFunction = function (sdk) {
    sdk.getVehicleStats({ time: getDates(0, 'rfc-time'), types: 'gpsOdometerMeters,obdOdometerMeters'})
        .then(res => {
            res.data.forEach(tractor => {
                SamsaraTractorOdometer.create({
                    name: tractor.name,
                    obdOdometerMeters: tractor.obdOdometerMeters.value,
                    gpsOdometerMeters: tractor.gpsOdometerMeters.value,
                    obdOdometerMetersTime: tractor.obdOdometerMeters.time,
                    gpsOdometerMetersTime: tractor.gpsOdometerMeters.time,
                    search_time: getDates(0, 'rfc-time')
                }).then(dbDriverData => console.log(dbDriverData.name + ' completed!'))
                    .catch(err => console.log(err));
            })
        })
        .catch(err => console.error(err));
}

module.exports = SamsaraTractorOdometerFunction;