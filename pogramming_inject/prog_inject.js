var xpath = "//a[text()='Original image']";
var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var link = matchingElement.getAttribute('href');
window.open(link, "_self");
