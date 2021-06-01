'use strict'

const {todo} = require('../models/index.js');

class TodosController{
    static createData(req, res, next){
        console.log(req.body)
        req.body.UserId = req.currentUser.id
        todo.create(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })   
    }

    static toList(req, res, next){
        console.log(req.currentUser)
        todo.findAll({
            where: {UserId: req.currentUser.id}
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static getById(req, res, next){
        todo.findOne({
            where: {id: req.params.id}
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateData(req, res, next){
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
            next(err)
        })
    }

    static setStatus(req, res, ext){
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
              next(err)
          })
    }

    static deleteData(req, res, next){
        todo.findOne({
            where: {id: req.params.id}
        })
        .then(result => {
            if (!result) {
                throw ({
                    name: "NotFound",
                    message: `Todo with Id ${req.params.id} Not Found`
                })
            } else {
                return todo.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(() => {
            res.status(200).json({"message": "todo success to delete"})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodosController;