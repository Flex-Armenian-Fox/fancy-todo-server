const router = require('express').Router();
const Controller = require('../controllers/todosController');
const { authentication, todosAuthorization } = require('../middlewares/auth');

// app level middleware
router.use(authentication);

router.post('/', Controller.add);
router.get('/', Controller.getAll);

// router level middleware
router.get('/:id', todosAuthorization, Controller.getById);
router.put('/:id', todosAuthorization, Controller.update);
router.patch('/:id', todosAuthorization, Controller.updateStatus);
router.delete('/:id', todosAuthorization, Controller.delete);

module.exports = router;
