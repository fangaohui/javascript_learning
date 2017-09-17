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
function addTest(firstTest = testTDZ(secondTest), secondTest){
    return firstTest;
}
function testTDZ(value){
    console.log(typeof value);
    console.log('testTDZ');
    return value + 10;
}
console.log(addTest(1)); //1
// console.log(addTest(undefined,1)); //error 参数默认值访问了处在临时死区的变量secondTest secondTest未定义前(即函数被调用前)不可被引用
console.log('不定参数');
function pick(object, ...keys) {
    console.log(arguments.length); //3
    let result = Object.create(null);
    for (var i = 0; i < keys.length; i++) {
        result[keys[i]] = object[keys[i]];
    }
    return result;
}
console.log(pick.length); //1 只包含object 不包含不定参数keys
pick(1,23,4);
function testParaAry(...paraAry){
    console.log(paraAry); //[ 1, 2, 3 ]
}
console.log(testParaAry.length); //0
testParaAry(1,2,3);
var add = new Function('first','second = first','...args','return first + args.length + second');
console.log(add(11,2)); //13
console.log('展开运输符');
let values = [25,50,75,100];
console.log(Math.max.apply(Math,values)); //ECMAScript 5
console.log(Math.max(...values)); //100
console.log(Math.min(0,...values)); //0
console.log('函数的多重用途');
function Person(name){
    if (this instanceof Person) {
        this.name = name;
    } else {
        throw new Error('必须使用new关键字');
    }
    //元属性 new.target
    if (typeof new.target !== 'undefined') {
        this.name = name;
    } else {
        throw new Error('未使用new关键字调用Person');
    }
}
var person = new Person('wendy');
// var notAPerson = Person('Michael'); //error
// var notAPerson = Person.call(person,'Ashliy'); //使用new.target为undefined
console.log('块级函数');
function testFunction(){
    'use strict';
    if (true) {
        function doSomething(){

        }
        var ttt = function(){

        };
    }
    console.log(typeof ttt); //function
    console.log(typeof doSomething); //严格模式下undefined doSomething未声明定义 if块执行完后doSomething即销毁 非严格模式下function doSomething被提升至外围函数的顶部
}
testFunction();
console.log('箭头函数');
let person1 = (name => {
    return {
        getName : function(){
            return name;
        }
    };
})('Nicholas');
console.log(person1.getName()); //Nicholas
console.log('箭头函数没有this绑定');
/*
let PageHandler = {
    id : '123456',
    init : function(){
        document.addEventListener('click', (function(event){
            this.doSomething(event.type); //不使用bind则this为document error
        }).bind(this),false);
    },
    doSomething : function(type){
        console.log('doSomething');
    }
};
*/
//箭头函数简化代码 等同于下一行
var result = values.sort((a,b) => a - b);
var result = values.sort(function(a,b){
    return a - b;
});
var sum = (num1,num2) => num1 + num2;
console.log(sum.call(null,1,2)); //3
console.log(sum.call(null,4,2)); //6
var boundSum = sum.bind(null,4,5);
console.log(boundSum()); //9
console.log(boundSum(1,4)); //9
