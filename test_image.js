
function showPic(picname)
{
    var source = picname.getAttribute("href");
    var placeholder = document.getElementById("imageid");
    placeholder.setAttribute("src",source);
    var text = picname.getAttribute("title");
    var description = document.getElementById("honey");
    description.childNodes[0].nodeValue = text;
}

function popUp(winUrl)
{
    window.open(winUrl,"popUp","width=200,height=200");
}

function prepareLinks()
{
    var links = document.getElementsByTagName("a");
    for (var i = links.length - 1; i >= 0; i--) {
        if (links[i].getAttribute("class") == "pop") {
            links[i].onclick = function(){
                popUp(this.href);
                return false;
            }
        }
        if (links[i].getAttribute("id") == "image2")
        {
            links[i].onclick = function(){
                showPic(this);
                return false;
            }
        }
    }
}

window.onload = prepareLinks;