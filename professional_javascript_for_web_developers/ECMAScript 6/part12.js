console.log('代理和反射API');
console.log('使用set陷进验证属性');
let target = {
    name : 'target',
    value : '4455'
};
let proxy = new Proxy(target,{
    set(trapTarget,key,value,receiver){
        if (!trapTarget.hasOwnProperty(key)) {
            if (isNaN(value)) {
                throw new TypeError('属性必须是数字');
            }
        }
        return Reflect.set(trapTarget,key,value,receiver);
    },
    get(trapTarget,key,receiver){
        if (!(key in receiver)) {
            throw new TypeError('属性不存在');
        }
        return Reflect.get(trapTarget,key,receiver);
    },
    has(trapTarget,key){
        if (key === 'value') {
            return false;
        } else {
            return Reflect.has(trapTarget,key);
        }
    },
    deleteProperty(trapTarget,key){
        if (key === 'name') {
            return false;
        } else {
            return Reflect.deleteProperty(trapTarget,key);
        }
    }
});
proxy.count = 1;
console.log(target.count); //1
console.log(proxy.count); //1
target.name = 'a';
console.log(target.name); //a
console.log(proxy.name); //a
// proxy.abc = 'a123a'; //error
target.abc = 'a123a'; //可以给target赋非数字 不走代理
console.log(proxy.abc); //a123a
// console.log(proxy.aa); //get代理中抛出错误 属性不存在
console.log(target.aa); //undefined 不走代理
console.log('value' in proxy); //false
let deleted = delete proxy.name; //false
console.log(proxy.name); //a

