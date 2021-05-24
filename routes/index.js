const router = require(`express`).Router();
const Controller = require(`../controllers/todosController`);

router.post(`/todos`, Controller.add);

module.exports = router;