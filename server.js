const express = require('express');
const app = express();

require('dotenv').config();

const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json())  //req.body
const PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('welcome to our hotel')
})

//import router file

const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes');

//use router
app.use('/person', personRoutes)
app.use('/menu', MenuItemRoutes,)



app.listen(PORT, () => {
  console.log('listening on port 3000')
})
