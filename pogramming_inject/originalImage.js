let url = window.location.href;
let searchText;

if (url.includes("rule34") || url.includes("gelbooru")) {
    searchText = "Download image";
}
else if (url.includes("lolibooru")) {
    searchText = "View larger version";
}

let aTags = document.getElementsByTagName("a");
let found;

for (let i = 0; i < aTags.length; i++) {
    if (aTags[i].textContent.includes(searchText)) {
        found = aTags[i];
        break;
    }
}

window.open(link, "_self");
