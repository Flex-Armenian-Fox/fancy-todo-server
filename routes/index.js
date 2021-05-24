const router = require(`express`).Router();
const Controller = require(`../controllers/todosController`);

router.post(`/todos`, Controller.add);
router.get(`/todos`, Controller.getAll);
router.get(`/todos/:id`, Controller.getById);
router.put(`/todos/:id`, Controller.update);
router.patch(`/todos/:id`, Controller.updateStatus);
router.delete(`/todos/:id`, Controller.delete);

module.exports = router;