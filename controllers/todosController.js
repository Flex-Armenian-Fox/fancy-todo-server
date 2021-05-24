const { Todo } = require('../models');

class Controller {
  static add(req, res) {
    Todo.create(req.body)
      .then(result => res.status(201).json({ message: `created`, data: result }))
      .catch(err => {
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
          res.status(500).json(err);
        }
      });
  }

  static getAll(req, res) {
    Todo.findAll({ order: [`id`] })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(404).json(err))
  }

  static getById(req, res) {
    Todo.findByPk(req.params.id)
      .then(result => {
        if (result) res.status(200).json(result)
        else throw new Error;
      })
      .catch(err => res.status(404).json({ message: `Not Found` }))
  }

  static update(req, res) {
    Todo.update(req.body, { where: req.params })
      .then(() => Todo.findByPk(req.params.id))
      .then(result => {
        if (result) res.status(200).json(result)
        else res.status(404).json({ message: `Not Found` });
      })
      .catch(err => {
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

  static updateStatus(req, res) {
    Todo.update(req.body, { where: req.params })
      .then(() => Todo.findByPk(req.params.id))
      .then(result => {
        if (result) res.status(200).json(result)
        else res.status(404).json({ message: `Not Found` });
      })
      .catch(err => {
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

  static delete(req, res) {
    Todo.destroy({ where: req.params })
      .then(result => {
        if (result) res.status(200).json({ message: `todo deleted` })
        else res.status(404).json({ message: `Not Found` });
      })
      .catch(err => {
        res.status(500).json({
          message: err,
        });
      });
  }
}

module.exports = Controller;