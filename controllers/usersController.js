const { User } = require(`../models`);
const { compareHash } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

class Controller {
  static register(req, res) {
    User.create(req.body)
      .then((user) => res.status(201).json({ success: true, user: user }))
      .catch((err) => res.status(500).json({ success: false, message: err }));
  }

  static login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (user) {
          if (compareHash(req.body.password, user.password)) {
            const access_token = jwt.sign({ id: user.id }, 'privatekey');
            res.status(201).json({ success: true, access_token });
          } else {
            throw {
              message: 'Login failed! Wrong password',
            };
          }
        } else {
          throw {
            message: 'Login failed! Username is not registered!',
          };
        }
      })
      .catch((err) => {
        res.status(404).json({ success: false, message: err.message });
      });
  }
}

module.exports = Controller;
