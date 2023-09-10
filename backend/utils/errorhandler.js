




class ErrorHandler extends Error {
    constructor(message, statusCode) {
        console.log('message in class', message)
        console.log('statusCode in class', statusCode)
        console.log('casterror2');
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);


    }
}

module.exports = ErrorHandler