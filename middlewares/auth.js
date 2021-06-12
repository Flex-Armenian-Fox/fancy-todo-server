const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
const { Todo } = require('../models');

const authentication = (req, res, next) => {
  if (!req.headers.access_token) {
    throw {
      name: 'TokenMissing',
      message: 'Missing access token',
    };
  }

  try {
    const decoded = jwt.verify(req.headers.access_token, privateKey);
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

const todosAuthorization = (req, res, next) => {
  const { id } = req.params;
  Todo.findOne({ where: { id, UserId: req.userId } })
    .then((todo) => {
      if (!todo) {
        throw {
          name: 'NotFound',
          message: 'Todo not found',
        };
      }
      req.todo = todo;
      next();
    })
    .catch((err) => next(err));
};

module.exports = { authentication, todosAuthorization };
