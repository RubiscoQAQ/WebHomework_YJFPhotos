var VerifyCode = '';
function newCode(selector,width,height) {
    //生成一个随机数
    function random_number(min,max) {
        return min+Math.trunc(Math.random()*(max-min));
    }
    //生成随机的颜色
    function random_color(min,max){
        var r = random_number(min,max);
        var g = random_number(min,max);
        var b = random_number(min,max);
        return `rgb(${r},${g},${b})`;
    }
    var canvas = document.getElementById(selector);
    var ctx = canvas.getContext('2d');
    //在Canvas上绘制背景图片
    ctx.fillStyle = random_color(180,230);
    ctx.fillRect(0,0,width,height);
    //绘制随机的几个字母
    var code_num = 6;
    var codePool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"
    var code = '';
    for(var i=0;i<code_num;i++){
        var c = codePool[random_number(0,codePool.length)];
        code += c;
        //取出合适的字符
        var size = random_number(28,50);
        var deg = random_number(-30,30);
        ctx.font = size+ 'px Simhei';
        ctx.textBaseline = 'top';
        ctx.fillStyle = random_color(80,150);
        //设置字符的样式
        ctx.save();//保存当前设置，便于一会恢复不旋转的样子
        ctx.translate((width/code_num)*i+10,15);//设置字母位置
        ctx.rotate(deg*Math.PI/180);
        ctx.fillText(c,-5,-10);
        ctx.restore();
    }
    //随机生成一些干扰线
    var line_num = 8;
    for(var i=0;i<line_num;i++){
        ctx.beginPath();
        ctx.moveTo(random_number(0,width),random_number(0,height));
        ctx.lineTo(random_number(0,width),random_number(0,height));
        ctx.strokeStyle = random_color(180,230);
        ctx.closePath();
        ctx.stroke();
    }
    //随机生成干扰原点
    var dot_num = 40;
    for(var i=0;i<40;i++){
        ctx.beginPath();
        ctx.arc(random_number(0,width),random_number(0,height),1,0,2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = random_color(150,200);
        ctx.fill();
    }
    VerifyCode = code;
}
function isSameCode(verifyCode, VerifyCode) {
    if(verifyCode.length!==VerifyCode.length){
        return false;
    }
    return verifyCode.toUpperCase()===VerifyCode.toUpperCase();
}
newCode('verifypic',200,60);
