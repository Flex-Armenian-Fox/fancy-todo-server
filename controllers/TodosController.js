'use strict'

const {todo} = require('../models/index.js');

class TodosController{
    static createData(req, res){
        console.log(req.body)
        todo.create(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            if (err.name == "SequelizeValidationError") {
                res.status(400).json({"error": err.errors})
            } else {
                res.status(500).json({"error": err})
            }
        })   
    }

    static toList(req, res){
        todo.findAll()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({"error": err})
        })
    }

    static getById(req, res){
        todo.findOne({
            where: {id: req.params.id}
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({"error": err})
        })
    }

    static updateData(req, res){
        todo.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            console.log(result[0])
            if (result[0] === 0){
                res.status(404).json("Data Not Found")
            } else {
                res.status(200).json(result[1][0])
            }
        })
        .catch(err => {
            if (err.name == "SequelizeValidationError") {
                res.status(400).json({"error": err.errors})
            } else {
                res.status(500).json({"error": err})
            }
        })
    }

    static setStatus(req, res){
        console.log("A")
        todo.update(
            {status: req.body.status}, {
                where: {
                    id: req.params.id
                }, returning: true
            }
          )
          .then(result => {
            if (result[0] === 0){
                res.status(404).json("Data Not Found")
            } else {
                res.status(200).json(result[1][0])
            }
          })
          .catch(err => {
              console.log(err)
            res.status(500).json({"error": err})
          })
    }

    static deleteData(req, res){
        todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json({"message": "todo success to delete"})
        })
        .catch(err => {
            res.status(500).json({"error": err})
        })
    }
}

module.exports = TodosController;