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
    console.log(userPass);
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
                alert("用户名或者密码错误");
                location.reload();
            }
        });
        return true;
    }
    alert("用户名或者密码错误!");
    location.reload();
    return false;
}
