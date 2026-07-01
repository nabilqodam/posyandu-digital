const express = require('express');
const cors = require('cors');

const app = express();

require('./cron/deleteChildren');

app.use(cors());
app.use(express.json());



const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('API Backend Posyandu Aktif!');
});

module.exports = app;