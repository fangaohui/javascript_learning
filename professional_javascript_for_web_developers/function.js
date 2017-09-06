//7.0函数表达式
var testFunction = function(){
    console.log('1');
};
testFunction();
console.log(testFunction.name); //testFunction
var ff = testFunction;
console.log(ff.name); //testFunction
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



