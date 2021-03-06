let text = '𠮷';
console.log(text.length); //2 𠮷是32位表示的辅助平面字符
console.log(/^.$/.test(text)); //false
console.log(/^.$/u.test(text)); //true 正则u修饰符 匹配字符而不是匹配编码单元 解决32位表示的辅助平面字符问题
console.log(text.charAt(0)); //不合法字符
console.log(text.charAt(1)); //不合法字符
console.log(text.charCodeAt(0)); //55362
console.log(text.charCodeAt(1)); //57271
console.log(text.codePointAt(0)); //134071
console.log(text.codePointAt(1)); //57271
//16位字符的上边界用十六进制表示是0xffff 因此任何大于该数字的代码点必须用两个码元(32位)来表示
function is32Bit(c) {
    return c.codePointAt(0) > 0xffff;
}
console.log(is32Bit(text)); //true
console.log(is32Bit('a')); //false
console.log(String.fromCodePoint(134071)); //𠮷 和fromCharCode()在处理BMP字符时返回相同结果 BMP之外的字符有区别
//normalize()
let values = ['a', 'b', 'c'];
let normalized = values.map(function(text) {
    return text.normalize(); //在进行排序和比较操作前 将被操作字符串使用normalize()函数按同一标准进行标准化
});
normalized.sort(function(first, second) {
    if (first < second) {
        return -1;
    } else if (first === second) {
        return 0;
    } else {
        return 1;
    }
});
//starts/ends/includes函数 第一个参数传入正则表达式会报错
console.log(text.startsWith('1', 4));
console.log(text.endsWith('1', 4));
console.log(text.includes('1', 4));
console.log(text.repeat(5)); //𠮷𠮷𠮷𠮷𠮷
console.log('模板字面量');
let message = `Hello \` world`; //使用\转义`
console.log(message);
let testNewLine = `test news      
line`;
console.log(testNewLine);
console.log(testNewLine.length); //20 注意news后面有空格
let html = `
<div>
    <h1>title</h1>
</div>`;
console.log(html);
console.log(html.trim()); //去除开头的空行
let count = 10,
    price = 0.25,
    messageTest = `${count} items cost $${(count * price).toFixed(2)}.`;
console.log(messageTest); //10 items cost $2.50.
console.log('标签模板');
let cc = 10,
    pp = 0.25,
    mm = passthru `${cc} items cost $${(cc * pp).toFixed(2)}${123}`;

function passthru(literals, ...substitutions) {
    console.log(arguments); //{ '0': [ '', ' items cost $', '', '' ], '1': 10, '2': '2.50', '3': 123 }
    console.log(literals); //[ '', ' items cost $', '', '' ]
    console.log(literals.raw[1]); //items cost $
    console.log(substitutions); //[ 10, '2.50', 123 ]
    return '123';
}
console.log(mm); //123
let message1 = `test\nstring`;
message2 = String.raw `test
string`;
message3 = String.raw `test\nstring`;
/*
test
string
 */
console.log(message1);
/*
test
string
 */
console.log(message2);
console.log(message3); //test\nstring 所有字符转义 包括Unicode码位转义 都会输出他们的原生形式