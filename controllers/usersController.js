const { User } = require(`../models`);

class Controller {
  static register(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((user) => res.status(201).json({ success: true, user: user }))
      .catch((err) => res.status(500).json({ success: false, message: err }));
  }

  static login(req, res) {
    User.findOne({
      where: { email: req.body.email, password: req.body.password },
    })
      .then((user) => res.status(201).json({ success: true, user: user }))
      .catch(() =>
        res.status(404).json({ success: false, message: 'User not found' })
      );
  }
}

module.exports = Controller;
