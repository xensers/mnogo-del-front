var preloaderTimer;
var preloaderStatus = false;
/**
 * Запускает прелоадер
 * 
 * @param  {Boolean} preloaderStatus FASLE - запустится только если страница грузится больше 2х секунд.
 *                                   TURE -  Запустится принудительно.
 */
function runPreloader() {
    document.documentElement.classList.add('loading');
    preloaderStatus = false;
    preloaderTimer = setTimeout(function() {
        preloaderStatus = true;
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';

        setTimeout(function() {
            document.documentElement.classList.remove('loading');
            preloader.style.display = 'none';
        }, 5500);
    }, 2000);

    window.addEventListener("load", onLoadPreloader);
}

function onLoadPreloader(e) {
    if (!preloaderStatus) {
        clearTimeout(preloaderTimer);
        document.documentElement.classList.remove('loading');
    }
}

