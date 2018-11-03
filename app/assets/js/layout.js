/**
 * Открытие/Закрытие меню
 */
function layoutMenuToggle() {
  document.documentElement.classList.toggle('menu--open');
}

/* Вешаем события */
document.addEventListener("DOMContentLoaded", function loadedLayout() {
  document.querySelector('.layout__menu-toggle').addEventListener("click", layoutMenuToggle);
});

window.addEventListener("beforeunload", function () {
  document.body.style.animation = 'fadeOut 1s';
})
