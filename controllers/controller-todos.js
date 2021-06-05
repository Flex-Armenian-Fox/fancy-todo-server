'use strict'

const axios = require('axios')
const {Todo} = require('../models')
const getToday = require('../helpers/today.js')

class ControllerTodo {

    static getWeather (req, res, next) {
        axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
              q: 'Jakarta',
              appid: process.env.OPENWEATHER_APIKEY,
              units: 'metric',
              lang: 'id'
            }
          })
          .then(response => {
    
            res.status(200).json({
                city: response.data.name,
                date: getToday(new Date()),
                weather: response.data.weather,
                actual_temperature: `${response.data.main.temp}°C`,
                feels_like: `${response.data.main.feels_like}°C`,
            })
          })
          .catch(err => {
              next(err)
          })
    }

    static showAll (req, res, next) {
        Todo.findAll({
            where: {UserId: req.currentUser.id},
            order: [['due_date', 'ASC']]
        })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                next(err)
                // res.status(500).json({
                //     message: `Internal server error`
                // })
            })
    }

    static createNew (req, res, next) {
        const input = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.currentUser.id
        }
        Todo.create(input)
            .then(newTodo => {
                res.status(201).json({newTodo})
            })
            .catch(err => {
                next(err)
            })
    }

    static showOne (req, res, next) {
        const todoId = +req.params.id
        
        Todo.findByPk(todoId)
            .then(todo => {
                if (todo === null) {
                    throw {
                        name: 'Not Found',
                        message: `Todo with ID ${todoId} does not exist`
                    }
                } else {
                    res.status(200).json({todo}) 
                }
            })
            .catch(err => {
                next(err)

                // if (err.name === 'Not Found') {
                //     res.status(404).json({
                //         message: err.message
                //     })
                // } else if (err.name === 'Not Authorised') {
                //     res.status(401).json({
                //         message: err.message
                //     })
                // }
            })
    }

    static putOne (req, res, next) {
        const {title, description, status, due_date} = req.body
        const todoId = +req.params.id
        Todo.update({title, description, status, due_date}, {
            where: {id: todoId},
            returning: true
        })
            .then(updated => {
                if (updated[0] === 0) {
                    throw {
                        name: 'Not Found',
                        message: `Todo with ID ${todoId} does not exist`
                    }
                } else {
                    res.status(200).json(updated[1][0])
                }
            })
            .catch(err => {
                next(err)

                // if (err.name === 'Not Found') {
                //     res.status(404).json({
                //         message: err.message
                //     })
                // } else if (err.name === 'SequelizeValidationError') {
                //     res.status(400).json({
                //         message: err.errors[0].message
                //     })
                // } else {
                //     res.status(500).json({
                //         message: 'Internal server error'
                //     })
                // }
            })
    }

    static patchOne (req, res, next) {
        const todoId = +req.params.id
        const newStatus = req.body.status
        Todo.update({status: newStatus}, {
            where: {id: todoId},
            returning: true
        })
            .then(updated => {
                if (updated[0] === 0) {
                    throw {
                        name: 'Not Found',
                        message: `Todo with ID ${todoId} does not exist`
                    }
                } else {
                    res.status(200).json(updated[1])
                }
            })
            .catch(err => {
                next(err)

                // if (err.name === 'Not Found') {
                //     res.status(404).json({
                //         message: err.message
                //     })
                // } else if (err.errors[0].type === 'Validation error') {
                //     res.status(400).json({
                //         message: err.errors[0].message
                //     })
                // } else {
                //     res.status(500).json({
                //         message: 'Internal server error'
                //     })
                // }
            })
    }

    static deleteOne (req, res, next) {
        const todoId = +req.params.id
        Todo.destroy({where: {id: todoId}})
            .then((deleted) => {
                if (deleted === 0) {
                    throw {
                        name: 'Not Found',
                        message: `Todo with ID ${todoId} does not exist`
                    }
                } else {
                    res.status(200).json({
                        message: `Todo with ID ${todoId} deleted successfully`
                    })
                }
            })
            .catch(err => {
                next(err)

                // if (err.name === 'Not Found') {
                //     res.status(404).json({
                //         message: err.message
                //     })
                // } else {
                //     res.status(500).json({
                //         message: 'Internal server error'
                //     })
                // }
            })
    }

}

module.exports = ControllerTodo