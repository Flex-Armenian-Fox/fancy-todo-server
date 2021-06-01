function errHandler(err, req, res, next){
    let statusCode;
    let message;
        
    switch (err.name){
        case "LoginError":
            statusCode = 400;
            message = "Email or Password is incorrect"
            break;
        case "SequelizeValidationError":
            statusCode = 400;
            message = err.errors
            break;
        case "NotFound":
            statusCode = 404;
            message = err.message
        case "AuthorizationError":
            statusCode = 401;
            message = err.message
        default:
            statusCode = 500;
            message = err.message;
            break;
    }

    res.status(statusCode).json({
        message: message
    })
}

module.exports = errHandler;