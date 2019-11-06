const router = require('express').Router();
const User = require('../models/User')

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const errors = [];

    if(name.length === 0) {
        errors.push({text: 'Insert your name'})
    }

    if(email.length === 0) {
        errors.push({text: 'Insert your email'})
    }

    if(password.length === 0) {
        errors.push({text: 'Insert your password'})
    }
    if(confirmPassword.length === 0) {
        errors.push({text: 'Insert your password confirm'})
    }

    if(password !== confirmPassword) {
        errors.push({text: 'Password do not match'})
        if(password.length < 4) {
            errors.push({text: 'Password must be at least 4 characters'})
        }
    }


    if(errors.length > 0) {
        res.render('users/signup', { errors , name, email, password, confirmPassword});
    } else {
        const emailUser = await User.findOne({ email: email });
        if(emailUser) {
            req.flash('errorMsg', 'The email is already in use');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('successMsg', 'You are registered');
            res.redirect('/users/signin');
        }

    }

});

module.exports = router;