
//var imgs = document.querySelectorAll("a");
//console.log(imgs);


//var tag_sidebar = document.getElementById("tag-sidebar");
//console.log(tag_sidebar);

var xpath = "//a[text()='Original image']";
var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var link = matchingElement.getAttribute('href');
console.log(link);
chrome.tabs.create({url: link});
