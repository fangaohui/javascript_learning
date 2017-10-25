alert('客户端检测');
function isHostMethod(object,property){
    var t = typeof object[property];
    return t == 'function' ||
            (!!(t == 'object' && object[property])) ||
            t == 'unknown';
}
alert(isHostMethod(self,'navigator'));
let client = function(){
    var engine = {
        ie : 0,
        gecko : 0,
        webkit : 0,
        khtml : 0,
        opera : 0,
        ver : null
    };
    var ua = navigator.userAgent;
    if (window.opera) {

    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp['$1'];
        engine.webkit = parseFloat(engine.ver);
    }
    return {
        engine : engine
    };
}();
if (client.engine.webkit) {
    alert(navigator.userAgent);
}
alert(navigator.platform);