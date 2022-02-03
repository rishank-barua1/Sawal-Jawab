const router = require('express').Router();

const {ensureAuthenticated} = require('../passport/auth');

router.get('/dashboard', ensureAuthenticated ,(req,res)=>{
    res.render('tdashboard',{
        user:req.user
    });
});

module.exports = router;