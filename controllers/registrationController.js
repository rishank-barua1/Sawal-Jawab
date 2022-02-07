const bcrypt = require('bcryptjs');
const Users = require('../models/Users');


const registrationController = async (req,res)=>{
    const {name,email,password,password2,role} = req.body;

    if(typeof role===undefined)
        role="student";
    let errors =[]; //an empty array of errors that stores the various kind of errors that may arise;
    if(!name || !email || !password || !password2){
        errors.push({msg:'Please enter all the fields'});
    }
    if(password.length<6)
    {
        errors.push({msg:'Password must be of atleast 6 characters'});
    }
    if(password!=password2)
    {
        errors.push({msg:'Passwords do not match, check again'})
    }

    if(errors.length>0)
    {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2,
            role
        });
    }
    else{
        const emailExists = await Users.findOne(({email:req.body.email}));
        if(emailExists)
        {
            errors.push({msg:'An account with this email already exists'});
            res.render('register',{
                errors,
                name,
                email,
                password,
                password2,
                role
            });
        }
        const passwordHash = await bcrypt.hash(req.body.password, 12);
        const newUser = new Users({
            name:req.body.name,
            email:req.body.email,
            password:passwordHash,
            role:role
        });

        await newUser.save();
        req.flash('success_msg','You are now registerd,can Login');
        res.redirect('/users/login');
    }
    
}

module.exports = registrationController;