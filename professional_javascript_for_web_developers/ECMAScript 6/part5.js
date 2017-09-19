console.log('解构 将一个数据结构分解为更小部分的过程');
let n = {
    a: 'tt',
    b: 'aa',
    f: {
        j: 123,
        l: 234
    }
};
var { a, b, c = 123 } = n;
console.log(a + b + c); //ttaa123
const { d } = n;
console.log(d); //undefined
// var {g}; //error 必须提供初始化器 即等号右边的值
a = 123;
b = 3;
c = `${a+b}`;
console.log(c); //126
({ a, b } = n);
console.log(a + b); //ttaa
a = 1, b = 1;

function outputInfo(value) {
    console.log(value === n); //true
}
outputInfo({ a, b } = n);
console.log(b); //aa
console.log(a); //tt
let { a: cc, b: dd, d: ff = 10 } = n;
console.log(cc); //tt
console.log(dd); //aa
console.log(ff); //10
cc = 1, dd = 1;
({ a: cc, b: dd } = n);
console.log(cc); //tt
console.log(dd); //aa
let { f: { j: ts } } = n;
let { f: { ta = 5 } } = n;
console.log(ts); //123
console.log(ta); //5
let colors = ['red', 'green', 'blue', [1, 2, 3]];
let [, , , , ag] = colors;
let [, , aw] = colors;
console.log(ag); //undefined
console.log(aw); //blue
[, , , aw, ag = 999] = colors;
console.log(ag); //999
console.log(aw); //[ 1, 2, 3 ]
let x = 1,
    y = 2;
[x, y] = [y, x];
console.log(`${x}` + y); //21
let [uu, [, , ii], , [, , oo]] = colors;
console.log(uu); //red
console.log(ii); //e 第二位如果不是数组 注意如果是字符串也正常 会把其当成一个字符数组
console.log(oo); //3
let [kok, lol, ...tot] = colors;
// let [yh,...yg,jk]; //error 不定元素必须在最后
console.log(tot); //[ 'blue', [ 1, 2, 3 ] ]
//数组复制的两种方式 concat()用于连接两个数组 不传递参数则返回当前函数的副本
let [...yu] = colors;
console.log(yu); //[ 'red', 'green', 'blue', [ 1, 2, 3 ] ]
let yo = colors.concat();
console.log(yo); //[ 'red', 'green', 'blue', [ 1, 2, 3 ] ]
let uui = {
    uuj: 12,
    loa: {
        hbn: 67,
        jnm: [1, { ghj: 123, uio: 90 },
            [34, 56]
        ],
        uif: 89
    }
};
let { loa: { jnm: yyr } } = uui;
console.log(yyr); //[ 1, { ghj: 123, uio: 90 }, [ 34, 56 ] ]
let { loa: { jnm: [eer, ...iii] } } = uui;
console.log(eer); //1
console.log(iii); //[ { ghj: 123, uio: 90 }, [ 34, 56 ] ]
let { loa: { jnm: [eerrr, { ghj: acxz },
            [oooo], ...iiia
        ] } } = uui;
console.log(`${eerrr}` + ' ' + acxz + ' ' + oooo + ' ' + iiia.length); //1 123 34 0 iiia是一个空数组
function setCookieTest(name, value, { secure, path, domain, expires }) {

}
// setCookie('type','js'); //error 解构参数如未设置默认值则必须传值 调用含有解构参数的函数 实际如下
/*
function setCookie(name,value,options){
    let {secure,path,domain,expires} = options;
}
*/
setCookieTest('type', 'js', {
    secure: true,
    expires: 6000
});
//以下为使用解构参数的setCookie()函数推荐写法
const setCookieDefaults = {
    secure: false,
    path: '/',
    domain: 'example.com',
    expires: new Date(Date.now() + 360000000)
};

function setCookie(name, value, {
    secure = setCookieDefaults.secure,
    path = setCookieDefaults.path,
    domain = setCookieDefaults.domain,
    expires = setCookieDefaults.expires
} = setCookieDefaults) {

}