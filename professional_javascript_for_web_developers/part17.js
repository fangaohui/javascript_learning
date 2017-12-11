
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

function CustomError(message){
    this.name = 'CustomError';
    this.message = message;
}
CustomError.prototype = new Error();
var error1 = new CustomError('my error');
alert(error1.message); //CustomError
alert(Object.getPrototypeOf(error1).message); //空字符串