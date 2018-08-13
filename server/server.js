const mongoose = require('mongoose');
const app = require('./app');
const { PORT, DATABASE_URL } = require('./config');

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((res, rej) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
        })
        server = app.listen(port, () => {
            console.log(`App listening on port ${port}`);
            res(server);
        }).on('error', (err) => {
            mongoose.disconnect();
            rej(err);
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {
    runServer,
    closeServer,
};