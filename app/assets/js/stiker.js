document.addEventListener("DOMContentLoaded", function () {

  var stikerItem = 0;

  var elemStikers = document.querySelectorAll('.stiker');

  for (var i = elemStikers.length - 1; i >= 0; i--) {
    initStiker(elemStikers[i]);
  }


  function initStiker(elemStiker){

    var layerItem = 2;

    var elemLayers = elemStiker.querySelectorAll('.stiker__layer');
    for (var i = elemLayers.length - 1; i >= 0; i--) {
      elemLayers[i].children[0].children[0].innerText = i;
    }

    initLayer();

    function initLayer()
    {
      var elemLayer = elemStiker.querySelectorAll('.stiker__layer')[layerItem];
      var elemInner = elemStiker.querySelector('.stiker__inner');
      var elemOuter = elemLayer.querySelector('.stiker__outer');
      var elemBack = elemOuter.querySelector('.stiker__back');
      var elemBody = elemOuter.querySelector('.stiker__body');

      animate({
        timing: linear,
        duration: 2000,
        delay: 1000,
        draw: stikerAnimationDraw,
        to: 10
      });

      elemInner.addEventListener('mousedown', onStikerLayerDown);
      elemInner.addEventListener('mouseup', onStikerLayerUp);


      function onStikerLayerMove(event)
      {
          progress = event.offsetX / this.offsetWidth;
          if (progress > .1 && progress < 1) {
            stikerAnimationDraw(progress);
          }
          return false;
      }

      function onStikerLayerDown(event)
      {
          this.style.height = '200%';
          this.style.width = '200%';
          this.addEventListener('mousemove', onStikerLayerMove);
          return false;
      }

      function onStikerLayerUp(event)
      {
        this.style.height = '100%';
        this.style.width = '100%';
        this.removeEventListener('mousemove', onStikerLayerMove);

        if (progress > 0.4) {
          animate({
            timing: linear,
            delay: 0,
            duration: 500,
            draw: stikerAnimationDraw,
            from: progress * 100,
            to: 100,
            after: function(){
              nextLayer();
            }
          });

        } else {
          animate({
            timing: linear,
            delay: 0,
            duration: 500,
            draw: stikerAnimationDraw,
            from: progress * 100,
            to: 15,
          });
        }
      }

      function nextLayer()
      {
        elemInner.removeEventListener('mousedown', onStikerLayerDown);
        elemInner.removeEventListener('mouseup', onStikerLayerUp);
        elemInner.removeEventListener('mousemove', onStikerLayerMove);

        layerItem = layerItem - 1;
        if (layerItem < 0) layerItem = elemLayers.length - 1;
        console.log(layerItem);

        initLayer();
      }

      function stikerAnimationDraw(progress)
      {
        elemLayer.style.transform = 'rotate(45deg) translateY(' + -24 * progress + 'em)';
        elemOuter.style.transform = 'translateY(' + 24 * progress + 'em)';
        elemBack.style.transform = 'rotate(-45deg) translate(' + (-17 + progress * 34) + 'em, '+ (17 - progress * 34) +'em)';
        elemBody.style.transform = 'rotate(-45deg)';

        elemLayer.style.opacity = -(progress - 1);
      }
    }
  }

});
