function getValue(condition){
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
function testLet(condition){
    if (condition) {
        var test = 'a';
        let v = 'red'; //let为块级声明 无变量提升机制 执行流离开当前块 v立刻被销毁
        // let test; //无论是否执行到该行都报错 禁止重声明 如不调用该函数不报错 考虑原因???
        // var v; //同上
        // let v; //同上
        console.log(test);
        return v;
    } else {
        const maxItems = 5; //const常量为块级声明 与let基本相似 区别为声明必须初始化 初始化后不可再赋值
        console.log(v); //如执行到该行才报错 let为块级声明 无变量提升机制
        return null;
    }
}
testLet(1);