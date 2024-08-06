const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const User = require('./models/User');

const corsOptions = {
    origin: '*',
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const port = 3000;

////Create User
app.post('/user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Login
app.post('/login', async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const user = await User.findOne({ where: { name, password } });
        if (user) {
            const userNoPasswd = user.toJSON();
            delete userNoPasswd.password
            res.status(200).json({ user });
        } else {
            res.status(401).json({ error: 'User not found!' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Server running at http://localhost:' + port);
    });
});