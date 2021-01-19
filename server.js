const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected')) //Attaches callbacks for the resolution and/or rejection of the Promise.
    .catch(err => console.log(err)); //Attaches a callback for only the rejection of the Promise.

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users); ////all requests coming to /api/users will go to users handler
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//default path
app.get('/', (req, res) => {
    res.send('Hello boys');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));