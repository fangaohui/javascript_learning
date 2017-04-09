
function displayCitations()
{
    var quotes = document.getElementsByTagName('blockquote');
    for (var i = quotes.length - 1; i >= 0; i--) {
        if (!quotes[i].getAttribute('cite')) {
            continue;
        }
        var url = quotes[i].getAttribute('cite');
        var quoteElements = quotes[i].getElementsByTagName('*');
        if (quoteElements.length < 1) {
            continue;
        }
        var elem = quoteElements[quoteElements.length - 1];

        var link = document.createElement('a');
        var link_text = document.createTextNode('source');
        link.appendChild(link_text);
        link.setAttribute('href',url);
        var superscript = document.createElement('sup');
        superscript.appendChild(link);

        elem.appendChild(superscript);
    }
}

addLoadEvent(displayCitations);