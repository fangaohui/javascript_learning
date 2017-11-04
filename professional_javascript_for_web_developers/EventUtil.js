
var EventUtil = {
    addHandle : function(element,type,handler) {
        alert(this + '3344');
        if (element.addEventLister) {
            element.addEventLister(type,handler,false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type,handler);
        } else {
            element['on' + type] = handler;
        }
    },
    removeHandle : function(element,type,handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type.handler,false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type,handler);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent : function(event){
        return event ? event : window.event;
    },
    getTarget(event){
        return event.target || event.srcElement;
    },
    preventDefault(event){
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};