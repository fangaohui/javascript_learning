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
class AbstractNumbers{
    constructor(...values){
        if (new.target === AbstractNumbers) {
            throw new TypeError('抽象基类');
        }
        this.values12 = values;
    }
};
class Numbers extends AbstractNumbers{
    constructor(name){
        super(1,2);
        this.name = name;
    }
};
let AbstractNumbersProxy = new Proxy(AbstractNumbers,{
    construct : function(trapTarget,argumentlist){
        //通过指定一个new.target为function 绕过抽象基类构造函数的判断
        return Reflect.construct(trapTarget,argumentlist,function(){});
    }
});
console.log(typeof AbstractNumbersProxy); //function
// instance11 = new AbstractNumbers(1,2,3); //error
let instance11 = new AbstractNumbersProxy(1,2,3);
console.log(instance11.values12); //[ 1, 2, 3 ]
let NumbsersProxy,revoke;
//注意该形式解构必须用()包裹
({proxy : NumbsersProxy,revoke} = Proxy.revocable(Numbers,{
    apply : function(trapTarget,thisArg,argumentlist){
        return new trapTarget(...argumentlist);
    }
}));
let testNumbers = NumbsersProxy('M');
//需要考虑两个问题 1通过代理调用Numbers构造函数 未影响到其内部super() 2同样是代理和目标的实例 instanceof通过原型链来确定此信息 而原型链查找不受代理影响
//需要复习instanceof和typeof内部实现
console.log(testNumbers.name); //M
console.log(testNumbers.values12); //[ 1, 2 ]
console.log(testNumbers instanceof NumbsersProxy); //true
console.log(testNumbers instanceof Numbers); //true
console.log(testNumbers instanceof AbstractNumbersProxy); //true
console.log(testNumbers instanceof AbstractNumbers); //true
revoke();
// testNumbers = NumbsersProxy('n'); //error Proxy.revocable创建的可撤销代理已执行过revoke 已被撤销
console.log('解决数组问题');
function toUint32(value){
    return Math.floor(Math.abs(Number(value))) % Math.pow(2,32);
}
function isArrayIndex(key){
    let numericKey = toUint32(key);
    return String(numericKey) == key && numericKey < (Math.pow(2,32) - 1);
}
class MyArray{
    constructor(length = 0){
        this.length = length;
        return new Proxy(this,{
            set(trapTarget,key,value){
                let currentLength = Reflect.get(trapTarget,'length');
                if (isArrayIndex(key)) {
                    let numericKey = Number(key);
                    if (numericKey > currentLength) {
                        Reflect.set(trapTarget,'length',numericKey+1);
                    }
                } else if (key === 'length'){
                    if (value < currentLength) {
                        for (let i = currentLength - 1; i >= value; i--) {
                            Reflect.deleteProperty(trapTarget,i);
                        }
                    }
                }
                Reflect.set(trapTarget,key,value);
            }
        });
    }
}
let colors = new MyArray(3);
console.log(colors instanceof MyArray); //true
console.log(colors.length); //3
colors[1] = 234;
colors[6] = 123;
console.log(colors.length); //7
console.log(colors); //MyArray { '1': 234, '6': 123, length: 7 }
colors.length = 2;
console.log(colors); //MyArray { '1': 234, length: 2 }
console.log('将代理用作原型');
let target23 = {};
let thing = Object.create(new Proxy(target23,{
    get(trapTarget,key,receiver){
        console.log(trapTarget === receiver); //false 注意不相等 trapTarget是receiver的原型对象
        throw new ReferenceError(`${key} doesn't exist`);
    }
}));
thing.name = 'thing';
console.log(thing.name); //thing
// var unk = thing.unk; //error


