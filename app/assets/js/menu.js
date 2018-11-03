function openMenu() {
    document.documentElement.classList.add('menu--open');
}

function closeMenu() {
    document.documentElement.classList.remove('menu--open');
}

function updateMenu() {
    setTimeout(function() {
        var menuLinks = document.querySelectorAll('.menu__link');
        for (var i = menuLinks.length - 1; i >= 0; i--) {
            var pathname = window.location.pathname;
            var hash = window.location.hash;
            if (pathname == '/') { pathname = '/index.html' }
            if (menuLinks[i].pathname + menuLinks[i].hash === pathname + hash) {
                menuLinks[i].classList.add('active');
            } else {
                menuLinks[i].classList.remove('active');
            }
        }
    }, 0);
}


document.addEventListener("DOMContentLoaded", function loadedMenu() {
    updateMenu();

    /* Делаем каждому элементу меню разную задержку при переходах */
    var menuItems = document.querySelectorAll('.menu__item');
    for (var i = menuItems.length - 1; i >= 0; i--) {
        menuItems[i].style.transitionDelay = i * 0.2 + 's';
    }

    var menuLinks = document.querySelectorAll('.menu__link');
    for (var i = menuLinks.length - 1; i >= 0; i--) {
        menuLinks[i].addEventListener('click', updateMenu);
        menuLinks[i].addEventListener('click', closeMenu);
    }
});
