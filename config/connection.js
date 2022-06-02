const Sequelize = require('sequelize');
require('dotenv').config();

const config = {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    dialectOptions: {
        authentication: {
            type: 'ntlm',
            options: {
                domain: process.env.DB_DOMAIN,
                userName: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
            },
        },
        options: {
            instanceName: process.env.DB_INSTANCE,
        }
    },
};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    null,
    null,
    config,
);

module.exports = sequelize;