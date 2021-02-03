const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/userModel');
const dotenv = require('dotenv');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

dotenv.config();


//   REGISTER
passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

//   LOGIN 
passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, console.log('Email is incorrect'));
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false,  console.log('Wrong Password'));
          }
  
          return done(null, user, {message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );




passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);