var mongoose    = require('mongoose');
var async=require('async');
var config      = require('./config');
var crypto=require('crypto');
mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error!:'+ err.message+config.get('port'));
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas

//login

var Login = new Schema({

    username: { type: String, required: true },
    hashedPassword:{type: String, required: true },
    salt:{type: String, required: true },
    email: { type: String, required: true },
  


    modified: { type: Date, default: Date.now }
});



Login.methods.encryptPassword=function(password) {

    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');

};
Login.virtual('password').set(function(password){
    this._plainPassword=password;
    this.salt=Math.random();
    this.hashedPassword=this.encryptPassword(password);
}).get(function(){return this._plainPassword});
Login.methods.checkPassword=function(password){
    return this.encryptPassword(password)===this.hashedPassword;
};

Login.statics.authorise=function(login,password,callback)
{
    var User=this;

    async.waterfall([
        function(callback){
            User.findOne({username: login},callback);
        },
        function(user,  callback){
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null,user);
                } else { callback(new Error('Wrong password!!!'))
                }
            }
            else {
                callback(new Error('Пользователя с таким именем нет в базе!'));
            }
        },

    ],callback);

};

Login.statics.register=function(login,password,email,callback)
{
    var User=this;

    async.waterfall([
        function(callback){
            User.findOne({email: email},callback);

        },
        function(email,callback){
            if (email) {
             


                callback('Email already existing!!!')
            }
            else {
                User.findOne({username: login}, callback);
            }
        },
        function(user,  callback){
            if (user) {


                 callback('Username already exist!!!')
                }

            else {
                var user = new User({username: login, password: password,email:email});
                user.save(function (err,user) {
                    if (err){ console.log(err.message);return callback(err);}
					else{console.log(user); callback(null, 'ok',user);}

                    });

                    
                }
            },


    ],callback);

};

//post


var Post = new Schema({

   title: { type: String, required: true },
    teaser:{type: String, required: true },
    post:{type: String, required: true },
    modified: { type: Date, default: Date.now },
 
});
Post.statics.publish=function(params,callback) {
    


    var Post = this;
   

    var post = new Post(params);
    post.save(function (err,post) {
        if (err) return callback(err);
        callback(null,post);
});
}

Post.statics.returnPosts=function(callback){
    var Posts=this;
 

    Posts.find({},null,{sort: {modified: -1}},function(err,data){
        
        if(err) return callback(err);
      
        callback(null,data);

    })
}







var LoginModel = mongoose.model('Login', Login);
var PostModel = mongoose.model('Post', Post);


module.exports.LoginModel = LoginModel
module.exports.PostModel = PostModel;


