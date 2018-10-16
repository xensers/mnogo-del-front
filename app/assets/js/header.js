/**
 * Действия с шапкой при скроллинге
 */
function headerScroll() {
    var headerElem = document.querySelector('.header');

    if (window.pageYOffset > 10) {
      headerElem.classList.add('scroll');
    } else {
      headerElem.classList.remove('scroll');
    }
}

/* Вешаем события */
document.addEventListener("DOMContentLoaded", function loadedHeader() {
  window.addEventListener('scroll', headerScroll);
});
