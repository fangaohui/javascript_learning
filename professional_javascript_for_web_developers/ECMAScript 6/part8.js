function createInterator(items){
    var i = 0;
    return {
        next : function(){
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            return {
                done : done,
                value : value
            };
        }
    };
}
var objs = [1,2,3];
var interator = createInterator(objs);
console.log(interator.next()); //{ done: false, value: 1 }
console.log(interator.next()); //{ done: false, value: 2 }
console.log(interator.next()); //{ done: false, value: 3 }
console.log(interator.next()); //{ done: true, value: undefined }
console.log(interator.next()); //{ done: true, value: undefined }
var a = 6;
//生成器函数声明
// function (){ console.log('声明匿名函数?'); }; //error?? 声明不能缺少变量名 匿名函数??
(function (){ console.log('声明匿名函数?') })(); //正常
(function (){ console.log('声明匿名函数?') }); //正常 转换被函数表达式
function *test123(){ yield 123 };
// function *(){ yield 123 }; //error
(function *(){ yield 123 }); //正常
(function *(){ yield 123 })(); //正常
//生成器函数表达式
var testCreateInterator = function *(items){
    a += 6;
    console.log(a);
    for (var i = 0; i < items.length; i++) {
        console.log('test' + i);
        yield items[i];
        console.log('test_test' + i);
    }
    function abcd(){
        // yield 123; //error yield关键字只能用于函数内部 且不能跨函数 类似return
    };
};
var testInterator = testCreateInterator([1,2,3]);
console.log(testInterator.next()); //{ value: 1, done: false }
console.log(testInterator.next()); //{ value: 2, done: false }
console.log(testInterator.next()); //{ value: 3, done: false }
console.log(testInterator.next()); //{ value: undefined, done: true }
var o = {
    *tt(){
        yield 44;
    },
    abc : 123,
    cc : ()=>({
        aaa : 123456
    })
};
var oo = o.tt();
console.log(oo.next()); //{ value: 44, done: false }
console.log(oo.next()); //{ value: undefined, done: true }
console.log(o.cc()); //{ aaa: 123456 }
var ary = new Set([1,2,3,4,5]);
/*
{ value: 5,
  writable: true,
  enumerable: false,
  configurable: false }
*/
console.log(Object.getOwnPropertyDescriptor(ary,'length'));
console.log(Object.getOwnPropertyDescriptor(ary,Symbol.interator)); //undefined ???
console.log(Object.getOwnPropertySymbols(ary)); //[] ???
console.log(ary[Symbol.interator]); //undefined ???
console.log(Symbol.interator); //undefined ???
console.log(Symbol.hasInstance); //Symbol(Symbol.hasInstance)
console.log(ary.constructor[Symbol.hasInstance]); //[Function: [Symbol.hasInstance]]
console.log(typeof ary.constructor); //function
console.log('自定义可迭代对象');
var customObj = {
    rr : 'abc',
    ww : 'bbb',
    *[Symbol.interator](){
        yield this.rr;
        yield this.ww;
        yield this.rr + this.ww;
    }
};
console.log(testCreateInterator); //[GeneratorFunction: testCreateInterator]
console.log(testCreateInterator([2,3]).next());
console.log(customObj[Symbol.interator]); //[GeneratorFunction: undefined]
//注意以下三行的结果 三次调用生成器函数创建了三个不同的迭代器对象
console.log(customObj[Symbol.interator]().next()); //{ value: 'abc', done: false }
console.log(customObj[Symbol.interator]().next()); //{ value: 'abc', done: false }
console.log(customObj[Symbol.interator]().next()); //{ value: 'abc', done: false }
var uui = customObj[Symbol.interator]();
console.log(uui.next()); //{ value: 'abc', done: false }
console.log(uui.next()); //{ value: 'bbb', done: false }
console.log(uui.next()); //{ value: 'abcbbb', done: false }
// for(let y of customObj){
//     console.log(y);
// }





