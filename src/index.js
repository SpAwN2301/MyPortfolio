const body          = document.body;
const bgColorsBody  = ["#74ee15", "#f000ff", "#001eff"];
const menu          = body.querySelector(".menu");
const menuItems     = menu.querySelectorAll(".menu__item");
const menuContent   = document.querySelector(".content").children;
const menuBorder    = menu.querySelector(".menu__border");
const projects      = document.getElementById('projects');
let activeItem      = menu.querySelector(".active");

const animArr = [
    'animate__animated', 
    'animate__fadeIn', 
    'animate__fadeInLeft', 
    'animate__fadeInRight'
];

let previousScreen  = 0;
const projectsArr   = [
    {
        name:           'Video Conference',
        description:    'Тестовое задание Blackwall. '
    },
    {
        name:           'Yamaguchi',
        description:    'Тестовое задание Yamaguchi.'
    },
    {
        name:           'OnPoint',
        description:    'Тестовое задание — eDetailing под iPad.<br/>Перемещение между слайдами происходит при помощи стрелок на клавиатуре, либо свайпов на планшетах.'
    },
    {
        name:           'MyPortfolio',
        description:    'Немного рекурсии :)'
    },
    {
        name:           'TestPayment',
        description:    'Тестовое задание — Форма оформления заказа.'
    },
    {
        name:           'TestCalculator',
        description:    'Тестовое задание — Калькулятор для расчета стоимости натяжных потолков с установкой.'
    },
    {
        name:           'Uber',
        description:    'Мой первый проект'
    },
]

projectsRender();

function projectsRender() {
    for(let i = 0; i < projectsArr.length; i++){
        projects.innerHTML += `
        <li class="myProject">
            <div class="myProject__title">${projectsArr[i].name}</div>
            <div class="myProject__descrip">${projectsArr[i].description}</div>
            <a target="_blank" href="https://spawn2301.github.io/${projectsArr[i].name.split(' ').join('')}/" class="myProject__link">Go to Website</a>
        </li>
        `;
    }
}

function clickItem(item, index) {
    jumpAnim(previousScreen, index);

    menu.style.removeProperty("--timeOut");
    
    if (activeItem == item) return;
    
    if (activeItem) {
        activeItem.classList.remove("active");
    }

    
    item.classList.add("active");
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);
    
    for(let i = 0; i < menuContent.length; i++){
        menuContent[i].style.display = "none";
    }
    menuContent[index].style.display = "block";
    menuContent[index].style.color   = bgColorsBody[index];
}

function offsetMenuBorder(element, menuBorder) {

    const offsetActiveItem = element.getBoundingClientRect();
    const left             = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";

    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {

    item.addEventListener("click", () => clickItem(item, index));
    
})

window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});

function jumpAnim(previousView, currentView) {
    menuContent[currentView].classList.remove(...animArr);
    menuContent[currentView].classList.remove(...animArr);
    menuContent[currentView].classList.remove(...animArr);

    if(previousView == currentView) {
        menuContent[currentView].classList.add('animate__animated', 'animate__fadeIn');
    }
    if(previousView < currentView) {
        menuContent[currentView].classList.add('animate__animated', 'animate__fadeInRight');
    }
    if(previousView > currentView) {
        menuContent[currentView].classList.add('animate__animated', 'animate__fadeInLeft');
    }
    console.log(previousScreen, currentView)

    previousScreen = currentView;
};