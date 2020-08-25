const burger = document.getElementById('burger');
const navUL = document.getElementById('nav-ul');
var burgerAttribute = burger.getAttribute('src');

burger.addEventListener('click', () => {
    navUL.classList.toggle('show');
    if(burgerAttribute == "img/burger.svg"){
        changeAtt("img/button-close.svg");
    }else{
        changeAtt("img/burger.svg"); 
    }
});

function changeAtt(source) {
    burgerAttribute = source;
    document.getElementById("burger").src = source;
}

// dark theme

let darkThemeButton = document.getElementById('dark-theme-button');
darkThemeButton.addEventListener('click', darkTheme);

function darkTheme() {
    document.body.classList.toggle("dark-body")
    document.getElementById('navbar').classList.toggle("dark-border-top");

    let allP = document.getElementsByTagName('p');
    for(let i = 0; i < allP.length ; i++){
        document.getElementsByTagName('p')[i].classList.toggle('dark-text');
    }

    let iconSearch = document.getElementById('icon-search');
    if(iconSearch.getAttribute('src') == 'img/icon-search.svg' ){
        iconSearch.setAttribute('src', 'img/icon-search-mod-noc.svg');
    }else{
        iconSearch.setAttribute('src', 'img/icon-search.svg');
    }

    document.getElementsByTagName('input')[0].classList.toggle('dark-text');
    document.getElementById('container-search').classList.toggle('dark-container-search');
    document.getElementById('container-trending').classList.toggle('dark-container-trending');
}

