let navUL = document.getElementById("nav-ul");
let burger = document.getElementById("burger");

let isDarkMode = false;

// function sticky navbar
let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
let createGif = document.getElementById("create-gif-border");
let createEmpty = document.getElementById("create-empty");
let searchNav = document.getElementById("container-center");

window.addEventListener("scroll", () => {
  if (window.pageYOffset >= sticky) {
    if (isDarkMode) {
      createEmpty.classList.add("visibility-hidden");
      createGif.classList.add("visibility-hidden");
      navbar.classList.add("sticky-dark");
      navbar.classList.remove("sticky");
      // createEmpty.classList.add('container-empty-desktop')
      searchNav.classList.remove("container-center");
      searchNav.classList.add("container-center-display");
    } else {
      createEmpty.classList.add("visibility-hidden");
      createGif.classList.add("visibility-hidden");
      navbar.classList.add("sticky");
      navbar.classList.remove("sticky-dark");
      // createEmpty.classList.add('container-empty-desktop')
      searchNav.classList.remove("container-center");
      searchNav.classList.add("container-center-display");
    }
  } else {
    createEmpty.classList.remove("visibility-hidden");
    createGif.classList.remove("visibility-hidden");
    navbar.classList.remove("sticky-dark");
    navbar.classList.remove("sticky");
    searchNav.classList.add("container-center");
    searchNav.classList.remove("container-center-display");
    // createEmpty.classList.remove('container-empty-desktop')
  }
});

// burger light/dark show menu
burger.addEventListener("click", () => {
  navUL.classList.toggle("show");
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
  document.body.classList.toggle("dark-body");
  document.getElementsByTagName("input")[0].classList.toggle("dark-text");
  document.getElementsByTagName("input")[1].classList.toggle("dark-text");
  document
    .getElementById("container-search")
    .classList.toggle("dark-container-search");
  document.getElementById("search-nav").classList.toggle("dark-search-nav");
  document
    .getElementById("container-trending")
    .classList.toggle("dark-container-trending");
  document.getElementById("nav-ul").classList.toggle("dark-nav-ul");
  document
    .getElementsByTagName("footer")[0]
    .classList.toggle("dark-border-bottom");

  let navLI = document.getElementsByClassName("nav-item");
  for (let i = 0; i < navLI.length; i++) {
    navLI[i].classList.toggle("dark-text-important");
  }

  if (darkThemeButton.textContent === "Modo Nocturno") {
    darkThemeButton.textContent = "Modo Diurno";
  } else {
    darkThemeButton.textContent = "Modo Nocturno";
  }

  let allP = document.getElementsByTagName("p");
  for (let i = 0; i < allP.length; i++) {
    allP[i].classList.toggle("dark-text");
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

  let createGif = document.getElementById("create-svg-fill");
  let createGifAtt = createGif.getAttribute("fill");

  if (createGifAtt === "#572EE5") {
    createGif.setAttribute("fill", "#FFFFFF");
  } else {
    createGif.setAttribute("fill", "#572EE5");
  }

  document
    .getElementById("create-gif-border")
    .classList.toggle("dark-create-gif-border");
}
// dark theme end
if (navbar.classList.contains("sticky")) {
  createGif.classList.add("visibility-hidden");
} else {
  createGif.classList.remove("visibility-hidden");
}
