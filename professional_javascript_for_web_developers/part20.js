var json = '[{"title":123,"subtitle":234},{"title":123,"subtitle":234}]';
var jsonObj = eval(json);
var jsonObj1 = JSON.parse(json);
alert(jsonObj1[0]['title']);
jsonObj.toJSON = function () {
    return 'test to json';
}
var jsonStr = JSON.stringify(jsonObj);
alert(jsonStr);