


function sign_up() {
    let email = document.getElementById("email").value;
    if (checkPassword()&&checkMsg()) {
        let userPass = document.getElementById("password").value;
        let password_confirm = document.getElementById("password_confirm").value;
        let name = document.getElementById('name').value;
        let verifyCode = document.getElementById('verifycode').value;
        if(!isSameCode(verifyCode,VerifyCode)){
            let promptArea = document.getElementById("passwordError");
            promptArea.innerText = "验证码错误";
            promptArea.style.display = 'inline-block';
            document.getElementById("verifycode").value = '';
            newCode('verifypic',200,60);
            return false;
        }
        let fetchResponse = fetch('/login.html', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: userPass,password_confirm:password_confirm,name:name})
        });

        fetchResponse.then((response) => response.json()).then(response => {
            let promptArea = document.getElementById("passwordError");

            if (response.code === '1') {
                alert("注册成功，2秒后自动跳转");
                window.setTimeout("window.location='/'", 2000);
            } else if (response.code === '-1') {
                promptArea.innerText = "邮箱已经存在";
                promptArea.style.display = 'inline-block';
                document.getElementById("email").value = '';
            } else if (response.code === '-2') {
                promptArea.innerText = "密码和确认密码不一致";
                promptArea.style.display = 'inline-block';
                document.getElementById("password").value = '';
                document.getElementById("password_confirm").value = '';
            } else if (response.code === '-3') {
                promptArea.innerText = "密码长度应为6-20位";
                promptArea.style.display = 'inline-block';
                document.getElementById("password").value = '';
                document.getElementById("password_confirm").value = '';
            }
        });
    }
}

/*********************************************************
 ***************        密码校验       ********************
 *********************************************************/
function checkPassword() {
    let promptArea = document.getElementById("passwordError");
    let rePasswordArea = document.getElementById("password_confirm");

    let passwordValue = document.getElementById("password").value;
    let rePasswordValue = document.getElementById("password_confirm").value;
    let passwordStrong = checkStrong(passwordValue);
    if (passwordValue.length<6||passwordValue.length>20) {
        promptArea.innerText = "密码长度应为6-20位";
        promptArea.style.display = 'inline-block';
        document.getElementById("password").value = "";
        rePasswordArea.value = "";
        return false;
    }

    if (rePasswordValue === "" || passwordValue !== rePasswordValue) {
        promptArea.innerText = "输入的密码不一致";
        promptArea.style.display = 'inline-block';
        rePasswordArea.value = "";
        return false;
    }
    if (passwordStrong<2){
        promptArea.innerText = "您的密码强度为"+passwordStrong+",需要2以上的密码强度。请使用尽量多种类的字符（数字、字母、标点）";
        promptArea.style.display = 'inline-block';
        return false;
    }
    promptArea.style.display = 'none';
    return true;
}
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
    return res;
}

/*********************************************************
 ***************        信息校验       ********************
 *********************************************************/

function checkMsg(){
    //校验用户名和邮箱
    let promptArea = document.getElementById("passwordError");
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let nameValue = name.value;
    let emailValue = email.value;
    if(!checkEmail(emailValue)){
        promptArea.innerText = "请注意邮箱格式";
        promptArea.style.display = 'inline-block';
        email.value = "";
        return false;
    }
    if(nameValue.length<3||nameValue.length>16){
        promptArea.innerText = "用户名范围在3-16字符";
        promptArea.style.display = 'inline-block';
        name.value = "";
        return false;
    }
    promptArea.style.display = 'none';
    return true;
}
function checkEmail(value) {
    let email_pat = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    console.log(value);
    return email_pat.test(value);
}
