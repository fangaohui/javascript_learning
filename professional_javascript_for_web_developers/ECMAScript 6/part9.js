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
}
let p = new PersonClass('Michael');
p.sayName();
var tt = p.abc;
console.log(tt);
// var a = new tt(); //error 不可new调用
tt();
console.log(PersonClass.name); //PersonClass
console.log(typeof PersonClass); //function
/*
{ value: 'Michael',
  writable: true,
  enumerable: true,
  configurable: true }
 */
console.log(Object.getOwnPropertyDescriptor(p,'name'));
/*
{ value: PersonClass {},
  writable: false,
  enumerable: false,
  configurable: false }
 */
console.log(Object.getOwnPropertyDescriptor(PersonClass,'prototype'));
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
