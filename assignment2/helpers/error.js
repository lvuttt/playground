class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    res.status(err.statusCode || 500).json({
        status: "error",
        statusCode: err.statusCode || 500,
        message: err.message
    });
};

module.exports = {
    "CustomError": CustomError,
    "handleError": handleError,
}