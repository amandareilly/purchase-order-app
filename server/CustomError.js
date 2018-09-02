class CustomServerError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
        this.message = message;
        this.statusCode = statusCode;
    }

    static handle(err, res, statusCode = 500, message = 'Internal server error.') {
        // if we didn't get a custom error, we're going to 
        // respond with the status code and message we received
        if (!err.statusCode) {
            console.error(err);
            res.status(statusCode).json({ message: message });
        } else {
            // otherwise we'll return the message and status code
            res.status(err.statusCode).json({ message: err.message });
        }
    }
}

module.exports = CustomServerError;