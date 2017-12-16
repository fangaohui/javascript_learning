var json = '[{"title1":123,"subtitle":234,"title":{"title":555,"aaa":123}},{"title":123,"subtitle":234}]';
var jsonObj = eval(json);
var jsonObj1 = JSON.parse(json);
alert(jsonObj1[0]['title']);
// jsonObj.toJSON = function () {
//     return 'test to json';
// }
var jsonStr = JSON.stringify(jsonObj,['title']);
alert(jsonStr);
function createXHR(){
    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != 'undefined') {
        if (typeof arguments.callee.activeXString != 'string') {
            var versions = ['...','...'],
            i,len;
            for (var i = 0,len = versions.length; i < len; i++) {
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error('no xhr object');
    }
}
let testXHR = createXHR();
testXHR.onreadystatechange = function(){
    console.log(testXHR.readyState);
    console.log(testXHR.getAllResponseHeaders());
};
testXHR.open('get','testXHR.txt',true);
testXHR.setRequestHeader('custom_header','abc');
testXHR.send(null);
testXHR.abort();
console.error('test xhr');
if ((testXHR.status >= 200 && testXHR.status < 300) || testXHR.status == 304) {
    alert(testXHR.responseText);
} else {
    alert('error' + testXHR.status);
}
testXHR = null;
function addURLParam(url,name,value){
    url += (url.indexOf('?') == -1 ? '?' : '&');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}
var data = new FormData(document.forms[0]);
data.append('name','michael');
var postXHR = createXHR();
postXHR.onreadystatechange = function(){
    if (postXHR.readyState == 4) {
        try{
            if ((postXHR.status >= 200 && postXHR.status < 300) || postXHR.status == 304) {
                //request succeed
            } else {
                //request unsuccessful
            }
        }catch(ex){
            //ontimeout事件处理
        }
    }
};
postXHR.open('post','test.php',true);
postXHR.overrideMimeType('text/xml');
postXHR.timeout = 1000;
postXHR.ontimeout = function(){
    //timeout
}
postXHR.send(data);
//图片Ping
let imgPing = new Image();
imgPing.onload = imgPing.onerror = function(){
    console.log('imgping done');
};
imgPing.src = 'https://www.hupu.com?u=michael';
//SSE服务器发送事件
var source = new EventSource('test.php');
source.onmessage = function(event){
    var data = event.data;
};
source.close();
//web sockets
var socket = new WebSocket('wss://www.hupu.com');
socket.onmessage = function(event){
    var data = event.data;
};
socket.onclose = function(event){
    console.log(event.reason);
};
socket.send(Json.stringify(jsonObj1));
socket.close();









