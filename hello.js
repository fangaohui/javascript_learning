
var t = 3;
alert(t);

var beatles = Array(4);
beatles[0] = 1;
beatles[2] = 3;
beatles[3] = "test";
beatles[4] = "a";
var testAry = Array("1",2,3,4,5);
var simple = [111,222];

beatles = [1111,3333,444444];
alert(beatles[1]);

// // var lennon = ["john",1940,false];
// // var beatles = [];
// beatles[0] = lennon;

var lennon = {name:1,year:1002,living:false};

var message = "i test" + 'aaa';
alert(message);

var mood = "acc";
var message_1 = "abc" + mood + lennon.year + lennon.living;
alert(message_1);

beatles = [111,222,333,444,555,666,777];

function shout(test) {
    beatles = Array("aaa",111);
    for (var i = beatles.length - 1; i >= 0; i--) {
        alert(beatles[i]);
    }
    alert(test);
}

shout(111);
alert(beatles);

var num = 7.56;
var num = Math.round(num);
alert(num);

alert("dfasd");
alert(document.getElementById("test").getAttribute('title'));
document.getElementById('test').setAttribute('title','honeyhoney');
alert(document.getElementById("test").getAttribute('title'));






