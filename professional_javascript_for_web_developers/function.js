//7.0函数表达式
var testFunction = function(){
    console.log('1');
};
testFunction();
console.log(testFunction.name); //testFunction
var ff = testFunction;
console.log(ff.name); //testFunction
//以下括号中其实是函数声明 加个括号转换成函数表达式 赋值给testFunction
testFunction = (function a(){
    console.log('abc');
});
console.log(testFunction.name); //a
console.log(ff.name); //testFunction
//命名函数表达式
var testF = (function f(){
    console.log(2);
});
// f(); //error
testF(); //2
console.log(testF.name); //f
//7.2闭包
function createComparisonFunction(propertyName){
    return function(object1, object2){
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
var result = comparison({'a' : 'abc'},{'a' : 'bcd'});
//因为comparison是全局变量 置null解除引用 让值脱离执行环境 以便垃圾收集器下次运行时将其回收 P81页 4.3.4管理内存
comparison = null;
console.log(result);
//7.2.2
var nameTest = 'the window';
var objectTest = {
    nameTest : 'my object',
    getName : function(){
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
function assignHandler(){
    var element = document.getElementById('someElement');
    //引用element的闭包作为元素事件处理 造成循环引用
    element.onclick = function(){
        console.log(element.id);
    };
}
function assignHandler(){
    var element = document.getElementById('someElement');
    var id = element.id; //避免循环引用
    element.onclick = function(){
        console.log(id);
    };
    element = null; //闭包引用函数的整个活动对象 其中包含着element 需要置null解除对DOM对象的引用 才能确保回收内存 ???
}
//7.3
function outputNumbers(count){
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
    (function(){
        for (var j = 0; j < count; j++) {
            console.log(j);
            console.log(m); //undefined 闭包函数执行时 引用外部函数活动对象 执行时外部函数中的m还未声明初始化
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
function MyObject(name){
    var privateVar = 10;
    function privateFunction(){
        return name + testPrivate;
    };
    //特权方法
    this.publicMethod = function(){
        privateVar++;
        console.log(testPrivate); //test_test 注意闭包函数调用时在new之后 testPrivate已声明初始化 和7.3模仿块级作用域的区别
        return privateFunction();
    };
    var testPrivate = 'test_test';
}
var my = new MyObject('1122');
console.log(my.publicMethod()); //1122



