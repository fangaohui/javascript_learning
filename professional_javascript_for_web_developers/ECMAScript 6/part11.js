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




