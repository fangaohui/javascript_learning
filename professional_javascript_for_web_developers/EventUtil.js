
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
    },
    getRelatedTarget(event){
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    getButton(event){
        if (document.implementation.hasFeature('MouseEvents','2.0')) {
            return event.button;
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    getWheelDelta(event){
        if (event.wheelDelta) {
            return (clinet.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    getCharCode(event){
        if (typeof event.charCode == 'number') {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
};