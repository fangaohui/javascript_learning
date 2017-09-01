
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

//6.2 创建对象
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

//6.2.3 原型模式
function Student(){}
Student.prototype.name = 'Ashliy';
Student.prototype.age = 3;
Student.prototype.sayName = function(){
    console.log(this.name);
    console.log(this); //Student {} prototype原型对象
};
var student1 = new Student();
student1.sayName(); //Ashliy
var student2 = new Student();
student2.sayName(); //Ashliy
console.log(student1.sayName === student2.sayName); //true
console.log(student1.__proto__ === Student.prototype); //true 调用构造函数创建新实例后 包含一个指向原型对象的指针 内部属性[[Prototype]] 使用__proto__访问
console.log(student2.__proto__ === Student.prototype); //true 调用构造函数创建新实例后 包含一个指向原型对象的指针 内部属性[[Prototype]] 使用__proto__访问
console.log(student1.__proto__ === student2.__proto__); //true 调用构造函数创建新实例后 包含一个指向原型对象的指针 内部属性[[Prototype]] 使用__proto__访问
console.log(student1.constructor === student2.constructor); //true
console.log(student1.constructor === Student.prototype.constructor); //true
console.log(Student.prototype.isPrototypeOf(student1)); //true
console.log(Student.prototype.isPrototypeOf(person1)); //false
person2.customPrototype = student1.__proto__;
console.log(Student.prototype.isPrototypeOf(person2)); //false 必须是对象的内部属性__proto__
console.log('****分割线****');
console.log(Object.getPrototypeOf(student1) === Student.prototype);
student2.name = 'Answer';
student2.sayName = function(){
    console.log('Michael' + this.name);
};
student1.sayName(); //Ashliy 来至原型
student2.sayName(); //MichaelAnswer 来至实例
student2.__proto__.sayName(); //Ashliy
student2.sayName = undefined;
console.log('****分割线****');
console.log(student2.sayName); //undefined 只能使用delete操作符才能完全删除实例属性
Object.defineProperty(Student.prototype, 'name', {
    configurable : false,
    enumerable : false //下面的for in中不会出现name属性
});
Object.defineProperty(student2, 'name', {
    configurable : false,
    enumerable : false //下面的for in中不会出现name属性
});
Object.defineProperty(student1, 'name', {
    enumerable : true, //下面的for in中会出现name属性 尽管prototype为false
    value : '123'
});
delete student2.sayName; //只能使用delete操作符才能完全删除实例属性 从而重新访问原型中属性
delete student2.name; //无效 因为上面设置configurable为false
student2.sayName(); //Answer
for (var prop in student2) {
    console.log('*********');
    console.log(prop);
}
for (var prop in student1) {
    console.log('~~~~~~~~~');
    console.log(prop);
    if (prop == 'name') {
        console.log(student1.name); //123
    }
}
var allKeys = Object.keys(student1);
console.log(allKeys); //[ 'name' ] 只能取得对象中的可枚举属性 不包含原型中的
allKeys = Object.getOwnPropertyNames(Student.prototype);
console.log(allKeys); //[ 'constructor', 'name', 'age', 'sayName' ] 和keys()的区别是 包括不可枚举的属性
//对constructor的理解 student1.constructor和Student.prototype.constructor的关系???
console.log(student1.constructor === Student.prototype.constructor); //true
function Teacher(){};
Teacher.prototype = {
    name : 'Michael',
    age : 29,
    sayName : function(){
        console.log(this.name);
    }
};
var ling = new Teacher();
console.log(ling instanceof Teacher); //true
console.log(ling.constructor == Object); //true
console.log(ling.constructor == Teacher); //false
Object.defineProperty(Teacher.prototype, 'constructor', {
    enumerable : false,
    value : Teacher
});
console.log(ling.constructor == Teacher); //true
console.log('*********1');
function test(){}; //会创建prototype原型对象
console.log(test.prototype); //test {} 原型对象
console.log(test.prototype.constructor); //[Function: test] prototype所在函数指针
test.prototype = {
    num : 1
};
console.log(test.prototype.constructor); //[Function: Object] 对象字面值覆盖prototype constructor指向Object构造函数
console.log(test.constructor); //[Function: Function] 函数的constructor是Function引用类型的Function()构造函数
var t = new test();
console.log(t.constructor); //[Function: Object]
var tt = {
    n : 1
};
console.log(tt.constructor); //[Function: Object] 注意原型模式 原型对象使用字面值创建 constructor指向Object构造函数
Teacher.prototype = new test();
console.log(Teacher.prototype.num); //1
console.log((ling.constructor == Teacher) + '**********2'); //true
//以下代码 深入理解prototype constructor 原型模式
function Programmer(){
    this.age = 27;
};
var p = new Programmer();
console.log(p.__proto__); //Programmer {}
console.log(p.__proto__.age); //undefined
Programmer.prototype.a = '1234'; //默认创建的prototype原型对象 非字面值创建 constructor指向Programmer构造函数
console.log(p.__proto__.constructor);
console.log(p.a);
//原本默认prototype为Programmer类型 覆盖了一个字面值创建的Object类型 由于原型模式 之后new对象constructor都指向Object构造函数 但不影响之前new对象的constructor
Programmer.prototype = {
    b : 123
};
var pp = new Programmer();
console.log(pp.__proto__);
console.log(pp.constructor); //[Function: Object]
console.log(p.constructor); //[Function: Programmer]











