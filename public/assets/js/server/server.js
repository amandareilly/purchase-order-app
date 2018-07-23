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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzZXJ2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcclxuXHJcbmxldCBzZXJ2ZXI7XHJcblxyXG5mdW5jdGlvbiBydW5TZXJ2ZXIoKSB7XHJcbiAgICBjb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDgwO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xyXG4gICAgICAgIHNlcnZlciA9IGFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQXBwIGxpc3RlbmluZyBvbiBwb3J0ICR7cG9ydH1gKTtcclxuICAgICAgICAgICAgcmVzKHNlcnZlcik7XHJcbiAgICAgICAgfSkub24oJ2Vycm9yJywgZXJyID0+IHtcclxuICAgICAgICAgICAgcmVqKGVycilcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZVNlcnZlcigpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ2xvc2luZyBzZXJ2ZXInKTtcclxuICAgICAgICBzZXJ2ZXIuY2xvc2UoZXJyID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqKGVycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XHJcbiAgICBydW5TZXJ2ZXIoKS5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBydW5TZXJ2ZXIsIGNsb3NlU2VydmVyIH07Il0sImZpbGUiOiJzZXJ2ZXIuanMifQ==
