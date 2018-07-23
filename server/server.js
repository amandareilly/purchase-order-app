const app = require('./app');

let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((res, rej) => {
        server = app.listen(port, () => {
            console.log(`App listening on port ${port}`);
            res(server);
        }).on('error', err => {
            rej(err)
        });
    });
}

function closeServer() {
    return new Promise((res, rej) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                rej(err);
                return;
            }
            res();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = { runServer, closeServer };