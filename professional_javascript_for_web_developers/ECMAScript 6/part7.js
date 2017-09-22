var h = {};
h[0] = 123;
console.log(h[0]); //123
console.log(h['0']); //123
//对象属性的键名必须是字符串 内部存在自动转换为字符串的操作
console.log(h[0] == h['0']); //true
let testSet = new Set([1,2,3,4,5,6,6,6,6,6]);
console.log(testSet.size); //6
var q = [7,8];
testSet.add(q);
console.log(testSet.size); //7
console.log(testSet); //Set { 1, 2, 3, 4, 5, 6, [ 7, 8 ] }
//set使用Object.is()函数检查值是否一致
testSet.add([7,8]);
console.log(testSet.size); //8
testSet.add(6);
console.log(testSet.size); //8
console.log(testSet.has(6)); //true
testSet.delete(6);
testSet.delete([7,8]); //无效 找不到创建的这个[7,8]数组对象
console.log(testSet); //Set { 1, 2, 3, 4, 5, [ 7, 8 ], [ 7, 8 ] }
testSet.delete(q);
console.log(testSet); //Set { 1, 2, 3, 4, 5, [ 7, 8 ]}
testSet.clear();
console.log(testSet.size); //0
testSet.add(null);
console.log(testSet); //Set { null }
var u = new Set([1,2,3,4,5,6,7]);
u.forEach((value,key,ownerSet) => {
    console.log(key + ' ' + value);
    console.log(ownerSet === u);
});
let pro = {
    output(value){
        console.log(value);
    },
    process(dataSet){
        dataSet.forEach(function(value){
            this.output(value);
        },this);
    },
    process1(dataSet){
        //箭头函数从外围process1()函数中读取this值
        dataSet.forEach(value => this.output(value));
    }
};
pro.process(u);
//用箭头函数实现 等效于process()
pro.process1(u);
//set转数组 使用展开运算符
var arr = [...u];
console.log(arr); //[ 1, 2, 3, 4, 5, 6, 7 ]
var wu = new WeakSet([pro]);
console.log(wu.has(pro)); //true
//打印看不出是否包含对象引用 只能用has()
console.log(wu); //WeakSet {}
wu.delete(pro);
console.log(wu); //WeakSet {}
console.log(wu.has(pro)); //false
//WeakSet不接受任何原始值 只能是对象
// wuu = new WeakSet(['123']); //error
wuu = new WeakSet([{},{}]);
// var wuu = new WeakSet({}); //error
// var object111 = null;
// wuu.add(object111); //error
var hh = {};
let map = new Map();
map.set('name','wendy');
map.set(hh,'honey');;
map.set(1,'michael');
map.set('abc',undefined);
console.log(map.size); //4
/*
Map {
  'name' => 'wendy',
  {} => 'honey',
  1 => 'michael',
  'abc' => undefined }
 */
console.log(map);
console.log(map.has(hh)); //true
console.log('对象的私有属性');
/*
//ECMAScript5的实现
//缺点是privateDatas中保存的变量是强引用 即便外部对象释放后 privateDatas中的属性值也无法释放
var Ball = (function(){
    //通过IIFE创建私有变量 privateDatas和privateDataId
    var privateDatas = {};
    var privateDataId = 0;
    function BallInside(name) {
        console.log(this);
        Object.defineProperty(this, '_id', {value : privateDataId++});
        privateDatas[this._id] = {
            name : name
        };
    }
    BallInside.prototype.getName = function(){
        return privateDatas[this._id].name;
    }
    return BallInside;
})();
*/
//ES6使用WeakMap实现 当外部对象释放后 WeakMap存储的私有信息也会被释放
var Ball = (function(){
    let privateDatas = new WeakMap();
    function BallInside(name) {
        privateDatas.set(this,{name : name});
    }
    BallInside.prototype.getName = function(){
        return privateDatas.get(this).name;
    }
    return BallInside;
})();
console.log(Ball);
var football = new Ball('abc');
console.log(football.getName()); //abc





