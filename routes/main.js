/**
 * Created by yih on 13.1.17.
 */
var express = require('express');
var router = express.Router();
var checkAuth=require('../public/lib/checkAuth').user;
var nologin=require('../public/lib/checkAuth').nologin;

module.exports=function(app) {
app.get('/', function(req, res, next){ res.redirect('/posts')})
//login

    app.get('/login', nologin, require('./login').getLogin);
    app.post('/login', require('./login').post);
    app.get('/register', nologin,require('./login').getRegister);
    app.post('/register', require('./login').postRegister);
    app.get('/logout', require('./login').logOut);
//Список заметок
    app.get('/posts', require('./posts').get);
    app.get('/posts/:page', require('./posts').get);
//Отдельные заметки
    app.get('/post/:page',require('./post').get);
//Сохранить    
    app.post('/postPost', checkAuth,require('./toBase').postPost);
//Редактировать  
    app.get('/postredpost/:page', checkAuth, require('./post').redactPost);
//Обновить    
	app.post('/redactPost/:page', checkAuth, require('./toBase').updatePost);
//Удалить
	app.get('/delpost/:page', checkAuth, require('./toBase').delPost);
}
    
  
    
   


