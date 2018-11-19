document.addEventListener("DOMContentLoaded", onLoadedHeader);

function onLoadedHeader() {
    window.addEventListener('scroll', headerScroll);
}

/**
 * Действия с шапкой при скроллинге
 */
function headerScroll() {
    requestAnimationFrame(function(){
      var headerElem = document.querySelector('.header');
      var pageTitle = document.querySelector('.header__page-title');

      if (pageTitle.innerHTML == false) {
          headerElem.classList.add('empty-title');
      } else {
          headerElem.classList.remove('empty-title');
      }

      if (window.pageYOffset > 10) {
          headerElem.classList.add('scroll');
      } else {
          headerElem.classList.remove('scroll');
      }
    });
}
