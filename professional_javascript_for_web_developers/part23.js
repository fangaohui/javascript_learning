
console.log('part23');
if (navigator.onLine) {
    console.log('on');
} else {
    console.log('off');
}
console.log(applicationCache.status);
var CookieUtil = {
    get(name){
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';',cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURLComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
        }
        return cookieValue;
    },
    set(name,value,expires,path,domain,secure){
        //...
    }
};
var iterations = Math.floor(values.length / 8);
var leftover = values.length % 8;
var i = 0;
if (leftover > 0) {
    do{
        process(values[i++]);
    } while(--leftover > 0);
}
do{
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
} while(--iterations > 0);
(function(){
    function draw(timestamp){
        var drawStart = (timestamp || Date.now());
            diff = drawStart - startTime;
            startTime = drawStart;
            requestAnimationFrame(draw);
    }
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
        startTime = window.mozRequestAnimationFrame || Date.now();
    requestAnimationFrame(draw);
})();
function handleVisibilityChange(){
    if (document.hidden || document.msHidden || document.webkitHidden) {
        //...
    } else {
        //...
    }
}
EventUtil.addHandler(document,'msvisibilitychange',handleVisibilityChange);
EventUtil.addHandler(document,'webkitvisibilitychange',handleVisibilityChange);
navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude,
        long = position.coords.longitude;
    //...
},function(error){

},{
    enableHighAccuracy : true,
    timeout : 500,
    maximumAge : Infinity
});
var redirectCount = performance.navigation.redirectCount,
    navType = performance.navigation.type,
    startTiming = performance.timing.navigationStart;



