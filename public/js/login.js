"use strict";
var login = {}

login.init = function(){
    if(Util.getEl('#loginBtn').length != 0){
        Util.addLis(Util.getEl('#loginBtn')[0], 'click', login.login);
    }
}

login.login = function(){
    var data, email, password;
    email = Util.getEl('#email');
    password = Util.getEl('#password');

    data = {}
    data.email = email[0].value;
    data.password = password[0].value;

    data = JSON.stringify(data);

    Util.sendRequest('/login', function(res){
        /* IF THE LOGIN IS SUCCESSFUL REDIRECT TO THE HOME PAGE OTHERWISE DISPLAY ERROR MESSAGE AND CLEAR INPUT BOXES */
        if(res.response === "loginsuccess"){
            window.location = "/home";
        }
        else {
            email[0].value = "";
            password[0].value = "";
            login.generateMessage(res.response);
        }
    }, data);
}

/* HERE I WRITE A MESSAGE BASED UPON WHAT RESPONSE I GET BACK FROM THE SERVER AS I HAVE MANY DIFFERENT TYPES OF ERROR CODES.*/
login.generateMessage = function(response){
    var msg = [];
    switch(response){
        case "badlogin" : msg = ["Error","red","Incorrect format for username and/or password."];break;
        case "error" : msg = ["Error","red","There is an error with the login process technical support has been contacted."];break;
        case "emailnotfound" : msg = ["Error","red","There is no record with that username and password."];break;
        case "loginerror" : msg = ["Error","red","There is no record with that username and password"];break;
    }
    login.displaybox(msg);
}

login.displaybox = function(msg){
    Util.msgBox({
        heading: {text: msg[0], background: msg[1], color: "#FFF"},
        body: {text: msg[2]},
    });
    setTimeout(Util.closeMsgBox, 2500);
}

login.init();