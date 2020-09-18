import { config } from "./config.js";

let OFFSET_COUNTER = 12;
/* -----------------------------  MAIN SEARCH ----------------------------- */
const inputMain = document.getElementById("search-main");
const suggestionsList = document.getElementById("suggestions-list");
const iconOnSearch = document.getElementById("icon-onsearch");
const searchResults = document.getElementById('search-results')
const searchTitle = document.getElementById('search-title')
const searchTitleContainer = document.getElementById('search-title-container')
const viewMore = document.getElementById('view-more-container')

async function searchExecute(searchTerm) {
  if (searchTerm !== "") {
    let urlSearch = `${config.baseUrl}/gifs/search?api_key=${config.API_KEY}&q=${searchTerm}&limit=${OFFSET_COUNTER}`;
    const response = await fetch(urlSearch);
    const search = await response.json();

    if (search !== "") {
      OFFSET_COUNTER = OFFSET_COUNTER + 12;

      searchTitle.innerHTML = "";
      searchResults.innerHTML = "";
      iconOnSearch.classList.remove("icon-onsearch-visible");

      searchTitle.textContent = capitalizeFirstLetter(searchTerm)
      searchTitleContainer.classList.add('search-title-container');
      searchTitleContainer.classList.remove('display-none')

      viewMore.classList.remove('display-none')

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

    const hrLine = document.createElement("hr");
    hrLine.classList.add("hr-line");
    suggestionsList.appendChild(hrLine);
    iconOnSearch.classList.add("icon-onsearch-visible");

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

  } else {
    suggestionsList.innerHTML = "";
    searchResults.innerHTML = "";
    iconOnSearch.classList.remove("icon-onsearch-visible");
    searchTitle.innerHTML = "";
    viewMore.classList.add('display-none')
    OFFSET_COUNTER = 12;
  }
}

viewMore.addEventListener('click', () => {
  searchExecute(inputMain.value);
});

let ul = document.getElementById("suggestions-list");

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI' || e.target.tagName === 'DIV') {
    inputMain.value = e.target.textContent;
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
