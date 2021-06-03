const { Todo, Holiday } = require('../models')
const CustomError = require('../middlewares/error_handler.js')
const checkHoliday = require('../helpers/check_holiday.js')
const formatDate = require('../helpers/date_formatter.js')

class Controller {
    static async getTodos(req, res, next) {
        try {
            const userId = req.currentUser.id
            const todos = await Todo.findAll({
                where: { user_id: userId },
                include: [Holiday],
                order: [['id', 'asc']]
            })

            todos.map(el => {
                el.dataValues.due_date = {
                    value: el.due_date,
                    holiday: el.Holiday
                }
                delete el.dataValues.holiday_id
                delete el.dataValues.Holiday
            })

            return res.status(200).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static async getTodoById(req, res, next) {
        try {
            const todoId = +req.params.id
            const todo = await Todo.findByPk(todoId, {
                include: [Holiday]
            })
            
            if (!todo) {                  
                throw new CustomError('NotFound', 404, {
                    table: 'Todo',
                    id: todoId
                })              
            }

            todo.dataValues.due_date = {
                value: todo.due_date,
                holiday: todo.Holiday
            }
            delete todo.dataValues.Holiday
            delete todo.dataValues.holiday_id

            return res.status(200).json(todo)    
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(req, res, next) {
        try {
            let newHoliday
            let holiday_id = null
            const { title, description, status, due_date } = req.body
            const userId = req.currentUser.id
            const formattedDueDate = formatDate(due_date)
            const getHoliday = await Holiday.findOne({
                where: {
                    holiday_date: formattedDueDate
                }
            })

            // 1. Sebelum insert ke table Todo, check terlebih dahulu tanggal due date di table Holiday, apakah ada atau tidak
            if (!getHoliday) {
                // 2. Jika gak ada, maka cari hari libur dari API Calendarific berdasarkan parameter due date
                const getHolidaysFromApi = await checkHoliday('id', formattedDueDate)
                
                if (getHolidaysFromApi.length) {
                    getHolidaysFromApi.map(el => {
                        newHoliday = {
                            holiday_name: el.name,
                            holiday_date: due_date,
                            holiday_description: el.description,
                            holiday_type: el.type[0]
                        }
                    })
                    // 3. Lalu insert ke table Holiday beserta detail hari liburnya, sehingga hit ke API Calendarific kalau memang benar benar gak ada datanya saja
                    const holiday = await Holiday.create(newHoliday)
                    holiday_id = holiday.id
                }            
            } else {
                // 4. Kalau tanggal holidaynya sudah ada, maka tinggal re assign variable holiday_id.
                holiday_id = getHoliday.id
            }
            // 5. Terakhir baru insert ke table Todo nya.
            const newTodo = await Todo.create({ title, description, status, due_date, user_id: userId, holiday_id })

            res.status(201).json({
                message: "Success create new todo",
                data: newTodo
            })
        } catch (error) {
            next(error)
        }
    }

    static async putTodo(req, res, next) {
        try {
            let newHoliday
            let holiday_id = null
            const todoId = +req.params.id
            const { title, description, status, due_date } = req.body
            const formattedDueDate = formatDate(due_date)
            const getHoliday = await Holiday.findOne({
                where: {
                    holiday_date: formattedDueDate
                }
            })

            if (!getHoliday) {
                const getHolidaysFromApi = await checkHoliday('id', formattedDueDate)

                if (getHolidaysFromApi.length) {
                    getHolidaysFromApi.map(el => {
                        newHoliday = {
                            holiday_name: el.name,
                            holiday_date: due_date,
                            holiday_description: el.description,
                            holiday_type: el.type[0]
                        }
                    })
                    const holiday = await Holiday.create(newHoliday)
                    holiday_id = holiday.id
                }            
            } else {
                holiday_id = getHoliday.id
            }
            const newTodo = await Todo.update({
                title, description, status, due_date, holiday_id
            }, {
                where: { id: todoId },
                returning: true
            })
            
            res.status(200).json({
                message: `Update success, ${newTodo[0]} row affected`,
                data: newTodo[1][0]
            })
        } catch (error) {
            next(error)
        }
    }

    static async patchTodo(req, res, next) {
        try {
            const todoId = +req.params.id
            const newTodo = await Todo.update({
                status: req.body.status
            }, {
                where: { id: todoId },
                returning: true
            })
            
            res.status(200).json({
                message: `Update success, ${newTodo[0]} row affected`,
                data: newTodo[1][0]
            })
        } catch (error) {            
            next(error)
        }
    }

    static async deleteTodo(req, res, next) {
        try {
            const todoId = +req.params.id
            let deletedTodo = req.currentUser.todo
            await Todo.destroy({
                where: { id: todoId }
            })

            res.status(200).json({
                message: 'todo success to delete',
                data: deletedTodo
            })            
        } catch (error) {            
            next(error)
        }
    }
}

module.exports = Controller