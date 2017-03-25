
function getNewContent()
{
    var request = getHTTPObject();
    if (request) {
        request.open('GET','file:///Users/Michael/JS_Programming/javascript_learning/example.txt',true);
        // request.open('GET','http://www.hupu.com',true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                var para = document.createElement('p');
                //无法加载本地example.txt，因为同源策略？
                alert(request.responseText);
                var txt = document.createTextNode(request.responseXML);
                para.appendChild(txt);
                document.getElementById('honey').appendChild(para);
            }
            else
            {
                alert('request have not finish');
            }
        };
        request.send(null);
    }
    else
    {
        alert('your browser doesn\'t support XMLHttpRequest');
    }
}
addLoadEvent(getNewContent);