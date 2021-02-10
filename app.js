const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Verify = require('./routes/verifyRoutes');

dotenv.config();
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set("useCreateIndex", true);


require('./controller/auth');

const authRoutes = require('./routes/authRoutes');
const secureRoute = require('./routes/secure-routes');
const postRoute = require('./routes/postRoute');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));




// const verify = passport.authenticate('jwt', {session: false});

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/', authRoutes);
app.use('/posts',Verify,  postRoute)
app.use('/user', Verify , secureRoute);

app.listen(5000, () => {
  console.log('Server started. 5000')
});