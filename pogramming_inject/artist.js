let artistLi = document.querySelectorAll(".tag-type-artist");

let artistUrl = artistLi[0].querySelectorAll("a")[1].getAttribute("href");

let link;
for (let i = 0; i < artistLi.length; i++) {
    link = artistLi[0].querySelectorAll("a")[1].getAttribute("href");
    if (i == 0) {
        window.open(link, "_self");
    }
    else {
        window.open(link);
    }
}
