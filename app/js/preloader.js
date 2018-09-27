var preloaderStatus = false;
var startLoadingTime = Date.now();

var preloaderTimer = setTimeout(function() {
  preloaderStatus = true;
  preloader.style.display = 'flex';
  preloader.style.opacity = '1';

  setTimeout(function() {
    document.documentElement.classList.remove('loading')
    preloader.style.display = 'none';
    preloader.style.opacity = '0';
  }, 5500)

}, 2000)

window.addEventListener("load", function() {
  console.log(Date.now() - startLoadingTime);

  if (!preloaderStatus) {
    clearTimeout(preloaderTimer);
    document.documentElement.classList.remove('loading');
  }
});

