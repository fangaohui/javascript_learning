console.log('Promise与异步编程');
//*****************************************************************************
console.log('创建未完成的Promise');
/*
//注意执行顺序
Promise test
123
promise resolved
timeout
 */
var testPromise = new Promise(function doPromise(resolve,reject) {
    console.log('Promise test');
    resolve();
});
testPromise.then(function(){
    console.log('promise resolved');
});
//使用setTimeout()函数可以指定将任务添加到队列前的延时
setTimeout(function(){
    console.log('timeout');
},500);
console.log('123');
//*****************************************************************************
console.log('创建已处理的Promise');
let promise = Promise.resolve(43);
promise.then(function(value){
    console.log(value);
})
let promise1 = Promise.resolve(promise);
console.log(promise1 === promise); //true
let thenable = {
    then : function(resolve,reject){
        resolve(42);
        // reject(42);
    }
};
let p1 = Promise.resolve(thenable);
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














