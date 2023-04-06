console.log('This is a popup!');


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


async function main() {

    let tab = await getCurrentTab();
    let url = tab.url;

    chrome.tabs.create({url: url});
}

// main();


var greeting = "hello, ";
var button = document.getElementById("mybutton");
button.person_name = "Bob";
button.addEventListener(
"click", () => alert(greeting + button.person_name + "."), false);
