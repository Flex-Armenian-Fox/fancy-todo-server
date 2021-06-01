const { User } = require(`../models`);
const { compareHash } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;

class Controller {
  static register(req, res, next) {
    User.create(req.body)
      .then((user) =>
        res
          .status(201)
          .json({ success: true, user: { id: user.id, email: user.email } })
      )
      .catch((err) => next(err));
  }

  static login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email.toLowerCase(),
      },
    })
      .then((user) => {
        if (user) {
          if (compareHash(req.body.password, user.password)) {
            const access_token = jwt.sign({ id: user.id }, privateKey);
            res.status(201).json({ success: true, access_token });
          } else {
            throw {
              name: 'LoginError',
              message: 'Wrong password',
            };
          }
        } else {
          throw {
            name: 'LoginError',
            message: 'Email is not registered',
          };
        }
      })
      .catch((err) => next(err));
  }
}

module.exports = Controller;
