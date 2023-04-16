let url = window.location.href;
if (url.includes("gelbooru")) {
    let xpath = "//a[text()='Original image']";
    let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    let link = matchingElement.getAttribute('href');
    window.open(link, "_self");
}
