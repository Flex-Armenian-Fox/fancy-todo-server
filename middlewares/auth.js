const jwt = require('jsonwebtoken');
const privateKey = 'privatekey';
const { Todo } = require('../models');

const authentication = (req, res, next) => {
  if (!req.headers.access_token) {
    return res
      .status(401)
      .json({ success: false, message: 'Missing access token' });
  }

  try {
    const decoded = jwt.verify(req.headers.access_token, privateKey);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token invalid' });
  }
};

const todosAuthorization = (req, res, next) => {
  const { id } = req.params;
  Todo.findOne({ where: { id, UserId: req.userId } })
    .then((todo) => {
      if (!todo) {
        return res
          .status(404)
          .json({ success: false, message: 'Todo not found' });
      }
      req.todo = todo;
      next();
    })
    .catch((err) => {
      res
        .status(err.status || 500)
        .json({ succes: false, error: err.message || err });
    });
};

module.exports = { authentication, todosAuthorization };
