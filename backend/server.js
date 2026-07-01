require('dotenv').config();

const app = require('./app');
const db = require('./database/config');

const PORT = process.env.APP_PORT || 3000;

db.getConnection()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('Database failed:', err.message);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});