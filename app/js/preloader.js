var preloaderStatus = false;

var start = Date.now();
var preloaderTimer = setTimeout(function() {
  preloaderStatus = true;
  preloader.style.display = 'flex';
  preloader.style.opacity = '1';

  setTimeout(function() {
    document.body.classList.remove('loading')
  }, 5000)

}, 2000)

window.addEventListener("load", function() {
  console.log(Date.now() - start);

  if (!preloaderStatus) {
    clearTimeout(preloaderTimer);
    document.body.classList.remove('loading');
  }
});
