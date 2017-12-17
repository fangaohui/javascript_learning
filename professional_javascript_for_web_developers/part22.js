
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
    return function(){
        return fn.apply(context,arguments);
    };
}