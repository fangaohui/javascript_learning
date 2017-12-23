
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