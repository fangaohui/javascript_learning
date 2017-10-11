console.log('Promise与异步编程');
//*****************************************************************************
console.log('创建未完成的Promise');
let uuio = 123;
var testPromise = new Promise((resolve,reject) => {
    console.log('Promise test' + uuio);
    setTimeout(reject, 200, 'abcdef'); //忽略 因为先执行了resolve()已处理???
    resolve(uuio);
    console.log('会执行');
});
testPromise.then((value) => console.log(value));
setTimeout(() => console.log('123456'), 1000);
console.log('注意打印顺序');
//*****************************************************************************
console.log('创建已处理的Promise');
Promise.resolve(43333).then(value => console.log(value));
// console.log(Promise.reject(testPromise) === testPromise); //false ???????
// let promise1 = Promise.resolve(testPromise);
// console.log(promise1 === testPromise); //true
let thenable = {
    then : function(resolve,reject){
        resolve(422222);
        reject(4211111); //忽略???
        console.log('执行111'); //为什么打印顺序靠后???
    }
};
console.log(Promise.resolve(testPromise)); //Promise { 123 } 不延迟也是已处理状态 注意对thenable对象的特殊处理???
console.log(Promise.reject(testPromise)); //Promise { <rejected> Promise { 123 } }
console.log(Promise.reject(thenable)); //Promise { <rejected> { then: [Function: then] } }???
let p1 = Promise.resolve(thenable);
console.log(p1); //Promise { <pending> } 注意此时是pending状态???
setTimeout(() => console.log(p1), 50); //Promise { 422222 } 此时就变为已处理状态???
/*
p1.then(function(value){
    console.log(value);
},function(value){
    console.log(value + 10);
});
console.log('全局的Promise拒绝处理');
let rejected2;
process.on('unhandledRejection',function(reason,promise2){
    console.log(reason.message);
    console.log(rejected2 === promise2); //true
});
rejected2 = Promise.reject(new Error('explosion'));
let rejected3;
process.on('rejectionHandled',function(promise3){
    console.log(rejected3 === promise3);
});
rejected3 = Promise.reject(new Error('Ex!'));
//注意如不使用setTimeout()函数 则rejectionHandled不执行
setTimeout(function(){
    rejected3.catch(function(value){
        console.log(value.message);
    });
},500);
console.log('简单的未处理拒绝跟踪器');
let possiblyUnhandleRejections = new Map();
process.on('unhandledRejection',function(reason1,promise4){
    possiblyUnhandleRejections.set(promise4,reason1);
});
process.on('rejectionHandled',function(promise4){
    possiblyUnhandleRejections.delete(promise4);
});
setInterval(function(){
    possiblyUnhandleRejections.forEach(function(reason1,promise4){
        console.log(reason1.message?reason1.message:reason1);
        //处理这些拒绝
        // handleRejection(promise4,reason1);
    });
    possiblyUnhandleRejections.clear();
},1000);
setTimeout(function(){
//Promise.resolve()方法只接受一个参数并返回一个完成态的Promise 也就是说不会有任务编排的过程 而且需要向Promise添加一至多个完成处理程序来获取值???
//注意打印顺序 理解任务编排
    console.log('串联Promise');
    let p1 = new Promise(function(resolve,reject){
        resolve(32);
    });
    let p2 = p1.then(function(value){
        console.log(value);
    });
    let p3 = p2.then(function(){
        console.log('finished');
    });
    p3.then(function(){
        console.log('finished123');
    });

    let p4 = new Promise(function(resolve,reject){
        throw new Error('error');
    });
    p4.catch(function(error){
        console.log(error.message);
        throw new Error('error1');
    }).catch(function(error){
        console.log(error.message);
        return 100;
    }).then(function(value){
        console.log(value); //上一个return值 只能使用then的resolve接收
        throw new Error('abc123');
    }).catch(function(error){
        console.log(error.message); //上一个Error值 只能使用catch接收 否则由全局process接收
    });
},1000);
setTimeout(function(){
    console.log('在Promise链中返回Promise');
    let p5 = new Promise(function(resolve,reject){
        resolve(12);
    });
    let p6 = new Promise(function(resolve,reject){
        reject(16);
    });
    p5.then(function(value){
        console.log(value);
        return p6;
    }).catch(function(error){
        console.log(error);
    });
},1100);
setTimeout(function(){
    console.log('响应多个Promise');
    let p5 = new Promise(function(resolve,reject){
        resolve(42);
    });
    let p6 = new Promise(function(resolve,reject){
        resolve(43);
    });
    let p7 = Promise.all([p5,p6]);
    p7.then(function(value){
        console.log(value); //[ 42, 43 ]
    });
    p6.then(function(value){
        console.log(value);
    });

    let p8 = new Promise(function(resolve,reject){
        reject(56);
    });
    let p9 = new Promise(function(resolve,reject){
        resolve(57);
    });
    let p10 = Promise.all([p8,p9]);
    p10.catch(function(value){
        console.log('aaa' + value); //aaa56
    });
    p9.then(function(value){
        console.log(value); //57
    });
},1200);

*/