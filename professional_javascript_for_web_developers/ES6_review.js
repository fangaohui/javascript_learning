function getValue(){
    return 1;
};
//初次解析函数声明不会调用getValue()方法 方法执行时且使用默认参数才执行
function add(a,b = getValue()){
}