module.exports = {
  //this is for checking if you are authorized to view a certain page
    ensureTeacherAuthenticated: function(req, res, next) {
      if (req.isAuthenticated() && req.user.role=="teacher") {
        return next();
      }
      return res.redirect('/');
    },

    ensureStudentAuthenticated:(req,res,next)=>{
      if(req.isAuthenticated() && req.user.role=="student"){
        return next();
      }
      return res.redirect('/');
    },

    //this is for when you open the site, if you are a student you'll be redirected to student section or other case
    forwardAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        if(req.user.role==="student")
        {
          return res.redirect('/student/dashboard');
        }
        else{
          return res.redirect('/teacher/dashboard');
        }
      }
      next();
    }
  };