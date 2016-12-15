var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


router.get('/posts', function(req, res, next){
    Post.find(function(err, posts){
        if(err){return next(err);}
        res.json(posts);
    });
});

router.post('/posts.js', auth, function(req, res, next){
    var post = new Post(req.body);
    post.author = req.payload.username;

    post.save(function(err, post){
        if(err){ return next(err); }

        res.json(post);
    });
});




router.get('/posts/:post', function(req, res, next) {
    req.post.populate('comments', function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});


router.put('/posts/:post/upvote', auth, function(req, res, next){
    req.post.upvote(function(err, post){
        if (err) { return next(err); }

        res.json(post);
    });
});


module.exports = router;
