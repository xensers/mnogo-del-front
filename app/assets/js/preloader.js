/**
 * Запускает прелоадер
 * 
 * @param  {Boolean} status FASLE - запустится только если страница грузится больше 2х секунд.
 *                          TURE -  Запустится принудительно.
 */
function runPreloader(status) {
    document.documentElement.classList.add('loading');

    var timer = setTimeout(function() {
        status = true;
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';

        setTimeout(function() {
            document.documentElement.classList.remove('loading');
            preloader.style.display = 'none';
            preloader.style.opacity = '0';
        }, 5500);

    }, 2000);

    window.addEventListener("load", function() {
        if (!status) {
            clearTimeout(timer);
            document.documentElement.classList.remove('loading');
        }
    });
}
