var express = require('express');
var router = express.Router();

var passport = require('passport');


router.post('/login', function(req, res, next) {
    if(!req.body.usename || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info) {
        if(err) { return next(err); }

        if(user){
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});


module.exports = router;
