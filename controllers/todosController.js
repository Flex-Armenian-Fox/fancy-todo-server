const { Todo } = require('../models');
const json2xls = require('json2xls');
const fs = require('fs');

class Controller {
  static add(req, res, next) {
    const { title, description, status, due_date } = req.body;
    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId: req.userId,
    })
      .then((result) => res.status(201).json({ message: 'created', data: result }))
      .catch((err) => next(err));
  }

  static getAll(req, res, next) {
    Todo.findAll({ where: { UserId: req.userId }, order: [['status', 'desc'], ['due_date']] })
      .then((result) => {
        if (result.length > 0) res.status(200).json({ success: true, data: result });
        throw {
          name: 'NotFound',
          message: 'Todo not found',
        };
      })
      .catch((err) => next(err));
  }

  static getById(req, res, next) {
    res.status(200).json({ success: true, data: req.todo });
  }

  static update(req, res, next) {
    const { title, description, status, due_date } = req.body;
    const { todo } = req;

    // instance method sequelize, because we already get the todo
    Object.keys(req.body).forEach((key) => {
      if (todo[key]) todo[key] = req.body[key];
    });

    // without looping:
    // todo.title = title;
    // todo.description = description;
    // todo.status = status;
    // todo.due_date = due_date;

    todo
      .save()
      .then((updatedTodo) => res.status(200).json({ success: true, data: updatedTodo }))
      .catch((err) => next(err));
  }

  static updateStatus(req, res, next) {
    const { status } = req.body;
    const { todo } = req;

    todo.status = status;
    todo
      .save()
      .then(() => res.status(200).json({ success: true, data: todo }))
      .catch((err) => next(err));
  }

  static delete(req, res, next) {
    const { todo } = req;
    todo
      .destroy()
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'delete todo success',
          deletedData: req.todo,
        });
      })
      .catch((err) => next(err));
  }

  static export(req, res, next) {
    Todo.findAll({ where: { UserId: req.userId }, order: [`id`] })
      .then((result) => {
        if (result.length > 0) {
          const exportedData = result.map((el) => el.dataValues);
          console.log(exportedData);
          const xls = json2xls(exportedData);
          fs.writeFileSync(`public/export/data-${req.userId}.xlsx`, xls, 'binary');
          res.status(200).json({ success: true, data: result });
        } else
          throw {
            name: 'NotFound',
            message: 'Todo not found',
          };
      })
      .catch((err) => next(err));
  }
}

module.exports = Controller;
