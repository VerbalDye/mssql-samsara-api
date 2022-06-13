const sequelize = require('./config/connection');
const { SamsaraDriverEfficiencyFunction, SamsaraDriverHOSFunction, SamsaraTractorOdometerFunction } = require('./bin');
require('dotenv').config();

const sdk = require('api')('@samsara-dev-rel/v2019.01.01#d5k23zl3dr5d7e');
sdk.auth(process.env.SAMSARA_AUTH);

sequelize.sync({ force: false }).then(() => {
    for(let x = 13; x < 469; x++) {
    SamsaraDriverEfficiencyFunction(sdk, x);
    SamsaraDriverHOSFunction(sdk, null, x);
    SamsaraTractorOdometerFunction(sdk, x);
    }
});