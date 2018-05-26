console.log('test');

function sayColor123(color, name) {
    inner();
}

function inner() {
    console.log(123);
    console.log(inner.caller); //[Function: sayColor123]
    console.log(arguments.caller); //undefined
    console.log(arguments.callee); //[Function: inner]
    console.log(arguments.callee.caller); //[Function: sayColor123]
    console.log(123321);
}
sayColor123();
console.log(sayColor123.length);
//函数的apply()和call()方法可以用来制定函数执行时的this
function sum(num1, num2) {
    return num1 + num2;
}

function callSum1(num1, num2) {
    return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);
}
console.log(callSum1(10, 10));
console.log(callSum2(10, 10));
sum(10, 20);
console.log(sum.apply(inner, [10, 10]));
var color = 'red';
var o = { color: 'blue' };
//重复声明sayColor函数实例 覆盖了之前的Function引用类型的sayColor实例
function sayColor() {
    console.log(this.color);
}
sayColor();
sayColor.call(o);
var objectSayColor = sayColor.bind(o); //使用了bind绑定this值为o
objectSayColor(); //blue 即使在全局作用域下调用 执行时内部this值也为o
console.log(sayColor.toString());
console.log(sayColor.toLocaleString());
console.log(sayColor.valueOf());

//基本包装类型
var s1 = 'some text'; //基本类型的值 基本类型的值 基本类型的值 重要的事情说三遍
/**
 * 基本包装类型 执行s1.substring()其实后台执行了以下三步操作 Boolean和Number基本包装类型一样
 * var s1 = new String('some text');
 * var s2 = s1.substring(2);
 * s1 = null;
 * 
 * @type String
 */
var s2 = s1.substring(2);
console.log(s2);
//每次访问基本类型的值s1的过程处于一种读取模式 三步1 var s1 = new String('some text'); 2 s1.color = 'red'; 3 s1 = null;
s1.color = 'red';
//每次访问基本类型的值s1的过程处于一种读取模式 此时上一行new的s1已经被置null 该行的s1会从内存中再次读取创建String对象 没有color属性
console.log(s1.color); //undefined
var s3 = new String('some text');
s3.color = 'blue';
console.log(s3.color); //blue new调用基本包装类型构造函数 在执行流离开当前作用域之前一直保持在内存中 不会出现上面的问题
var value = '25';
var number = Number(value); //调用转型函数 number中保存的是基本类型的值 基本类型的值 基本类型的值 25
var obj = new Number(value); //调用构造函数 obj中保存的是Number的实例 Number的实例 Number的实例 重要的事情说三遍
//Boolean类型
var falseObject = new Boolean(false);
var result = falseObject && true; //true falseObject是对象 对falseObject而不是对它的值进行求值 对象都会被转换为true
var falseValue = false;
result = falseValue && true; //false
typeof falseObject; //object
typeof falseValue; //boolean
falseObject instanceof Boolean; //true
falseValue instanceof Boolean; //false
//Number类型
var num = 10.235;
console.log(num.toString(8)); //12.1702436560507534 八进制
console.log(num.toFixed(2)); //10.23 注意舍入规则
console.log(num.toExponential(5)); //1.02350e+1
var num1 = 99;
console.log(num1.toPrecision(1)); //1e+2 99只用1位来表示 最合适的只能是指数表示法的100
console.log(num1.toPrecision(2)); //99
console.log(num1.toPrecision(6)); //99.0000
console.log(Boolean(new Number(0))); //true
console.log(Boolean(0)); //false
console.log(num1.constructor.valueOf()); //Number constructor保存用于创建当前引用类型实例的构造函数
var colors = ['red', 'blue']; //和对象object一样 使用字面值表示法 不会调用对应的构造函数
var balls = new Array(2);
console.log(colors.constructor.valueOf()); //Array
console.log(balls.constructor.valueOf()); //Array
//String类型
var text = 'cat, at, sat, fat';
var pattern = /.at/;
var matches = text.match(pattern);
console.log(matches); //与RegExp对象exec()方法传递text为参数得到相同的数组
console.log(text);
var pos = text.search(/.at/); //0 第一个匹配项cat的索引
console.log(pos);
var result = text.replace('at', 'ond');
console.log(result); //cond, at, sat, fat 只会替换第一个子字符串
result = text.replace(/at/g, 'ond'); //传入一个制定全局g的正则表达式 可以替换所有子字符串
console.log(result);
result = text.replace(/(.at)/g, 'word ($`)'); //word (),word (cat,), word (cat, at, ), word (cat, at, sat, )
result = text.replace(/(.at)/g, 'word ($&)'); //word (cat),word ( at), word (sat), word (fat)
result = text.replace(/(.at)/g, "word ($')"); //word (, at, sat, fat),word (, sat, fat), word (, fat), word ()
result = text.replace(/(.at)/g, "word ($1)"); //word (cat),word ( at), word (sat), word (fat)
result = text.replace(/(.at)/g, "word ($2)"); //word ($2),word ($2), word ($2), word ($2) 没有第二个捕获组？
result = text.replace(/.at/g, "word ($1)"); //word ($1),word ($1), word ($1), word ($1) 正则字面值不带括号不行???
//关于正则 匹配项 多个捕获组 模式匹配项 第一个捕获组的匹配项 ？？？
console.log(result);
console.log(String.fromCharCode(104, 101, 108, 108, 111)); //hello String构造函数的静态方法

var uri = 'http://www.wrox.com/illegal value.html#start';
var encodeText = encodeURI(uri);
var encodeComponentText = encodeURIComponent(uri);
console.log(encodeText); //http://www.wrox.com/illegal%20value.html#start
console.log(encodeComponentText); //http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.html%23start
console.log(decodeURI(encodeText));
console.log(decodeURI(encodeComponentText)); //http%3A%2F%2Fwww.wrox.com%2Fillegal value.html%23start 只会decode空格
console.log(decodeURIComponent(encodeComponentText)); //http://www.wrox.com/illegal value.html#start
console.log(decodeURIComponent(encodeText)); //http://www.wrox.com/illegal value.html#start

eval('console.log(uri)');
//eval()中创建的任何变量和函数都不会被提升 即只能在eval()之后使用
// sayHi(); error 
// console.log(msg); error
eval('var msg = "hello word";');
eval('function sayHi(){ console.log("hi"); }');
sayHi();

//立即调用的函数表达式
var test = function() {
    return '123';
}();
console.log(test); //123

//5.7.2
console.log(Math.E);
var values = [1, 2, 3, 4, 5, 6, 7, 8];
var max = Math.max.apply(Math, values);
console.log(max);
var num = Math.floor(Math.random() * 9 + 2); //随机一个2-9之间的整数
console.log(num);
//获取制定范围内的随机数
function selectFrom(lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}
num = selectFrom(2, 10);
console.log(num);

//***********test************
var messageThird = "hello";
if (messageThird) {
    console.log(typeof(messageThird)); //string 不会转换为boolean类型 书上有误
}
var number01 = -18;
console.log(number01.toString(2));
var oldValue = 2; //二进制 0000010
var newValue = oldValue << 5; //64 二进制1000000
var testValue = oldValue << 65;
console.log(testValue);
var testValue1 = -2;
var testValue2 = testValue1 << 5;
console.log(testValue2); //-64
//label语句 outermost 结合break continue在循环嵌套的情况下使用
var num23 = 10;
outermost:
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (i == 5 && j == 5) {
                continue outermost;
            }
            num23++;
        }
    }
console.log(num23);

function testPara(para1, para2) {
    para1 = 111;
    para2 = 222;
    arguments[5] = 6;
    console.log(arguments[1]); //undefined 因为调用时只传了一个参数 不可通过命名参数同步到对应arguments
    console.log(para1);
    console.log(arguments[5]);
}
testPara(1);

function displayInfo(args) {
    console.log(typeof args.name);
    if (typeof args.name == 'string') {
        console.log(args.name);
    }
    console.log(typeof arguments.callee + '1111111');
}
displayInfo({
    name: 'Nicholas',
    age: 29
});
displayInfo({
    age: 20,
});
console.log(typeof RegExp);

var testBlo = '1234';
function testJSBlock(){
    var testbloobj = {
        'testBlo' : 111,
        testjs(){
            testBlo = '0000';
            console.log(this.testBlo);
            console.log(testBlo);
        }
    };
    return testbloobj;
}
var testoobj123 = testJSBlock();
testBlo = '3344';
testoobj123.testjs();
console.log(testBlo);

function test00(){
    // this.testBlo = 1023;
    console.log(this.testBlo);
}
var aaabbb = {
    testBlo : 77778884
};
var aaabbb1111 = {
    testBlo : 77778880000
};
aaabbb.testfu = test00;
aaabbb.testfu();
aaabbb.testfu.call(aaabbb1111);
aaabbb1111.testuu = test00.bind(aaabbb);
aaabbb1111.testuu();
var test111 = test00.bind(aaabbb);
var vvv = new test111();
console.log(aaabbb.testBlo);
console.log('test');
//验证闭包嵌套时的执行环境作用域链
var test99 = 100;
var test88 = 66;
var testobj99 = {
    test99 : 199,
    testfunction99 : function(){

    }
}
var abcFunction = function(){
    var test88 = 55;
    console.log(this.test99);
    return function(){
        console.log(this.test99 + 'abcd');
        var test44 = 44;
        return function(){
            console.log(test88);    
        };
    }
};
var cccf = abcFunction();
var aaf = cccf();
aaf();

//验证闭包的this是否可以指向非全局对象
testobj99.testff = abcFunction();
testobj99.testff(); //199abcd 闭包中的this可以指向非全局对象

console.log(111122223333);
function MyTest(name01){
    var test3344 = name01;
    this.getName = function(){
        return test3344;
    };
    this.setName = function(value){
        test3344 = value;
    }
}
var aMy = new MyTest('123411');
aMy.setName('0099');
var bMy = new MyTest('445566');
console.log(bMy.getName());
console.log(aMy.getName());
//注意之间的区别*******************
function creatTest(){
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function(){
            return i;
        }
    }
    return result;
}







