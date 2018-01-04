
console.log('test');
$("button").click(function(event) {
    //元素
    // $("p").toggle(1000);
    $('p').animate({fontSize:'20'},1000).animate({fontSize:'10'},1000);
    $('p').text(function(i,oriText) {
        return oriText + '123455';
    });
    $('p').append('4444');
    $('p').prepend('3333');
    $('p').after('112233');
    $('p').remove('#abc');
    alert($('p').html());
    // $('p').animate({left:'200'},1000);
});
// $('button').click();

/*
$('p.intro').hide();
$('p#demo').hide();
//属性
$('[href]').hide();
$('[href='#']').hide();
$('[href!='#']').hide();
$('[href$='.jpg']').hide();
//css
$('p').css('background-color','red');

$('*').hide(); //所有元素
$('#test').hide(); //所有id=test的元素
$('p').hide; //所有p元素
$('.test').hide(); //所有class=test的元素
$('.test .abc').hide(); //所有class=test且class=abc的元素

$('p:first').hide(); //第一个p元素
$('p:last').hide();
$('tr:even').hide(); //所有偶数tr元素
$('tr:odd').hide(); //所有奇数tr元素
var jq = jQuary.noConflict(); //不使用$
*/

console.log('finished');