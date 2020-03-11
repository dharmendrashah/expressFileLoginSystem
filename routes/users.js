const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
//installing model
const User = require('../model/users');
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login')
});
router.get('/register', function(req, res, next){
  res.render('register')
})

router.post('/registerThis', function(req, res, next){
  const { fullName, email, password, password2 } = req.body;
  let errors = [];
  //  console.log(req.body);
  //  res.send('ok')
   if(!fullName){
    errors.push({ msg:'Please enter your full name'});
   }
   if(!email){
     errors.push({msg:"Please enter Email address"})
   }
   if(!password){
     errors.push({msg:"please enter password"})
   }
   if(!password2){
     errors.push({msg:"please type confirm password"})
   }
   if(password != password2){
     errors.push({msg:"your email password do not match"})
   }
   if(password < 8){
     errors.push({msg:"Password must be Eight ~`8`~ character long"})
   }
   //respondind on errors
   if(errors.length > 0){
     res.render('register', {
      errors,
      fullName,
      email,
      password,
      password2 
     })
   }else{
  //    console.log('Every thing is fine \n',req.body);
  //    res.send('everyThing is fine');
  //
  User.findOne({email:email}).then(user => {
    if(user){
      errors.push({msg:'User with this email Address is already exists'});
      res.render('register', {
        errors,
        fullName,
        email,
        password,
        password2
      })
    }else{
      const newUser = new User({
        fullName,
        email,
        password
      });

      //hashing password
      bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        //new hashed password
        newUser.password = hash;
        
        //save user
        newUser.save().then(user => {
          req.flash('success_msg', 'you are now registere you can login');
          res.redirect('/users/login');
        }).catch(err => console.log(err));

      }));
      //console.log(newUser);
      //res.send('somethingIsBad')  
    }
  })
}

   //console.log(errors);
  
});

//logout
//login check
router.post('/loginCheck',(req,res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;
