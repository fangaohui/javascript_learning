
function showPic(picname)
{
    var source = picname.getAttribute("href");
    var placeholder = document.getElementById("imageid");
    placeholder.setAttribute("src",source);
    var text = picname.getAttribute("title");
    var description = document.getElementById("honey");
    description.firstChild.nodeValue = text;
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
            };
        }
        if (links[i].getAttribute("id") == "image2")
        {
            links[i].onclick = function(){
                showPic(this);
                return false;
            };
        }
    }

    var para = document.createElement("p");
    alert("para的nodeName是"+para.nodeName+"nodeType是"+para.nodeType);
    var targetElement = document.getElementById("honey");
    targetElement.appendChild(para);
    //设置文本只能通过添加文本节点？
    var textNode = document.createTextNode("add special");
    para.appendChild(textNode);
}

function preparePlaceholder()
{
    var imageAdd = document.createElement("img");
    //设置id属性，是否可以使用添加属性节点的方式？
    imageAdd.setAttribute("id","imageid");
    imageAdd.setAttribute("src","thumb_IMG_1218_1024.jpg");
    imageAdd.setAttribute("alt","my image gallery");

    var pAdd = document.createElement("p");
    pAdd.setAttribute("id","honey");
    var textAdd = document.createTextNode("choose an image");
    pAdd.appendChild(textAdd);

    // document.getElementsByTagName("body")[0].appendChild(imageAdd);
    // imageAdd.parentNode.insertBefore(pAdd,imageAdd);
    document.getElementsByTagName("body")[0].appendChild(pAdd);
    insertAfter(imageAdd,pAdd);
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareLinks);
