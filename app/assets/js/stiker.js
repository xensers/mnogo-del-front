document.addEventListener("DOMContentLoaded", function () {

  var elemStikers = document.querySelectorAll('.stiker');

  for (var i = elemStikers.length - 1; i >= 0; i--) {
    initStiker(elemStikers[i]);
  }


  function initStiker(elemStiker){

    var elemLayers = elemStiker.querySelectorAll('.stiker__layer');

    var activeLayerNumber = elemLayers.length - 1;
    var deg = 5;
    for (var i = elemLayers.length - 1; i >= 0; i--) {
      activeLayerNumber = i;
      if (elemLayers.length > 1) initLayer(true);
      elemLayers[i].style.zIndex = i;

      deg = (Math.random() * 10) - 5
      elemLayers[i].style.transform = 'rotate('+ deg +'deg)';

      elemLayers[i].children[0].children[0].children[0].children[0].innerText = i + 1;
    }

    activeLayerNumber = elemLayers.length - 1;

    if (activeLayerNumber > 1) initLayer();

    function initLayer(noEvents)
    {
      var ready = true;

      var elemLayer = elemLayers[activeLayerNumber];
      var elemArena = elemStiker.querySelector('.stiker__arena');
      var elemInner = elemLayer.querySelector('.stiker__inner');
      var elemOuter = elemInner.querySelector('.stiker__outer');
      var elemBack  = elemOuter.querySelector('.stiker__back');
      var elemItem  = elemOuter.querySelector('.stiker__item');

      if (activeLayerNumber % 2) {
        var layerDraw = layerDrawToLeft;
      } else {
        var layerDraw = layerDrawToRight;
      }

      animate({
        timing: linear,
        duration: 2000,
        delay: 1000,
        draw: layerDraw,
        to: 10,
      });


      if (!noEvents) {
        elemArena.addEventListener('mousedown', onStikerLayerDown);
        elemArena.addEventListener('mouseup', onStikerLayerUp);
      }


      function onStikerLayerMove(event)
      {
          progress = -(event.offsetY / this.offsetHeight - 1);
          if (progress > .1 && progress < 1) {
            requestAnimationFrame(function(){
              layerDraw(progress + 0.05);
            })
          }
          return false;
      }

      function onStikerLayerDown(event)
      {
          this.style.height = '200%';
          this.style.width = '200%';
          this.style.zIndex = '999';
          this.addEventListener('mousemove', onStikerLayerMove);
          return false;
      }

      function onStikerLayerUp(event)
      {
        this.style.height = '100%';
        this.style.width = '100%';
        this.style.zIndex = '99';
        this.removeEventListener('mousemove', onStikerLayerMove);

        if (progress > 0.4) {
          animate({
            timing: linear,
            delay: 0,
            duration: 700,
            draw: layerDraw,
            from: progress * 100,
            to: 100,
            after: function(){
              animate({
                timing: linear,
                delay: 0,
                duration: 500,
                draw: layerDraw,
                from: 100,
                to: 10,
              });
              nextLayer();
            }
          });

        } else {
          animate({
            timing: linear,
            delay: 0,
            duration: 700,
            draw: layerDraw,
            from: progress * 100,
            to: 10,
          });
        }
      }

      function nextLayer()
      {
        elemArena.removeEventListener('mousedown', onStikerLayerDown);
        elemArena.removeEventListener('mouseup', onStikerLayerUp);
        elemArena.removeEventListener('mousemove', onStikerLayerMove);

        var lastIndex, newIndex;
        for (var i = elemLayers.length - 1; i >= 0; i--) {
          lastIndex = +elemLayers[i].style.zIndex;
          newIndex = lastIndex + 1;
          if (newIndex > elemLayers.length - 1) newIndex = 0;
          elemLayers[i].style.zIndex = newIndex;
        }

        activeLayerNumber = activeLayerNumber - 1;
        if (activeLayerNumber < 0) activeLayerNumber = elemLayers.length - 1;

        initLayer();
      }

      function layerDrawToRight(progress)
      {
        // if (ready) {
        //   ready = false;
          // setTimeout(function(){
            var layerTranslateY = -24 * progress;
            var outerTranslateY = 24 * progress;
            var backTransleteY  = -(17 - progress * 34);
            var backTransleteX  = (17 - progress * 34);
            var backScale  = (100 - 30 * zone(progress, 0.7, 1)) / 100;

            elemArena.style.right = '';
            elemInner.style.transform = 'rotate(45deg) translateY(' + layerTranslateY + 'em)';
            elemOuter.style.transform = 'translateY(' + outerTranslateY + 'em)';
            elemBack.style.transform = 'rotate(-45deg) translate(' + backTransleteY + 'em, '+ backTransleteX +'em) scale('+ backScale +')';
            elemItem.style.transform = 'rotate(-45deg)';

            ready = true;
          // }, 30);
        // }
      }

      function layerDrawToLeft(progress)
      {
        var layerTranslateY = -24 * progress;
        var outerTranslateY = 24 * progress;
        var backTransleteY  = (17 - progress * 34);
        var backTransleteX  = (17 - progress * 34);
        var backScale  = (100 - 30 * zone(progress, 0.7, 1)) / 100;

        elemArena.style.right = 0;
        elemInner.style.transform = 'rotate(-45deg) translateY(' + layerTranslateY + 'em)';
        elemOuter.style.transform = 'translateY(' + outerTranslateY + 'em)';
        elemBack.style.transform = 'rotate(45deg) translate(' + backTransleteY + 'em, '+ backTransleteX +'em) scale('+ backScale +')';
        elemItem.style.transform = 'rotate(45deg)';
      }
    }
  }

});
