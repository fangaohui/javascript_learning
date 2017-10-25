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