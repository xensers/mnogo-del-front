document.addEventListener('DOMContentLoaded', loaded);

function loaded()
{
  var elemStikers = document.querySelectorAll('.stiker');
  if (elemStikers) {
      initStikersForAll(elemStikers);
  }


  var matrix = stikersGrid(3, 1, false);

}

function initStikersForAll(elemStikers)
{
  for (var i = elemStikers.length - 1; i >= 0; i--) {
    var deg = 5;
    for (var i = elemStikers.length - 1; i >= 0; i--) {

      deg = (Math.random() * 10) - 5;
      elemStikers[i].querySelector('.stiker__wrap').style.transform = 'rotate('+ deg +'deg)';
    }
  }
}

function compareRandom(a, b)
{
  return Math.random() - 0.5;
}


function stikersGrid(cols, rows, random)
{
  var elemGroup = document.querySelector('.stikers-group');
  var elemStikers = elemGroup.querySelectorAll('.stiker');
  var elemStikers = Array.prototype.slice.call(elemStikers); // преобразует NodeList в Array
  if (random) {
    elemStikers.sort(compareRandom);
  }

  elemGroup.style.height = (elemStikers[0].offsetHeight * 1.1) * rows + 'px';
  elemGroup.style.width = (elemStikers[0].offsetWidth * 1.1) * cols + 'px';


  var i = 0, row = 0, col = 0, matrix = new Array(), index;
  for (var i = 0; i <= elemStikers.length - 1; i++) {
    var elemStiker = elemStikers[i];

    if (!matrix[row]) {
      matrix[row] = new Array();
    }

    if (!matrix[row][col]) {
      matrix[row][col] = new Array();
    }

    index = matrix[row][col].push(elemStiker) - 1;

    (function(i, col, row, index, matrix) {
      setTimeout(function() {
        var x = (16 + 2) * col;
        var y = (16 + 2) * row;
        var deg = (Math.random() * 10) - 5;
        matrix[row][col][index].style.transform = 'translate('+ x +'em, '+ y +'em)';
        elemStikers[i].querySelector('.stiker__wrap').style.transform = 'rotate('+ deg +'deg)';
      }, 100 * i)
    })(i, col, row, index, matrix);


    col++;
    if (col >= cols) {
      col = 0;
      row++;
      if (row >= rows) {
        row = 0;
      }
    }
  }


  for (var row = matrix.length - 1; row >= 0; row--) {
    for (var col = matrix[row].length - 1; col >= 0; col--) {
      initStikers(matrix[row][col]);
    }
  }

  return matrix;

}

function initStikers(elemStikers){


  for (var i = elemStikers.length - 1; i >= 0; i--) {
    var elemStiker = elemStikers[i];

    elemStiker.style.zIndex = i;
  }

  activeLayerNumber = elemStikers.length - 1;
  if (activeLayerNumber > 1) initStiker(activeLayerNumber, true);

  function initStiker(activeLayerNumber, firstInit)
  {
    var timeLast = 0;
    var progress;

    var elemStiker = elemStikers[activeLayerNumber];
    var elemInner  = elemStiker.querySelector('.stiker__inner');
    var elemArena  = elemStiker.querySelector('.stiker__arena');
    var elemOuter  = elemStiker.querySelector('.stiker__outer');
    var elemBack   = elemStiker.querySelector('.stiker__back');
    var elemItem   = elemStiker.querySelector('.stiker__item');

    elemStiker.classList.add('active');
    var stikerZIndex = +elemStiker.style.zIndex;

    console.log('initStiker', 'stikerZIndex = ' + stikerZIndex, 'activeLayerNumber = ' + activeLayerNumber);

    console.log(elemStiker);
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

    function nextLayer()
    {
      elemStiker.style.zIndex = stikerZIndex;
      elemStiker.classList.remove('active');
      elemArena.removeEventListener("mouseover", onMouseOver);
      elemArena.removeEventListener("mouseout", onMouseoOut);
      elemArena.removeEventListener('mousedown', onMouseDown);
      elemArena.removeEventListener('mouseup', onMouseUp);
      elemArena.removeEventListener('mousemove', onMouseMove);

      console.log('nextLayer', 'stikerZIndex = ' + stikerZIndex, 'activeLayerNumber = ' + activeLayerNumber);
      activeLayerNumber = activeLayerNumber - 1;
      if (activeLayerNumber < 0) activeLayerNumber = elemStikers.length - 1;

      var lastIndex, newIndex;
      for (var i = elemStikers.length - 1; i >= 0; i--) {
        lastIndex = +elemStikers[i].style.zIndex;
        newIndex = lastIndex + 1;
        if (newIndex > elemStikers.length - 1) newIndex = 0;
        elemStikers[i].style.zIndex = newIndex;
      }


      initStiker(activeLayerNumber);
    }

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
        this.addEventListener('mousemove', onMouseMove);
        elemStiker.style.zIndex = '999';
        return false;
    }

    function onMouseUp(event)
    {
      this.style.height = '35%';
      this.style.width = '35%';
      this.style.zIndex = '10';
      this.removeEventListener('mousemove', onMouseMove);
      elemStiker.style.zIndex = stikerZIndex;

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
