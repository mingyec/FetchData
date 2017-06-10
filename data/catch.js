var https = require('https');
var http = require('http');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');
var moment = require('moment');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');

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
    sendEmail('<b>数据库崩溃，原因：</b><br/>' + JSON.stringify(err));
    if (!err.fatal) return;

    if (err.code != 'PROTOCOL_CONNECTION_LOST') {
        throw err;
    }

    connection = mysql.createConnection(config);
    connection.connect();
});

var transporter = nodemailer.createTransport({
    service: 'qq',
    port: '465',
    secureConnection: true,
    auth: {
        user: '916468386@qq.com', //这里密码不是qq密码，是你设置的smtp密码 
        pass: 'ltrvclzywylobeff'
    }
});

//抓取当前数据
function fetchData(url) {
    http.get(url, function(res) {
        var html = '';
        res.on('data', function(chunk) {
            html += chunk;
        });
        res.on('end', function() {
            var $ = cheerio.load(html);

            try {
                //时间格式化
                var DateTime = $('#current>div>a>i>div').text();
                var date = DateTime.split(' ');
                var strDate = new Date().getFullYear() + '年' + date[0];
                var fmDate = strDate.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, '$1-$2-$3');
                var fetchTime = fmDate + ' ' + date[1];

                //取得露点
                var dewP = $('#day-part').children('p');
                let dewVal = dewP[2].childNodes[1].data
                let dew = dewVal.replace(/\°/g, '');
                //地区、温度、湿度
                let local = $('#current>h2>a').text();
                let tempVal = $('#current>div:first-child>a>b').text();
                let temp = tempVal.replace(/\℃/g, '');
                let humVal = $('.hum>p').text();
                let hum = humVal.replace(/\%/g, '');
                //风速，风向
                let windP = $('.wind>p>span').children();
                let wind = windP[1].prev.data.trim();
                let windArr = wind.split(' ');
                let windSpeedVal = windArr[1] + windArr[2];
                let wind_speed = windSpeedVal.replace(/米\/秒/g, '');
                let wind_direc = windArr[0];
                //体感温度
                let realFeelVal = $('.rfeel>b').text();
                let realFeel = realFeelVal.replace(/\°/g, '');

                let meteoData = [fetchTime, local, temp, hum, dew, wind_speed, wind_direc, realFeel];
                insertSql(meteoData);
            } catch (error) {
                sendEmail('<b>抓取实时数据错误，原因：</b><br/>' + JSON.stringify(error));
                console.error(error);
            }

        })
    })
}

function forecastData(f_url) {
    http.get(f_url, function(res) {
        var html = '';
        res.on('data', function(chunk) {
            html += chunk;
        });
        res.on('end', function() {
            try {
                var $ = cheerio.load(html);
                let local = $('#current>h2>a').text();
                let nowTime = moment().format('Y-MM-DD');
                let tempArr = [local, nowTime],
                    sqlStr = '',
                    sqlVal = '';
                for (let i = 0, max = 24; i < max; i++) {
                    let num = i < 10 ? '0' + i : i;
                    let ref = '#hour' + num;
                    let dd = $(ref).children('a').children('dl').children('dd');
                    let temp = dd.children('strong').text();
                    tempArr.push(temp);
                    sqlStr = sqlStr + ',temp_' + num;
                    sqlVal = i < 23 ? sqlVal + '?,' : sqlVal + '?';
                }
                // insertFcDataToSql(tempArr, sqlStr, sqlVal);
            } catch (error) {
                sendEmail('<b>抓取预测数据错误，原因：</b><br/>' + JSON.stringify(error));
                console.error(error);
            }

        })
    })
}

//保存为本地邮件
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

function sendEmail(content) {
    let mailOptions = {
        from: '916468386@qq.com', // 发件地址 
        to: 'mingyec@163.com', // 收件列表 
        subject: '爬虫程序出错，请检查', // 标题 //text和html两者只支持一种 
        // text: 'Hello world ?', // 标题 
        html: content // html 内容 
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.error(err);
        } else {
            console.info('邮件已发送 ' + info.response);
        }
    })
}

function loopCatch() {
    setInterval(function() {
        fetchData(url);
    }, 5 * 60 * 1000);
}

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

function insertFcDataToSql(data, tempStr, val) {
    let insertStr = 'insert into forecast_meteorological(local,forecast_day' +
        tempStr + ') ' + 'values(' + val + ',?,?)';
    connection.query(insertStr, data, function(err, results) {
        if (err) {
            console.error(err);
        } else {
            console.info('success to insert forecast data to mysql');
        }
    })
}

function init() {
    var url = 'http://m.weathercn.com/current-weather.do?partner=&id=2332592&language=zh-cn';
    var f_url = 'http://m.weathercn.com/hourly-weather-forecast.do?partner=&language=zh-cn&id=2332592';
    loopCatch();
    fetchData(url);
    schedule.scheduleJob('00 30 23 * * *', function() {
        forecastData(f_url);
    })
}

init();