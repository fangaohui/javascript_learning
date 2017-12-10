
var player = document.getElementById('player'),
    btn = document.getElementById('video-btn'),
    curtime = document.getElementById('curtime'),
    duration = document.getElementById('duration');
duration.innerHTML = player.duration;
alert(btn);
EventUtil.addHandle(btn,'click',function(event) {
    if (player.paused) {
        player.play();
        btn.value = 'pause';
    } else {
        player.pause();
        btn.value = 'play';
    }
    alert(123);
    history.pushState({name:'123'},'3','nicholas.html');
});
setInterval(function(){
    curtime.innerHTML = player.currentTime;
},250);