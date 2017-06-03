var https = require('https');
var http = require('http');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');

//连接mysql测试
var config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'fetchdata'
}
var connection = mysql.createConnection(config);

connection.connect();

connection.on('error', function(err) {
    if (!err.fatal) return;

    if (err.code != 'PROTOCOL_CONNECTION_LOST') {
        throw err;
    }

    connection = mysql.createConnection(config);
    connection.connect();
})

var url = 'http://m.weathercn.com/zh/cn/panyu-district/2332592/current-weather/2332592?lang=zh-cn?partner=huawei13';
// if (fetch_num === 0) {
//     fetchData(url);
// } else {
//     setInterval(function() {
//         fetchData(url);
//     }, 5 * 60 * 1000);
// }

function fetchData(url) {
    http.get(url, function(res) {
        var html = '';
        res.on('data', function(chunk) {
            html += chunk;
        });
        res.on('end', function() {
            var $ = cheerio.load(html);

            //时间格式化
            var DateTime = $('#air>i>div:last-child').text();
            var date = DateTime.split(' ');
            var strDate = new Date().getFullYear() + '年' + date[0];
            var fmDate = strDate.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, '$1-$2-$3');
            var fetchTime = fmDate + ' ' + date[1];

            //取得露点
            var dewP = $('#day-part').children('p');
            let dew = dewP[2].childNodes[1].data;
            //地区、温度、湿度
            let local = $('#current>h2>a').text();
            let temp = $('#current>div:first-child>a>b').text();
            let hum = $('.hum>p').text();
            //风速，风向
            let windP = $('.wind>p>span').children();
            let wind = windP[1].prev.data.trim();
            let windArr = wind.split(' ');
            let wind_speed = windArr[1] + windArr[2];
            let wind_direc = windArr[0];
            //体感温度
            let realFeel = $('.rfeel>b').text();

            let meteoData = [fetchTime, local, temp, hum, dew, wind_speed, wind_direc, realFeel];
            insertSql(meteoData);
        })
    })
}

function save(data) {
    var text = JSON.stringify(data);
    fs.appendFile('./data/' + 'test.json', text, 'utf-8', function(err) {
        if (err) {
            console.info(err);
        } else {
            console.info('success');
        }
    })
}

function loopCatch() {
    setInterval(function() {
        fetchData(url);
    }, 5 * 60 * 1000);
}

loopCatch();
fetchData(url);

function insertSql(data) {
    var insertStr = 'insert into real_meteorological(date_time,' +
        'local,temp,hum,dew,wind_speed,wind_direction,real_feel)' +
        ' values(?,?,?,?,?,?,?,?)';
    connection.query(insertStr, data, function(err, results) {
        if (err) {
            console.error(err);
        } else {
            console.info('success')
                // console.info(JSON.stringify(results));
        }
    });
}