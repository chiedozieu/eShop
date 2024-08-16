
export const errorMiddleware = ((error, req, res, next,) => { 
    const statuscode = error.statusCode || 500;
    const message = error.message || 'Internal Server error';
    res.status(statuscode).json({
        message, 
        success: false,
        statuscode
    });
})