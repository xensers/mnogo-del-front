document.addEventListener("DOMContentLoaded", onLoadedMenu);
window.addEventListener("beforeunload", onUnloadMenu)


function onLoadedMenu() {
    document.querySelector('.layout__menu-toggle').addEventListener("click", layoutMenuToggle);
}

function onUnloadMenu() {
    document.body.style.animation = 'fadeOut 1s';
}

/**
 * Открытие/Закрытие меню
 */
function layoutMenuToggle() {
    document.documentElement.classList.toggle('menu--open');
}
