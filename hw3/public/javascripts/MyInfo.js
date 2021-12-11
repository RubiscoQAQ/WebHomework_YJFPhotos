let fetchResponse = fetch('/session', {
    method: 'get',
});
fetchResponse.then((response) => response.json()).then(response => {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    if(response){
        name.value = response.name;
        email.value = response.email;
    }else {
        name.value = '请登录'
        email.value = '请登录'
    }
});
function clean() {

    alert("登出成功，2秒后自动跳转");
    window.setTimeout("window.location='/'", 2000);

    return false;
}
