var User = require('../public/lib/mongoose').LoginModel;
var async = require('async');

module.exports.getLogin = function(req, res) {


    res.render('login', {
        target: 'login',
        formTitle: "Панель входа",
        scriptUrl: '/login'
    });
};
module.exports.getRegister = function(req, res) {

    res.render('login', {
        target: 'register',
        formTitle: "Регистрация",
        scriptUrl: '/register'
    });
};
module.exports.logOut = function(req, res, next) {
    var redirect = (typeof req.session.beforeLogin != 'undefined') ? req.session.beforeLogin : '/posts';
    req.session.destroy();
    res.redirect(redirect);
}
module.exports.post = function(req, res, next) {

    var login = req.body.username;
    var password = req.body.password;


    User.authorise(login, password, function(err, user) {
        if (err) {
            console.log(err);
            res.send(err.message);
        } else {
            req.session.user_id = user._id;

            res.send('ok');
        }
    });

};
module.exports.postRegister = function(req, res, next) {



    var login = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    User.register(login, password, email, function(err, status, user) {

        if (err) {
            res.send(err);
        } else {

            req.session.user_id = user._id;
            req.session.email = user.email;
            res.send('ok');
        }
    })




};
