
var paras = document.getElementsByTagName('p');
for (var i = paras.length - 1; i >= 0; i--) {
    paras[i].onclick = function() {
        alert('test click');
    }
}

function autoMoveElement() {
    var paras = document.getElementsByTagName('p');
    if (!paras) return false;
    var firstElem = paras[0];
    firstElem.style.position = 'absolute';
    firstElem.style.left = '50px';
    firstElem.style.top = '200px';
    moveElement(firstElem.getAttribute('id'),100,300,10);
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

addLoadEvent(autoMoveElement);
addLoadEvent(highlightRows);