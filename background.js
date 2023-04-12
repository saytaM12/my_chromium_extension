// returns `tab` or `tabs.Tab` object of the current tab
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// changes current tab url to be the `<a>Original image</a>` url
async function openImage() {
    var tab = await getCurrentTab();

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["pogramming_inject/originalImage.js"]
    });
}

// downloads from the source of current tab url
async function download() {
    var tab = await getCurrentTab();

    var url = tab.url;

    chrome.downloads.download({
        url: url,
        filename: "culture/" + url.substring(url.lastIndexOf('/')+1)
    });
}

async function close() {
    var tab = await getCurrentTab();

    chrome.tabs.remove(
        tab.id
    );
}

chrome.commands.onCommand.addListener((command) => {
    if (command == "open-Original-image") {
        openImage();

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

    if (command == "download") {
        download();
        close();
    }

    if (command == "close") {
        close();
    }
});
