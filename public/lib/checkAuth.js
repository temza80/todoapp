var Comment=require('./mongoose').CommentModel;
module.exports.user=function(req,res,next)
{

if(!req.user)return next(new Error('Not authorized'));
    next();
};

module.exports.nologin=function(req,res,next)
{
  
    if(req.user) res.redirect('/posts');
    else next();
}
