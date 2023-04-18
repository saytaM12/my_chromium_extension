// returns `tab` or `tabs.Tab` object of the current tab
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function getAllTabs() {
    let tabs = await chrome.tabs.query({});

    return tabs;
}

// changes current tab url to be the `<a>Original image</a>` url
async function openImages(tabs) {
    tabs.forEach((tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["pogramming_inject/originalImage.js"]
        });
    });
}

async function openImage(tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["pogramming_inject/originalImage.js"]
    });
}


// downloads from the source of current tab url
async function downloadAll() {
    let tabs = await getAllTabs();

    tabs.forEach((tab) => {
        if (tab.url.includes("https://img3.gelbooru.com/images/")) {
            url = tab.url;
            chrome.downloads.download({
                url: url,
                filename: "culture/" + url.substring(url.lastIndexOf('/')+1)
            });
            chrome.tabs.remove( tab.id );
        }
    });
}

async function close() {
    let tab = await getCurrentTab();

    chrome.tabs.remove(
        tab.id
    );
}

let first_tabs;

chrome.commands.onCommand.addListener((command) => {

    switch (command) {
        case "open-Original-images":
            let f_tabs_ids;
            chrome.storage.session.get(["local"]).then((result) => {
                f_tabs_ids = result.local;
            });
            let second_tabs = getAllTabs();
            let new_tabs = [];

            second_tabs.then((s_tabs) => {
                s_tabs.forEach((tab) => {
                    if (!f_tabs_ids.includes(tab.id)) {
                        new_tabs.push(tab);
                    }
                });
                chrome.tabs.update(new_tabs[0].id, { active: true } );

                openImages(new_tabs);
            });

            break;

        case "open-current-image":
            let curr_tab = getCurrentTab();
            curr_tab.then((c_tab) => {
                openImage(c_tab);

                let all_tabs = getAllTabs();
                all_tabs.then((a_tabs) => {
                    a_tabs.forEach((tab) => {
                        if (tab.id == c_tab.id) {
                            chrome.tabs.update(a_tabs[a_tabs.lastIndexOf(tab) - 1].id, { active: true });
                        }
                    });
                });
            });
            break;


        case "download":
            downloadAll();
            close();
            break;

        case "save-open-tabs":
            first_tabs = getAllTabs();
            let first_tabs_ids = [1];
            first_tabs.then((f_tabs) => {
                f_tabs.forEach((tab) => {
                    first_tabs_ids.push(tab.id);
                });

                chrome.storage.session.set({local: first_tabs_ids}, function() {
                    console.log('Array stored in session storage');
                });
            });

            break;
    }
});
