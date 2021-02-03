const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set("useCreateIndex", true);


require('./auth/auth');

const routes = require('./routes/authRoutes');
const secureRoute = require('./routes/secure-routes');
const postRoute = require('./routes/postRoute');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/posts', passport.authenticate('jwt', { session: false }), postRoute);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);


app.listen(3000, () => {
  console.log('Server started.')
});