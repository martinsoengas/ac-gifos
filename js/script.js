let navUL = document.getElementById("nav-ul");
let burger = document.getElementById("burger");

let isDarkMode = false;

// function sticky navbar
const navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
const searchNav = document.getElementById("search-nav");
const viewMore = document.getElementById('view-more');
const createGif = document.getElementById('create-gif')

window.addEventListener("scroll", () => {
  if (window.pageYOffset >= sticky) {
    if (isDarkMode) {
      navbar.classList.add("sticky-dark");
      navbar.classList.remove("sticky");
      searchNav.classList.remove("display-none");
      createGif.classList.add('visibility-hidden');
    } else {
      navbar.classList.add("sticky");
      navbar.classList.remove("sticky-dark");
      searchNav.classList.remove("display-none");
      createGif.classList.add('visibility-hidden');
    }
  } else {
    navbar.classList.remove("sticky-dark");
    navbar.classList.remove("sticky");
    searchNav.classList.add("display-none");
    createGif.classList.remove('visibility-hidden');
  }
});

// burger light/dark show menu
burger.addEventListener("click", () => {
  navUL.classList.toggle("show-burger-menu");
  let burgerAttribute = burger.getAttribute("src");
  if (burgerAttribute === "img/burger.svg") {
    burger.setAttribute("src", "img/button-close.svg");
  } else if (burgerAttribute === "img/button-close.svg") {
    burger.setAttribute("src", "img/burger.svg");
  } else if (burgerAttribute === "img/button-close-dark.svg") {
    burger.setAttribute("src", "img/burger-dark.svg");
  } else if (burgerAttribute === "img/burger-dark.svg") {
    burger.setAttribute("src", "img/button-close-dark.svg");
  }
});

// dark theme start
let darkThemeButton = document.getElementById("dark-theme-button");
darkThemeButton.addEventListener("click", darkTheme);

function darkTheme() {
  isDarkMode = !isDarkMode;
  document.body
    .classList.toggle('dark');
  document
    .getElementById("container-search")
    .classList.toggle("dark-container-search");
  document
    .getElementById("container-trending")
    .classList.toggle("dark-container-trending");
  document
    .getElementById("nav-ul")
    .classList.toggle("dark-nav-ul");

  if (darkThemeButton.textContent === "Modo Nocturno") {
    darkThemeButton.textContent = "Modo Diurno";
  } else {
    darkThemeButton.textContent = "Modo Nocturno";
  }

  let iconSearch = document.querySelectorAll(".icon-search");
  iconSearch.forEach((element) => {
    let iconSearchAtt = element.getAttribute("src");

    if (iconSearchAtt === "img/icon-search.svg") {
      element.setAttribute("src", "img/icon-search-mod-noc.svg");
    } else {
      element.setAttribute("src", "img/icon-search.svg");
    }
  });

  let logoDark = document.getElementById("logo");
  let logoDarkAtt = logoDark.getAttribute("src");

  if (logoDarkAtt === "img/logo-mobile.svg") {
    logoDark.setAttribute("src", "img/logo-mobile-modo-noct.svg");
  } else {
    logoDark.setAttribute("src", "img/logo-mobile.svg");
  }

  let burgerAttribute = burger.getAttribute("src");

  if (burgerAttribute === "img/burger.svg") {
    burger.setAttribute("src", "img/burger-dark.svg");
  } else if (burgerAttribute === "img/burger-dark.svg") {
    burger.setAttribute("src", "img/burger.svg");
  }

  if (burgerAttribute === "img/button-close.svg") {
    burger.setAttribute("src", "img/button-close-dark.svg");
  } else if ("img/button-close-dark.svg") {
    burger.setAttribute("src", "img/button-close.svg");
  }

}