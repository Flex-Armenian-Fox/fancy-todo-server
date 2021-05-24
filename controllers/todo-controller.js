const { Todo } = require('../models/index')

class Controller{
    static postTodo(req, res){
        let data = req.body
        Todo.create(data)
            .then(result => {
                console.log(result);
                res.status(201).json({message:"created", data:result})
            })
            .catch((err) => {
                if (err.name == "SequelizeValidationError") {
                  let message = [];
                  for (let i = 0; i < err.errors.length; i++) {
                    const e = err.errors[i];
                    message.push(e.message);
                  }
                  console.log("message:", message);
                  res.status(400).json({
                    message: message,
                  });
                } else {
                  res.status(500).json({
                    message: err,
                  });
                }
              });
    }

    static getTodo(req, res){
        Todo.findAll()
            .then(result =>{
                res.status(200).json({data: result})
            })
            .catch((err) => {
                res.status(500).json({message: err})
              });
    }

    static getById(req, res){
        let id = req.params.id
        Todo.findOne({where:{id:id}})
            .then(result =>{
                if (!result){
                    res.status(404).json({message: "error not found"})
                } else {
                    res.status(200).json({data: result})
                }
            })
            .catch((err) => {
                res.status(500).json({message: err})
            });
    }


    static putTodo(req, res){
        let id = req.params.id
        let data = req.body
        Todo.update(data, {where:{id:id}, returning:true})
            .then(result => {
                if (result[0] == 0){
                    res.status(404).json({message: "error not found"})
                }
                else{
                    console.log(result);
                    res.status(200).json({message:"put complete", data:result[1]})
                }
            })
            .catch((err) => {
                if (err.name == "SequelizeValidationError") {
                  let message = [];
                  for (let i = 0; i < err.errors.length; i++) {
                    const e = err.errors[i];
                    message.push(e.message);
                  }
                  console.log("message:", message);
                  res.status(400).json({
                    message: message,
                  });
                } else {
                  res.status(500).json({
                    message: err,
                  });
                }
              });
    }

    static patchTodo(req, res){
        let id = req.params.id
        let data = req.body
        Todo.update(data, {where:{id:id}, returning:true})
            .then(result => {
                if (result[0] == 0){
                    res.status(404).json({message: "error not found"})
                }
                else{
                    console.log(result);
                    res.status(200).json({message:"patch complete", data:result[1]})
                }
            })
            .catch((err) => {
                if (err.name == "SequelizeValidationError") {
                  let message = [];
                  for (let i = 0; i < err.errors.length; i++) {
                    const e = err.errors[i];
                    message.push(e.message);
                  }
                  console.log("message:", message);
                  res.status(400).json({
                    message: message,
                  });
                } else {
                  res.status(500).json({
                    message: err,
                  });
                }
              });
    }

    static deleteTodo(req, res){
        let id = req.params.id
        Todo.destroy({where:{id:id}})
            .then(result => {
                if (result == 0){
                    res.status(404).json({message: "error not found"})
                }
                else{
                    res.status(200).json({message:"todo success to delete", data:result[1]})
                }
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
    }
    
}

module.exports = Controller