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
SubType.prototype.getSubValue = function(){
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
console.log(SubType.prototype.__proto__); //SuperType { getSuperValue: [Function] }
console.log(SubType.prototype.__proto__ === instance.__proto__); //false
console.log('***2');
SubType.prototype.getSuperValue = function(){
    return false;
};
console.log(instance.getSuperValue()); //false
console.log(instance.__proto__.getSuperValue()); //false
var superObj = new SuperType();
console.log(superObj.getSuperValue()); //true
console.log('注意理解 访问器属性 数据属性 和 方法 在原型和继承中的关系');
//组合继承
function SuperObj(name){
    this.name = name;
    this.colors = ['red', 'blue'];
}
SuperObj.prototype.sayName = function(){
    console.log(this.name);
};
function SubObj(name, age){
    SuperObj.call(this, name); //继承属性
    this.age = age;
}
SubObj.prototype = new SuperObj(); //继承方法
SubObj.prototype.constructor = SubObj;
SubObj.prototype.sayAge = function(){
    console.log(this.age);
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
//原型式继承
function object(o){
    function F(){};
    F.prototype = o;
    return new F();
}
var person = {
    name : 'Nicholas',
    fridens : ['sherry', 'van']
};
var anotherPerson = object(person);
anotherPerson.name = 'a';
anotherPerson.fridens.push('bb');
var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'linda';
yetAnotherPerson.fridens.push('aa');
console.log(anotherPerson.fridens); //[ 'sherry', 'van', 'bb', 'aa' ]
console.log(person.fridens); //[ 'sherry', 'van', 'bb', 'aa' ]
console.log(yetAnotherPerson.fridens === person.fridens); //true 引用类型 引用类型的属性始终会共享相应的值 为什么
console.log(person.name); //Nicholas
console.log(anotherPerson.name); //a
console.log(anotherPerson.name == person.name); //false 基本类型 基本类型不会共享 为什么
//寄生式继承
//副本
//寄生组合式继承











