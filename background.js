// returns `tab` or `tabs.Tab` object of the current tab
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function getAllTabs() {
    let tabs = chrome.tabs.query();

    return tabs;
}

// changes current tab url to be the `<a>Original image</a>` url
async function openImage(tabs) {
    tabs.forEach((tab) =>
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["pogramming_inject/originalImage.js"]
    })
    )
}

function changeFocusBack() {
    chrome.tabs.query({ currentWindow: true }, (tabsArray) => {
    if (tabsArray.length === 1) return;

    let activeTabIndex = null;
    tabsArray.forEach((tab, index) => {
        if (tab.active === true) {
            activeTabIndex = index;
    }
    });

    const nextTab = tabsArray[(activeTabIndex - 1) % tabsArray.length];

    chrome.tabs.update(nextTab.id, { active: true });
    });
}

// downloads from the source of current tab url
async function download() {
    let tab = await getCurrentTab();

    let url = tab.url;

    chrome.downloads.download({
        url: url,
        filename: "culture/" + url.substring(url.lastIndexOf('/')+1)
    });
}

async function close() {
    let tab = await getCurrentTab();

    chrome.tabs.remove(
        tab.id
    );
}

let first_tabs = [];
let second_tabs = [];

chrome.commands.onCommand.addListener((command) => {

    switch (command) {
        case "open-Original-image":
            second_tabs = getAllTabs();
            let new_tabs = second_tabs.filter(x => !first_tabs.includes(x));
            openImage(new_tabs);
            changeFocusBack();
            break;

        case "download":
            download();
            close();
            break;

        case "save-open-tabs":
            first_tabs = getAllTabs();
            break;
    }
});
