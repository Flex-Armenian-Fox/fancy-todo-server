const errorHandler = (err, req, res, next) => {
    const { name, message, data } =  err
    let statusCode = 500
    let errMessage = "Internal server error"
        
    switch (name) {
        case "JsonWebTokenError":
        case "Unauthorized":
            statusCode = 401
            errMessage = 'You are not authorized'
            break
        case "LoginFailed":
            statusCode = 401
            errMessage = 'Invalid username or password'
            break
        case "UserNotFound":
        case "TodoNotFound":
            statusCode = 404
            errMessage = `${data.table} with id ${data.id} not found`
            break
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            statusCode = 400
            errMessage = message
            break
        default:
            console.log('UncaughtError ===>',err)
            errMessage = message
            break;
    }

    return res.status(statusCode).json({ name, message: errMessage })
}

module.exports = { errorHandler }