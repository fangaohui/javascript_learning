
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
alert(testForm.checkValidity());
var selectionTest = document.getElementsByTagName('select')[0];
var newOption = new Option('text','option');
selectionTest.add(newOption,undefined);
var option1 = document.createElement('option');
option1.appendChild(document.createTextNode('option text'));
option1.setAttribute('value','option value');
selectionTest.add(option1);
var optionToMove = selectionTest.options[1];
selectionTest.insertBefore(optionToMove,selectionTest.options[optionToMove.index-1]);
EventUtil.addHandle(window,'load',function(){
    alert(frames.document.getElementsByTagName('body')[0].getAttribute('name'));
    frames.document.designMode = 'on';
    frames['richedit'].document.execCommand('bold',false,null);
});
let result = frames['richedit'].document.queryCommandEnabled('bold');
var isBold = frames['richedit'].document.queryCommandState('bold');
var fontSize = frames['richedit'].document.queryCommandValue('fontsize');



