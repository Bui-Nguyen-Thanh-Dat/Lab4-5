var express = require('express');
var app = express();
var expresshbs = require('express-handlebars');
var multer= require('multer');

var storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads');
    },
    filename: function(req,file,cb){
            cb(null, file.originalname);
        },
    
})
var upload= multer({storage:storage,limits:{
    fileSize:1*1024*1024
}}).single('avatar');
app.engine('.hbs',expresshbs.engine({extname: '.hbs'}))
app.set('view engine', '.hbs');


app.get('/', function (req,res) {
    res.send('Hello world')
})

app.get('/hbs', function (req,res) {
    res.render('index');
})

app.get('/baitap', function (req,res) {
    res.render('bai3');
})

app.get('/upload',function(req,res){
    res.render('upload');
})

app.post('/upload',function (req,res) {
    upload(req,res,function(err) {
        if (err instanceof multer.MulterError) {
            return res.send("Kich thuoc file lon hon 1MB");
        }else if (req.file == null) {
            return res.send("Tep khong xac dinh");
        }
        console.log(req.file);
        res.send('upload success')
        
    });
    
        
})
app.listen(8000);
