var express = require ('express');
var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

var app = express();
//var server = http.createServer(app);

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mysampletable"
  });
  
connection.connect(function(err) {
    if (err) {throw err;}
    else{console.log("Connected!");}
    
    
});





app.get('/', function(req, resp){
    //abt mysql
    connection.query("SELECT * FROM customer",function(error, rows, fields){
        //callback
        if(!!error){
            console.log('error in query\n');}
        else{
            console.log('Successful Query\n');
            console.log(typeof rows[0]);
            console.log(rows[0]);
            console.log(rows[0].ID);
            var a = rows[0].ID;
            console.log(a);
            console.log(rows[0].toString());
            input = a;
            fs.writeFile('temp.txt', input, function (err) {
                if(!!err){console.log('error in writing');}
                console.log('Saved!');
            });

        }
        //connection.end();
        //console.log("disconnected with db!");
    });

    connection.query("SELECT * FROM admins",function(error, rows, fields){
        //callback
        if(!!error){
            console.log('error in query\n');}
        else{
            console.log('Successful Query\n');
            console.log(typeof rows[0]);
            console.log(rows[0]);
            console.log(rows[0].ID);
            var a = rows[0].ID;
            console.log(a);
            console.log(rows[0].toString());
            input = a;
            fs.writeFile('temp.txt', input, function (err) {
                if(!!err){console.log('error in writing');}
                console.log('Saved!');
            });

        }
        connection.end();
        console.log("disconnected with db!");
    });

})

/*app.get('/skill', function(req, res){
    fs.readFile('./db.json', function(err, data){

    res.send(data.toString());
    })
});

app.get('/actual', function(req, res){
    fs.readFile('./db.json', function(err, data){
    var skill = JSON.parse(data.toString()).skillTags;
    res.json(skill);
    })
});



//my own code 
fs.exists('temp.txt')


if(){
                console.log('temp.txt exisits!');
*/

app.listen(3000 ,function(){
    console.log('Listening to port 3000');
});
