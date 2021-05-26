const router = require(`express`).Router();
const Controller = require(`../controllers/todosController`);

router.post(`/`, Controller.add);
router.get(`/`, Controller.getAll);
router.get(`/:id`, Controller.getById);
router.put(`/:id`, Controller.update);
router.patch(`/:id`, Controller.updateStatus);
router.delete(`/:id`, Controller.delete);

module.exports = router;
