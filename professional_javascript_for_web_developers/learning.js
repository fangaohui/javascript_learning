
"use strict";  //当前文档开启ECMAScript严格模式

function doSomething() {
    "use strict";  //当前方法内开启ECMAScript严格模式

    //Undefined类型只有一个值undefined 未初始化变量的值就是undefined
    var message;
    alert(message == undefined);  //true
    //注意messageSecond并没有声明
    var messageFirst;
    alert(messageFirst);  //undefined
    alert(messageSecond);  //messageSecond并没有声明 是未定义的变量 产生错误
    alert(typeof message);  //typeof是操作符而不是函数 括号不是必须的 undefined
    alert(typeof (messageSecond));  //未声明的变量只能执行一项操作 typeof 结果也是undefined

    //Null类型只有一个值null 表示一个空对象引用
    var car = null;
    alert(typeof (var));  //object
    //定义变量如果将来用于保存对象 最好用null来初始化 以便如下直接检查是否已经保存了一个对象的引用
    if (car != null) {
    }
    alert(null == undefined);  //true 但由于类型不一致 会出于比较的目的转换操作数

    //ECMAScript中所有类型的值都有与bool值等价的值 用函数Boolean()将一个其他类型的值转换为其对于的bool值
    var messageThird = "hello";
    var messageThirdAsBoolean = Boolean(messageThird);
    if (messageThird) {
        alert(typeof (messageThird));  //存在这种自动执行的Boolean转换 要明确这里是什么变量 messageThird已经是boolean变量 值是true
    }

    //ECMAScript使用IEEE754格式来表示整数和浮点数
    var intNum = 55;
    var octalNum1 = 070;  //八进制
    var octalNum2 = 08;  //无效八进制 前导零忽略
    var hexNum1 = 0xA;  //16进制
    var hexNum2 = 0x1b;   //16进制

}