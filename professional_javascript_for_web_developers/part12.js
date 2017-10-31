/*
alert(document.body.isDefaultNamespace(''));
alert(document.body.localName);
alert(document.body.namespaceURI); //http://www.w3.org/1999/xhtml
alert(document.body.prefix); //null
*/
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