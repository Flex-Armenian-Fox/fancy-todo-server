const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/TodosController.js')
const {todo} = require('../models')

const authorizationMovie = (req, res, next) => {
    const {id} = req.params;
    
    todo.findOne({
        where: {id: id}
    })
    .then(result => {
        if (!result){
            throw {
                name: "AuthorizationError",
                message: `todo with id ${id} not found`
            }
        }

        if (todo.UserId == req.currentUser.id){
            return next();
        } else {
            throw{
                name: "AuthorizationError",
                message: `user with id ${req.currentUser.id} does not have permission`
            }
        }
    })
    .catch(err => {
        res.status(401).json({
            message: err || "not authorized"
        })
    })
}


router.post('/', TodosController.createData)
router.get('/', TodosController.toList)
router.get('/:id', TodosController.getById)
router.put('/:id', TodosController.updateData)
router.patch('/:id', TodosController.setStatus)
router.delete('/:id', TodosController.deleteData)
module.exports = router;