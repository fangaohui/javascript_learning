function getValue(){
    return 1;
};
//初次解析函数声明不会调用getValue()方法 方法执行时且使用默认参数才执行
function add(a,b = getValue()){
}
const setCookieDefaults = {
    secure : false,
    path : '/',
    domain : 'hupu.com'
};
function setCookie(name,value,{
    secure = setCookieDefaults.secure,
    path = setCookieDefaults.path,
    domain = setCookieDefaults.domain
} = setCookieDefaults){
}
//普通变量和对象属性之间的区别和联系
var test = {
    have : 123,
    testF(){
        // console.log(have); //error have未定义
        return 345;
    }
};
test.testF();
function *test1(){
    yield 2;
    var s = yield test.testF();
    yield s;
}
var y = test1();
console.log(y.next());
console.log(y.next());
console.log(y.next()); //{ value: undefined, done: false } yield后函数执行的return值只对生成器函数有用
var aaa = function(){
    console.log(aaa); //[Function: aaa]
}
aaa();
var bbb = class {
    constructor(name){
        this.name = name;
        console.log(bbb);
    }
    ccc(){
        console.log(123321);
        console.log(bbb);
    }
};
console.log(bbb.__proto__); //[Function]
var abc = new bbb();
abc.ccc();
let serializabelMixin = {
    serialize(){}
};
let AreaMixin = {
    getArea(){}
};
function mixin(...mixins){
    var base = function(){};
    Object.assign(base.prototype,...mixins);
    return base;
}
class Square extends mixin(AreaMixin,serializabelMixin){
}
let rejected;
process.on('rejectionHandled',promise => console.log((rejected === promise) + '123456'));
process.on('unhandledRejection',(reason,promise) => {
    console.log(reason.message);
});
rejected = Promise.reject(new Error('Explosion test'));
//如果不使用setTimeout()函数 rejectionHandled不触发 因为rejected创建过程和拒绝处理程序的调用在同一个事件循环 此时rejectionHandled事件尚未生效
// setTimeout(() => {
    rejected.catch(value => console.log(value.message + '123'));
// });






