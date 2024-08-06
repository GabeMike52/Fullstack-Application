const sequelize = require('./db');
require('./models/User');

const syncDB = async () => {
    try {
        await sequelize.sync({ force: true });
    } catch (error) {
        console.log('ERROR', error);
    }
};

syncDB();