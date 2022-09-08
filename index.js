const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//  import route
const filmRoute = require('./routes/film');

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.use('/api',filmRoute);


//**** connect with mongodb */
 var dbURL = require("./env").DB_URL;

mongoose.connect(dbURL)
.then(() => console.log('db connected'))
.catch(() => console.log('not connect to the database !'))

//*




app.use(cors())

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`app is running on port ${port}`));