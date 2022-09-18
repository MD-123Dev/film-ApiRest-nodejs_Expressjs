const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//  import route
const filmRoute = require('./routes/film');
const categoryRoute = require('./routes/category');
const actorRoute = require('./routes/actor');
const userRoute = require('./routes/user');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.use('/api',filmRoute);
app.use('/api',categoryRoute);
app.use('/api',actorRoute);
app.use('/api',userRoute);

//**** connect with mongodb */
 var dbURL = require("./env").DB_URL;

mongoose.connect(dbURL)
.then(() => console.log('db connected'))
.catch(() => console.log('not connect to the database !'))

//*


require('dotenv').config();


app.use(cors())

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`app is running on port ${port}`));