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
console.log(wu);
pro = null;
console.log(wu);
wu.delete(pro);
console.log(wu);
// var wu = new WeakSet([1,{}]); //error WwakSet不接受任何原始值 必须是一个对象的引用
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




