
console.log('test');

function sayColor(color, name) {
    inner();
}

function inner() {
    console.log(inner.caller);
    console.log(arguments.caller);
    console.log(arguments.callee);
    console.log(arguments.callee.caller);
}
sayColor();
console.log(sayColor.length);
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
var s3 = new String('some text'); //Number的实例 Number的实例 Number的实例 重要的事情说三遍
s3.color = 'blue';
console.log(s3.color); //blue new调用基本包装类型构造函数 在执行流离开当前作用域之前一直保持在内存中 不会出现上面的问题
var value = '25';
var number = Number(value); //调用转型函数 number中保存的是基本类型的值 基本类型的值 基本类型的值 25
var obj = new Number(value); //调用构造函数 obj中保存的是Number的实例 Number的实例 Number的实例

var falseObject = new Boolean(false);
var result = falseObject && true; //true falseObject是对象 对falseObject而不是对它的值进行求值 对象都会被转换为true
var falseValue = false;
result = falseValue && true; //false
typeof falseObject; //object
typeof falseValue; //boolean
falseObject instanceof Boolean; //true
falseValue instanceof Boolean; //false





