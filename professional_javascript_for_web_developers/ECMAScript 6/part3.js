console.log('函数形参的默认值');
function makeRequest(url, timeout = 1000, callback){
    console.log(url);
    console.log(timeout);
    console.log(callback);
    console.log(arguments.length);
}
makeRequest(1,null,2); //1 null 2 3
makeRequest(1); //1 1000 undefined 1
function getValue(value){
    return value + 5;
}
//在函数调用(非声明定义)且需要使用默认值时才执行默认参数求值函数
function add(first, second = getValue(first)){
    return first + second;
}
console.log(add(2,1)); //3
console.log(add(2)); //9
function addTest(firstTest = secondTest, secondTest){
    return firstTest;
}
console.log(addTest(1)); //1
// console.log(addTest(undefined,1)); //error 参数默认值访问了处在临时死区的变量secondTest