let fetchResponse = fetch('/session', {
    method: 'get',
});
try{
    fetchResponse.then((response) => response.json()).then(response => {
        if(isEmptyObject(response)){
            alert("未登录,即将跳转到登陆");
            window.setTimeout("window.location='/'", 500);
        }
    });
}catch (e) {
    console.log(e.stack);
    alert("未登录,即将跳转到登陆");
    window.setTimeout("window.location='/'", 500);
}
function isEmptyObject( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}

