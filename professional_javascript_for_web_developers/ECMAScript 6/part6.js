let sy = Symbol('mark');
console.log(sy); //Symbol(mark)
console.log(typeof sy); //symbol
var person = {};
Object.defineProperty(person, 3, {
    configurable: true,
    value: 'Nicholas'
});
console.log(person[3]); //Nicholas
person[sy] = 123;
console.log(person[sy]); //123
var sz = Symbol('mm');
Object.defineProperties(person, {
    [sz] : {
        value : 'test sz',
        enumerable : true
    },
    [true] : {
        value : 'test true name',
        enumerable : true
    }
});
var pros = Object.getOwnPropertyDescriptor(person,sz);
/*
{ value: 'test sz',
  writable: false,
  enumerable: true,
  configurable: false }
*/
console.log(pros);
person.ah = 123;
//注意 虽然enumerable为true 然而for in和keys和getOwnPropertyNames中并无对应属性
for (var th in person) {
    console.log(th);
}
console.log(Object.keys(person)); //[ 'true', 'ah' ]
console.log(Object.getOwnPropertyNames(person)); //[ '3', 'true', 'ah' ]
let tr = Symbol.for('tyu');
person[tr] = 'test symbol for';
console.log(tr); //Symbol(tyu)
console.log(person[tr]); //test symbol for
let tz = Symbol.for('tyu');
person[tz] = 'test 1';
console.log(tz);
console.log(person[tz]); //test 1
console.log(person[tr]); //test 1
console.log(tz == tr); //true
let tw = Symbol('tyu');
console.log(person[tw]); //undefined
console.log(Symbol.keyFor(tw)); //undefined
console.log(Symbol.keyFor(tr)); //tyu 全局符号注册表类似全局作用域 是一个共享环境
console.log(String(tr)); //Symbol(tyu)
// tr + 'a'; //error
// tr + 1; //error
if (tr) {} //always true 符号值在逻辑运算中等价于true
console.log(Object.getOwnPropertySymbols(person)); //[ Symbol(mark), Symbol(mm), Symbol(tyu) ]
console.log(Symbol.hasInstance); //Symbol(Symbol.hasInstance)
console.log(Object.getOwnPropertySymbols(Symbol)); //[]
console.log(Symbol.keyFor(Symbol.hasInstance)); //undefined 未在全局符号注册表中 只是Symbol对象的一个属性
//每个函数中都有一个Symbol.hasInstance方法 用于确定对象是否为函数的实例
console.log(Function.prototype[Symbol.hasInstance]); //[Function: [Symbol.hasInstance]]
/*
//确保该方法不被意外重写
{ value: [Function: [Symbol.hasInstance]],
  writable: false,
  enumerable: false,
  configurable: false }
 */
console.log(Object.getOwnPropertyDescriptor(Function.prototype,Symbol.hasInstance));
person instanceof Object;
//等同于
Object[Symbol.hasInstance](person);
function Friend(){
}
Object.defineProperty(Friend, Symbol.hasInstance, {
    value : function(v) {
        return false;
    }
});
var f = new Friend();
console.log(f);
console.log(f instanceof Friend); //false 只有通过Object.defineProperty()方法才能改写一个不可写的属性
let collection = {
    2 : 'aa',
    1 : '33',
    0 : '44',
    length : 1,
    [Symbol.isConcatSpreadable] : true
}
let message = ['hi'].concat(collection);
console.log(message); //[ 'hi', '44' ]
let hasLengthOf10 = {
    [Symbol.match] : function(value){
        return value.length == 10 ? [value.substring(0,10)] : null;
    }
};
let message1 = '1234567890';
let message2 = '12345678901';
//hasLengthOf10实现了[Symbol.match]方法 string.match()函数参数可以是字符串 正则对象 添加了[Symbol.match]属性的对象
console.log(message1.match(hasLengthOf10)); //[ '1234567890' ]
console.log(message2.match(hasLengthOf10)); //null
//hasLengthOf10未实现对象函数时的结果
console.log(message2.search(hasLengthOf10)); //-1
console.log(message2.split(hasLengthOf10)); //[ '12345678901' ]
console.log(message2.replace({})); //12345678901
function Baobao(name){
    this.name = 'wendy';
}
Baobao.prototype[Symbol.toStringTag] = 'Baobao';
Baobao.prototype.toString = function(){
    return this.name;
};
var honey = new Baobao('xiaobao');
console.log(honey.toString()); //wendy
console.log(Object.prototype.toString.call(honey)); //[object Baobao]
console.log(honey.__proto__.toString == Object.prototype.toString); //false
console.log(honey.__proto__.toString == Baobao.prototype.toString); //true






