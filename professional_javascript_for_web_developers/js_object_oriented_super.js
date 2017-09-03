//6.3 
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function() {
    return this.property;
};
function SubType() {
    this.subproperty = false;
}
var testInstance = new SubType();
//SubType继承了SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
    return this.subproperty;
};
var instance = new SubType();
console.log(instance.getSuperValue()); //true
//testInstance和instance的[[Prototype]]原型对象指针 指向的不是同一个原型对象
console.log(testInstance.getSuperValue); //undefined
console.log(testInstance.getSubValue); //undefined