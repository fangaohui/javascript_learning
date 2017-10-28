/*
alert(Node.ELEMENT_NODE); //1
alert('test\n' + document.childNodes.length + '\n' + document.childNodes.item(0) + '\n' + (document.childNodes[0] === document.childNodes.item(0)) + '\n' + document.childNodes.item(1) + '\n' + document.childNodes.item(2));
let arrayOfNodes = Array.prototype.slice.call(document.childNodes,0);
alert(arrayOfNodes);
console.log('COM对象和JScript对象的区别?MIME类型插件?');
alert((document.childNodes[0] === document.childNodes[1].previousSibling)); //true
let n = document.childNodes[0].firstNode;
n = document.childNodes[0].hasChildNodes();
alert(document.childNodes[0].ownerDocument === document); //true
let as = document.getElementsByTagName('a'); //HTMLCollection对象
alert(as);
alert((as.namedItem('abc') === as['abc']) + (as[0] === as.item(0))); //1+1=2
alert(document.implementation.hasFeature('XML',1.0)); //true
let test123 = document.documentElement instanceof HTMLElement;
alert(test123 + document.documentElement.tagName); //trueHTML
alert(as[0] instanceof Element); //true
function outputAttributes(element) {
    var pairs = new Array(),
        attrName,
        attrValue,
        i,
        len;
    for (i = 0, len = element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        if (element.attributes[i].specified) {
            pairs.push(attrName + '="' + attrValue + '"');
        }
    }
    return pairs.join(' ');
}
alert(as[0].attributes);
alert(outputAttributes(as[0]));
*/
let testElement = document.getElementsByTagName('a');
testElement = document.getElementById('abc');
testElement.testClone = 'a';
alert(testElement.testClone);
var cloneE = testElement.cloneNode(true);
alert(cloneE.testClone); //undefined cloneNode即便是深复制 也只是复制节点特性和子节点 不会复制节点对象属性 注意特性和属性的区别
// document.domain = 'www.hupu.com'; //error 当前加载本地文件domian是''空字符串 设置新domain只能是旧domian的父域
// window.onload = function(){
//     document.write('hello');
// };
alert(document.documentElement.tagName); //HTML注意tagName在HTML中返回的都是大写
var textEle = testElement.childNodes[0];
alert(textEle.data);
textEle.appendData('some <strong>');
textEle.nodeValue = 'any <a12>';
alert(document.doctype.name);
//DocumentFragment类型 可用来避免逐个添加元素导致浏览器反复渲染 可先加入到DocumentFragment类型然后一次性添加到文档中
var fragment = document.createDocumentFragment();
var testP = null;
for (var i = 3; i >= 0; i--) {
    testP = document.createElement('p');
    testP.appendChild(document.createTextNode('item' + i));
    fragment.appendChild(testP);
}
testElement.appendChild(fragment);
var divs = document.getElementsByTagName('a'),
    i,
    len,
    div;
for (i = 0,len = divs.length; i < len; i++) {
    div = document.createElement('a');
    div.appendChild(document.createTextNode(`${i}`));
    document.body.appendChild(div);
}













