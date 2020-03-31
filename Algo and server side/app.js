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



var queryTable = ["SELECT * FROM customers","SELECT * FROM admins","SELECT * FROM ad_available","SELECT skills FROM available_skills","SELECT * FROM queue"];  
//var sql = 'SELECT COUNT(*) FROM admins AS IDCount FROM ID WHERE availability = ?'


connection.connect(function(err) {
    if (err) {throw err;}
    else{console.log("Connected!");}
    
    
});






app.get('/', function(req, resp){
    //abt mysql
    /*connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log('Query result: ', rows);
        console.log(rows[0].IDCount);
      });*/
    connection.query(queryTable[3],function(error, result, fields){//available skills
        //callback
        if(!!error){
            console.log('error in query\n');}
        else{
            console.log('Successful Query for available_skills\n');     
            console.log(result);
            for(j=0, j< result.);
            var i = result[0].skills;
            console.log(typeof i);
            console.log(i);
            //var availableSkills = rows;

        //     console.log(rows[0]);
        //     console.log(rows[0].ID);
        //     console.Log(rows.length);
            //var a = result.column;
        //     console.log(a);
        //     console.log(rows[0].toString());

            fs.writeFile('temp.txt', i, function (err) {
                if(!!err){console.log('error in writing');}
                console.log('Saved!');
            });

        }
        //connection.end();
        //console.log("disconnected with db!");
    });

    connection.query(queryTable[0],function(error, rows, fields){
        //callback
        if(!!error){
            console.log('error in query\n');}
        else{
            console.log('Successful Query\n');     
            console.log(rows[0]);
        //     console.log(rows[0]);
        //     console.log(rows[0].ID);
        //    // for(var i=0, i <= )
        //     console.Log(rows.length);
            var a = rows[0].cust_name;
        //     console.log(a);
        //     console.log(rows[0].toString());
            var input = a;
            // fs.writeFile('temp.txt', input, function (err) {
            //     if(!!err){console.log('error in writing');}
            //     console.log('Saved!');
            // });

        }
        //connection.end();
        //console.log("disconnected with db!");
    });

    connection.query(queryTable[1],function(error, rows, fields){
        //callback
        if(!!error){
            console.log('error in query\n');}
        else{
            console.log('Successful Query\n');
            console.log(typeof rows[0]);
            console.log(rows[0]);
            // fs.writeFile('temp.txt', rows[0], function (err) {
            //     if(!!err){console.log('error in writing');}
            //     console.log('Saved!');
            // });

        }
        //connection.end();
        //console.log("disconnected with db!");
    });

    connection.query(queryTable[2],function(error, rows, fields){
        //callback
        if(!!error){
            console.log('error in query\n');}
        else{
            console.log('Successful Query\n');
            console.log(typeof rows[0]);
            console.log(rows[0]);
            // fs.writeFile('temp.txt', rows[0], function (err) {
            //     if(!!err){console.log('error in writing');}
            //     console.log('Saved!');
            // });

        }
        
       
    });
    connection.end();
    console.log("disconnected with db!");
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


module.exports = {
    express,
    fs,
    mysql,
    queryTable,
    connection,
    app
};