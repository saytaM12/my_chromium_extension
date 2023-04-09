
//var imgs = document.querySelectorAll("a");
//console.log(imgs);


//var tag_sidebar = document.getElementById("tag-sidebar");
//console.log(tag_sidebar);

//var xpath = "//a[text()='Original image']";
//var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//var link = matchingElement.getAttribute('href');
//console.log(link);
//chrome.tabs.create({url: link});

const items = document.querySelectorAll('.pcVideoListItem');
const images = [];

items.forEach(li => {
  const img = li.querySelector('img');
  if (img) {
    images.push(img);
  }
});

images.forEach(img => {
    const source = img.getAttribute('src');
    if (source) {
        img.setAttribute('src', 'https://safebooru.org//samples/4135/sample_cd12b3a1068b73b6c66ef6e31aeea654b56797e2.jpg?4320442')
    }
})
