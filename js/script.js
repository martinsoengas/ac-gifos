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