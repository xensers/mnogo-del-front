document.addEventListener("DOMContentLoaded", onLoadedHeader);

function onLoadedHeader() {
    window.addEventListener('scroll', headerScroll);

    document.querySelector('.header__icons_back').onclick = function() {
      window.history.back();
      return false;
    };
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
    });
}
