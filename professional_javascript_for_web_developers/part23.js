
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