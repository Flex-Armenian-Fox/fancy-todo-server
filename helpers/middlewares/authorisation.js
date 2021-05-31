'use strict'

const { Todo } = require('../../models')

function authorisation (req, res, next) {
    const todoId = +req.params.id
    console.log(todoId)
    Todo.findOne({where: {id: todoId}})
        .then(result => {
            console.log('Masuk THEN !!!!')
            console.log(result)
            if (!result) { // kalau NULL / falsy
                throw {
                    name: 'Not Found',
                    message: `Todo with ID ${todoId} does not exist`
                }
            } else { // kalau berhasil ketemu + ada isinya
                const sameUserId = (result.UserId === req.currentUser.id) // cocokkan dulu apakah result.UserId === req.currentUser.id
                if (sameUserId) { // kalau TRUE -> boleh next()
                    return next()
                } else { // kalau FALSE -> harus throw error, berarti bukan pemilik Todo yg berwenang
                    throw {
                        name: 'Not Authorised',
                        message: `User ${req.currentUser.id} does not have permission`
                    }
                }
            }
        })
        .catch(err => {
            console.log('Masuk ERROR !!!!')
            console.log(err)
            if (err.name === 'Not Found') { // handle jika ERROR: NULL -> todoID nya ga ada -> todo doesnt exist
                res.status(404).json({
                    message: err.message
                })
            } else if (err.name === 'Not Authorised') {
                res.status(401).json({
                    message: err.message
                })
            } else { // handle jika ERROR: NOT AUTHORISED -> todoID nya ditemukan -> tapi orangnya bukan pemiliknya
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
        })
}

module.exports = {authorisation}