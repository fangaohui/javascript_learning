console.log('改进的数组功能');
console.log('创建数组');
let items = new Array(2);
console.log(items.length); //2
console.log(items[0]); //undefined
items = Array.of(2);
console.log(items.length); //1
console.log(items[0]); //2
function doSomething(argument) {
    var args = Array.prototype.slice.call(arguments);
    var args1 = Array.from(arguments);
}
class myArray extends Array{
    constructor(para){
        super();
        this.para = 90;
    }
    add(para){
        return para + this.para;
    }
}
var items1 = myArray.of(2);
console.log(items1); //myArray [ 2 ] 返回数组的类型由of()或from()函数中的this值决定
console.log('映射转换');
function translate(){
    var test = 100;
    var newArr = new myArray();
    var arr = Array.from(arguments,newArr.add,newArr);
    return Array.from(arr,(value) => value + test);
}
let numbers = translate(1,2,3,4,5);
console.log(numbers); //[ 191, 192, 193, 194, 195 ]
console.log('为所有数组添加的新方法');
console.log('find和findindex方法');
console.log(numbers.find((n,a,c) => {
    /*
    find1910191,192,193,194,195
    find1921191,192,193,194,195
    find1932191,192,193,194,195
    find1943191,192,193,194,195
     */
    console.log('find' + n + a + c);
    return n > 193;
})); //194
console.log(numbers.findIndex(n => n > 193)); //3
console.log('fill方法');
console.log(numbers.fill(1,3,4)); //[ 191, 192, 193, 1, 195 ]
console.log(numbers.fill(1,4,1)); //[ 191, 192, 193, 1, 195 ] //尾大于头则无效
console.log(numbers.fill(1,-3,-2)); //[ 191, 192, 1, 1, 195 ] //负数则和数组length相加再执行fill()
console.log('copyWithin方法');
console.log(numbers.copyWithin(2,0)); //[ 191, 192, 191, 192, 1 ]
console.log(numbers.copyWithin(1,0)); //[ 191, 191, 192, 191, 192 ]



