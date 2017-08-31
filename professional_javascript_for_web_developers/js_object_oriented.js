
//6.1.1
var person = {};
Object.defineProperty(person, 'name', {
    // writable : true,
    configurable : true,
    value : 'Nicholas'
});
console.log(Object);
console.log(console);
console.log(person.name); //Nicholas
person.name = 'Greg';
console.log(person.name); //Nicholas defineProperty()创建属性时 writable未设置 默认为false

var book = {
    _year : 2004,
    edition : 1
};
Object.defineProperty(book, 'edition', {
    configurable : false
});
Object.defineProperty(book, 'year', {
    get : function(){
        return this._year;
    },
    set : function(newValue){
        if (newValue > 2004) {
            this._year = newValue;
            this._edition += newValue - 2004; //this._edition为NAN +=操作符时self._edition为undefined Number和undefined相+则返回NAN
        }
    }
});
book.year = 2005;
console.log(book._edition); //NAN 
console.log(book._year);
book.__defineGetter__('edition', function(){
    return 101;
});
book.__defineSetter__('edition', function(){
    this.edition = 109;
});
book.edition = 1;
console.log(book.edition); //1 edition属性的configurable为false 始终为数据属性而非访问器属性
Object.defineProperties(book, {
    _month : {
        writable : true,
        value : 6
    },
    month : {
        get : function(){
            return this._month;
        },
        set : function(newValue){
            this._month = newValue;
        }
    }
});
console.log(book._month);
console.log(book.month);
book.month = 12; 
console.log(book._month);
var descriptor = Object.getOwnPropertyDescriptor(book, '_month');
/*
{ value: 12,
  writable: true,
  enumerable: false,
  configurable: false }
 */
console.log(descriptor);
console.log(descriptor.enumerable); //false
console.log(descriptor.get); //undefined
// console.log(test1); error test1未声明 未声明只能使用typeof操作符
console.log(typeof test1); //undefined
var test1;
console.log(test1); //undefined 声明过但未初始化值
var result = test1 + '1';
console.log(result); //undefined1
result = test1 + 1; //NAN

//6.2
function Person(name, age){
    this.name = name;
    this.age = age;
    this.job = 'js';
    this.sayName = function(){
        console.log(this.name);
    };
}
var person1 = new Person('Michael', 29);
var person2 = new Person('Ashliy', 27);
console.log(person1.constructor == Person); //true
person1.sayName();
// Person('xiaobao', 3); //添加到Global对象
// window.sayName(); //xiaobao
var o = new Object();
Person.call(o, 'kity', 25);
o.sayName(); //kity 使用函数的call()函数






