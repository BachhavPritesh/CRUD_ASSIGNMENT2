const successResponse = (res, message, data, statusCode = 200, extra = {}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...extra,
    });
};

const errorResponse = (res, message, statusCode = 400, data = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        data,
    });
};

module.exports = { successResponse, errorResponse };