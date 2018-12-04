document.addEventListener("DOMContentLoaded", onLoadedMenu);
window.addEventListener("beforeunload", onUnloadMenu);
window.addEventListener('scroll', onScroll);


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

function onScroll()
{
  if (window.pageYOffset > 10) {
      document.documentElement.classList.add('onscroll');
  } else {
      document.documentElement.classList.remove('onscroll');
  }
}
