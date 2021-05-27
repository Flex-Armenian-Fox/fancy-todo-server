const { Todo } = require('../models');

class Controller {
  static add(req, res) {
    const { title, description, status, due_date } = req.body;
    Todo.create({
      title,
      description,
      status,
      due_date,
      UserId: req.userId,
    })
      .then((result) =>
        res.status(201).json({ message: `created`, data: result })
      )
      .catch((err) => {
        if (err.name == 'SequelizeValidationError') {
          let message = [];
          for (let i = 0; i < err.errors.length; i++) {
            const e = err.errors[i];
            message.push(e.message);
          }
          console.log('message:', message);
          res.status(400).json({
            message: message,
          });
        } else {
          res.status(500).json(err);
        }
      });
  }

  static getAll(req, res) {
    Todo.findAll({ where: { UserId: req.userId }, order: [`id`] })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(404).json(err));
  }

  static getById(req, res) {
    res.status(200).json({ success: true, data: req.todo });
  }

  static update(req, res) {
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
      .then(() => res.status(200).json({ success: true, data: todo }))
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ succes: false, error: err.message || err });
      });
  }

  static updateStatus(req, res) {
    const { status } = req.body;
    const { todo } = req;

    todo.status = status;
    todo
      .save()
      .then(() => res.status(200).json({ success: true, data: todo }))
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ succes: false, error: err.message || err });
      });
  }

  static delete(req, res) {
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
      .catch((err) => {
        res
          .status(err.status || 500)
          .json({ succes: false, error: err.message || err });
      });
  }
}

module.exports = Controller;
