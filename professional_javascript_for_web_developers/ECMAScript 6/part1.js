function getValue(condition) {
    if (condition) {
        var value = 'blue';
        return value;
    } else {
        console.log(value); //未报错而是undefined 说明value被声明创建了 变量提升机制
        return null;
    }
}
getValue();
/*
//预编译阶段 js引擎将上面的函数修改为如下
function getValue(condition){
    var value; //函数作用域或全局作用域中通过var声明的变量 无论实际在何位置声明 都会被当成当前作用域顶部声明的变量 即提升机制
    if (condition) {
        value = 'blue'; //初始化依然留在原处执行
        return value;
    } else {
        console.log(value);
        return null;
    }
}
*/
console.log('*****分割线******1');

function testLet(condition) {
    if (condition) {
        var test = 'a';
        /*
        //error v使用let 未提升 当前在暂时性死区 暂时性死区中的变量 未执行声明从死区中移除前的任何操作都报错 包括typeof
        //和下面的禁止重声明不同 重声明报错只要当前方法被调用就报错 访问死区中的变量(访问而非声明)要到执行到该行才报错 考虑原因???
        console.log(typeof v);
        */
        let v = 'red'; //let为块级声明 无变量提升机制 执行流离开当前块 v立刻被销毁
        // let test; //函数被调用 则无论是否执行到该行都报错 禁止重声明 如该函数不被调用则不报错 考虑原因???
        // var v; //同上
        // let v; //同上
        console.log(test);
        return v;
    } else {
        const maxItems = 5; //const常量为块级声明 与let基本相似 区别为声明必须初始化 初始化后不可再赋值
        // console.log(v); //error let为块级声明 该行的v其实未声明定义 所以报错 可以使用typeof操作符
        console.log(typeof(v)); //undefined
        return null;
    }
}
testLet(1);
console.log('*****分割线******2');
const o = {
    name: 'nb',
    age: 19
};
// o = new Object(); //报错 const
console.log(o.name);
o.name = '123';
console.log(o.name); //123 const只针对指针 不针对指针所指的对象 联想c++的顶层/底层const
var aryF = new Array();
/*
//可使用let简化
(function testAry(){
    for (var i = 0; i < 10; i++) {
        aryF.push((function(item){
            return function(){
                console.log(item);
            };
        })(i));
    }
})();*/
(function testAry() {
    //每一次循环的i其实都是用上一次i的值重新初始化创建的
    for (let i = 0; i < 10; i++) {
        aryF.push(function() {
            console.log(i);
        });
    }
})();
for (let i = 0; i < aryF.length; i++) {
    aryF[i]();
}
/*
//for循环中使用const 只能执行第一次循环 首次循环执行的结尾执行j++时会报错
for (const j = 0; j < aryF.length; j++) {
    aryF[j]();
}
*/
console.log('********1');
//for-in和for-of循环中可以使用const 因为每次循环都创建了一个新的变量绑定 理解变量绑定 变量绑定???
for (const varj in aryF) {
    aryF[varj](); //注意varj是key
}
/*
var String = '123'; //会创建一个新的全局变量 成为全局对象的一个属性 覆盖掉原有的String
let RegExp = '123'; //使用let或const只会在全局作用域上创建新的绑定 不会有任何属性添加到全局对象中 不会覆盖
var same = (RegExp === window.Regexp); //false
same = (String === window.String); //true
*/