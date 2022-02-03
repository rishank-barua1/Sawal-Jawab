module.exports = {
  //this is for checking if you are authorized to view a certain page
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },

    //this is for when you open the site, if you are a student you'll be redirected to student section or other case
    forwardAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        if(req.user.role==="student")
        {
          res.redirect('/student/dashboard');
        }
        else{
          res.redirect('/teacher/dashboard');
        }
      }
      res.render('login');      
    }
  };