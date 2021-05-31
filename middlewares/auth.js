const { verifyToken } = require('../helpers/jwt');
const {users} = require('../models')
const {todo} = require('../models')

function authentication(req, res, next){
    try{
        console.log("A")
        const {access_token} = req.headers;
        const dataDecoded = verifyToken(access_token);

        console.log("A1")
        // users.findByPK(dataDecoded.id)
        users.findOne({
            where: {id: dataDecoded.id}
        })
        .then(user =>{
            console.log("B", user)
            if(!user) {
                throw{
                    name: "AuthenticationError",
                    message: `user with id: ${dataDecoded.id} not found`,
                }
            }

            console.log("C")
            req.currentUser = {
                id: user.id,
            }
            next();
        })
        .catch(err => {
            res.status(401).json({
                message: "invalid token"
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}

const authorizationTodo = (req, res, next) => {
    const {id} = req.params;
    
    todo.findOne({
        where: {id: id}
    })
    .then(result => {
        if (!result){
            throw {
                name: "AuthorizationError",
                message: `todo with id ${id} not found`
            }
        }
        console.log(result)
        console.log(req.currentUser.id)
        if (result.UserId == req.currentUser.id){
            return next();
        } else {
            throw{
                name: "AuthorizationError",
                message: `user with id ${req.currentUser.id} does not have permission`
            }
        }
    })
    .catch(err => {
        res.status(401).json({
            message: err || "not authorized"
        })
    })
}

module.exports= {
    authentication, authorizationTodo,
}