var express= require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var server=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
server.use('/',express.static(__dirname + ''));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://annobot:badalhr@ds119736.mlab.com:19736/chat',{useMongoClient: true});
//schema
var chat= new mongoose.Schema({
  room:String,
  name:String,
  msg:String

});

var Chat =mongoose.model('Chat',chat);


server.set('view engine','ejs');
//server.use(upload());
server.use(bodyParser.json());

server.get('/te/:room',function(req,res){
var di=Chat.find({'room':req.params.room},function(err,data){
if(err) console.log(err);
data.sort( {"_id.$old":1} );
console.log(data);
res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));

});
});



server.post('/dr',urlencodedParser,function(req,res){
  console.log(req.body);
  var dat=req.body;
  var pone=Chat({room:dat.room,name:dat.name,msg:dat.msg}).save(
  function(err){
    if(err) console.log(err);
    console.log('done');});

res.send(dat);
console.log(dat.name);
});

server.get('/',function(req,res){
  res.render('test');

});



server.listen(process.env.PORT || 3000);
console.log('made it');
