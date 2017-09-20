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





