var User=require('./mongoose').LoginModel;



module.exports=function(req,res,next){
	  
    req.user=res.locals.user=null;
  

    if(!req.session.user_id) return next();
    User.findById(req.session.user_id,function(err,user){
if(err) return next(err);
if(user!=null) {
	user.sign="<a href='#'>"+user.username+"</a>";
	user.table='local';//для будущих возожных личных  сообщений
    req.user = res.locals.user = user;


}

next();
    });
    
};
