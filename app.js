if (process.env.NODE_ENV == 'development') require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('OK'));

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
