
// alert('表单脚本');
var testForm = document.getElementById('test_form');
EventUtil.addHandle(testForm,'submit',function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var btn = target.elements['submit-btn'];
    btn.disabled = true;
});
var firstRadio = testForm.elements['color'][0];
firstRadio.focus();
firstRadio.disabled = true;
firstRadio.type = 'checkbox';
var textinput = testForm.elements['testinput'];
EventUtil.addHandle(textinput,'blur',function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (/[^\d]/.test(target.value)) {
        target.style.backgroundColor = 'red';
    } else {
        target.style.backgroundColor = '';
    }
});
EventUtil.addHandle(textinput,'focus',function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    target.select();
});
EventUtil.addHandle(textinput,'select',function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    alert(target.value.substring(target.selectionStart,target.selectionEnd));
    // alert(document.selection.createRange().text); ie8及以前版本 使用document.selection创建范围
});

