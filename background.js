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

function openImage(tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["pogramming_inject/originalImage.js"]
    });
}

function openArtist(tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["pogramming_inject/artist.js"]
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

async function switchToPrevTab() {
    let curr_tab = await getCurrentTab();
    let all_tabs = await getAllTabs();
    all_tabs.forEach((tab) => {
        if (tab.id == curr_tab.id) {
            chrome.tabs.update(all_tabs[all_tabs.lastIndexOf(tab) - 1].id, { active: true });
            return;
        }
    });
}

async function openImages() {
    let f_tabs_ids;
    await chrome.storage.session.get(["local"]).then((result) => {
        f_tabs_ids = result.local;
    });

    console.log(f_tabs_ids);
    let second_tabs = await getAllTabs();
    let new_tabs = [];

    second_tabs.forEach((tab) => {
        if (!f_tabs_ids.includes(tab.id)) {
            new_tabs.push(tab);
        }

    });

    chrome.tabs.update(new_tabs[0].id, { active: true } );

    new_tabs.forEach((tab) => {
        openImage(tab);
    });

    await chrome.storage.session.clear();
}

chrome.commands.onCommand.addListener((command) => {

    switch (command) {
        case "open-Original-images":
            openImages();
            break;

        case "download":
            downloadAll();
            close();
            break;

        case "save-open-tabs":
            let first_tabs_ids = [];
            let first_tabs = getAllTabs();

            first_tabs.then((f_tabs) => {
                f_tabs.forEach((tab) => {
                    first_tabs_ids.push(tab.id);
                });

                chrome.storage.session.set({local: first_tabs_ids}, function() {
                    console.log('Array stored in session storage');
                });
            });

            break;

        case "open-artists":

            break;

        case "open-current-artist":
            let curr_tab = getCurrentTab();
            curr_tab.then((tab) => {
                openArtist(tab);
            });

            switchToPrevTab();

            break;
    }
});
