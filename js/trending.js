import { config } from "./config.js";

let OFFSET_COUNTER = 12;
/* -----------------------------  MAIN SEARCH ----------------------------- */
const inputMain = document.getElementById("search-main")
const inputSecondary = document.getElementById('search-secondary')
const suggestionsListUl = document.createElement("ul")
const iconOnSearch = document.getElementById("icon-onsearch")
const searchResults = document.getElementById('search-results')
const searchTitle = document.getElementById('search-title')
const searchTitleContainer = document.getElementById('search-title-container')
const viewMoreContainer = document.getElementById('view-more-container')
const iconSearchMain = document.getElementById('icon-search-main')
const iconSearchSecondary = document.getElementById('icon-search-secondary')
const hrLineSearch = document.getElementById('hr-line-search')
const hrLine = document.createElement("hr");
const viewMore = document.createElement('div');
const noSearchResults = document.getElementById('no-search-results')
const noSearchImg = document.createElement('img');
const containerSearch = document.getElementById('container-search')

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
      OFFSET_COUNTER += 12;

      searchTitle.innerHTML = "";
      searchResults.innerHTML = "";

      iconOnSearch.classList.remove("icon-onsearch-visible");

      hrLineSearchCreation()

      searchTitle.textContent = capitalizeFirstLetter(searchTerm)
      searchTitleContainer.classList.add('search-title-container');
      searchTitleContainer.classList.remove('display-none')

      viewMoreCreation()
      viewMoreContainer.classList.remove('display-none')

      search.data.forEach(gif => {
        /*         let gifImgs = e.images.original.url;
                const gifImgContainer = document.createElement('img')
                gifImgContainer.classList.add('img-gifs')
                gifImgContainer.setAttribute('src', gifImgs)
                searchResults.appendChild(gifImgContainer) */
        ///////////

        let imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container-search");

        let gifImg = document.createElement("img");
        gifImg.setAttribute("src", gif.images.original.url);
        gifImg.classList.add("image-search-results");

        let afterSearch = document.createElement("div");
        afterSearch.classList.add("after-search");

        let userName = document.createElement("div");
        userName.classList.add("image-user-search");
        userName.textContent = gif.username ? gif.username : "User Not Registered";

        let imageTitle = document.createElement("div");
        imageTitle.classList.add("image-title-search");
        imageTitle.textContent = gif.title;

        let imageIconContainer = document.createElement('div');
        imageIconContainer.classList.add('image-icon-container-search');

        let imageFav = document.createElement("div");
        imageFav.classList.add("image-fav");
        imageFav.setAttribute('id', gif.id);

        if (getLocal) {
          if (JSON.parse(getLocal).includes(gif.id)) {
            imageFav.classList.add("image-fav-active");
          }
        }

        imageFav.addEventListener('click', () => {
          if (!favoritesArr.includes(gif.id)) {
            favoritesArr.push(gif.id)
            localStorage.setItem('favorites', JSON.stringify(favoritesArr));
            imageFav.classList.add("image-fav-active");
          } else {
            console.log(favoritesArr)
            favoritesArr = favoritesArr.filter(element => element !== gif.id)
            console.log(favoritesArr)
            localStorage.setItem('favorites', JSON.stringify(favoritesArr));
            imageFav.classList.remove("image-fav-active");
          }
        })

        let imageDownload = document.createElement("a");
        imageDownload.classList.add("image-download");
        imageDownload.setAttribute('href', gif.images.original.url)
        imageDownload.setAttribute('download', "download")

        let imageMax = document.createElement("div");
        imageMax.classList.add("image-max");

        imageIconContainer.appendChild(imageFav)
        imageIconContainer.appendChild(imageDownload)
        imageIconContainer.appendChild(imageMax)
        imageContainer.appendChild(gifImg);
        imageContainer.appendChild(afterSearch);

        afterSearch.appendChild(userName);
        afterSearch.appendChild(imageTitle);
        afterSearch.appendChild(imageIconContainer);

        searchResults.appendChild(imageContainer);


      });
    }
  }
}

function hrLineSearchCreation() {
  hrLine.classList.add("hr-line-search");
  hrLineSearch.appendChild(hrLine);
}

function viewMoreCreation() {
  viewMore.classList.add('view-more')
  viewMoreContainer.appendChild(viewMore);
}

viewMoreContainer.addEventListener('click', () => {
  searchExecute(inputMain.value);
  searchExecute(inputSecondary.value);
});


/* ----------------------------- SUGGESTION LIST ---------------------------- */

async function searchSuggestions(searchTerm) {
  if (searchTerm !== "") {
    let urlSearchSuggestions = `${config.baseUrl}/tags/related/${searchTerm}?api_key=${config.API_KEY}`;
    const response = await fetch(urlSearchSuggestions);
    let search = await response.json();

    suggestionsListUl.innerHTML = "";

    hrLineSuggestionsCreation()

    iconSearchCrossCreation()

    searchSuggestionsCreation(search)

    containerSearchBorder()
  }
}

function containerSearchBorder() {
  containerSearch.classList.add('container-search-square-border')
}

function hrLineSuggestionsCreation() {
  const hrLine = document.createElement("hr");
  hrLine.classList.add("hr-line-suggestions");
  suggestionsListUl.appendChild(hrLine);
  iconOnSearch.classList.add("icon-onsearch-visible");
}

function iconSearchCrossCreation() {
  if (iconSearchMain.getAttribute('src') === "img/icon-search.svg") {
    iconSearchMain.setAttribute("src", "img/close.svg");
  } else if (iconSearchMain.getAttribute('src') === "img/icon-search-mod-noc.svg") {
    iconSearchMain.setAttribute("src", "img/close-modo-noct.svg");
  }
  iconSearchMain.addEventListener('click', () => {
    inputMain.value = "";
    searchSuggestionsDelete();
  })
}

function iconSearchCrossCreationSecondary() {
  if (iconSearchSecondary.getAttribute('src') === "img/icon-search.svg") {
    iconSearchSecondary.setAttribute("src", "img/close.svg");
  } else if (iconSearchSecondary.getAttribute('src') === "img/icon-search-mod-noc.svg") {
    iconSearchSecondary.setAttribute("src", "img/close-modo-noct.svg");
  }
  iconSearchSecondary.addEventListener('click', () => {
    inputSecondary.value = "";
  })
}

function searchSuggestionsCreation(search) {
  for (let i = 0; i <= 3; i++) {
    if (search) {
      suggestionsListUl.classList.add('suggestions-list');
      const divIcon = document.createElement("div");
      divIcon.classList.add("div-icon");
      const liSuggestions = document.createElement("li");
      liSuggestions.classList.add("li-suggestions");
      liSuggestions.setAttribute('id', i);
      const imgIcon = document.createElement("img");
      imgIcon.classList.add("img-icon");
      imgIcon.setAttribute("src", "img/icon-onsearch.svg");

      containerSearch.appendChild(suggestionsListUl)
      suggestionsListUl.appendChild(divIcon)
      divIcon.appendChild(imgIcon);
      divIcon.appendChild(liSuggestions);
      suggestionsListUl.appendChild(divIcon);

      liSuggestions.textContent = capitalizeFirstLetter(search.data[i].name);

    }
  }
};

function searchSuggestionsDelete() {
  OFFSET_COUNTER = 12;
  noSearchResults.innerHTML = "";
  containerSearch.classList.remove('container-search-square-border')
  viewMoreContainer.innerHTML = "";
  hrLineSearch.innerHTML = "";
  viewMore.classList.remove('view-more');
  hrLine.classList.remove("hr-line-search");
  searchResults.innerHTML = "";
  iconOnSearch.classList.remove("icon-onsearch-visible");
  searchTitle.innerHTML = "";
  viewMoreContainer.classList.add('display-none')
  suggestionsListUl.innerHTML = "";
  suggestionsListUl.classList.remove('suggestions-list');
  if (iconSearchMain.getAttribute('src') === "img/close.svg") {
    iconSearchMain.setAttribute("src", "img/icon-search.svg");
  } else if (iconSearchMain.getAttribute('src') === "img/close-modo-noct.svg") {
    iconSearchMain.setAttribute("src", "img/icon-search-mod-noc.svg");
  }
}

suggestionsListUl.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI' || e.target.tagName === 'DIV') {
    inputMain.value = e.target.textContent;
    OFFSET_COUNTER = 12;
    searchExecute(inputMain.value);
    suggestionsListUl.classList.remove('suggestions-list');
    containerSearch.classList.remove('container-search-square-border')
    setTimeout(() => {
      suggestionsListUl.innerHTML = "";
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
    containerSearch.classList.remove('container-search-square-border')
    suggestionsListUl.remove();
  }, 300)
});

inputSecondary.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchExecute(inputSecondary.value);
  }
});

// TRENDING TERMS
const trendingFiveContainer = document.getElementById("trending-five");
const pFive = document.createElement("p");
pFive.classList.add("trending-words");



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
const rightArrow = document.getElementById('right-arrow')
const leftArrow = document.getElementById('left-arrow')
let scrollLeft = trendsCarousel.scrollLeft;
let maxScroll = 3600;

trendsCarousel.addEventListener('scroll', () => {
  scrollLeft = trendsCarousel.scrollLeft;
})

rightArrow.addEventListener('click', () => {
  if (scrollLeft < maxScroll) {
    trendsCarousel.scroll(scrollLeft += 150, 0);
  }
})

leftArrow.addEventListener('click', () => {
  if (scrollLeft >= 0) {
    trendsCarousel.scroll(scrollLeft -= 150, 0);
  }
})

async function getTrendingGifs() {
  const urlTrendingGifs = `${config.baseUrl}/gifs/trending?api_key=${config.API_KEY}&limit=12`;
  const response = await fetch(urlTrendingGifs);
  const trending = await response.json();
  const data = trending.data;

  trendingGifsCreation(data);
}

let getLocal = localStorage.getItem('favorites');
let favoritesArr = [];

if (getLocal) {
  favoritesArr = JSON.parse(getLocal);
}

function trendingGifsCreation(data) {
  data.forEach((gif) => {
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    let gifImg = document.createElement("img");
    gifImg.setAttribute("src", gif.images.original.url);
    gifImg.classList.add("image-carousel");

    let after = document.createElement("div");
    after.classList.add("after");

    let userName = document.createElement("div");
    userName.classList.add("image-user");
    userName.textContent = gif.username ? gif.username : "User Not Registered";

    let imageTitle = document.createElement("div");
    imageTitle.classList.add("image-title");
    imageTitle.textContent = gif.title;

    let imageIconContainer = document.createElement('div');
    imageIconContainer.classList.add('image-icon-container');

    let imageFav = document.createElement("div");
    imageFav.classList.add("image-fav");
    imageFav.setAttribute('id', gif.id);

    if (getLocal) {
      if (JSON.parse(getLocal).includes(gif.id)) {
        imageFav.classList.add("image-fav-active");
      }
    }

    imageFav.addEventListener('click', () => {
      if (!favoritesArr.includes(gif.id)) {
        favoritesArr.push(gif.id)
        localStorage.setItem('favorites', JSON.stringify(favoritesArr));
        imageFav.classList.add("image-fav-active");
      } else {
        console.log(favoritesArr)
        favoritesArr = favoritesArr.filter(element => element !== gif.id)
        console.log(favoritesArr)
        localStorage.setItem('favorites', JSON.stringify(favoritesArr));
        imageFav.classList.remove("image-fav-active");
      }
    })



    let imageDownload = document.createElement("a");
    imageDownload.classList.add("image-download");
    imageDownload.setAttribute('href', gif.images.original.url)
    imageDownload.setAttribute('download', "download")

    let imageMax = document.createElement("div");
    imageMax.classList.add("image-max");

    imageIconContainer.appendChild(imageFav)
    imageIconContainer.appendChild(imageDownload)
    imageIconContainer.appendChild(imageMax)
    imageContainer.appendChild(gifImg);
    imageContainer.appendChild(after);

    after.appendChild(userName);
    after.appendChild(imageTitle);
    after.appendChild(imageIconContainer);

    trendsCarousel.appendChild(imageContainer);
  });
}

getTrendingGifs();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


