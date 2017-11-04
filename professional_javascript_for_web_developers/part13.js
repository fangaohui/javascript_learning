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
