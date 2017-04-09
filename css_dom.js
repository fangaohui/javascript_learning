
var paras = document.getElementsByTagName('p');
for (var i = paras.length - 1; i >= 0; i--) {
    paras[i].onclick = function() {
        alert('test click');
    }
}

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName('tr');
    for (var i = rows.length - 1; i >= 0; i--) {
        rows[i].onmouseover = changeHighlightStyle;
        rows[i].onmouseout = changeHighlightStyle;
    }
}

var lastState = true;
function changeHighlightStyle() {
    addClass(this,lastState?'highlight':'normal');
    deleteClass(this,lastState?'normal':'highlight')
    lastState = !lastState;
}

addLoadEvent(highlightRows);