
let test_canvas = document.getElementById('test_canvas');
if (test_canvas.getContext) {
    // var context = test_canvas.getContext('2d');
    // context.strokeStyle = '#1122ff';
    // context.lineWidth = 2;
    // context.fillStyle = 'rgba(1,1,233,0.6)';
    // context.fillRect(10,10,50,130);
    // context.clearRect(30,20,10,10);
    /*
    context.beginPath();
    context.arc(100,100,99,0,2*Math.PI,false);
    context.moveTo(194.100);
    context.arc(100.100,94,0,2*Math.PI,false);
    context.moveTo(100,100);
    context.lineTo(100,15);
    context.moveTo(100,100);
    context.lineTo(35,100);
    context.stroke();
    */
    // context.fillText('1256434435243',100,100,30);
    var gl = test_canvas.getContext('experimental-webgl');
    
    alert(gl);
}