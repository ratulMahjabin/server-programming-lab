const HelloFunc = require('./helloWorld');

//SetInterval it is called like a loop
setInterval(() => {
    HelloFunc.Hello();
}, 1000);

//setTimeOut = it just called once
setTimeout(() => {
    console.log(HelloFunc.name);
}, 5000);

//Local Module
//Global Module
//3rd party module/Package 