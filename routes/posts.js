
var Posts=require('../public/lib/mongoose').PostModel;
module.exports.get=function(req,res,next) {
	
            Posts.returnPosts(function(err, data)
            {
				  res.render('posts',{data:data, wysiwygAjax:'/postPost',pagelink:'/posts/'});
    
    });


};


