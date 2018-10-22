var elemStikers = document.querySelectorAll('.stiker');

for (var i = elemStikers.length - 1; i >= 0; i--) {
  initStiker(elemStikers[i]);
}



function initStiker(elemStikerGroup){

  var elemLayers = elemStikerGroup.querySelectorAll('.stiker__layer');

  var deg = 5;
  for (var i = elemLayers.length - 1; i >= 0; i--) {
    elemLayers[i].style.zIndex = i;
    // deg = (Math.random() * 10) - 5;
    // elemLayers[i].style.transform = 'rotate('+ deg +'deg)';
  }


  activeLayerNumber = elemLayers.length - 1;
  if (activeLayerNumber > 1) initLayer(true);

  function initLayer(firstInit)
  {
    var timeLast = 0;
    var progress;

    var elemLayer = elemLayers[activeLayerNumber];
    var elemInner = elemLayer.querySelector('.stiker__inner');
    var elemArena = elemLayer.querySelector('.stiker__arena');
    var elemOuter = elemInner.querySelector('.stiker__outer');
    var elemBack  = elemOuter.querySelector('.stiker__back');
    var elemItem  = elemOuter.querySelector('.stiker__item');

    if (activeLayerNumber % 2) {
      var layerDraw = layerDrawToLeft;
      elemArena.style.left = 'auto';
      elemArena.style.right = '0';
    } else {
      var layerDraw = layerDrawToRight;
      elemArena.style.left = '0';
      elemArena.style.right = 'auto';
    }

    if (firstInit) {
      layerDraw(0.1);
    }
    else
    {
      animate({
        timing: linear,
        duration: 3000,
        draw: layerDraw,
        from: 1,
        to: 10,
      });
    }

    elemArena.addEventListener("mouseover", onMouseOver, false);
    elemArena.addEventListener("mouseout", onMouseoOut, false);
    elemArena.addEventListener('mousedown', onMouseDown, false);
    elemArena.addEventListener('mouseup', onMouseUp, false);

    function onMouseOver(event) {
      animate({
        timing: linear,
        duration: 3000,
        draw: layerDraw,
        from: 10,
        to: 13,
      });
    }

    function onMouseoOut(event) {
      animate({
        timing: linear,
        duration: 3000,
        draw: layerDraw,
        from: 13,
        to: 10,
      });
    }

    function onMouseMove(event)
    {
        elemArena.removeEventListener("mouseover", onMouseOver);
        elemArena.removeEventListener("mouseout", onMouseoOut);

        progress = -(event.offsetY / this.offsetHeight - 1) + 0.05;
        if (progress > .1 && progress < 1) {
          requestAnimationFrame(function(time){
            layerDraw(progress);

            if (showFrameRate) {
              console.log(frameRate(timeLast, time), Math.round(progress * 100));
              timeLast = time;
            }
          })
        }
        return false;
    }

    function onMouseDown(event)
    {
        this.style.height = '200%';
        this.style.width = '200%';
        this.style.zIndex = '900';
        this.addEventListener('mousemove', onMouseMove);
        return false;
    }

    function onMouseUp(event)
    {
      this.style.height = '35%';
      this.style.width = '35%';
      this.style.zIndex = '10';
      this.removeEventListener('mousemove', onMouseMove);

      if (progress > 0.4) {
        animate({
          timing: linear,
          duration: 700,
          draw: layerDraw,
          from: progress * 100,
          to: 100,
          after: function(){
            nextLayer();
            animate({
              timing: linear,
              duration: 700,
              draw: layerDraw,
              from: 100,
              to: 1,
            });
          }
        });

      } else {
        animate({
          timing: linear,
          duration: 1000,
          draw: layerDraw,
          from: progress * 100,
          to: 10,
        });
      }
    }


    function nextLayer()
    {

      elemArena.removeEventListener("mouseover", onMouseOver);
      elemArena.removeEventListener("mouseout", onMouseoOut);
      elemArena.removeEventListener('mousedown', onMouseDown);
      elemArena.removeEventListener('mouseup', onMouseUp);
      elemArena.removeEventListener('mousemove', onMouseMove);

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
      var layerTranslateY = -24 * progress;
      var outerTranslateY = 24 * progress;
      var backTransleteY  = -(17 - progress * 34);
      var backTransleteX  = (17 - progress * 34);
      var backScale  = (100 - 30 * zone(progress, 0.7, 1)) / 100;

      elemInner.style.transform = 'rotate(45deg) translateY(' + layerTranslateY + 'em)';
      elemOuter.style.transform = 'translateY(' + outerTranslateY + 'em)';
      elemBack.style.transform = 'rotate(-45deg) translate(' + backTransleteY + 'em, '+ backTransleteX +'em) scale('+ backScale +')';
      elemItem.style.transform = 'rotate(-45deg)';
      if (progress <= 0.5) {
        elemItem.style.opacity = '1';
      } else {
        elemItem.style.opacity = '0';
      }
    }

    function layerDrawToLeft(progress)
    {
      var layerTranslateY = -24 * progress;
      var outerTranslateY = 24 * progress;
      var backTransleteY  = (17 - progress * 34);
      var backTransleteX  = (17 - progress * 34);
      var backScale  = (100 - 30 * zone(progress, 0.7, 1)) / 100;

      elemInner.style.transform = 'rotate(-45deg) translateY(' + layerTranslateY + 'em)';
      elemOuter.style.transform = 'translateY(' + outerTranslateY + 'em)';
      elemBack.style.transform = 'rotate(45deg) translate(' + backTransleteY + 'em, '+ backTransleteX +'em) scale('+ backScale +')';
      elemItem.style.transform = 'rotate(45deg)';
      if (progress <= 0.5) {
        elemItem.style.opacity = '1';
      } else {
        elemItem.style.opacity = '0';
      }
    }
  }
}
