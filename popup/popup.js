console.log('This is a popup!');


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function getImgUrl() {
    var xpath = "//a[text()='Original image']";
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var link = matchingElement.getAttribute('href');
    return link;
}

async function executeScript() {
    console.log("yes");
    var tab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["pogramming_inject/prog_inject.js"]
    });
}


async function main() {

    let tab = await getCurrentTab();
    let url = tab.url;

    chrome.tabs.create({url: url});

    var img_button = document.getElementById("img_url_button");
    img_button.addEventListener(
    "click", () => executeScript(), false);
}

// main();

var alert_button = document.getElementById("alert_button");
alert_button.addEventListener(
"click", () => alert("hello, extensions."), false);

