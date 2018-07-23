const express = require('express');
const app = express();
app.use(express.static('public'));

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

module.exports = { app, runServer, closeServer };
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzZXJ2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKCdwdWJsaWMnKSk7XHJcblxyXG5sZXQgc2VydmVyO1xyXG5cclxuZnVuY3Rpb24gcnVuU2VydmVyKCkge1xyXG4gICAgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MDtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICBzZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEFwcCBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9YCk7XHJcbiAgICAgICAgICAgIHJlcyhzZXJ2ZXIpO1xyXG4gICAgICAgIH0pLm9uKCdlcnJvcicsIGVyciA9PiB7XHJcbiAgICAgICAgICAgIHJlaihlcnIpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VTZXJ2ZXIoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nsb3Npbmcgc2VydmVyJyk7XHJcbiAgICAgICAgc2VydmVyLmNsb3NlKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlaihlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xyXG4gICAgcnVuU2VydmVyKCkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgYXBwLCBydW5TZXJ2ZXIsIGNsb3NlU2VydmVyIH07Il0sImZpbGUiOiJzZXJ2ZXIuanMifQ==
