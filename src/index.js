const body          = document.body;
const bgColorsBody  = ["#74ee15", "#f000ff", "#001eff"];
const menu          = body.querySelector(".menu");
const menuItems     = menu.querySelectorAll(".menu__item");
const menuContent   = document.querySelector(".content").children;
const menuBorder    = menu.querySelector(".menu__border");
let projects        = document.getElementById('projects');
let activeItem      = menu.querySelector(".active");

const projectsArr = [
    {
        name:           'Smart Orders',
        description:    'Сервис для быстрого оформления заказа в местах общепита и ресторанах. Всё, что нужно пользователю — это отсканировать QR код своего столика и выбрать предпочитаемые блюда из меню. Меню формируется на основе Гугл таблиц, что позволяет работникам легко и удобно управлять его содержимым. Оформленный заказ моментально попадает в базу данных и на экраны персонала, доступ к которому есть только у авторизованных работников заведения.'
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