let artistLi = document.querySelectorAll(".tag-type-artist");

if (artistLi.length == 1) {
    let artistUrl = artistLi[0].querySelectorAll("a")[3].getAttribute("href");
    window.open(artistUrl, "_self");
}
