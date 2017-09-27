class PersonClass{
    constructor(name){
        this.name = name;
    }

    sayName(){
        console.log(this.name);
    }

    abc(){
        console.log('不可new调用');
    }

    static ccc(){

    }
}
PersonClass.testa = 123;
let p = new PersonClass('Michael');
p.sayName();
var tt = p.abc;
console.log(tt);
// var a = new tt(); //error 不可new调用
tt();
console.log(PersonClass.name); //PersonClass
console.log(typeof PersonClass); //function
//与函数不同的是 类属性不可被赋予新值 prototype就是这样一个只读的类属性 类属性指哪些???
console.log(PersonClass.prototype); //PersonClass {}
/*
{ value: PersonClass {},
  writable: false,
  enumerable: false,
  configurable: false }
 */
console.log(Object.getOwnPropertyDescriptor(PersonClass,'prototype'));
/*
{ value: [Function: ccc],
  writable: true,
  enumerable: false,
  configurable: true }
 */
console.log(Object.getOwnPropertyDescriptor(PersonClass,'ccc'));
/*
{ value: 123,
  writable: true,
  enumerable: true,
  configurable: true }
 */
console.log(Object.getOwnPropertyDescriptor(PersonClass,'testa'));
/*
{ value: 'Michael',
  writable: true,
  enumerable: true,
  configurable: true }
 */
console.log(Object.getOwnPropertyDescriptor(p,'name'));
//sayName属性方法在对象原型中 且类的所有方法都不可枚举
console.log(Object.getOwnPropertyDescriptor(p,'sayName')); //undefined
/*
{ value: [Function: sayName],
  writable: true,
  enumerable: false,
  configurable: true }
 */
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(p),'sayName'));
console.log(Object.getOwnPropertyNames(p)); //[ 'name' ]
var objTest = {
    say(){

    }
};
objTest.__proto__.say = function abc (){};
/*
{ value: [Function: abc],
  writable: true,
  enumerable: true,
  configurable: true }
 */
console.log(Object.getOwnPropertyDescriptor(objTest.__proto__,'say'));
var Friend = class{};
console.log(Friend.name); //Friend
let Honey = class Honey2{
    sayHello(){
        console.log(Honey);
    }
    sayHello2(){
        console.log(Honey2);
    }
};
var hh = new Honey;
console.log(typeof Honey2); //undefined
hh.sayHello(); //[Function: Honey2]
hh.sayHello2(); //[Function: Honey2]
var Hy = function abcd(){
    sayHi();
    function sayHi(){
        console.log(abcd); //[Function: abcd]
        console.log(Hy); //[Function: abcd]
    }
};
Hy();
console.log(typeof abcd); //undefined
class Collection {
    constructor(){
        this.items = [];
    }
    *[Symbol.iterator](){
        yield *this.items.values();
    }
}
var collection = new Collection();
collection.items.push(1);
collection.items.push(3);
collection.items.push(5);
console.log(collection.items);
/*
//为什么error???
for(let xxx of collection){
    console.log(xxx);
}
 */
console.log('继承');
class Rectangle{
    constructor(length,width){
        this.length = length;
        this.width = width;
    }
    getArea(){
        return this.length * this.width;
    }
}
class Square extends Rectangle{
    constructor(length){
        super(length,length);
        /*
        // 实现constructor()函数则必须调用super()且在使用this前调用 否则执行到时会报错 除非返回一个对象
        return {};
        */
    }
}
var atest = new Square();