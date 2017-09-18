var o = function (a){
    var b = 2;
    return {
        a,
        b
    };
}(1);
console.log(o); //{ a: 1, b: 2 }
console.log('Object.assign()方法');
// supplier中的属性复制到receiver中 浅复制 当属性为对象时只复制对象的引用 那么深复制???
function mixin(receiver, supplier){
    Object.keys(supplier).forEach(function(key){
        receiver[key] = supplier[key];
    });
    return receiver;
}
function Ev(){};
Ev.prototype = {
    constructor : Ev,
    emit : function(par){
        console.log(par);
    },
    on : function(){}
};
var myO = {};
mixin(myO,Ev.prototype);
//mixin()函数时Object.assign()函数的内部实现 使用赋值操作符来复制相关属性 但不能复制访问器属性 因为是赋值操作 所以访问器属性最终会转变为接收对象中的数据属性
Object.assign(myO,Ev.prototype);
myO.emit('test');