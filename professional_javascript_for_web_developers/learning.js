
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
    var floatNum1 = 10.0;  //其实为整数 解析为10
    var floatNum2 = 0.0000003;  //小数点6个0以上默认转换为e表示法 3e-7
    var floatNum3 = 0.1, floatNum4 = 0.2;
    //0.1+0.2实际等于0.30000000000000004 以下判断为false
    if (floatNum3 + floatNum4 == 0.3) {
    }
    //依次为 极小极大值 负正无穷大 无穷大不是能够参与计算的数值
    var minValue = Number.MIN_VALUE, maxValue = Number.MAX_VALUE, maxInfinityValue = Number.NEGATIVE_INFINITY, minInfinityValue = POSITIVE_INFINITY;
    var testResult = maxValue + maxValue;
    alert(isFinite(testResult));  //false 使用isFinite()函数判断值是否为极大极小之间的正常值

    //任何数值除以非数值都返回NaN 任何涉及NaN的操作都返回NaN NaN不与包括NaN在内的任何值相等
    //注意isNaN()函数的判断规则 尤其当参数为对象时 P30页
    alert(isNaN(NaN));  //true
    alert(isNaN(10));  //false
    alert(isNaN('10'));  //false 可以转换为数值
    alert(isNaN('blue'));  //true 因为不能转换为数值
    alert(isNaN(true));  //false 可以转换为数值
    //测试isNaN()函数之后testValue的实际类型 会不会已经被转换为了number？
    var testValue = '10';
    alert(isNaN(testValue));
    alert(typeof (testValue));  //?

    //注意Number()函数的转换规则 尤其当参数为对象时 P30页
    var num1 = Number('hello');  //NaN
    var num2 = Number('23hello');  //NaN
    var num2 = Number('');  //0
    var num3 = Number('0x1b');  //18进制字符串转换为十进制27
    var num4 = Number('07');  //前导0忽略 而不是按八进制

    // parseInt() parseFloat() 函数专门用于字符串转换数值 其他类型转换会如何？
    var num1 = parseInt('123blue');  //123
    var num2 = parseInt('');  //NaN
    var num2 = parseInt('AF');  //NaN
    var num3 = parseInt('0xA');  //10
    var num4 = parseInt('22.3');  //22
    var num5 = parseInt('070');  //ECMAScript3 JavaScript引擎识别八进制 为56 ECMAScript5 JavaScript不识别8进制为70
    var num6 = parseInt('0xAF', 16)  //明确以16进制 175
    var num6 = parseInt('AF', 16)  //明确以16进制 175
    var num7 = parseFloat('123blue');  //123 结果为整数
    var num8 = parseFloat('0123.0');  //123 结果为整数
    var num9 = parseFloat('0xA');  //0  
    var num10 = parseFloat('22.3.4');  //22.3
    var num11 = parseFloat('3.125e7');  //31250000 应该为整数类型？
    var num12 = parseFloat('abc');  //NaN

    //string类型的length属性 只返回包含16位字符的数目 可能不准确 比如当包含双字节字符时
    //toString() String()区别
    var age, age1 = null;;
    var result = age1.toString();  //错误 只有null和undefined值没有toSting()函数 可使用String()函数
    alert(String(age));  //'undefined'
    alert(String(age1));  //'null'


}




