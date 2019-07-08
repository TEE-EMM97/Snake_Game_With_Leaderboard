var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "javascript_game"
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/welcome.html'));
});
app.get('/mystyle.css', function (request, response) {
    response.sendFile(path.join(__dirname + '/mystyle.css'));
});
app.get('/bg1.jpg', function (request, response) {
    response.sendFile(path.join(__dirname + '/bg1.jpg'));
});
var error1 = false;
app.post('/login', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var sql = "SELECT * FROM Leaderboard WHERE username = ? AND password = ?";
    con.query(sql, [username, password], function (err, result) {
        if (err) {

        } else if (result.length == 0) {
            error1 = true;
        } else {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/gamepage');
        }
    });
});

app.get('/gamepage', function (request, response) {
    response.sendFile(path.join(__dirname + '/game_page.html'));

});
app.post('/gamepage', function (request, response) {
    var arr = [];
    var sql = "SELECT username, score FROM Leaderboard ORDER BY score DESC LIMIT 5";
    con.query(sql, function (err, result) {
        if (err) {
            console.log("here");
        } else {
            arr[0] = result;
        }
    });
    
    var sql = "SELECT username, score FROM Leaderboard WHERE username = ?";
    con.query(sql, [request.session.username], function (err, result) {
        if (err) {
            
        } else {
            arr[1] = result;
        }
        response.json({ message: arr });
    });
    
});

app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname + '/sign_up.html'));
});

error1 = false;
app.post('/signup', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var sql = "INSERT INTO Leaderboard (username, password, score) VALUES (?, ?, 0)";
    con.query(sql, [username, password], function (err, result) {
        if (err) {
            error1 = true;
        } else {
            error1 = false;
        }
        if (error1) {
        } else {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/gamepage');
        }
    });
});
app.post('/server_alert', function (request, response) {
    if (error1) {
        response.json({ message: 'ping' });
    }
});

app.post('/account', function (request, response) {
    var v1 = request.body.account_options;
    var password = request.body.password;
    if (v1 == 1) {
        //Delete Account
        var sql = "DELETE FROM Leaderboard WHERE username = ? AND password = ?";
        con.query(sql, [request.session.username, password], function (err, result) {
            if (err) {
            
            } else if (result.length == 0) {
                app.post('/server_alert2', function (request, response) {
                    response.json({ message: 'ping' });
                });
            } else {
                response.redirect('/');
            }
        });

    } else if (v1 == 2) {
        //Update Password
        response.redirect('/password_update');
    }
});
app.get('/password_update', function (request, response) {
    response.sendFile(path.join(__dirname + '/password_page.html'));
});
app.post('/password', function (request, response) {
    var password = request.body.password;
    var sql = "UPDATE Leaderboard SET password = ? WHERE username = ?";
        con.query(sql, [password, request.session.username], function (err, result) {
        if (err) {

        } else if (result.length == 0) {

        } else {
            response.redirect('/');
        }
    });
});
app.post('/update_score', function (request, response) {
    var score2 = request.body.score;
    console.log(score2);
    
    var sql = "UPDATE Leaderboard SET score = ? WHERE username = ?";
        con.query(sql, [score2, request.session.username], function (err, result) {
        if (err) {
            
        } else if (result.length == 0) {

        } else {
            response.redirect('/gamepage');
        }
    });
});

app.get('/head.png', function (request, response) {
    response.sendFile(path.join(__dirname + '/head.png'));
});
app.get('/dot.png', function (request, response) {
    response.sendFile(path.join(__dirname + '/dot.png'));
});
app.get('/apple.png', function (request, response) {
    response.sendFile(path.join(__dirname + '/apple.png'));
});


app.listen(8080);
console.log("Listening");