
var Post = require('../public/lib/mongoose').PostModel;

var async = require('async');



module.exports.postPost = function(req, res, next) {

    var title = req.body.title;
    var post = req.body.post;


    var params = {
        title: title,
        teaser: post.substring(0, 70),
        post: post
    };
    Post.publish(params, function(err, post) {
        if (err) return next(err);


        res.status(200).send("OK");
    });


};

module.exports.updatePost = function(req, res, next) {
    var post_id = req.body.post_id.toString()

    Post.findById(post_id, function(err, page) {
        if (err) {
            console.log('loger' + err.message);
            res.send("Error");
            return next(err);
        }

        var title = req.body.title;
        var post = req.body.post;
        var post_id = req.body.post_id.toString();
        page.title = req.body.title;
        page.post = req.body.post;
        page.teaser = req.body.post.substring(0, 70);
        page.modified = Date.now();



        page.save(function(err) {
            if (err) {
                res.send("Error");
                console.log(err);
            } else res.send("OK");

        });


    });

};

module.exports.delPost = function(req, res, next) {
    console.log(req.params.page);
    Post.remove({
        _id: req.params.page
    }, function(err, page) {
        if (err) {
            console.log('loger' + err.message);
            return next(err);
        }

        res.redirect('/posts');
    });

}
