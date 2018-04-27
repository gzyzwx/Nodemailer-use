/**
 * 本地打包email后，运行dist,然后才能运行此程序发邮件
 */

'use strict';
const nodemailer = require('nodemailer');
const request = require('request-promises');
const tough = require("tough-cookie");
// const pass = require('./passwd'); //请填写完整你的密码
const {pass, emailFormer, emailReceiver} =require("./passwd");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: '163',
    auth: {
        user: emailFormer,
        pass
    }
});

/**
 * subject 标题
 * html 邮件内容
 */
function send(conf) {
    // setup email data with unicode symbols
    let mailOptions = Object.assign({
        from: emailFormer, // sender address
        to: emailReceiver, // list of receivers
        subject: '本地测试邮件-发件人和标题后端控制', // Subject line
    }, conf);

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s, subject is %s', info.messageId, info.response, mailOptions.subject);
    });
}

let data = [{
    valid: false,
    url: `http://localhost:8080/email/subscribe?email=kuangqiyi@zuzuche.com&view=1`,
    subject: '订阅邮件-本地测试(发件人和标题后端控制)'
}, {
    valid: false,
    url: `http://localhost:8080/email/order_confirm_show?order_id=10815932&hash=54cfefe059706273f010ddbd112a5735`,
    subject: '订单确认邮件-本地测试(发件人和标题后端控制)'
}, {
    valid: false,
    url: `http://localhost:8080/email/order_retrieve?email=kuangqiyi@zuzuche.com&view=1`,
	subject: '找回订单邮件-本地测试(发件人和标题后端控制)'
}, {
    valid: false,
    url: `http://localhost:8080/email/order_waiting_confirm_show?order_id=59079130`,
	subject: '待确认邮件-本地测试'
},{
    valid: false,
    url: `http://localhost:8080/email/share_show?act=subscribe&email=lms.minsonlee@gmail.com&hash=fa87df82828c6f0fb012fe0f174f158a&dev_env=1`,
	subject: '邀请分享邮件-本地测试(线上数据)'
},{
    valid: false,
    url: `http://localhost:8080/email/share_show?act=register&id=297&email=limingshuang@zuzuche.com&hash=345621cde2216781d9c5ea6f0972a9fe&dev_env=1`,
	subject: '(打扰了，有疑惑找吴丽珊)邀请分享邮件-本地测试(线上数据)'
}
,{
    valid: false,
    url: `https://a.easyrentcars.com:8080/email/share_show?act=register&id=547&email=907925336@qq.com&hash=2b0fe27a2dd961a16e20663db969af19&dev_env=1,verify=false`,
	subject: '邀请分享邮件-本地测试(线上数据)'
},
{
    valid: false,
    url: `http://localhost:8080/email/share_show?email=yui.caicy%40gmail.com&hash=d4f00bbfcde1575f5b0ec23b54b6c998&act=subscribe&dev_env=1`,
    subject: '邀请分享邮件-本地测试(线上数据)'
},
{
    valid: true,
    url:"http://localhost:8080/email/share_show?act=share_invite&id=722&dev_env=1",
    subject: '分享二期邮件-本地测试(线上数据)'
}
];

// 从浏览器中取出来的cookie，种植cookie 是避免request请求的时候，拿到空页面
let cookieObj = {"user_action_id":"2402102028"," _erc_a_code":"erca.5a6ef5951a0f14.68191312"," _ga":"GA1.3.89047176.1517299175"," cto_lwid":"9a3c8379-6a21-4482-b3d1-2a4d7dc00f21"," is_test":"1"," PHPSESSID":"b203cd924fece4f4f3ceb6c03d62bc7c"," citizen_country_code":"HK"," erc_uscode":"16080"," userid":"jESoC0l4Nqt%2F5TuFcTbtkQ%3D%3D"," from_url":"http%253A%252F%252Fmg.world.easyrentcars.com%252Forder%252Forder.php%253Ftim%253D1519810773"," now_currency":"USD"," mv":"8883fqHTEdsjb3%2B2aIQgiDNYwvYHTUapwOZ7V8CfJ1R9V%2BYTmw"," refer_hash":"04fcde35037ffe81afeea74d3cde1dbe"," _$env$_":"1"," _branch_":"feature-share-email"," _gid":"GA1.3.625491842.1520230289"," _uetsid":"_uet719ac25a"}
// let cookieArr = ["user_action_id=2402102028"," _erc_a_code=erca.5a6ef5951a0f14.68191312"," _ga=GA1.2.89047176.1517299175"," cto_lwid=9a3c8379-6a21-4482-b3d1-2a4d7dc00f21"," _erc_a_code=erca.5a6ef5951a0f14.68191312"," is_test=1"," PHPSESSID=b203cd924fece4f4f3ceb6c03d62bc7c"," citizen_country_code=US"," citizen_country_code=HK"," "," erc_uscode=16080"," userid=jESoC0l4Nqt%2F5TuFcTbtkQ%3D%3D"," from_url=http%253A%252F%252Fmg.world.easyrentcars.com%252Forder%252Forder.php%253Ftim%253D1519810773"," now_currency=JPY"," mv=76f6v3isfAwj4yBwH95QGcJIwKOngDmh8vmYmxLyvfTaJwkJFQ"," mv=8883fqHTEdsjb3%2B2aIQgiDNYwvYHTUapwOZ7V8CfJ1R9V%2BYTmw"," refer_hash=04fcde35037ffe81afeea74d3cde1dbe"," now_currency=USD"," _$env$_=1"," _branch_=feature-share-email"," _gid=GA1.2.625491842.1520230289"," _ga=GA1.3.89047176.1517299175"," _gid=GA1.3.625491842.1520230289"," _uetsid=_uet719ac25a"]
let cookieArr =  ["_erc_a_code=erca.5a6ef5951a0f14.68191312"," _ga=GA1.3.89047176.1517299175"," user_action_id=9180777071"," _erc_a_code=erca.5aa7a9e7550351.69589177"," cto_lwid=0d4f17c0-16f9-4d67-ab9b-7d2946cec343"," _ga=GA1.2.89047176.1517299175"," from_url=https%253A%252F%252Fwww.easyrentcars.com%252Freservation%252Fcheckout%252F%253Fclid%253D16037%2526id%253D153380549%2526bid%253D5aa73ee52ef6d889228b4574"," citizen_country_code=US"," rmStore=amid:43220"," citizen_country_code=US"," mv=1f5dZmNtXnDmR4IIppkedGxKqTaMyZUazhLHaTk"," cto_idcpy=6e71c84d-ae04-4237-b3db-76c326ef8fb4"," _gid=GA1.2.1595125916.1522034550"," mv=afa6pDpIwi%2Bgj6e%2BhLISeoqf8%2FkyLOb2Huc9%2Bbk"," "," now_currency=USD"," PHPSESSID=0pe1brdgbss59jnkq3khece0h0"," refer_hash=057292b0d5abd99e18d5c759b4d39c47"," _cid=103330"," stc115019=env:1522374744%7C20180430015224%7C20180330022308%7C14%7C1045563:20190330015308|uid:1521194338243.20560636.97700548.115019.798704882.0:20190330015308|srchist:1045563%3A1521431247%3A20180419034727%7C1045564%3A1521439459%3A20180419060419%7C1045563%3A1522134543%3A20180427070903%7C1045564%3A1522137750%3A20180427080230%7C1045563%3A1522374744%3A20180430015224:20190330015308|tsa:1522374744485.1686194694.3260326.373387410384699.1:20180330022308"," _$env$_=1"," _branch_=feature-share-v2"," _gat=1"," _gat_clientTracker=1"," _uetsid=_uet56025c9f"]
// Put cookie in an jar which can be used across multiple requests
var cookiejar = request.jar();

// 遍历循环 修改item的格式，
let cookieArrItems = cookieArr.map(item =>{
    let filterItem = {
        key: item.split("=")[0],
        value: item.split("=")[1],
        httpOnly: true,
        maxAge: 31536000
    };
    let cookie = new tough.Cookie(filterItem);
    // ...all requests to https://api.mydomain.com will include the cookie
    cookiejar.setCookie(cookie, 'http://localhost:8080');
    return filterItem
})

data.filter(item => item.valid).map(item => {
    let options = {
        uri: item.url,
        jar: cookiejar
    }
    request(options).then(resp =>{
        console.log(resp)
        if(resp.body === 'No permissions'){

        }else{
            send({
                subject: item.subject,
                html: resp.body
            })
        }
        
}
)
});