'use strict'

function errorHandler (err, req, res, next) {

    let httpStatus
    let errMessage
    
    switch (err.name) {

        case 'SequelizeValidationError':
            httpStatus = 400
            errMessage = err.message
            break

        case 'Login Fail':
        case 'Not Authorised':
            httpStatus = 401
            errMessage = err.message
            break

        case 'Not Found':
            httpStatus = 404
            errMessage = err.message
            break

        case 'UniqueConstraintError':
            httpStatus = 409
            errMessage = err.message
            break

        default:
            httpStatus = 500
            errMessage = 'Internal Server Error'
            
    }

    res.status(httpStatus).json({
        message: errMessage
    })

}

module.exports = errorHandler