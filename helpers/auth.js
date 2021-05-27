const {jwtDecrypt} = require("./jwt")
const {User, Todo} = require("../models")

const authentication = (req, res, next) =>{
    try{
        const {access_token} = req.headers
        const dataDecoded = jwtDecrypt(access_token)
        User.findByPk(dataDecoded.id)
            .then(user => {
                if (!user){
                    throw {name: "AuthenticationError", message:"User not Found"}
                } else {
                    req.currentUser = {id: user.id}
                    next()
                }
            }) .catch(err => {
                res.status(401).json({message: "invalid token"})
            })
    } catch(err) {
        res.status(401).json({message:"invalid token"})
    } 
}

const todoAuth = (req, res, next) =>{
    const id = req.params.id

    Todo.findOne({where:{id:id}})
        .then(todo =>{
            if (!todo) {
                throw {
                    name: "AuthorizationError",
                    message: `todo with id ${id} not found`,
                }
            }
            if (todo.user_id == req.currentUser.id) next()
            else throw {name:"Authorization Error", message:"User do not have permission"}
        }) .catch(err =>{
            res.status(401).json({message: err || `not authorized`})
        })
}

module.exports = {authentication, todoAuth}