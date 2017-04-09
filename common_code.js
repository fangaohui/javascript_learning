
function insertAfter(newElement,targetElement)
{
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }
    else
    {
        //nextSibling当前元素节点的下一个元素节点
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addLoadEvent(func)
{
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    }
    else
    {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}

function addClass(element,value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += ' ';
        newClassName += value;
        element.className = newClassName;
    }
}

function deleteClass(element,value) {
    if (element.className) {
        newClassName = element.className;
        alert('brfore ' + newClassName + ' end');
        newClassName -= value;
        alert('after ' + newClassName + ' end');
        element.className = newClassName;
    }
}