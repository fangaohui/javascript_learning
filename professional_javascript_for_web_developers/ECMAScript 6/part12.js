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
console.log('原型代理陷阱 等');
let target1 = {};
let proxy1 = new Proxy(target1,{
    getPrototypeOf(trapTarget){
        console.log(trapTarget === target1); //true
        return null;
    },
    setPrototypeOf(trapTarget,proto){
        return false;
    },
    isExtensible(trapTarget){
        return Reflect.isExtensible(trapTarget);
    },
    preventExtensions(trapTarget){
        return false;
    },
    defineProperty(trapTarget,key,descriptor){
        console.log(descriptor); //{ value: 'proxy' } 内部创建的新对象 不包含描述符对象非标准属性name
        console.log(descriptorTest === descriptor); //false
        if (typeof key === 'symbol') {
            return Reflect.defineProperty(trapTarget,key,descriptor);
        }
        return false;
    },
    ownKeys(trapTarget){
        //过滤使用下划线开头的属性键 ownKeys()只对Object.keys/getOwnPropertyNames/getOwnPropertySymbols/assign()和for-in循环有效
        //对for-of Object.keys等无效
        return Reflect.ownKeys(trapTarget).filter(key => {
            return typeof key !== 'string' || key[0] !== '_';
        });
    }
});
console.log(Object.getPrototypeOf(proxy1)); //null
Object.setPrototypeOf(target1,{});
// Object.setPrototypeOf(proxy1,{}); //error
console.log(Reflect.getPrototypeOf(proxy1)); //null Reflect/Object作用于代理都会调用代理陷阱
console.log(Object.isExtensible(proxy1)); //true
Object.preventExtensions(target1);
console.log(Object.isExtensible(proxy1)); //false
// console.log(typeof descriptorTest); //error 块级声明let不会被提升
let descriptorTest = {
    value : 'proxy',
    name : 'aaaa'
};
// Object.defineProperty(proxy1,Symbol('asd'),descriptorTest); 为什么报错???
console.log('覆写抽象基类构造函数');


