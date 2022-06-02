const sequelize = require('./config/connection');
const { SamsaraDriverEfficiencyFunction, SamsaraDriverHOSFunction, SamsaraTractorOdometerFunction } = require('./bin');
require('dotenv').config();

const sdk = require('api')('@samsara-dev-rel/v2019.01.01#d5k23zl3dr5d7e');
sdk.auth(process.env.SAMSARA_AUTH);

sequelize.sync({ force: false }).then(() => {
    SamsaraDriverEfficiencyFunction(sdk);
    SamsaraDriverHOSFunction(sdk);
    SamsaraTractorOdometerFunction(sdk);
});