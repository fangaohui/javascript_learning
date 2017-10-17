function getValue(){
    return 1;
};
//初次解析函数声明不会调用getValue()方法 方法执行时且使用默认参数才执行
function add(a,b = getValue()){
}
const setCookieDefaults = {
    secure : false,
    path : '/',
    domain : 'hupu.com'
};
function setCookie(name,value,{
    secure = setCookieDefaults.secure,
    path = setCookieDefaults.path,
    domain = setCookieDefaults.domain
} = setCookieDefaults);