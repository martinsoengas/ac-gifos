let navUL = document.getElementById('nav-ul');
let burger = document.getElementById('burger');

burger.addEventListener('click', () => {    
    navUL.classList.toggle('show');
    
    let burgerAttribute = burger.getAttribute('src');
    if(burgerAttribute === 'img/burger.svg'){
        changeSrcAttribute(burger, 'img/button-close.svg');
    }else if (burgerAttribute === 'img/button-close.svg'){
        changeSrcAttribute(burger, 'img/burger.svg');
    }else if (burgerAttribute === 'img/button-close-dark.svg'){
        changeSrcAttribute(burger, 'img/burger-dark.svg');
    }else if(burgerAttribute === 'img/burger-dark.svg'){
        changeSrcAttribute(burger, 'img/button-close-dark.svg');
    }
});

// dark theme

let darkThemeButton = document.getElementById('dark-theme-button');
darkThemeButton.addEventListener('click', darkTheme);

function darkTheme() {
    document.body.classList.toggle("dark-body")
    document.getElementById('navbar').classList.toggle("dark-border-top");
    document.getElementsByTagName('input')[0].classList.toggle('dark-text');
    document.getElementById('container-search').classList.toggle('dark-container-search');
    document.getElementById('container-trending').classList.toggle('dark-container-trending');
    document.getElementById('nav-ul').classList.toggle('dark-nav-ul');
    document.getElementsByTagName('footer')[0].classList.toggle("dark-border-bottom");

    if(darkThemeButton.textContent === "Modo Nocturno"){
        darkThemeButton.textContent = "Modo Diurno";
    } else {
        darkThemeButton.textContent = "Modo Nocturno";
    }

    let allP = document.getElementsByTagName('p');
    for(let i = 0; i < allP.length ; i++){
        document.getElementsByTagName('p')[i].classList.toggle('dark-text');
    }

    let iconSearch = document.getElementById('icon-search');
    let iconSearchAtt = iconSearch.getAttribute('src');

    if(iconSearchAtt === 'img/icon-search.svg' ){
        changeSrcAttribute(iconSearch, 'img/icon-search-mod-noc.svg');
    }else{
        changeSrcAttribute(iconSearch, 'img/icon-search.svg');
    }

;

    let logoDark = document.getElementById('logo');
    let logoDarkAtt = logoDark.getAttribute('src');

    if(logoDarkAtt === "img/logo-mobile.svg"){
        changeSrcAttribute(logoDark, "img/logo-mobile-modo-noct.svg");
    }else{
        changeSrcAttribute(logoDark, "img/logo-mobile.svg"); 
    }

    let burgerAttribute = burger.getAttribute('src');

    if(burgerAttribute === 'img/burger.svg' ){
        changeSrcAttribute(burger, 'img/burger-dark.svg');
    } else if (burgerAttribute === 'img/burger-dark.svg'){
        changeSrcAttribute(burger, 'img/burger.svg');
    }

    if(burgerAttribute === 'img/button-close.svg' ){
        changeSrcAttribute(burger, 'img/button-close-dark.svg');
    } else if ('img/button-close-dark.svg') {
        changeSrcAttribute(burger, 'img/button-close.svg');
    }

}

// function that changes 'src'
function changeSrcAttribute(element, source) {
    element.setAttribute('src', source);
}