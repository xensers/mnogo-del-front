document.addEventListener("DOMContentLoaded", onLoadedHeader);

function onLoadedHeader() {
    window.addEventListener('scroll', headerScroll);
}

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
