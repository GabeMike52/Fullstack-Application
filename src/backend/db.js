const {  Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connecting with the database.');
    } catch (error) {
        console.log('ERROR', e);
    }
};

testConnection();
module.exports = sequelize;