var https = require('https');
var http = require('http');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');

//catch
var fetch_num = 0;
var fetch_max = 10;

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
                // save(meteo_info);
                console.info('hi');
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


//连接mysql测试
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'gx_cloud_dev'
});

connection.connect();

var queryStr = 'select * from sys_roles';
connection.query(queryStr, function(err, results, fields) {
    if (err) {
        console.error(err);
    } else {
        console.info(typeof results)
            // console.info(JSON.stringify(results));
    }
})