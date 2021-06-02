require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')
const CustomError = require('./middlewares/error_handler.js')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(router)

app.use(CustomError.throwNewError)

app.listen(PORT, console.log(`Server started at ${new Date().toISOString()} on port ${PORT}`))