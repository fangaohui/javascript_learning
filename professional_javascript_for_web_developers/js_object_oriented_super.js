//6.3 
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}
var testInstance = new SubType();
//SubType继承了SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
    return this.subproperty;
};
var instance = new SubType();
console.log(instance.getSuperValue()); //true
//testInstance和instance的[[Prototype]]原型对象指针 指向的不是同一个原型对象
console.log(testInstance.getSuperValue); //undefined
console.log(testInstance.getSubValue); //undefined
console.log(instance.constructor); //[Function: SuperType]
console.log(testInstance.constructor); //[Function: SubType]
console.log('***1');
console.log(instance instanceof Object); //true
console.log(instance instanceof SubType); //true
console.log(Object.prototype.isPrototypeOf(instance)); //true
console.log(SubType.prototype.isPrototypeOf(instance)); //true
console.log(instance.__proto__); //SuperType { property: true, getSubValue: [Function] }
console.log(Object.getPrototypeOf(instance)); //SuperType { property: true, getSubValue: [Function] }
console.log(SubType.prototype.__proto__); //SuperType { getSuperValue: [Function] }
console.log(SubType.prototype.__proto__ === instance.__proto__); //false
console.log('***2');
SubType.prototype.getSuperValue = function() {
    return false;
};
console.log(instance.getSuperValue()); //false
console.log(instance.__proto__.getSuperValue()); //false
var superObj = new SuperType();
console.log(superObj.getSuperValue()); //true
console.log('注意理解 访问器属性 数据属性 和 方法 在原型和继承中的关系');
//组合继承
function SuperObj(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}
SuperObj.prototype.sayName = function() {
    console.log(this.name);
};

function SubObj(name, age) {
    SuperObj.call(this, name); //继承属性
    this.age = age;
}
SubObj.prototype = new SuperObj(); //继承方法
SubObj.prototype.constructor = SubObj;
SubObj.prototype.__proto__.sayAge = function() {
    console.log('0000');
};
var obj1 = new SubObj('ashliy', 29);
obj1.colors.push('black');
console.log(obj1.colors); //[ 'red', 'blue', 'black' ]
obj1.sayName();
obj1.sayAge();
var obj2 = new SubObj('michael', 27);
console.log(obj2.colors); //[ 'red', 'blue' ]
obj2.sayName();
obj2.sayAge();
var obj3 = new SuperObj('111');
obj3.sayAge(); //0000
//原型式继承
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
var person = {
    name: 'Nicholas',
    fridens: ['sherry', 'van']
};
var anotherPerson = object(person);
anotherPerson.name = 'a';
anotherPerson.fridens.push('bb');
var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'linda';
yetAnotherPerson.fridens.push('aa');
yetAnotherPerson.fridens = ['1', '2'];
console.log(anotherPerson.fridens); //[ 'sherry', 'van', 'bb', 'aa' ]
console.log(person.fridens); //[ 'sherry', 'van', 'bb', 'aa' ]
console.log(yetAnotherPerson.fridens === person.fridens); //true
console.log(person.name); //Nicholas
console.log(anotherPerson.name); //a
console.log(Object.getPrototypeOf(anotherPerson).name); //Nicholas
console.log(yetAnotherPerson.fridens); //[ '1', '2' ]
console.log(Object.getPrototypeOf(yetAnotherPerson).fridens); //[ 'sherry', 'van', 'bb', 'aa' ]
//寄生式继承
function createAnother(original) {
    var clone = Object.create(original);
    clone.sayHi = function() {
        console.log('hi');
    };
    return clone;
};
var pp = {
    name: '123',
};
var ppp = createAnother(pp);
ppp.sayHi(); //hi
//寄生组合式继承
function inheritPrototype(sub1, super1) {
    var prototype = object(super1.prototype);
    prototype.constructor = sub1;
    sub1.prototype = prototype;
}

function Super(name) {
    this.name = 'abc';
    this.colors = ['1', '2'];
}
Super.prototype.sayName = function() {
    console.log(this.name);
};

function Sub(name, age) {
    Super.call(this, name);
    this.age = age;
}
inheritPrototype(Sub, Super);
Sub.prototype.sayAge = function() {
    console.log(this.age);
};
var ss = new Sub('123', 27);
ss.sayName(); //abc
ss.sayAge(); //27