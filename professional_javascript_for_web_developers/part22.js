
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
setTimeout(function(){
    var div = document.getElementById('myDiv'),
    var left = parseInt(div.style.left) + 5;
    div.style.left = left + 'px';
    if (left < 200) {
        setTimeout(arguments.callee,200);
    }
},200);
function chunk(array,process,context){
    setTimeout(function(){
        var item = array.shift(); //shift函数会移除item 调用该函数时可先使用concat函数克隆数组再传入
        process.call(context,item);
        if (array.length > 0) {
            setTimeout(arguments.callee,100);
        }
    },100);
}
function throttle(method,context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    },100);
}
function EventTarget(){
    this.handlers = {};
}
EventTarget.prototype = {
    constructor : EventTarget,
    addHandler(type,handler){
        if (typeof this.handlers[type] == 'undefined') {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire(event){
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var handler = this.handlers[event.type];
            for(var i = 0, len = handlers.length; i < len; i++){
                handlers[i](event);
            }
        }
    },
    removeHandler(type,handler){
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for(i = 0,len = handlers.length; i < len; i++){
                if (handler == handlers[i]) {
                    break;
                }
            }
            handlers.splice(i,1);
        }
    }
};
function Person(name,age){
    EventTarget.call(this);
    this.name = name;
    this.age = age;
}
// inheritPrototype(Person,EventTarget);
// 寄生组合式继承
var tempPrototype = Object.create(EventTarget.prototype);
tempPrototype.constructor = Person;
Person.prototype = tempPrototype;
Person.prototype.say = function(message){
    this.fire({type:'message',message:message});
};


