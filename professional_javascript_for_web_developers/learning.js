
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
    alert(typeof (messageSecond));  //未声明的变量只能执行一项操作typeof 结果也是undefined

    //Null类型只有一个值null 表示一个空对象引用
    var car = null;
    alert(typeof (var));  //object
    //定义变量如果将来用于保存对象 最好用null来初始化 以便如下直接检查是否已经保存了一个对象的引用
    if (car != null) {
    }
    alert(null == undefined);  //true 但由于类型不一致 会出于比较的目的转换操作数
    alert(null === undefined);  //false 全等不转换操作数类型

    //ECMAScript中所有类型的值都有与bool值等价的值 用函数Boolean()将一个其他类型的值转换为其对于的bool值
    var messageThird = "hello";
    var messageThirdAsBoolean = Boolean(messageThird);
    if (messageThird) {
        alert(typeof (messageThird));  //存在这种自动执行的Boolean()转换 要明确这里是什么变量 messageThird已经是boolean变量 值是true
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
    //0.1+0.2实际等于0.30000000000000004 以下判断为false IEEE754通病
    if (floatNum3 + floatNum4 == 0.3) {
    }
    //依次为 极小极大值
    var minValue = Number.MIN_VALUE, maxValue = Number.MAX_VALUE;
    //负 正 正无穷大 无穷大不是能够参与计算的数值
    var maxInfinityValue = Number.NEGATIVE_INFINITY, minInfinityValue = POSITIVE_INFINITY ,minInfinityValue1 = Infinity;
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

    //parseInt() parseFloat() 函数专门用于字符串转换数值 其他类型转换会如何？
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
    var age, age1 = null;
    var result = age1.toString();  //错误 只有null和undefined值没有toSting()函数 可使用String()函数
    alert(String(age));  //'undefined'
    alert(String(age1));  //'null'

    //位操作 NaN和Infinity值应用位操作会被当做0处理
    var num = -18;
    alert.(num.toString(2));  //-10010 隐藏了负数的二进制补码过程
    //按位非
    var num1 = 25;
    var num2 = ~num1;  //-26
    //按位与
    var num3 = 25 & 3;  //1
    //按位或
    var num4 = 25 | 3;  //27
    //按位异或
    var num4 = 25 ^ 3;  //26
    //左移 以0补充空位
    var oldValue = 2;  //二进制 0000010
    var newValue = oldValue << 5;  //64 二进制1000000
    var testValue = oldValue << 65;  //如果移动65位结果会是什么？
    var testValue1 = ~1;  //-2
    var testValue2 = testValue2 << 5;  //-64 负数二进制是补码形式 左移为什么会和正数一致？由于补码规则？
    //右符右移 会用符号位来填充产生的空位 即正数以0补充 负数以1补充
    var rightOld = 64;
    var rightNew = rightOld >> 5;  //2
    var rightTest = -64;
    var rightTest1 = rightTest >> 5;  //验证值
    //无符右移 以0补充空位
    var unsignRightOld = 64;
    var unsignRightNew = unsignRightOld >>> 5;  //2
    var testRight = -64;
    var testRight1 = testRight >>> 5;  //134217726 如果移动有符负数则连同符号位移动其二进制补码

    //逻辑与或非
    //非返回值一定是bool值 !!结果和Boolean()相同
    //逻辑与操作符和或操作符 为短路操作符 可能返回一个对象 注意对于规则 因此可以利用逻辑或操作符来避免为变量赋值null或undefined
    var myObject = preferredObject || backupObject;  //preferredObject优先值 如优先值为null则使用后备值backupObject

    //ECMAScript中不存在块级作用域
    var count = 10;
    for (var i = 0; i < count; i++) {
        alert(i);
    }
    //循环内部定义的变量在外部也可以访问
    alert(i);

    //label语句 outermost 结合break continue在循环嵌套的情况下使用
    var num = 10;
    outermost:
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (i == 5 && j == 5) {
                coninue outermost;
            }
            num++;
        }
    }
    alert(num);

    //switch语句比较值使用的是全等操作符 不会发生类型转换
    //switch语句中可以使用任何数据类型 每个case值可以是变量或表达式
    var num = 25;
    switch (true) {
        case num < 0: {
            break;
        }
        case num >= 0 && num <= 10: {
            break;
        }
        case num > 10 && num <= 20: {
            break;
        }
        default: {
        }
    }
}

//ECMAScript中的参数在内部使用一个数组来表示的 通过arguments对象访问参数数组但arguments本身不是数组
//函数没有签名 故没有重载 命名的参数只提供便利 解析器不会验证命名参数
function sayHi() {
    alert('first:' + arguments[0] + ',second:' + arguments[1] + ',total:' + arguments.length);
}
//arguments[1]值会同步给num2 但两个值内存空间是独立的 num2是否会同步给rguments[1]？
function doAdd(num1, num2) {
    sayHi(1, 2, 3, 4);
    arguments[1] = arguments.length;
    alert(arguments[0] + num2);
}
//ECMAScript中的所有参数传递的都是值 不可能通过引用传递参数？ 对象如何通过参数传递？
//如果只传一个参数 设置arguments[1]不会反映到命名参数中 因为arguments对象的长度是由传入参数的个数决定 不是由定义函数时的命名参数个数决定
doAdd(1);

//ECMAScript所有函数的参数都是按值传递的
//基本类型 值得传递如同基本类型变量复制一样 num和result是相互独立的
function addTen(num) {
    num += 10;
    return num;
}
var count = 20;
var result = addTen(count);
alert(count);  //20
alert(result);  //30

//引用类型的传递和引用类型变量的复制一样 obj和person引用的是在堆内存中的同一个对象
//即使参数是按值传递的，obj也会按引用来访问同一个对象
function setName(obj) {
    obj.name = 'Nicholas';
}
var person = new Object();
setName(person);
alert(person.name);  //Nicholas

//如果不是按值 而是按引用 则如下不成立 可以理解为类似指针的值？
function setName(obj) {
    obj.name = 'Nicholas';
    obj = new Object();
    obj.name = 'Greg';
}
var person = new Object();
setName(person);
alert(person.name);  //Nicholas






