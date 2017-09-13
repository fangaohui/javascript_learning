//16位字符的上边界用十六进制表示是0xffff 因此任何大于该数字的代码点必须用两个码元(32位)来表示
function is32Bit(c){
	return c.codePointAt(0) > 0xffff;
}
console.log(is32Bit('123')); //false
console.log(String.fromCodePoint(231001)); //和fromCharCode()在处理BMP字符时返回相同结果 BMP之外的字符有区别