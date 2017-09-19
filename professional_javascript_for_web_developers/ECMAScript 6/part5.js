console.log('解构 将一个数据结构分解为更小部分的过程');
let n = {
    a : 'tt',
    b : 'aa'
};
var {a, b ,c} = n;
console.log(a + b + c); //ttaaundefined
const {d} = n;
console.log(d); //undefined
// var {g}; //error 必须提供初始化器 即等号右边的值