//var http = require('http');  
var express = require('express');
var app = express();

var devices = {"data":[
   {uuid:"device1", title:"Device 1", address:{ip:"10.10.10.10", ports:{http:80}}, capacity:{ram:"10%", cpu:"50%"} },
   {uuid:"device2", title:"Device 2", address:{ip:"10.10.10.10", ports:{http:80}}, capacity:{ram:"10%", cpu:"50%"} },
   {uuid:"device3", title:"Device 3", address:{ip:"10.10.10.10", ports:{http:80}}, capacity:{ram:"10%", cpu:"50%"} }
]};

var dockerimages= {"data":[
   {uuid:"dockerimg1", title:"Docker Image 1"},
   {uuid:"dockerimg2", title:"Docker Image 2"},
   {uuid:"dockerimg3", title:"Docker Image 3"}
]};

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
}); 

app.get('/devices',function(req, res){
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    res.send(devices)  
})  

app.get('/dockerimages',function(req, res){
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    res.send(dockerimages)
})  

//app.get('/devices/:id',function(req, res){ 
//    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
//    res.send(map[req.param('id')])  
//    //console.log(req.param('id'))  
//})  
//
//app.post('/devices/', express.bodyParser(), function(req, res){ 
//    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
//    map[req.body.id] = req.body  
//    res.send({status:"success",url:"/devices/"+req.body.id}) 
//})  
//
//app.put('/devices/:id', express.bodyParser(), function(req, res){ 
//    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
//    map[req.body.id] = req.body  
//    res.send({status:"success",url:"/devices/"+req.param('id'),device:req.body});  
//})  
//
//app.delete('/devices/:id',function(req, res){
//    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
//    delete map[req.param('id')]  
//    res.send({status:"success",url:"/devices/"+req.param('id')})  
//    console.log(map)  
//})  

app.listen(8080);
