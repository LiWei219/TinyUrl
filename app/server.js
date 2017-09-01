var express = require('express');  //先查核心块，再找mode models，若直接注明路径直接找 不注明则为js文件
var app = express(); 
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect("mongodb://admin:admin@ds153719.mlab.com:53719/tinyurl")

//程序入口

app.use("/public",express.static(__dirname + "/public"));
app.use("/node_modules",express.static(__dirname+"/node_modules"));

app.use("/api/v1",restRouter);   //express routing function，routing意为对于不同的请求进行不同的处理

app.use(useragent.express());

app.use("/",indexRouter);

app.use("/:shortUrl", redirectRouter);  //:之后跟变量 express进行模式匹配

  app.listen(3000);
