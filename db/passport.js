const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//load models
const User = require('../model/users');

module.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done) => {
            //match user
            User.findOne({
                email:email
            }).then(user => {
                if(!user){
                    return done(null, false, {message: 'That user is not there'})
                }else{
                    //match the password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);
                        }else{
                            console.log('The password not matched \n');
                            return done(null, false, {message: 'That user is not there'});

                        }
                    });
                }
            }).catch(err => console.log('something is wrong \n',err))
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}