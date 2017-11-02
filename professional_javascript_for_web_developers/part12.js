/*
alert(document.body.isDefaultNamespace(''));
alert(document.body.localName);
alert(document.body.namespaceURI); //http://www.w3.org/1999/xhtml
alert(document.body.prefix); //null
alert(document.doctype.publicId);
alert(document.doctype.systemId);
var oldNode = document.documentElement;
alert(oldNode.innerText);
var newNode = document.importNode(oldNode,true);
alert(document.defaultView);
// document.body.isSupported('HTML','2.0');
var div = document.createElement('div');
alert(div.setUserData); //undefined 不支持dom3???
div.setUserData('name','nicholas',function(operation,key,value,src,dest) {
    if (operation == 1) {
        dest.setUserData(key,value,function(){});
    }
});
var newDiv = div.cloneNode(true);
alert(div.getUserData('name'));
function getIframeDoc (iFrameId){
    var iframe = document.getElementById(iFrameId);
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    return iframeDoc;
}
var parentWindow = document.defaultView || document.parentWindow;
*/
/*
var supportsDOM2CSS = document.implementation.hasFeature('CSS','2.0');
var testa = document.getElementById('abc');
alert(testa.style.backgroundColor);
testa.style.cssText = 'width:130px; height:50px';
alert(testa.style.length);
var mydiv = testa.style.item(0);
alert(mydiv);
var value1 = testa.style.getPropertyValue(mydiv);
alert(testa.style.getPropertyCSSValue);
// var value = testa.style.getPropertyCSSValue(mydiv);
// alert(value.cssText + '\n' + value.cssValueType);
alert(document.defaultView.getComputedStyle(testa,null));
// testa.currentStyle; ie浏览器的getComputedStyle()
var supportsDOM2StyleSheets = document.implementation.hasFeature('StyleSheets','2.0');
alert(supportsDOM2StyleSheets); //true
alert(document.styleSheets.length); //0
function getStyleSheet(element){
    return element.sheet || element.styleSheet;
}
alert(getStyleSheet(testa)); //undefined未支持?
*/
alert(document.documentElement.scrollTop);
var teste = document.getElementById('abc');
function getBoundingClientRect(elem){
    alert(typeof arguments.callee.offset); //undefined
    //给函数增加一个offset属性 只有typeof offset不为number时才初始化 确保只初始化一次
    if (typeof arguments.callee.offset != 'number') {
        var scrollTop = document.documentElement.scrollTop;
        var temp = document.createElement('div');
        temp.style.cssText = 'position:absolute;left:0;top:0';
        document.body.appendChild(temp);
        arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
        document.body.removeChild(temp);
        temp = null;
    }
    var rect = elem.getBoundingClientRect();
    var offset = arguments.callee.offset;
    return {
        left: rect.left + offset,
        right: rect.right + offset,
        top: rect.top + offset,
        bottom:rect.bottom + offset
    };
}
alert(getBoundingClientRect(teste));










