var o = function(a) {
    var b = 2;
    return {
        a,
        b
    };
}(1);
console.log(o); //{ a: 1, b: 2 }
console.log('Object.assign()方法');
// supplier中的属性复制到receiver中 浅复制 当属性为对象时只复制对象的引用 那么深复制???
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });
    return receiver;
}

function Ev() {};
Ev.prototype = {
    constructor: Ev,
    emit: function(par) {
        console.log(par);
    },
    on: function() {}
};
var myO = {};
mixin(myO, Ev.prototype);
//mixin()函数是Object.assign()函数的内部实现 使用赋值操作符来复制相关属性 但不能复制访问器属性
//因为是赋值操作 所以访问器属性最终会转变为接收对象中的数据属性
Object.assign(myO, Ev.prototype);
myO.emit('test');

function v() {
    'use strict';
    var o1 = {
        b: '1',
        b: '2'
    };
    console.log(o1.b);
}
v();
var vo = {
    a: 1,
    0: 12,
    1: 123,
    c: 234,
    d: 333
};
vo.b = 12345;
//顺序只影响Reflect.ownKeys() Object.getOwnPropertyNames() Object.assign()函数 不影响for..in等其他
console.log(Object.getOwnPropertyNames(vo).join('*')); //0*1*a*c*d*b
var person = {
    getNmae() {
        return 'michael' + '*' + this.h + '*';
    },
    getAge() {
        return '123';
    }
};
var pig = {
    getNmae() {
        return 'pipi';
    },
    getAge() {
        return '4444' + '*' + this.ta + '*';
    }
};
var friend = {
    h: 'abc ',
    getNmae() {
        //super 只能在es6简写方法内使用 super包含当前对象原型的指针 且调用方法时会设置当前对象为this值
        //super.getNmae()即Object.getPrototypeOf(this).getNmae.call(this)
        // return super.h + super.getNmae() + ' hi'; //undefinedmichael*abc * hi
        console.log(this);
        console.log(Object.getPrototypeOf(this));
        return this.h + Object.getPrototypeOf(this).getNmae.call(this) + ' hi'; //abc michael*abc* hi
    },
    getAge() {
        return 'aaa ' + super.getAge() + ' 6666';
    }
}
Object.setPrototypeOf(friend, person);
console.log(friend.getNmae()); //michael hi
Object.setPrototypeOf(friend, pig);
console.log(friend.getNmae()); //pipi hi
var hh = Object.create(friend);
hh.ta = '123aa';
// console.log(hh.getNmae()); //error Object.getPrototypeOf(this).getNmae.call(this)最后的call(this)会导致递归循环
console.log(hh.getAge()); //aaa 4444*123aa* 6666 使用super不会报错 super只能在对象字面量中的简写方法中使用 super引用是非动态的 总是指向当前字面量对象的父类
console.log('super的内部实现');
var gg1 = {
    aabb() {
        console.log('是方法 创建时属于对象 [[HomeObject]]内部属性为对象gg1');
    }
};

function aabb() {
    console.log('不是方法 [[HomeObject]]内部属性未被指定')
}
//super内部实现 1调用在内部[[HomeObject]]上调用Object.getPrototypeOf()获得原型引用 2原型中查找同名函数 3创建this绑定并调用函数