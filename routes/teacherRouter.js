const router = require('express').Router();

const {ensureTeacherAuthenticated} = require('../passport/auth');

router.get('/dashboard', ensureTeacherAuthenticated ,(req,res)=>{
    res.render('tdashboard',{
        user:req.user
    });
});

module.exports = router;