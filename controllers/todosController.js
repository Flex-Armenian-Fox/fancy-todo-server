const { Todo } = require('../models');

class Controller {
  static add(req, res) {
    console.log(req.body);
    const { title, description, status } = req.body
    const due_date = new Date(req.body.due_date);
    Todo.create({
        title,
        description,
        status,
        due_date
      })
      .then(result => res.status(201).json({ message: `created`, data: result }))
      .catch(err => {
        // console.log(err);
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
      })
  }
}

module.exports = Controller;