const express = require('express');
const { verifyToken } = require('../helpers/jwt');
const router = express.Router();
const {users} = require('../models')

function authentication(req, res, next){
    try{
        console.log("A")
        const {access_token} = req.headers;
        const dataDecoded = verifyToken(access_token);

        console.log("A1")
        // users.findByPK(dataDecoded.id)
        users.findOne({
            where: {id: dataDecoded.id}
        })
        .then(user =>{
            console.log("B", user)
            if(!user) {
                throw{
                    name: "AuthenticationError",
                    message: `user with id: ${dataDecoded.id} not found`,
                }
            }

            console.log("C")
            req.currentUser = {
                id: user.id,
            }
            next();
        })
        .catch(err => {
            res.status(401).json({
                message: "invalid token"
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}

router.use('/users', require('./users.js'))

router.use(authentication)
router.use('/todos', require('./todos.js'))

module.exports = router;