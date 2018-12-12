var elemSideRight;
var elemActiveStiker;
var elemNextStiker;
var elemArticle;
var linkNextPage;
var documentNextPage;

function loadCaseDetailedPage() {
  elemSideRight    = document.querySelector('.layout__side_right');
  elemActiveStiker = document.querySelector('.case-detailed__stiker');
  elemNextStiker   = document.querySelector('.case-detailed__next');
  elemArticle      = document.querySelector('.case-detailed__article');
  linkNextPage     = document.querySelector('.case-detailed__next a');

  getDocument(linkNextPage.href, function(doc) {
    documentNextPage = doc;
    elemSideRight.onclick = nextPage;

  });
}

function nextPage(event)
{
  elemSideRight.onclick = undefined;

  var coordsActiveStiker = elemActiveStiker.getBoundingClientRect();
  var coordsNextStiker   = elemNextStiker.getBoundingClientRect();

  requestAnimationFrame(function(){
    elemActiveStiker.style.transition = 'all 2000ms ease';
    elemActiveStiker.style.transform  = 'translateX(-999px) translateY(-50%)';
    elemActiveStiker.style.opacity    = 0;

    elemNextStiker.style.transform  = 'translateX('+ coordsNextStiker.x +'px) translateY('+ coordsNextStiker.y +'px)';
    elemNextStiker.style.top        = 0;
    elemNextStiker.style.left       = 0;
    elemNextStiker.style.transition = 'all 1500ms ease 500ms';
    elemNextStiker.style.transform  = 'translateX('+ coordsActiveStiker.x +'px) translateY('+ coordsActiveStiker.y +'px)';

    elemArticle.style.transition = 'all 2000ms ease 100ms';
    elemArticle.style.transform  = 'translateX(-999px)';
    elemArticle.style.opacity    = 0;

    setTimeout(function(){
      requestAnimationFrame(function(){
        elemArticle.innerHTML             = documentNextPage.querySelector('.case-detailed__article').innerHTML;
        elemActiveStiker.style.transition = '';
        elemArticle.style.transition      = '';
        elemArticle.style.transform       = 'translateX(999px)';

        elemActiveStiker.innerHTML       = documentNextPage.querySelector('.case-detailed__stiker').innerHTML;
        elemActiveStiker.style.opacity   = '';
        elemActiveStiker.style.transform = '';

        elemNextStiker.innerHTML        = documentNextPage.querySelector('.case-detailed__next').innerHTML;
        elemNextStiker.style.transition = '';
        elemNextStiker.style.opacity    = 0;
        elemNextStiker.style.top        = '';
        elemNextStiker.style.left       = '';
        elemNextStiker.style.transform  = 'translateX(999px) translateY(-50%)';

        history.pushState('', '', linkNextPage.href);
        document.title = documentNextPage.title;
        document.querySelector('.header__page-title').innerHTML = documentNextPage.querySelector('.header__page-title').innerHTML;
        window.scrollTo(0, 0);

        requestAnimationFrame(function() {
          elemArticle.style.transition = 'all 1500ms ease';
          elemArticle.style.opacity    = 1;
          elemArticle.style.transform  = '';

          elemNextStiker.style.transition = 'all 1500ms ease 500ms';
          elemNextStiker.style.opacity    = 1;
          elemNextStiker.style.transform  = '';


          (function(){
            documentNextPage = undefined;

            for (var i = readyjs.length - 1; i >= 0; i--) {
              readyjs[i]();
            }
          })();
        });
      });
    }, 2000);
  });
}
