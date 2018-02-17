const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

let routes = require('./app/routes/app.js');

let app = express();
require('dotenv').config();
let db = "mongodb://admin_eirin:p!nm%40g!c@ds217898.mlab.com:17898/pinmagic";
mongoose.connect(process.env.MONGO_URI || db);
let database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongodb connection error'));
database.once('open', () => console.log('mongodb connected'));

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(passport.initialize());
require('./app/config/passport.js')(passport);

routes(app, passport);

app.listen(process.env.PORT || 3001, function() {
  console.log("Working");
})
