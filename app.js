var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//catch
var fetch_num = 0;
var fetch_max = 10;
var url_list = {};
url_list['https://movie.douban.com/subject/26683290/'] = true; //初始爬取点

/*fs.exists('../img/', function(exists) {
    if (!exists) {
        fs.mkdir('img/', function(err) {
            console.info(err);
        });
        console.info('文件不存在');
    }
});*/
/*fs.exists('../data/', function(exists) {
    if (!exists) {
        fs.mkdir('data/', function(err) {
            console.info(err);
        });
        console.info('文件不存在');
    }
});*/

var url = 'http://m.weathercn.com/zh/cn/panyu-district/2332592/current-weather/2332592?lang=zh-cn?partner=huawei13';
// if (fetch_num === 0) {
//     fetchData(url);
// } else {
//     setInterval(function() {
//         fetchData(url);
//     }, 5 * 60 * 1000);
// }

function fetchData(url) {
    fetch_num++;
    if (fetch_num < fetch_max) {
        http.get(url, function(res) {
            var html = '';
            res.on('data', function(chunk) {
                html += chunk;
            });
            res.on('end', function() {
                var $ = cheerio.load(html);
                // console.info($);
                var meteo_info = {
                    name: $('#current>h2>a').text(),
                    DateTime: $('#air>i>div:last-child').text(),
                    temp: $('#current>div:first-child>a>b').text(),
                    hum: $('.hum>p').text()
                };
                save(meteo_info);
            })
        })
    }
}

function save(data) {
    var text = JSON.stringify(data);
    fs.appendFile('./data/' + 'test' + fetch_num + '.json', text, 'utf-8', function(err) {
        if (err) {
            console.info(err);
        } else {
            console.info('success');
        }
    })
}

function loopCatch() {
    setInterval(function() {
        console.info(fetch_num)
        fetchData(url);
    }, 5 * 60 * 1000);
}

loopCatch();
fetchData(url);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;