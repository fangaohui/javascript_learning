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
        this.aaa = '123';
    }
    *[Symbol.iterator](){
        yield *this.items.entries();
    }
    //访问器属性创建在原型上 不可枚举
    get html(){
        return this.aaa;
    }
    set html(item){
        this.aaa = item;
    }
}
var collection = new Collection();
collection.items.push(1);
collection.items.push(3);
collection.items.push(5);
console.log(collection.items);
console.log(collection.html); //123
collection.html = '444';
console.log(collection.html); //444
console.log(collection.items.keys());
console.log(collection.items.entries());
console.log(collection.items.entries); //[Function: entries]
console.log(collection.items.values); //undefined
// console.log(collection.items.values()); //error 数组没有values()生成器???
for(let crea of collection){
    console.log(crea);
}
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




console.log('test----test');
function MakeFunction(){

}
var MakeClass = class MakeClass1 {
    constructor(para){
        this.bbq = 1;
        console.log(MakeClass1);
    }
    mm(){
        console.log('shit');
        console.log(MakeClass1);
    }
    set hh(bbq){
        this.bbq = bbq;
    }
    get hh(){
        return this.bbq;
    }
}
let make = new MakeClass();
make.hh = 1111;
console.log(make.hh);
make.mm();
//注意类和函数原型对象属性特征值writable的区别
/*
{ value: MakeClass1 {},
  writable: false,
  enumerable: false,
  configurable: false }
 */
console.log(Object.getOwnPropertyDescriptor(MakeClass,'prototype'));
/*
{ value: MakeFunction {},
  writable: true,
  enumerable: false,
  configurable: false }
 */
console.log(Object.getOwnPropertyDescriptor(MakeFunction,'prototype'));
//函数的name属性和类的name属性特征值相同 都为不可写 所谓类属性还有哪些?
/*
{ value: 'MakeFunction',
  writable: false,
  enumerable: false,
  configurable: true }
 */
console.log(Object.getOwnPropertyDescriptor(MakeFunction,'name'));
/*
{ value: 'MakeClass1',
  writable: false,
  enumerable: false,
  configurable: true }
 */
console.log(Object.getOwnPropertyDescriptor(MakeClass,'name'));


