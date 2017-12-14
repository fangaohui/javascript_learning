var json = '[{"title1":123,"subtitle":234,"title":{"title":555,"aaa":123}},{"title":123,"subtitle":234}]';
var jsonObj = eval(json);
var jsonObj1 = JSON.parse(json);
alert(jsonObj1[0]['title']);
// jsonObj.toJSON = function () {
//     return 'test to json';
// }
var jsonStr = JSON.stringify(jsonObj,['title']);
alert(jsonStr);

function createXHR(){
    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != 'undefined') {
        if (typeof arguments.callee.activeXString != 'string') {
            var versions = ['...','...'],
            i,len;
            for (var i = 0,len = versions.length; i < len; i++) {
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error('no xhr object');
    }
}
