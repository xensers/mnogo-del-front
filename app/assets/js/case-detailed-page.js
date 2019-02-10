var elemSideRight;
var elemSideLeft;
var elemActiveStiker;
var elemNextStiker;
var elemPrevStiker;
var elemArticle;
var linkNextPage;
var documentNextPage;
var documentPrevPage;
var timerClearStyle;

function loadCaseDetailedPage() {
  elemSideRight    = document.querySelector('.layout__side_right');
  elemSideLeft     = document.querySelector('.layout__side_left');
  elemActiveStiker = document.querySelector('.case-detailed__stiker');
  elemNextStiker   = document.querySelector('.case-detailed__next');
  elemPrevStiker   = document.querySelector('.case-detailed__prev');
  elemArticle      = document.querySelector('.case-detailed__article');
  linkNextPage     = document.querySelector('.case-detailed__next a');
  linkPrevPage     = document.querySelector('.case-detailed__prev a');

  getDocument(linkNextPage.href, function(doc) {
    documentNextPage = doc;
    elemSideRight.onclick = nextPage;
    document.documentElement.classList.add('next-doc-ready');
  });

  getDocument(linkPrevPage.href, function(doc) {
    documentPrevPage = doc;
    elemSideLeft.onclick = prevPage;
  });

  elemSideRight.onmouseover = function() {
    elemNextStiker.querySelector('.stiker').style.transform = 'translateX(-5rem)';
  }

  elemSideRight.onmouseout = function() {
    elemNextStiker.querySelector('.stiker').style.transform = '';
  }

  elemSideLeft.onmouseover = function() {
    elemPrevStiker.querySelector('.stiker').style.transform = 'translateX(5rem)';
  }

  elemSideLeft.onmouseout = function() {
    elemPrevStiker.querySelector('.stiker').style.transform = '';
  }

}

function nextPage(event)
{
  clearTimeout(timerClearStyle);
  elemSideRight.onclick = undefined;

  var coordsActiveStiker = elemActiveStiker.getBoundingClientRect();
  var coordsNextStiker   = elemNextStiker.getBoundingClientRect();
  var coordsPrevStiker   = elemPrevStiker.getBoundingClientRect();

  elemNextStiker.style.transform  = 'translateX('+ coordsNextStiker.x +'px) translateY('+ coordsNextStiker.y +'px)';
  elemNextStiker.style.top        = 0;
  elemNextStiker.style.left       = 0;

  elemActiveStiker.style.transform  = 'translateX('+ coordsActiveStiker.x +'px) translateY('+ coordsActiveStiker.y +'px)';
  elemActiveStiker.style.top        = 0;
  elemActiveStiker.style.left       = 0;

  history.pushState('', '', linkNextPage.href);
  addEventListener("popstate", prevPage);

  requestAnimationFrame(function(){

    elemActiveStiker.style.transition = 'all 1000ms ease';
    elemActiveStiker.style.transform  = 'translateX('+ coordsPrevStiker.x +'px) translateY('+ coordsPrevStiker.y +'px)';

    elemPrevStiker.style.transition = 'all 2000ms ease';
    elemPrevStiker.style.transform  = 'translateX(-50rem) translateY(-50%)';
    elemPrevStiker.style.opacity    = 0;

    elemNextStiker.style.transition = 'all 1500ms ease 500ms';
    elemNextStiker.style.transform  = 'translateX('+ coordsActiveStiker.x +'px) translateY('+ coordsActiveStiker.y +'px)';

    elemArticle.style.transition = 'all 2000ms ease 200ms, opacity 1000ms';
    elemArticle.style.transform  = 'translateX(-50rem)';
    elemArticle.style.opacity    = 0;

    setTimeout(function(){
      requestAnimationFrame(function() {
        elemNextStiker.querySelector('.stiker').style.transform = '';

        elemPrevStiker.querySelector('.stiker').innerHTML = elemActiveStiker.querySelector('.stiker').innerHTML;
        elemPrevStiker.style.opacity   = '';
        elemPrevStiker.style.transform = '';
        elemPrevStiker.style.transition = '';

        elemActiveStiker.style.transform  = 'translateX('+ coordsActiveStiker.x +'px) translateY('+ coordsActiveStiker.y +'px)';
        elemActiveStiker.style.transition = '';
        elemActiveStiker.style.opacity    = 0;

        elemArticle.innerHTML             = documentNextPage.querySelector('.case-detailed__article').innerHTML;
        elemArticle.style.transition      = '';
        elemArticle.style.transform       = 'translateX(50rem)';
        window.scrollTo(0, 0);
        requestAnimationFrame(function() {
          elemArticle.style.transition = 'all 1500ms ease';
          elemArticle.style.opacity    = 1;
          elemArticle.style.transform  = '';
        });
      });
    }, 1000);

    setTimeout(function(){
      requestAnimationFrame(function(){
        elemActiveStiker.querySelector('.stiker').innerHTML = elemNextStiker.querySelector('.stiker').innerHTML;
        elemActiveStiker.style.opacity   = '';

        elemNextStiker.innerHTML        = documentNextPage.querySelector('.case-detailed__next').innerHTML;
        elemNextStiker.style.transition = '';
        elemNextStiker.style.opacity    = 0;
        elemNextStiker.style.top        = '';
        elemNextStiker.style.left       = '';
        elemNextStiker.style.transform  = 'translateX(50rem) translateY(-50%)';

        document.title = documentNextPage.title;
        document.querySelector('.header__page-title').innerHTML = documentNextPage.querySelector('.header__page-title').innerHTML;

        requestAnimationFrame(function() {

          elemNextStiker.style.transition = 'all 1500ms ease 500ms';
          elemNextStiker.style.opacity    = 1;
          elemNextStiker.style.transform  = '';

           timerClearStyle = setTimeout(function(){
             requestAnimationFrame(function(){
               elemSideRight.removeAttribute('style');
               elemActiveStiker.removeAttribute('style');
               elemNextStiker.removeAttribute('style');
               elemPrevStiker.removeAttribute('style');
               elemArticle.removeAttribute('style');
             });
           }, 2000);

          document.documentElement.classList.remove('next-doc-ready');
          document.documentElement.classList.remove('prev-doc-ready');
          documentNextPage = undefined;
          documentPrevPage = undefined;

          for (var i = readyjs.length - 1; i >= 0; i--) {
            readyjs[i]();
          }

        });
      });
    }, 2000);
  });
}


function prevPage() {
  alert('Скоро можно будет и назад листать! Вот прям щас работаем над этим. Пожалуйста не бейте программиста очень больно. Он очень старается научится все делать вовремя. Четсное слово! =)');
}
