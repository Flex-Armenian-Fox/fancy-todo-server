const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get('/', (req, res) => {res.send("hello world")})
app.use('/', routes)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})