const app = require('./server');
const config = require('./config');
const PORT = config[process.env.NODE_ENV] || 3000;

app.listen(PORT, (error) => {
    if (error) return console.log('ERROR: ', error);
    console.log(`App listening on port ${PORT}`);
});