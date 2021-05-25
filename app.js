'use strict'
const express = require('express')
const app = express()
const routes = require('./routes/route-todos.js')
const PORT = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Listening at Localhost:${PORT}`))