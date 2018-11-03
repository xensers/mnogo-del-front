document.addEventListener('DOMContentLoaded', loaded);

function loaded()
{
  var elemStikers = document.querySelectorAll('.stiker');
  if (elemStikers) {
      initStikersForAll(elemStikers);
  }
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

function stikersGrid(cols, rows, showTitle, random)
{

  var elemGroup = document.querySelector('.stikers-group');

  var elemStikers = elemGroup.querySelectorAll('.stiker');
  var elemStikers = Array.prototype.slice.call(elemStikers); // преобразует NodeList в Array
  if (random) {
    elemStikers.sort(compareRandom);
  }

  if (!rows) {
    rows = Math.ceil(elemStikers.length / cols);
  }

  console.log(rows);

  if (showTitle) {
    var xFactor = 1.15;
    var yFactor = 1.55;
  } else {
    var xFactor = 1.15;
    var yFactor = 1.15;
  }

  var stikerGroupOnResize = function (xFactor, yFactor, cols, rows) {
    requestAnimationFrame(function () {
      elemGroup.style.width = (elemGroup.querySelector('.stiker').offsetWidth * xFactor) * cols + 'px';
      elemGroup.style.height = (elemGroup.querySelector('.stiker').offsetHeight * yFactor) * rows + 'px';
    });
  };

  stikerGroupOnResize(xFactor, yFactor, cols, rows);
  window.addEventListener('optimizedResize', function () {
    stikerGroupOnResize(xFactor, yFactor, cols, rows);
  });


  setTimeout(function() {
    var i = 0, row = 0, col = 0, matrix = new Array(), index;
    for (var i = 0; i <= elemStikers.length - 1; i++) {
      var elemStiker = elemStikers[i];
      var elemArena  = elemStiker.querySelector('.stiker__arena');

      elemStiker.classList.remove('active');
      elemArena.onmouseover = undefined;
      elemArena.onmouseout  = undefined;
      elemArena.onmousedown = undefined;
      elemArena.onmouseup   = undefined;
      elemArena.onmousemove = undefined;
      elemStiker.onmouseover = undefined;
      elemStiker.onmouseout = undefined;

      if (!matrix[row]) {
        matrix[row] = new Array();
      }

      if (!matrix[row][col]) {
        matrix[row][col] = new Array();
      }

      index = matrix[row][col].push(elemStiker) - 1;

      (function(i, col, row, index, matrix, showTitle) {
        var elemStiker = matrix[row][col][index];
        var elemTitle   = elemStiker.querySelector('.stiker__title');
        var elemWrap   = elemStiker.querySelector('.stiker__wrap');

        if (showTitle) {
          var xFactor = 2.5;
          var yFactor = 9;
        } else {
          var xFactor = 2.5;
          var yFactor = 2.5;
          requestAnimationFrame(function () {
            elemTitle.style.display = 'none';
          });
        }

        requestAnimationFrame(function () {
          var deg = (Math.random() * 10) - 5;
          elemWrap.style.transform   = 'rotate('+ deg +'deg)';
        });

        setTimeout(function() {
            requestAnimationFrame(function(){
              var x = (16 + xFactor) * col;
              var y = (16 + yFactor) * row;

              elemStiker.style.transform = 'translate('+ x +'em, '+ y +'em)';
              if (showTitle) {
                elemTitle.style.display = 'block';
              }
            });
        }, 100 * i)
      })(i, col, row, index, matrix, showTitle);


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
  }, 300);

}

function initStikers(elemStikers){


  for (var i = elemStikers.length - 1; i >= 0; i--) {
    var elemStiker = elemStikers[i];
    elemStiker.classList.remove('active');
    elemStiker.style.zIndex = i;
  }

  activeLayerNumber = elemStikers.length - 1;
  if (elemStikers.length > 1) {
    initStiker(activeLayerNumber, false, true);
  } else {
    initStiker(activeLayerNumber, true, true);
  }



  function initStiker(activeLayerNumber, single, firstInit)
  {
    var timeLast = 0;
    var progress;

    var elemStiker = elemStikers[activeLayerNumber];
    var elemWrap   = elemStiker.querySelector('.stiker__wrap');
    var elemInner  = elemStiker.querySelector('.stiker__inner');
    var elemArena  = elemStiker.querySelector('.stiker__arena');
    var elemOuter  = elemStiker.querySelector('.stiker__outer');
    var elemBack   = elemStiker.querySelector('.stiker__back');
    var elemItem   = elemStiker.querySelector('.stiker__item');

    elemStiker.classList.add('active');
    var stikerZIndex = +elemStiker.style.zIndex;

    // console.log(elemStikers);
    if (activeLayerNumber % 2) {
      var layerDraw = layerDrawToLeft;
      requestAnimationFrame(function () {
        elemArena.style.left = 'auto';
        elemArena.style.right = '0';
      });
    } else {
      var layerDraw = layerDrawToRight;
      requestAnimationFrame(function () {
        elemArena.style.left = '0';
        elemArena.style.right = 'auto';
      });
    }

    if (single) {
      layerDraw(0);
    } else {
      if (firstInit) {
        layerDraw(0.1);
      } else {
        animate({
          timing: linear,
          duration: 3000,
          draw: layerDraw,
          from: 1,
          to: 10,
        });
      }

      var move = function(event)
      {
          elemArena.onmouseover = undefined;
          elemArena.onmouseout = undefined;

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

      elemStiker.onmouseover = function(){
        elemStiker.style.zIndex = '99';
      };
      elemStiker.onmouseout  = function(){
        elemStiker.style.zIndex = stikerZIndex;
      };

      elemArena.onmouseover = function(event) {
        elemStiker.style.zIndex = '999';
        animate({
          timing: linear,
          duration: 3000,
          draw: layerDraw,
          from: 10,
          to: 13,
        });
      }

      elemArena.onmouseout = function(event) {
        elemStiker.style.zIndex = stikerZIndex;
        animate({
          timing: linear,
          duration: 3000,
          draw: layerDraw,
          from: 13,
          to: 10,
        });
      }

      elemArena.onmousedown = function(event)
      {
          elemStiker.style.zIndex = '900';
          requestAnimationFrame(function(){
            elemWrap.style.overflow = 'visible';
            elemArena.style.height = '200%';
            elemArena.style.width = '200%';
            elemArena.onmousemove = move;
          });
          return false;
      }

      elemArena.onmouseup = function(event)
      {
        elemStiker.style.zIndex = stikerZIndex;
        requestAnimationFrame(function () {
          elemArena.style.height = '35%';
          elemArena.style.width = '35%';
          elemArena.onmousemove = undefined;
        });

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
                after: function(){
                  elemWrap.style.overflow = 'hidden';
                }
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
            after: function(){
              elemWrap.style.overflow = 'hidden';
            }
          });
        }
      }

    }

    function nextLayer()
    {
      elemStiker.style.zIndex = stikerZIndex;
      elemStiker.classList.remove('active');
      elemArena.onmouseover = undefined;
      elemArena.onmouseout  = undefined;
      elemArena.onmousedown = undefined;
      elemArena.onmouseup   = undefined;
      elemArena.onmousemove = undefined;
      elemStiker.onmouseover = undefined;
      elemStiker.onmouseout = undefined;

      var lastIndex, newIndex;
      for (var i = elemStikers.length - 1; i >= 0; i--) {
        lastIndex = +elemStikers[i].style.zIndex;
        newIndex = lastIndex + 1;

        if (newIndex > elemStikers.length - 1) {
          newIndex = 0;
        }

        elemStikers[i].style.zIndex = newIndex;

        if (newIndex >= elemStikers.length - 1) {
          initStiker(i);
        }
      }
    }

    function layerDrawToRight(progress)
    {
      var innerTranslateY = -24 * progress - 4 * progress;
      var outerTranslateY = 24 * progress;
      var backTransleteY  = -(17 - progress * 34);
      var backTransleteX  = (17 - progress * 34);
      var backScale  = (100 - 30 * zone(progress, 0.7, 1)) / 100;

      elemInner.style.transform = 'rotate(45deg) translateY(' + innerTranslateY + 'em)';
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
      var innerTranslateY = -24 * progress - 4 * progress;
      var outerTranslateY = 24 * progress;
      var backTransleteY  = (17 - progress * 34);
      var backTransleteX  = (17 - progress * 34);
      var backScale  = (100 - 30 * zone(progress, 0.7, 1)) / 100;

      elemInner.style.transform = 'rotate(-45deg) translateY(' + innerTranslateY + 'em)';
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
