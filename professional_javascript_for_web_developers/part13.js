var testEle = document.getElementById('bbb');
alert(testEle.testname123.value);
var testBtn = document.getElementById('haha');
EventUtil.addHandle(testBtn,'click',(event)=>{
    //使用箭头函数 则this为window 复习下为什么是window???
    alert(`${this}` + this.id + event.type);
    alert(EventUtil.getTarget(event));
});
//并不能取消html中设置的事件处理
// testBtn.onclick = null;
//AbstractView类型?????
var isSupported = document.implementation.hasFeature('UIEvent',3.0);
alert(isSupported + 'abc');
var imgEle = document.getElementById('9900');
EventUtil.addHandle(imgEle,'load',function(argument) {
    alert('img did loaded');
});
isSupported = document.implementation.hasFeature('FocusEvent','3.0');
EventUtil.addHandle(imgEle,'click',function(event){
    event = EventUtil.getEvent(event);
    alert(event.screenX + '\n' + event.screenY + '\n\n' + event.pageX + '\n' + event.pageY + '\n\n' + event.clientX + '\n' + event.clientY);
    alert(event.shiftKey);
});
alert('13.4.6 变动事件');
isSupported = document.implementation.hasFeature('MutationEvents','2.0');
EventUtil.addHandler(window,'deviceorientation',function(){
    var arrow = document.getElementById('arrow');
    arrow.style.webkitTransform = 'rotate(' + Math.round(event.alpha) + 'deg)';
});
var customEvent = document.createEvent('CustomEvent');
alert(customEvent.initMouseEvent);
customEvent.initMouseEvent('click',true,true,'hello custom event');
imgEle.dispatchEvent(customEvent);
