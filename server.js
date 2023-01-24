const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Contacts = require('./models/contacts');
const db = mongoose.connection;
const contactsData = require('./utilities/data');
const contactsController = require('./controllers/contacts');
const cors = require('cors');

//Environmental variables
const app = express();
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

//Connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true},() => console.log('MongoDB connection establish'));

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')); //tell express to use the public directory for static files. Our app will find index.html as the route of the application then attach React to that file
// this is how it used to be ->app.use(cors());
app.use(cors({ origin: '*' })) // used to whitelist requests

//Routes 
app.use('/contacts', contactsController);

// Seeding the db
app.get('/seed', async (req, res) => {
    await Contacts.deleteMany({});
    await Contacts.insertMany(contactsData);
    res.send('done!');
  });
  //App listeting on port
  app.listen(PORT, () => {
    console.log('This message means nothing', PORT)
  });