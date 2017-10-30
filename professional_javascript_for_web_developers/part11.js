var ele = document.querySelector('#abc');
var eles = document.querySelectorAll('#abc');
alert(eles[0].childNodes[0].nodeValue);
let testEle = document.getElementsByClassName('123');
testEle[0].classList.add('345');
alert(testEle[0].childNodes[0].nodeValue + '\n' + testEle[0].className);
testEle[0].focus();
alert(document.activeElement + '\n' + document.hasFocus());
var a = document.readyState,b = document.compatMode,c = document.head;
alert(a + '\n' + b + '\n' + c);
var d = document.defaultCharset,e = document.charset;
alert(d + '\n' + e);
var testa = testEle[0];
alert(testa.dataset.tre);
testa.innerHTML = '123456';
testa.outerHTML = '234567';
testa.insertAdjacentHTML('beforebegin','66666'); //无效 因为当前不是一个元素节点 在上一行已设置为文本节点
eles[1].scrollIntoView(true);
alert(document.documentMode);
var result = document.documentElement.compareDocumentPosition(document.body);
alert(result); //4 16 居后和被包含 二进制10100
