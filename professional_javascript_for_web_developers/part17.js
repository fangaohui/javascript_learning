
function testTry(argument) {
    try{
        var a = 1;
        alert(a*14);
        return 3;
    } catch (error) {
        if (error instanceof TypeError) {

        } else if (error instanceof ReferenceError)
        {

        }
    } finally {
        alert(9);
        return 5;
    }
}
alert(testTry());

window.onerror = function(message,url,line) {
    alert('onerror' + message);
    return false;
}

function CustomError(message){
    this.name = 'CustomError';
    this.message = message;
}
CustomError.prototype = new Error();
var error1 = new CustomError('my error');
alert(error1.message); //CustomError
alert(Object.getPrototypeOf(error1).message); //空字符串
// throw(error1);
var testError = function(para){
    if (typeof para == 'string') {
        alert(para.substring(2));
    }
    if (para instanceof Array) {
        alert(para.length);
    }
}
testError('4567');
testError([1,2,3]);
console.log(44444);
function logError(sev,msg){
    var img = new Image(); //使用image避免跨域色问题
    img.src = 'log.php?sev=' + encodeURIComponent(sev) + '&msg=' + encodeURIComponent(msg);
}
function log(message){
    if (typeof console == 'object') {
        console.log(message);
    } else if (typeof opera == 'object') {
        opera.postError(message);
    } else if (typeof java == 'object' && typeof java.lang == 'object') {
        java.lang.System.out.println(message);
    }
}
function assert(condition,message){
    if (!condition) {
        throw new Error(message);
    }
}
