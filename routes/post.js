/**
 * Created by yih on 24.1.17.
 */
/**
 * Created by yih on 19.1.17.
 */
var Posts=require('../public/lib/mongoose').PostModel;

var Login=require('../public/lib/mongoose').LoginModel;
var async=require('async');
module.exports.get=function(req,res,next) {

    Posts.findById(req.params.page, function (err, page) {
        if(err) return next(err);

    
                res.render('post',{page:page,wysiwygAjax:'/postPost'})
        });




    
}

module.exports.redactPost=function(req,res) {
    Posts.findById(req.params.page, function (err, page) {

        
        res.render('post', {page: page,  wysiwygAjax:'/redactPost/'+req.params.page,
                pagelink:'/post/'+page._id+'/'});

        });


    
}

