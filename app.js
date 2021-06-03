'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes/route-main.js')
const errorHandler = require('./helpers/errorHandler.js')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Listening at Localhost:${PORT}`))