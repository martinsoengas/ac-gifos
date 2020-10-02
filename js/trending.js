import { config } from "./config.js";

let OFFSET_COUNTER = 12;
/* -----------------------------  MAIN SEARCH ----------------------------- */
const inputMain = document.getElementById("search-main");
const suggestionsList = document.getElementById("suggestions-list");
const iconOnSearch = document.getElementById("icon-onsearch");
const searchResults = document.getElementById('search-results')
const searchTitle = document.getElementById('search-title')
const searchTitleContainer = document.getElementById('search-title-container')
const viewMoreContainer = document.getElementById('view-more-container')
const ul = document.getElementById("suggestions-list");
const iconSearchMain = document.getElementById('icon-search-main')
const hrLineSearch = document.getElementById('hr-line-search')
const hrLine = document.createElement("hr");
const viewMore = document.createElement('div');
const noSearchResults = document.getElementById('no-search-results')
const noSearchImg = document.createElement('img');

async function searchExecute(searchTerm) {
  if (searchTerm !== "") {
    let urlSearch = `${config.baseUrl}/gifs/search?api_key=${config.API_KEY}&q=${searchTerm}&limit=${OFFSET_COUNTER}`;
    const response = await fetch(urlSearch);
    const search = await response.json();

    if (search.data.length === 0) {

      searchSuggestionsDelete()
      hrLineSearchCreation()
      searchTitle.textContent = "Lorem Ipsum";
      searchTitleContainer.classList.add('search-title-container');
      searchTitleContainer.classList.remove('display-none')

      noSearchImg.setAttribute('src', 'img/icon-busqueda-sin-resultado.svg');
      noSearchResults.appendChild(noSearchImg);

    } else if (search !== "") {
      OFFSET_COUNTER = OFFSET_COUNTER + 12;

      searchTitle.innerHTML = "";
      searchResults.innerHTML = "";
      iconOnSearch.classList.remove("icon-onsearch-visible");

      hrLineSearchCreation()

      searchTitle.textContent = capitalizeFirstLetter(searchTerm)
      searchTitleContainer.classList.add('search-title-container');
      searchTitleContainer.classList.remove('display-none')

      viewMoreCreation()
      viewMoreContainer.classList.remove('display-none')

      search.data.forEach(e => {
        let gifImgs = e.images.original.url;
        const gifImgContainer = document.createElement('img')
        gifImgContainer.classList.add('img-gifs')
        gifImgContainer.setAttribute('src', gifImgs)
        searchResults.appendChild(gifImgContainer)
      });
    }
  }
}

async function searchSuggestions(searchTerm) {
  if (searchTerm !== "") {
    let urlSearchSuggestions = `${config.baseUrl}/tags/related/${searchTerm}?api_key=${config.API_KEY}`;
    const response = await fetch(urlSearchSuggestions);
    let search = await response.json();

    suggestionsList.innerHTML = "";

    hrLineSuggestionsCreation()

    iconSearchCrossCreation()

    searchSuggestionsCreation(search)

  } else {
    searchSuggestionsDelete();
  }
}

function hrLineSearchCreation() {
  hrLine.classList.add("hr-line-search");
  hrLineSearch.appendChild(hrLine);
}

function hrLineSuggestionsCreation() {
  const hrLine = document.createElement("hr");
  hrLine.classList.add("hr-line-suggestions");
  suggestionsList.appendChild(hrLine);
  iconOnSearch.classList.add("icon-onsearch-visible");
}

function viewMoreCreation() {
  viewMore.classList.add('view-more')
  viewMoreContainer.appendChild(viewMore);
}

function iconSearchCrossCreation() {
  if (iconSearchMain.getAttribute('src') === "img/icon-search.svg") {
    iconSearchMain.setAttribute("src", "img/close.svg");
  } else if (iconSearchMain.getAttribute('src') === "img/icon-search-mod-noc.svg") {
    iconSearchMain.setAttribute("src", "img/close-modo-noct.svg");
  }
  iconSearchMain.addEventListener('click', () => {
    inputMain.value = ""
    searchSuggestionsDelete();
  })
}

function searchSuggestionsCreation(search) {
  for (let i = 0; i <= 3; i++) {
    const divIcon = document.createElement("div");
    divIcon.classList.add("div-icon");
    const liSuggestions = document.createElement("li");
    liSuggestions.classList.add("li-suggestions");
    liSuggestions.setAttribute('id', i);
    const imgIcon = document.createElement("img");
    imgIcon.classList.add("img-icon");
    imgIcon.setAttribute("src", "img/icon-onsearch.svg");

    divIcon.appendChild(imgIcon);
    divIcon.appendChild(liSuggestions);
    suggestionsList.appendChild(divIcon);

    liSuggestions.textContent = capitalizeFirstLetter(search.data[i].name);
  }
};

function searchSuggestionsDelete() {
  OFFSET_COUNTER = 12;
  noSearchResults.innerHTML = "";
  viewMoreContainer.innerHTML = "";
  hrLineSearch.innerHTML = "";
  viewMore.classList.remove('view-more');
  hrLine.classList.remove("hr-line-search");
  suggestionsList.innerHTML = "";
  searchResults.innerHTML = "";
  iconOnSearch.classList.remove("icon-onsearch-visible");
  searchTitle.innerHTML = "";
  viewMoreContainer.classList.add('display-none')
  if (iconSearchMain.getAttribute('src') === "img/close.svg") {
    iconSearchMain.setAttribute("src", "img/icon-search.svg");
  } else if (iconSearchMain.getAttribute('src') === "img/close-modo-noct.svg") {
    iconSearchMain.setAttribute("src", "img/icon-search-mod-noc.svg");
  }
}

viewMoreContainer.addEventListener('click', () => {
  searchExecute(inputMain.value);
});

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI' || e.target.tagName === 'DIV') {
    inputMain.value = e.target.textContent;
    OFFSET_COUNTER = 12;
    searchExecute(inputMain.value);
    setTimeout(() => {
      suggestionsList.innerHTML = "";
    }, 300)
  }
});

inputMain.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchExecute(inputMain.value);
  }
});

inputMain.addEventListener("keyup", () => {
  setTimeout(() => {
    searchSuggestions(inputMain.value);
  }, 500);
});

inputMain.addEventListener("focusout", (event) => {
  setTimeout(() => {
    suggestionsList.innerHTML = "";
  }, 300)
});

function toggleDisplay(e) {
  e.classList.toggle('display-none')
}

// TRENDING TERMS
const trendingFiveContainer = document.getElementById("trending-five");
const pFive = document.createElement("p");
pFive.classList.add("trending-words");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getTrending() {
  let urlTrending = `${config.baseUrl}/trending/searches?api_key=${config.API_KEY}`;
  const response = await fetch(urlTrending);
  const trending = await response.json();


  let trendingFive = "";
  for (let i = 0; i < 5; i++) {
    trendingFive += capitalizeFirstLetter(`${trending.data[i]}, `);
    pFive.textContent = trendingFive;
    trendingFiveContainer.appendChild(pFive);
  }
}

getTrending();

// TRENDING GIFS
const trendsCarousel = document.getElementById("trends-carousel");

async function getTrendingGifs() {
  let urlTrendingGifs = `${config.baseUrl}/gifs/trending?api_key=${config.API_KEY}&limit=12`;
  const response = await fetch(urlTrendingGifs);
  const trending = await response.json();


  trending.data.forEach((gif) => {
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    let gifImg = document.createElement("img");
    gifImg.setAttribute("src", gif.images.original.url);
    gifImg.classList.add("image-carousel");

    let after = document.createElement("div");
    after.classList.add("after");

    let gifInfo = document.createElement("div");

    let userName = document.createElement("div");
    userName.classList.add("image-user");
    userName.textContent = gif.username ? gif.username : "User Not Registered";

    let imageTitle = document.createElement("div");
    imageTitle.classList.add("image-title");
    imageTitle.textContent = gif.title;

    imageContainer.appendChild(gifImg);
    imageContainer.appendChild(after);

    after.appendChild(gifInfo);
    gifInfo.appendChild(userName);
    gifInfo.appendChild(imageTitle);

    trendsCarousel.appendChild(imageContainer);
  });
}

getTrendingGifs();
