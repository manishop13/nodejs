const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = "mongodb://localhost:27017/recipie";

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
});

// Models
require('./Categeory');
require('./recipie');
