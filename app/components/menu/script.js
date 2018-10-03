document.addEventListener("DOMContentLoaded", function loadedMenu() {
  /* Делаем каждому элементу меню разную задержку при переходах */
  var menuItems = document.querySelectorAll('.menu__item');
  for (var i = menuItems.length - 1; i >= 0; i--) {
    menuItems[i].style.transitionDelay = i * 0.2 + 's';
  }
});
