const link = document.querySelector("#link");
const shortenItButton = document.querySelector("#shortenIt");
const appendingUl = document.querySelector("#linkAppend");
const linkAppendTemplate = document.querySelector("#linkAppendTemplate");

const LINKS = "Links_KEY";
const shortLINKS = "shortLinks_KEY";

window.onclick = function (e) {
  if (e.target.className === "copy") {
    const innerTextAll = e.target.closest(".linkshortandbutton").innerText;
    // get the array of text and seperate them using split and then taking the first one copying it to the clipboard "Copyed ! 😎";
    const arrayOfinnerTextAll = innerTextAll.split("\n")[0];
    navigator.clipboard.writeText(arrayOfinnerTextAll);
    e.target.innerText = "Copyed ! 😎";
  }
};

let scode = require("shrtco.de");

const shortenLinksArray = renderLinks(shortLINKS);

// Creating a array fro storing the links in localStorage and the rendering them using forEach
const linksStringArray = renderLinks(LINKS);

// shortenLinksArray.forEach(renderLinkToTemplate);

for (let i = 0; i < linksStringArray.length; i++) {
  renderLinkToTemplate(linksStringArray[i], shortenLinksArray[i]);
}

shortenItButton.addEventListener("click", (e) => {
  e.preventDefault;
  if (link.value == "") {
    link.classList.add("active");
    link.placeholder = "Paste your 🔗 here FIRST ✌";
    return;
  } else {
    link.classList.remove("active");
    link.placeholder = "Paste the 🔗 here...";
  }

  const linkname = link.value;
  //   saving it to the localStorage
  //   rendering it to the template wiz appending and calling it in the promise below
  //   Shortnening it using the api
  shortenLink(linkname);
  link.value = "";
});

function shortenLink(linkname) {
  scode
    .short({ url: linkname })
    .then((res) => {
      const shortenedLink = res.result.short_link;
      shortenLinksArray.push(shortenedLink);
      linksStringArray.push(linkname);
      saveToLinksLocal(LINKS, linksStringArray);
      saveToLinksLocal(shortLINKS, shortenLinksArray);
      renderLinkToTemplate(linkname, shortenedLink);
    })
    .catch((error) => alert("Wrong URL 🙅‍♂️"));
}

function renderLinkToTemplate(linkname, shortenedLink) {
  const templateClone = linkAppendTemplate.content.cloneNode(true);
  const urlname = templateClone.querySelector("#link_copy");
  const shortUrlName = templateClone.querySelector("#shortened");
  shortUrlName.innerText = shortenedLink;
  urlname.innerText = linkname;
  appendingUl.appendChild(templateClone);
}
function renderLinks(Link) {
  const linksRender = localStorage.getItem(Link);
  return JSON.parse(linksRender) || [];
}

function saveToLinksLocal(Name, arr) {
  localStorage.setItem(Name, JSON.stringify(arr));
}
