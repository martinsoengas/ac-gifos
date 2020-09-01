let navUL = document.getElementById('nav-ul');
let burger = document.getElementById('burger');

let isDarkMode = false;

// function sticky navbar

let navbar = document.getElementById('navbar');
let sticky = navbar.offsetTop;
let createGif = document.getElementById('create-gif-border');



window.addEventListener("scroll", () => {
    if (window.pageYOffset >= sticky) {
      if(isDarkMode){
        createGif.classList.add('display-none');
        navbar.classList.add("sticky-dark");
        navbar.classList.remove("sticky");
      } else {
        createGif.classList.add('display-none');
        navbar.classList.add("sticky");
        navbar.classList.remove("sticky-dark");
      } 
    } else {
        createGif.classList.remove('display-none');
        navbar.classList.remove("sticky-dark");
        navbar.classList.remove("sticky");
    }
});

// function that changes any attribute
function changeAttribute(element, attribute, source) {
    element.setAttribute(attribute, source);
}

// burger light/dark show menu
burger.addEventListener('click', () => {    
    navUL.classList.toggle('show');
    let burgerAttribute = burger.getAttribute('src');
    if(burgerAttribute === 'img/burger.svg'){
        changeAttribute(burger, 'src', 'img/button-close.svg');
    }else if (burgerAttribute === 'img/button-close.svg'){
        changeAttribute(burger, 'src', 'img/burger.svg');
    }else if (burgerAttribute === 'img/button-close-dark.svg'){
        changeAttribute(burger, 'src', 'img/burger-dark.svg');
    }else if(burgerAttribute === 'img/burger-dark.svg'){
        changeAttribute(burger, 'src', 'img/button-close-dark.svg');
    }
});

// dark theme start
let darkThemeButton = document.getElementById('dark-theme-button');
darkThemeButton.addEventListener('click', darkTheme);

function darkTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-body");
    document.body.classList.toggle("dark-border-top");
    document.getElementsByTagName('input')[0].classList.toggle('dark-text');
    document.getElementById('container-search').classList.toggle('dark-container-search');
    document.getElementById('container-trending').classList.toggle('dark-container-trending');
    document.getElementById('nav-ul').classList.toggle('dark-nav-ul');
    document.getElementsByTagName('footer')[0].classList.toggle("dark-border-bottom");

    let navLI = document.getElementsByClassName('nav-item'); 
    for(let i = 0; i < navLI.length; i++){
        navLI[i].classList.toggle('dark-text-important');
    };

    if(darkThemeButton.textContent === "Modo Nocturno"){
        darkThemeButton.textContent = "Modo Diurno";
    } else {
        darkThemeButton.textContent = "Modo Nocturno";
    }

    let allP = document.getElementsByTagName('p');
    for(let i = 0; i < allP.length ; i++){
        allP[i].classList.toggle('dark-text');
    }

    let iconSearch = document.getElementById('icon-search');
    let iconSearchAtt = iconSearch.getAttribute('src');

    if(iconSearchAtt === 'img/icon-search.svg' ){
        changeAttribute(iconSearch, 'src', 'img/icon-search-mod-noc.svg');
    }else{
        changeAttribute(iconSearch, 'src', 'img/icon-search.svg');
    };

    let logoDark = document.getElementById('logo');
    let logoDarkAtt = logoDark.getAttribute('src');

    if(logoDarkAtt === "img/logo-mobile.svg"){
        changeAttribute(logoDark, 'src', "img/logo-mobile-modo-noct.svg");
    }else{
        changeAttribute(logoDark, 'src', "img/logo-mobile.svg"); 
    }

    let burgerAttribute = burger.getAttribute('src');

    if(burgerAttribute === 'img/burger.svg' ){
        changeAttribute(burger, 'src', 'img/burger-dark.svg');
    } else if (burgerAttribute === 'img/burger-dark.svg'){
        changeAttribute(burger, 'src', 'img/burger.svg');
    }

    if(burgerAttribute === 'img/button-close.svg' ){
        changeAttribute(burger, 'src', 'img/button-close-dark.svg');
    } else if ('img/button-close-dark.svg') {
        changeAttribute(burger, 'src', 'img/button-close.svg');
    }

    let createGif = document.getElementById('create-svg-fill');
    let createGifAtt = createGif.getAttribute('fill');

    if(createGifAtt === '#572EE5' ){
        createGifAtt = changeAttribute(createGif, 'fill', '#FFFFFF');
    }else{
        createGifAtt = changeAttribute(createGif, 'fill', '#572EE5');
    };
    
    document.getElementById('create-gif-border').classList.toggle('dark-create-gif-border');

}
// dark theme end
if(navbar.classList.contains('sticky')){
    createGif.classList.add('display-none');
} else {
    createGif.classList.remove('display-none');
}
