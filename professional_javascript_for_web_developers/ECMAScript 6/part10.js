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
var testCopyWithinAry = [1,2,3,4,5,6,7];
console.log(testCopyWithinAry.copyWithin(1,0)); //[ 1, 1, 2, 3, 4, 5, 6 ]
numbers = [ 191, 192, 191, 192, 1 ];
console.log(numbers.copyWithin(1,0)); //[ 191, 191, 192, 191, 192 ]
console.log(testCopyWithinAry.copyWithin(3,0,2)); //[ 1, 1, 2, 1, 1, 5, 6 ]
let numbers1 = [1,2,3,4,5];
//注意带第三个参数时的区别
// numbers1.copyWithin(2,0); //[ 1, 2, 1, 2, 3 ]
numbers1.copyWithin(2,0,1); //[ 1, 2, 1, 4, 5 ]
console.log('定型数组');
console.log('数组缓冲区');
let buffer = new ArrayBuffer(10);
console.log(buffer.byteLength); //10
let buffer1 = buffer.slice(4,6);
console.log(buffer1.byteLength); //2
console.log('视图操作数组缓冲区');
let buffer12 = new ArrayBuffer(2),
    view = new DataView(buffer12);
view.setInt8(0,5);
view.setInt8(1,-1);
/*
DataView {
  byteLength: 2,
  byteOffset: 0,
  buffer: ArrayBuffer { byteLength: 2 } }
 */
console.log(view);
console.log(buffer12); //ArrayBuffer { byteLength: 2 }
console.log(view.getInt16(0)); //-1535
console.log(view.getInt8(0)); //5
console.log(view.getInt8(1)); //-1
let inst1 = new Int16Array([23,24]);
    inst2 = new Int32Array(inst1);
console.log(inst1.buffer === inst2.buffer); //false
console.log(inst1.byteLength); //4
console.log(inst1.length); //2
console.log(inst1[0]); //23
console.log(inst1[1]); //24
console.log(inst2.byteLength); //8
console.log(inst2.length); //2
console.log(inst2[0]); //23
console.log(inst2[1]); //24
console.log(Int16Array.BYTES_PER_ELEMENT); //2
console.log(Int32Array.BYTES_PER_ELEMENT); //4
console.log(Float64Array.BYTES_PER_ELEMENT); //8
//考虑为什么getOwnPropertyDescriptor()为undefined但是可取到值 类似派生类的静态属性Symbol.species???
console.log(inst1.BYTES_PER_ELEMENT); //2
console.log(Object.getOwnPropertyDescriptor(inst1,'BYTES_PER_ELEMENT')); //undefined
/*
{ value: 2,
  writable: false,
  enumerable: false,
  configurable: false }
 */
console.log(Object.getOwnPropertyDescriptor(Int16Array,'BYTES_PER_ELEMENT'));









