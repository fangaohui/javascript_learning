alert('BOM');
var age1 = 16;
let age = 29;
function sayAge(argument) {
    alert(this.age); //undefined 使用let
    alert(this.age1); //16
}
sayAge();
alert(delete window.age1); //false
// window.moveBy(0,100); //可能已被禁用
// window.resizeTo(100,100); //可能已被禁用
var wroxWin = window.open('http://www.hupu.com','testopne','height=200,width=200,top=100,left=50');
alert(wroxWin.opener === window);
wroxWin.opener = null; //两个window对象运行在独立的进程中
var timeoutId = setTimeout(()=>alert('test timeout'),1000);
alert(typeof timeoutId); //number
clearTimeout(timeoutId);
var result = confirm('what is');
alert(result);
// window.find(); //chrome无效...
// prompt('abc',''); //chrome无效...
alert(window.location);
// location.href = 'http://www.hupu.com';
// location.hostname = 'www.baidu.com';
// location.reload(true); //强制从服务器加载 不使用缓存
alert(window.navigator.appName);
for (var obj of window.navigator.plugins) {
    alert(obj.name);
}
plugins.refresh(true); //true是否在更新plugins集合的同时重新加载包含插件的所有页面
alert('需要了解MIME类型插件');
history.go(-1);
history.go(2);
history.go('hupu.con');
if (history.length == 0) {
    //用户打开窗口的第一个页面
}