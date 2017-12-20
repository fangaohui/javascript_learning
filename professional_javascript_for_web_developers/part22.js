
function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]';
}
function isFunction(value) {
    return Object.prototype.toString.call(value) == '[object Function]';
}
function isRegExp(value) {
    return Object.prototype.toString.call(value) == '[object RegExp]';
}
//作用域安全的构造函数
function Person(name){
    if (this instanceof Person) {
        this.name = name;
    } else {
        return new Person(name);
    }
}
function SubPerson(age){
    Person.call(this,'Michael');
    this.age = age;
}
SubPerson.prototype = new Person();
var sub = new SubPerson(12);
console.log(sub.name);

function bind(fn,context){
    var args = Array.prototype.slice.call(arguments,2);
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(context,finalArgs);
    };
}
//不可扩展对象
Object.preventExtensions(sub);
Object.isExtensible(sub);
//密封的对象 属性的[[Configurable]]特性都被设置为false 不能删除属性和方法 part6
Object.seal(sub);
Object.isSealed(sub);
//冻结的对象 在密封的基础上 属性的[[Writable]]特性都被设置为false
Object.freeze(sub);
Object.isFrozen(sub);