const router = require(`express`).Router();
const Todo = require('./todo');
const User = require('./user');

router.use('/todos', Todo);
router.use('/users', User);

module.exports = router;
