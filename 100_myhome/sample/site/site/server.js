var application_root = __dirname;
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(application_root));
	app.use(express.errorHandler({dumpExceptions:true, showStack:true}));

});

var port = 4711;
app.listen(port, function(){
	console.log('Expressサーバが%dで起動しました。モード：%s',port,app.settings.env);
	console.log('application_root=',application_root);
});

//app.get('/api',function(request,response){
//	response.send('ライブラリAPIは利用可能です。');
//});


mongoose.connect('mongodb://localhost/library_database');

/*
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseData: Data
});

var BookModel = mongoose.model('book',Book);

app.get('/api/books',function(request,response){
	return BookModel.find(function(err,books){
			if(!err){
				return response.send(books)
			}else{
				return console.log(err);
			});
});
*/
