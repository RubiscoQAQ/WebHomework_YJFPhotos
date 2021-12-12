let mysql = require('mysql');
var express = require('express');
var router = express.Router();
let crypto = require('crypto');

//连接数据库
let connection;
tryConnect();
function tryConnect(){
    connection = mysql.createConnection({
        //host: 'localhost',
        //port: 3306,
        //user: 'root',
        //password: '123456',
        //database: 'hw3'
        host: '49.235.227.136',
        port: 3306,
        user: 'hw3',
        password: '123456',
        database: 'hw3'
    });

    connection.connect((err) => {
        if(err){
            console.log("连接失败:"+err.stack);
            setTimeout(tryConnect , 2000);
            //如果连接错误尝试重连
            return;
        }
        console.log("连接成功!");
    });
    connection.on('error', function (err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        console.info('如果是连接断开，自动重新连接')
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            tryConnect();
        } else {
            throw err;
        }
    });
}

//
function clean(){
    connection.query('Delete from hw3.users where 1=1');
}
router.post('/index.html', function(req, res, next) {
    var userMsg = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(userMsg);
    login();
    function login(){
        let sql = 'SELECT * FROM `users` WHERE email = (?)';
        connection.query(sql, userMsg.email, (error, results, fields) => {
            if (error) {
                if(error.message==='read ECONNRESET'){
                    tryConnect();
                    login();
                }
                return console.error(error.message);
            }
            let user = JSON.parse(JSON.stringify(results));
            try {
                if (!user) {
                    res.send('{"code":"-1"}');
                    return;
                }
                user = user[0];
                userMsg.password = crypto.createHmac("sha256", String(user.salt)).update(userMsg.password).digest('hex');

            }
            catch (e) {
                res.send('{"code":"-1"}');
                console.log(e.stack);
                return;
            }
            if (userMsg.password === user.passwd) {
                req.session.userMsg = {
                    name: user.userName,
                    email: user.email
                };
                //保存登录信息
                console.log('登录成功');
                res.send('{"code":"1"}');
            } else {
                console.log(userMsg.password);
                res.send('{"code":"-2"}');
            }
        });
    }
});
router.post('/login.html',function (req,res,next) {
    //返回注册信息的几种结果
    //1-合法注册
    //-1-邮箱已被占用
    //-2-密码和确认密码不一致
    //-3-密码长度不正确
    var userMsg = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password_confirm: req.body.password_confirm,
        salt: String(req._startTime)
    }
    console.log(userMsg)
    function Verify(userMsg) {
        if(userMsg.password!==userMsg.password_confirm){
            console.log("密码不匹配");
            res.send('{"code":"-2"}')
            return -2;
        }
        else if(userMsg.password.length>20||userMsg.password.length<6){
            console.log("密码长度不正确");
            res.send('{"code":"-3"}')
            return -3;
        }
        let hmac = crypto.createHmac("sha256", String(userMsg.salt));
        userMsg.password = hmac.update(userMsg.password).digest('hex');
        return 0;
    }
    if(Verify(userMsg)===0){
        register();
        function register() {
            connection.query('insert into `users` values (?,?,?,?);',[userMsg.name,userMsg.salt,userMsg.password,userMsg.email],(err)=>{
                if(err){
                    if(err.message==='read ECONNRESET'){
                        tryConnect();
                        register();
                        return;
                    }
                    res.send('{"code":"-1"}');
                }else {
                    res.send('{"code":"1"}')
                }
            });
        }
    }
})
//router.get('/clear',function (req,res,next){
    //用于手动清理数据库
//    clean();
//})
module.exports = router;
