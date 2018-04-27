1. 新建一个 passwd.js 
exports.pass = '';  // smtp验证用的是授权码 
exports.emailFormer = "zhangweixin912@163.com"; // 发送邮箱
exports.emailReceiver = "gzyzwx@gmail.com"; //接收邮箱

// 如果使用密码 550错误
// 设置方法  https://segmentfault.com/q/1010000004616821


2. `sh dist.sh` 跑你的项目
3. `node index.js` 运行此项目，在`data`中配置为true的网页会被当作是邮件发送出去
4. 目前发送是用的163的邮箱，好像跟发件人是没有多大关系的，所以一般不用改。