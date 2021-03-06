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
var ary = [1,2,3,4,5];
/*
{ value: 5,
  writable: true,
  enumerable: false,
  configurable: false }
*/
console.log(Object.getOwnPropertyDescriptor(ary,'length'));
console.log(Object.getOwnPropertyDescriptor(ary,Symbol.iterator)); //undefined
console.log(Object.getOwnPropertySymbols(ary)); //[]
//for..of循环为未指定entries()/values()/keys()时 array和set默认迭代器为values() map默认迭代器为entries()
console.log(ary[Symbol.iterator]); //[Function: values]
console.log(Symbol.iterator); //Symbol(Symbol.iterator)
console.log(Symbol.hasInstance); //Symbol(Symbol.hasInstance)
console.log(ary.constructor[Symbol.hasInstance]); //[Function: [Symbol.hasInstance]]
console.log(typeof ary.constructor); //function
//***************************************************************************************************************************
console.log('自定义可迭代对象');
var customObj = {
    rr : 'abc',
    ww : 'bbb',
    *[Symbol.iterator](){
        yield this.rr;
        yield this.ww;
        yield this.rr + this.ww;
    }
};
console.log(testCreateInterator); //[GeneratorFunction: testCreateInterator]
console.log(customObj[Symbol.iterator]); //[GeneratorFunction: [Symbol.iterator]]
//注意以下三行的结果 三次调用生成器函数创建了三个不同的迭代器对象
console.log(customObj[Symbol.iterator]().next()); //{ value: 'abc', done: false }
console.log(customObj[Symbol.iterator]().next()); //{ value: 'abc', done: false }
console.log(customObj[Symbol.iterator]().next()); //{ value: 'abc', done: false }
var uui = customObj[Symbol.iterator]();
console.log(uui.next()); //{ value: 'abc', done: false }
console.log(uui.next()); //{ value: 'bbb', done: false }
console.log(uui.next()); //{ value: 'abcbbb', done: false }
var testuui = customObj[Symbol.iterator].call(ary);
console.log(testuui.next()); //{ value: undefined, done: false }
console.log(testuui.next()); //{ value: undefined, done: false }
console.log(testuui.next()); //{ value: NaN, done: false }
console.log(testuui.next()); //{ value: undefined, done: true }
//***************************************************************************************************************************
console.log(Symbol.iterator);
//customObj实现了Symbol.iterator属性 才可使用for..of循环
for(let y of customObj){
    console.log(y);
}
let data = new Set([1,2,3]);
data.testForin = '123';
for(let[k,v] of data.entries()){
    console.log(k + v);
}
/*
//for..in循环用来迭代对象的属性名
testForin
123
 */
for(var kk in data){
    console.log(kk);
    console.log(data[kk]);
}
var message = 'a 𠮷 b';
for(let h of message){
    console.log(h);
}
let messageAry = [9,...message,...customObj];
console.log(messageAry); //[ 9, 'a', ' ', '𠮷', ' ', 'b', 'abc', 'bbb', 'abcbbb' ]
function *createIter(){
    let zero = 100;
    let first = yield 1 + zero;
    console.log(first + 1);
    let second = yield first + 2 + zero;
    yield second + 3;
    let five;
    try {
        five = yield second + 77;
    } catch(ex) {
        five = 1090;
    }
    var six = yield five + 1000;
    console.log('yield value ' + six); //yield value 12 因为以下调用next()传了参数12
    return 1122;
    yield six + 9;
}
var ite = createIter();
console.log(ite.next(12)); //{ value: 101, done: false }
console.log(ite.next()); //{ value: NaN, done: false }
console.log(ite.next(12)); //{ value: 15, done: false }
console.log(ite.next(12)); //{ value: 89, done: false }
console.log(ite.throw(new Error('boom'))); //{ value: 2090, done: false }
console.log(ite.next(12)); //{ value: 1122, done: true } 已经return
console.log(ite.next(12)); //{ value: undefined, done: true }
console.log('考虑解构 展开符???');
console.log('生成器委托');
function *iter1(){
    yield 123;
    yield 1234;
}
function *iter2(){
    yield 333;
    yield 4444;
}
function *iterT(){
    yield iter1();
    yield *iter2();
    yield true;
    return 4;
}
var iitt = iterT();
console.log(iitt); //{}
console.log(iitt.next()); //{ value: {}, done: false }
console.log(iitt.next()); //{ value: 333, done: false }
console.log(iitt.next()); //{ value: 4444, done: false }
console.log(iitt.next()); //{ value: true, done: false }
console.log(iitt.next()); //{ value: 4, done: true }
function *iterS(){
    var iS = yield *iterT();
    console.log(iS);
    // var aS = yield 123 + iS;
    yield *iterG(iS);
}
function *iterG(count){
    for (var i = 0; i < count; i++) {
        yield *'re'; //!!!!!!
    }
}
var iss = iterS();
console.log(iss.next());
console.log(iss.next());
console.log(iss.next());
console.log(iss.next());
//4次rep
console.log(iss.next()); //{ value: 'r', done: false }
console.log(iss.next()); //{ value: 'e', done: false }
console.log(iss.next()); //{ value: 'r', done: false }
console.log(iss.next()); //{ value: 'e', done: false }
console.log(iss.next()); //{ value: 'r', done: false }
console.log(iss.next()); //{ value: 'e', done: false }
console.log(iss.next()); //{ value: 'r', done: false }
console.log(iss.next()); //{ value: 'e', done: false }
console.log(iss.next()); //{ value: undefined, done: true }
var abc = {
    testDelegate(v,s){
        console.log(v);
        s.call(abc);
    }
};
abc.testDelegate(123,function(){
    console.log(this);
});
function run(taskDef){
    let task = taskDef();
    let result = task.next();
    function step(){
        if (!result.done) {
            result = task.next(result.value+100);
            console.log(result);
            step();
        }
    };
    step();
}
run(function*(){
    let value = yield 1;
    console.log(value);

    value = yield value + 3;
    console.log(value);
});
console.log('异步任务执行器');
function fetchData(){
    return function(callback){
        callback(null,'hi');
    };
}
var shit = fetchData();
shit(function(ac,bc){
    console.log(ac);
    console.log(bc);
});
function asyncRun(taskDef){
    let task = taskDef();
    let result = task.next();
    function step(){
        if (!result.done) {
            if (typeof result.value === 'function') {
                result.value(function(err,data){
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    };
    step();
};
asyncRun(function*(){
    let contents = yield fetchData(123);
    console.log('Done with ' + contents);
});
console.log('测试测试');
//***************************************************************************************************************************
function *testoo(){
    var oop = yield 234;
    console.log(oop); //undefined
    oop = yield oop + 100;
    yield oop + 1000000;
    var io = yield *testooq();
    console.log(io); //6
    yield *testuup(io);
    return 449;
}
//如果无return值 则委托该生成器的生成器中无法获取值 比如次例中testoo生成器的io变量
function *testooq(){
    yield 12;
    yield 445;
    return 6;
}
function *testuup(paa){
    yield paa + 10000;
    yield paa + 100000;
}
var toot = testoo();
console.log(toot.next()); //{ value: 234, done: false }
console.log(toot.next()); //{ value: NaN, done: false }
console.log(toot.next(1)); //{ value: 1000001, done: false }
console.log(toot.next());
console.log(toot.next()); //{ value: 445, done: false }
console.log(toot.next(222)); //{ value: 10006, done: false } 这里传值不影响之后的迭代?!
console.log(toot.next());
console.log(toot.next()); //{ value: 449, done: true }
console.log(toot.next()); //{ value: undefined, done: true }
//***************************************************************************************************************************


