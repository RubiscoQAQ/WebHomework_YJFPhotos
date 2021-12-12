function checkStrong(value) {
    if(value.length<6||value.length>20){
        return 0;
    }
    var res = 0;
    let num_pat = /\d/;
    let alpha_pat = /[A-Za-z]/;
    let ascii_pat = /[!@#$%^&*()_+\-={}|:"<>?,./;'`~\[\]\\]/;
    if(num_pat.test(value)){
        res++;
    }
    if(alpha_pat.test(value)){
        res++;
    }
    if(ascii_pat.test(value)){
        res++;
    }
    console.log(res);
    return res;
}


function login() {
    let email = document.getElementById("email").value;
    let userPass = document.getElementById("password").value;
    let verifyCode = document.getElementById('verifycode').value;

    if(!isSameCode(verifyCode,VerifyCode)){
        let promptArea = document.getElementById("passwordError");
        promptArea.innerText = "验证码错误";
        promptArea.style.display = 'inline-block';
        document.getElementById("verifycode").value = '';
        newCode('verifypic',200,60);
        return false;
    }
    if (email && (checkStrong(userPass)>1)) {
        let fetchResponse = fetch('/index.html', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: userPass})
        });


        fetchResponse.then((response) => response.json()).then(response => {
            if (response.code === '1') {
                console.log("here");
                window.location = '/index.html';
            } else {
                let promptArea = document.getElementById("passwordError");
                promptArea.innerText = "用户名或密码错误";
                promptArea.style.display = 'inline-block';
                document.getElementById("verifycode").value = '';
                document.getElementById("password").value = '';
                //alert("用户名或者密码错误");
                //location.reload();
            }
        });
        return true;
    }
    let promptArea = document.getElementById("passwordError");
    promptArea.innerText = "用户名或密码错误";
    promptArea.style.display = 'inline-block';
    document.getElementById("verifycode").value = '';
    document.getElementById("password").value = '';
    return false;
}
//用于在登录状态下直接进入主页
let fetchResponse = fetch('/session', {
    method: 'get',
});
try{
    fetchResponse.then((response) => response.json()).then(response => {
        if(!isEmptyObject(response)){
            window.setTimeout("window.location='/index.html'", 500);
        }
    });
}catch (e) {
    console.log(e.stack);
}
function isEmptyObject( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
