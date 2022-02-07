const router = require('express').Router();
const passport = require('passport');
const registrationController = require('../controllers/registrationController');
const {forwardAuthenticated} = require('../passport/auth');
// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));


router.post("/register",registrationController);

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'/users/login',
      failureFlash:true,
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
  });


module.exports = router;