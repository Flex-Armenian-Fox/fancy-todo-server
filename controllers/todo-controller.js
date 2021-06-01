const { Todo } = require('../models/index')
const { todoAuth } = require('../middlewares/auth.js')

class Controller{
    static postTodo(req, res, next){
      let data = req.body
      data.user_id = req.currentUser.id
      Todo.create(data)
          .then(result => {
              res.status(201).json({message:"created", data:result})
          })
          .catch((err) => {next(err)})
    }

    static getTodo(req, res, next){
      console.log(req.currentUser)
      Todo.findAll({where:{user_id: req.currentUser.id}})
        .then(result =>{
            res.status(200).json({data: result})
        })
        .catch((err) => {next(err)});
    }

    static getById(req, res){
        res.status(200).json(req.target)
    }

    static putTodo(req, res, next){
      let id = req.params.id
      let data = req.body
      Todo.update(data, {where:{id:id}, returning:true})
        .then(result => {
          console.log(result)
          if (result[0] == 0){
              throw {name: "TodoNotFound"}
          }
          else{
              res.status(200).json({message:"put complete", data:result[1]})
          }
        })
        .catch((err) => {next(err)});
    }

    static patchTodo(req, res, next){
      let id = req.params.id
      let data = req.body
      Todo.update(data, {where:{id:id}, returning:true})
      .then(result => {
        console.log(result)
        if (result[0] == 0){
            throw {name: "TodoNotFound"}
        }
        else{
            res.status(200).json({message:"put complete", data:result[1]})
        }
      })
      .catch((err) => {next(err)});
  }

    static deleteTodo(req, res, next){
      let id = req.params.id
      Todo.destroy({where:{id:id}})
        .then(result => {
          if (result == 0){
            throw {name: "TodoNotFound"}
          }
          else{
              res.status(200).json({message:"todo success to delete"})
          }
        })
        .catch(err => {
            res.send(err)
        })
    }
    
}

module.exports = Controller