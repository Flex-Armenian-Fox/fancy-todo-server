class CustomError extends Error {
    constructor(name, httpstatus = 500, data, message) {
        super(message)
        this.name = name
        this.data = data
        this.httpstatus = httpstatus
    }

    static throwNewError(err, req, res, next) {        
        const { data, name, httpstatus } = err
        let errorMessage = 'Internal Server Error'

        switch (name) {
            case "LoginFailed":
                errorMessage = 'Invalid username or password'
                break
            case "NotFound":
                errorMessage = `${data.table} with id ${data.id} not found`
                break            
            case "SequelizeValidationError":
            case "SequelizeUniqueConstraintError":
                httpstatus = 400
                errorMessage = err.errors[0].message
                break
            case "Unauthorized":
            case "JsonWebTokenError":
                httpstatus = 401
                errorMessage = 'You are not authorized'
                break
            default:
                console.log("UncaughtError ", err)
                httpstatus = 500
                break
        }
        return res.status(httpstatus).json({ status: 'Error', name: name, message: errorMessage})
    }
}

module.exports = CustomError