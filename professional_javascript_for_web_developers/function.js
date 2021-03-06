//7.0函数表达式
var testFunction = function() {
    console.log('1');
};
testFunction();
console.log(testFunction.name); //testFunction
var ff = testFunction;
console.log(ff.name); //testFunction
//以下括号中其实是函数声明 加个括号转换成函数表达式 赋值给testFunction
testFunction = (function a() {
    console.log('abc');
});
// console.log(a); //error
console.log(testFunction.name); //a
console.log(ff.name); //testFunction
//命名函数表达式
var testF = (function f() {
    console.log(2);
    // f(); //正常调用 只是造成循环 考虑为什么这里可以正常调用 外部不能通过f()来调用???
});
// f(); //error
testF(); //2
console.log(testF.name); //f
//7.2闭包
function createComparisonFunction(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}
//执行环境 执行环境的作用域链 活动对象 变量对象 作用域链
/*
当函数被调用时 被调用时 被调用时 会创建 创建 一个执行环境(变量对象) 执行环境(变量对象) 及相应的 作用域链 作用域链。
然后 用arguments和其他命名参数的值 用arguments和其他命名参数的值 来初始化函数的活动对象 活动对象 活动对象。

在创建函数时 会先创建一个预先包含全局变量对象 全局变量对象的作用域链 保存在函数的[[Scope]]内部属性中。(注 应该不只是全局变量对象 而是所有上级的变量对象作用域链 书中针对的是在全局下创建的一个函数)
当调用函数时 会为函数创建一个执行环境(变量对象) 执行环境(变量对象)。
然后通过复制[[Scope]]属性中的对象构建起执行环境的作用域链 执行环境的作用域链。
然后 当前函数的活动对象(在此作为变量对象使用) 当前函数的活动对象(在此作为变量对象使用) 被创建并被推入执行环境作用域链的前端。
此时作用域链即为 [[Scope]]的上级作用域链 + 当前换上的活动对象(在此作为变量对象使用)
 */
var comparison = createComparisonFunction('a');
var result = comparison({ 'a': 'abc' }, { 'a': 'bcd' });
//因为comparison是全局变量 置null解除引用 让值脱离执行环境 以便垃圾收集器下次运行时将其回收 P81页 4.3.4管理内存
comparison = null;
//7.2.1
console.log(result);

function test() {
    var testResult = new Array();
    for (var i = 0; i < 10; i++) {
        testResult[i] = (function(num) {
            return function() {
                return num;
            };
        }(i));
    }
    return testResult;
}
var testArray = test();
for (var i = 0; i < testArray.length; i++) {
    console.log(testArray[i]()); //0-9
}
console.log('7.2.2');
//7.2.2
var nameTest = 'the window';
var objectTest = {
    nameTest: 'my object',
    getName: function() {
        console.log(this.nameTest);
        return this.nameTest;
    }
};
objectTest.getName(); //my object
(objectTest.getName)(); //my object
(objectTest.getName = objectTest.getName)(); //undefined web环境下应该是全局的the window
//注意和上一行代码的区别 上一行先执行赋值语句 再调用赋值后的结果 赋值表达式的值是函数本身 this的值不能得到维持
objectTest.getName = objectTest.getName;
objectTest.getName(); //my object
//7.2.3
function assignHandler() {
    var element = document.getElementById('someElement');
    //引用element的闭包作为元素事件处理 造成循环引用
    element.onclick = function() {
        console.log(element.id);
    };
}

function assignHandler() {
    var element = document.getElementById('someElement');
    var id = element.id; //避免循环引用
    element.onclick = function() {
        console.log(id);
    };
    //设置null之后 闭包被调用时保存的活动对象中element为null 活动对象中只有变量id 没有DOM对象的引用了 不会造成内存泄漏
    element = null; //闭包引用函数的整个活动对象 其中包含着element 需要置null解除对DOM对象的引用 才能确保回收内存
}
//7.3
function outputNumbers(count) {
    for (var i = 0; i < count; i++) {
        console.log(i);
    }
    console.log(i); //3
    var i; //只声明已有变量 会忽略
    console.log(i); //3
    var i = 44;
    console.log(i); //44

    n = 'abc';
    //注意必须加一层括号 由函数声明转换为函数表达式 才能立即跟()调用
    (function() {
        for (var j = 0; j < count; j++) {
            console.log(j);
            console.log(m); //undefined 闭包函数执行时 引用外部函数活动对象 执行时外部函数中的m还未声明初始化 mark!
            console.log(n); //abc
        }
    })();
    // console.log(j); //error
    var j;
    console.log(j); //undefined
    var m = '123';
}
outputNumbers(3);
//7.4
function MyObject(name) {
    var privateVar = 10;

    function privateFunction() {
        return name + testPrivate;
    };
    //特权方法
    this.publicMethod = function() {
        privateVar++;
        console.log(testPrivate); //test_test 注意闭包函数调用时在new之后 testPrivate已声明初始化 和7.3模仿块级作用域的区别
        return privateFunction();
    };
    var testPrivate = 'test_test';
}
var my = new MyObject('1122');
console.log(my.publicMethod()); //1122test_test 闭包执行可以访问到之后的testPrivate 注意和上面mark!的区别 此次使用了new创建对象
//私有变量可能不局限于this是否使用 只要构造函数内部定义 外部创建的对象无法访问即为私有变量 不使用this只是达到目的的一种方式 考虑其他???
console.log(my.privateVar); //undefined js私有变量外部访问都是undefined 因为私有变量构造函数内部未使用this 不会为创建的对象声明初始化对应属性
console.log(MyObject.privateVar); //undefined
//7.4.1静态私有变量
console.log('7.4.1静态私有变量');
(function() {
    var name = '';
    Person = function(ve) {
        name = ve;
    };
    Person.prototype.getName = function() {
        console.log(this); //mark1
        console.log(this.name); //mark2
        return name;
    };
    Person.prototype.setName = function(ve) {
        name = ve;
    };
})();
var person1 = new Person('nicholas');
console.log(person1.getName()); //nicholas mark1:Person {} mark2:undefined
var person2 = new Person('michael');
console.log(person1.getName()); //michael mark1:Person {} mark2:undefined
console.log(person2.getName()); //michael mark1:Person {} mark2:undefined
person1.name = 'abcd';
//注意理解静态私有变量和对象原型中变量的区别 理解this也是一个默认的变量属性 this.name和name的区别
console.log(person1.getName()); //michael mark1:Person { name: 'abcd' } mark2:abcd
person1.__proto__.getName(); //mark1:Person { getName: [Function], setName: [Function] } mark2:undefined
//7.4.2模块模式
console.log('7.4.2模块模式 为单例创建私有变量和特权方法');
//对象字面值的方式来创建单例对象
var singleton = {
    name: 'abc',
    age: 27
};
console.log(singleton.name);
//注意application是一个单例对象 因为是由匿名函数返回的一个对象字面量
var application = function() {
    //私有变量和函数
    var components = new Array();
    //初始化
    components.push(new Object());
    //公共
    return {
        getComponentCount: function() {
            return components.length;
        },
        registerComponent: function(component) {
            if (typeof component == 'object') {
                components.push(component);
            }
        }
    };
}();
//7.4.3增强的模块模式
console.log('7.4.3增强的模块模式 为单例创建私有变量和特权方法');
var application = function() {
    //私有变量和函数
    var components = new Array();
    //初始化
    components.push(new Object());
    var app = new Person();
    app.getComponentCount = function() {
        return components.length;
    };
    app.registerComponent = function(component) {
        if (typeof component == 'object') {
            components.push(component);
        }
    };
    return app;
}();
//testing
console.log('testing');
//闭包和原型的联系 函数的属性和在函数中声明的变量的区别 原型链的搜索和作用域链的搜索???
var tt = new Function('console.log("123321***********")');
tt();
console.log(tt.name); //anonymous
var aa = function() {
    console.log(aa.caller);
    return 123;
};
console.log(aa.name); //aa
console.log(Object.getPrototypeOf(aa)); //[Function]
console.log(Object.getOwnPropertyNames(aa)); //[ 'length', 'name', 'arguments', 'caller', 'prototype' ] 包含不可枚举属性
console.log(Object.keys(aa)); //[] 只包含可枚举属性
console.log(aa.length);
console.log(aa.caller); //null
aa.call(my, 1); //aa内部caller为[Function] caller是调用函数的函数 并不是this
function abc() {
    aa(); //aa内部caller为[Function: abc]
    console.log(aa.caller); //null
}
abc();
console.log(aa.caller); //null 思考caller作为aa的一个属性 在函数执行环境下和非执行环境下是不同的 P115页caller属性
/*
[ 'length',
  'name',
  'arguments',
  'caller',
  'apply',
  'bind',
  'call',
  'toString',
  'constructor' ]
*/
console.log(Object.getOwnPropertyNames(aa.__proto__));
console.log('******分割线******');
//js命名空间 其实就是 模拟块级作用域 使用示例
(function() {
    console.log(typeof this);
    var _NS = function() {};
    /*
    _NS.prototype.select = function(selector,context){
        var context = context || document; //document为容错值
        return context.querySelectorAll(selector);
    };
    window.NS = new _NS();
    */
})();
var Michael = function() {
    var kobe = 'bbb';
    this.jordan = 'aaa';
};
var m = new Michael;
console.log(m);
console.log(m.jordan);
var mm = new Michael();
console.log(mm);
console.log(mm.jordan);
//单例 http://www.cnblogs.com/TomXu/archive/2012/02/20/2352817.html
var SingletonTest = function() {
    var instantiated = null;
    var privateVar = '666';
    var init = function() {
        return {
            publicMethod: function() {
                console.log(privateVar); //666
                console.log(privateVarTest); //777该函数执行时 上级活动对象中已经完成了privateVarTest的初始化
                console.log(privateVarTest123); //undefined始终无法执行到初始化代码
            },
            publicProperty: 'test'
        };
    };
    var privateVarTest = '777';
    return {
        getInstance: function() {
            if (!instantiated) {
                instantiated = init();
            }
            // testFF(); //如果执行不到该行 编译不会报错
            return instantiated;
        }
    };
    var privateVarTest123 = '888';
    //考虑创建一个函数内部都做了哪些操作
    /*
    在创建函数时 会先创建一个预先包含所有上级变量对象的作用域链 保存在函数的[[Scope]]内部属性中。函数体在创建时被如何处理???
    当调用函数时 会为函数创建一个执行环境(变量对象) 通过复制[[Scope]]属性中的对象构建起执行环境的作用域链 然后 用(有没有this???)arguments和其他命名参数的值来初始化当前函数的活动对象(在此作为变量对象使用)并被推入执行环境作用域链的前端。
    */
    var testFF = function() {
        console.log('123456');
    };
}();
SingletonTest.getInstance().publicMethod();
eval(console.log(SingletonTest)); //same to below
eval('console.log(SingletonTest)');
//ECMAScript动态性 http://www.cnblogs.com/manfredHu/p/4914272.html
var slice = Function.prototype.call.bind(Array.prototype.slice);
console.log(slice([1, 2, 3], 0, 1)); //[ 1 ] 等同于 Array.prototype.slice.call([1,2,3],0,1) 如下
console.log(Array.prototype.slice.call([1, 2, 3], 0, 1)); //[ 1 ]
var bind = Function.prototype.call.bind(Function.prototype.bind);
var obj = { foo: 'abc' };

function returnFoo() {
    return this.foo;
}
var amazing = bind(returnFoo, obj);
console.log(amazing()); //abc