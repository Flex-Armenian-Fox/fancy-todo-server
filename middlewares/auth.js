const {jwtDecrypt} = require("../helpers/jwt")
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
                next(err)
            })
    } catch(err) {
        next(err)
    } 
}

const todoAuth = (req, res, next) =>{
    const id = req.params.id

    Todo.findOne({where:{id:id}})
        .then(todo =>{
            if (!todo) {
                throw {
                    name: "TodoNotFound",
                    message: `todo with id ${id} not found`,
                }
            }
            if (todo.user_id == req.currentUser.id) {
                req.target = todo
                next()
            }
            else throw {name:"AuthorizationError"}
        }) .catch(err =>{
            next(err)
        })
}

module.exports = {authentication, todoAuth}