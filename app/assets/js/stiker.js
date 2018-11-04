var stikerGroupOnResize;
var timerFromStikersGrid;


document.addEventListener('DOMContentLoaded', onLoadedStikers);


function onLoadedStikers() {
    var elemStikers = document.querySelectorAll('.stiker');

    if (elemStikers) {
        for (var i = elemStikers.length - 1; i >= 0; i--) {
            var deg = 5;
            for (var i = elemStikers.length - 1; i >= 0; i--) {

                deg = (Math.random() * 10) - 5;
                elemStikers[i].querySelector('.stiker__wrap').style.transform = 'rotate(' + deg + 'deg)';
            }
        }
    }
}

function stikersGrid(cols, rows, showTitle, random) {
    clearTimeout(timerFromStikersGrid);

    timerFromStikersGrid = setTimeout(function () {
        var elemGroup = document.querySelector('.stikers-group');
        var elemStikers = elemGroup.querySelectorAll('.stiker');
        var elemStikers = Array.prototype.slice.call(elemStikers); // преобразует NodeList в Array

        if (random) {
            elemStikers.sort(compareRandom);
        }

        if (!rows) {
            rows = Math.ceil(elemStikers.length / cols);
        }

        if (showTitle) {
            var xFactor = 1.15;
            var yFactor = 1.55;
        } else {
            var xFactor = 1.15;
            var yFactor = 1.15;
        }

        window.removeEventListener('optimizedResize', stikerGroupOnResize);

        stikerGroupOnResize = function() {
            requestAnimationFrame(function() {
                elemGroup.style.width = (elemGroup.querySelector('.stiker').offsetWidth * xFactor) * cols + 'px';
                elemGroup.style.height = (elemGroup.querySelector('.stiker').offsetHeight * yFactor) * rows + 'px';
            });
        };

        window.addEventListener('optimizedResize', stikerGroupOnResize);

        stikerGroupOnResize(xFactor, yFactor, cols, rows);

        setTimeout(function() {
            var i = 0,
                row = 0,
                col = 0,
                matrix = new Array(),
                index;
            for (var i = 0; i <= elemStikers.length - 1; i++) {
                var elemStiker = elemStikers[i];
                var elemArena = elemStiker.querySelector('.stiker__arena');

                resetStiker(elemStiker);

                if (!matrix[row]) {
                    matrix[row] = new Array();
                }

                if (!matrix[row][col]) {
                    matrix[row][col] = new Array();
                }

                index = matrix[row][col].push(elemStiker) - 1;

                (function(i, col, row, index, matrix, showTitle) {
                    var elemStiker = matrix[row][col][index];
                    var elemTitle = elemStiker.querySelector('.stiker__title');
                    var elemWrap = elemStiker.querySelector('.stiker__wrap');

                    if (showTitle) {
                        var xFactor = 2.5;
                        var yFactor = 9;
                    } else {
                        var xFactor = 2.5;
                        var yFactor = 2.5;
                        requestAnimationFrame(function() {
                            elemTitle.style.display = 'none';
                        });
                    }

                    requestAnimationFrame(function() {
                        var deg = (Math.random() * 10) - 5;
                        elemWrap.style.transform = 'rotate(' + deg + 'deg)';
                    });

                    setTimeout(function() {
                        requestAnimationFrame(function() {
                            var x = (16 + xFactor) * col;
                            var y = (16 + yFactor) * row;

                            elemStiker.style.transform = 'translate(' + x + 'em, ' + y + 'em)';
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
    }, 100);

}

function initStikers(elemStikers) {
    for (var i = elemStikers.length - 1; i >= 0; i--) {
        var elemStiker = elemStikers[i];
        elemStiker.classList.remove('active');
        elemStiker.style.zIndex = i;
    }

    currentItemNumber = elemStikers.length - 1;
    if (elemStikers.length > 1) {
        initStiker(elemStikers, currentItemNumber, false, true);
    } else {
        initStiker(elemStikers, currentItemNumber, true, true);
    }
}

function initStiker(elemStikers, currentItemNumber, single, firstInit) {
    var progress;
    var elemStiker = elemStikers[currentItemNumber];
    var elemWrap = elemStiker.querySelector('.stiker__wrap');
    var elemInner = elemStiker.querySelector('.stiker__inner');
    var elemArena = elemStiker.querySelector('.stiker__arena');
    var elemOuter = elemStiker.querySelector('.stiker__outer');
    var elemBack = elemStiker.querySelector('.stiker__back');
    var elemItem = elemStiker.querySelector('.stiker__item');

    elemStiker.classList.add('active');
    var stikerZIndex = +elemStiker.style.zIndex;

    if (currentItemNumber % 2) {
        var stikerDraw = function(progress) {
            stikerDrawToLeft(elemStiker, progress);
        };

        requestAnimationFrame(function() {
            elemArena.style.left = 'auto';
            elemArena.style.right = '0';
        });
    } else {
        var stikerDraw = function(progress) {
            stikerDrawToRight(elemStiker, progress);
        };

        requestAnimationFrame(function() {
            elemArena.style.left = '0';
            elemArena.style.right = 'auto';
        });
    }

    if (single) {
        requestAnimationFrame(function() {
            stikerDraw(0);
        })
    } else {
        if (firstInit) {
            requestAnimationFrame(function() {
                stikerDraw(0.1);
            })
        } else {
            animate({
                timing: linear,
                duration: 3000,
                draw: stikerDraw,
                from: 1,
                to: 10,
            });
        }

        var move = function(event) {
            elemArena.onmouseover = undefined;
            elemArena.onmouseout = undefined;

            progress = -(event.offsetY / this.offsetHeight - 1) + 0.05;
            if (progress > .1 && progress < 1) {
                requestAnimationFrame(function(time) {
                    stikerDraw(progress);
                })
            }
            return false;
        }

        elemStiker.onmouseover = function(event) {
            elemStiker.style.zIndex = '99';
        };
        elemStiker.onmouseout = function(event) {
            elemStiker.style.zIndex = stikerZIndex;
        };

        elemArena.onmouseover = function(event) {
            elemStiker.style.zIndex = '999';
            animate({
                timing: linear,
                duration: 3000,
                draw: stikerDraw,
                from: 10,
                to: 13,
            });
        }

        elemArena.onmouseout = function(event) {
            elemStiker.style.zIndex = stikerZIndex;
            animate({
                timing: linear,
                duration: 3000,
                draw: stikerDraw,
                from: 13,
                to: 10,
            });
        }

        elemArena.onmousedown = function(event) {
            elemStiker.style.zIndex = '900';
            requestAnimationFrame(function() {
                elemWrap.style.overflow = 'visible';
                elemArena.style.height = '200%';
                elemArena.style.width = '200%';
                elemArena.onmousemove = move;
            });
            return false;
        }

        elemArena.onmouseup = function(event) {
            elemStiker.style.zIndex = stikerZIndex;
            requestAnimationFrame(function() {
                elemArena.style.height = '35%';
                elemArena.style.width = '35%';
                elemArena.onmousemove = undefined;
            });

            if (progress > 0.4) {
                animate({
                    timing: linear,
                    duration: 700,
                    draw: stikerDraw,
                    from: progress * 100,
                    to: 100,
                    after: function() {
                        nextStiker(elemStikers);
                        animate({
                            timing: linear,
                            duration: 700,
                            draw: stikerDraw,
                            from: 100,
                            to: 1,
                            after: function() {
                                elemWrap.style.overflow = 'hidden';
                            }
                        });
                    }
                });
            } else {
                animate({
                    timing: linear,
                    duration: 1000,
                    draw: stikerDraw,
                    from: progress * 100,
                    to: 10,
                    after: function() {
                        elemWrap.style.overflow = 'hidden';
                    }
                });
            }
        }
    }
}

function nextStiker(elemStikers) {
    // elemStikers.style.zIndex = stikerZIndex;

    var start = performance.now();

    requestAnimationFrame(function(t){
      console.log(performance.now() - start);
      var lastIndex, newIndex;
      for (var i = elemStikers.length - 1; i >= 0; i--) {
          lastIndex = +elemStikers[i].style.zIndex;
          newIndex = lastIndex + 1;

          if (newIndex > elemStikers.length - 1) {
              newIndex = 0;
          }

            elemStikers[i].style.zIndex = newIndex;

          if (newIndex >= elemStikers.length - 1) {
              initStiker(elemStikers, i);
          } else {
              resetStiker(elemStikers[i]);
          }
      }
    });
}

function resetStiker(elemStiker) {
    var elemWrap = elemStiker.querySelector('.stiker__wrap');
    var elemInner = elemStiker.querySelector('.stiker__inner');
    var elemArena = elemStiker.querySelector('.stiker__arena');
    var elemOuter = elemStiker.querySelector('.stiker__outer');
    var elemBack = elemStiker.querySelector('.stiker__back');
    var elemItem = elemStiker.querySelector('.stiker__item');

    elemStiker.classList.remove('active');
    elemStiker.onmouseover = undefined;
    elemStiker.onmouseout = undefined;
    elemArena.onmouseover = undefined;
    elemArena.onmouseout = undefined;
    elemArena.onmousedown = undefined;
    elemArena.onmouseup = undefined;
    elemArena.onmousemove = undefined;

    requestAnimationFrame(function() {
        elemInner.style.transform = "";
        elemOuter.style.transform = "";
        elemBack.style.transform = "";
        elemItem.style.transform = "";
        elemArena.style.left = "";
        elemArena.style.right = "";
    });
}


function stikerDrawToRight(elemStiker, progress) {
    var elemWrap = elemStiker.querySelector('.stiker__wrap');
    var elemInner = elemStiker.querySelector('.stiker__inner');
    var elemArena = elemStiker.querySelector('.stiker__arena');
    var elemOuter = elemStiker.querySelector('.stiker__outer');
    var elemBack = elemStiker.querySelector('.stiker__back');
    var elemItem = elemStiker.querySelector('.stiker__item');

    var innerTranslateY = -24 * progress - 4 * progress;
    var outerTranslateY = 24 * progress;
    var backTransleteY = -(17 - progress * 34);
    var backTransleteX = (17 - progress * 34);
    var backScale = (100 - 30 * zone(progress, 0.7, 1)) / 100;

    elemInner.style.transform = 'rotate(45deg) translateY(' + innerTranslateY + 'em)';
    elemOuter.style.transform = 'translateY(' + outerTranslateY + 'em)';
    elemBack.style.transform = 'rotate(-45deg) translate(' + backTransleteY + 'em, ' + backTransleteX + 'em) scale(' + backScale + ')';
    elemItem.style.transform = 'rotate(-45deg)';

    if (progress <= 0.5) {
      elemItem.style.opacity = '1';
    } else {
      elemItem.style.opacity = '0';
    }
}

function stikerDrawToLeft(elemStiker, progress) {
    var elemWrap = elemStiker.querySelector('.stiker__wrap');
    var elemInner = elemStiker.querySelector('.stiker__inner');
    var elemArena = elemStiker.querySelector('.stiker__arena');
    var elemOuter = elemStiker.querySelector('.stiker__outer');
    var elemBack = elemStiker.querySelector('.stiker__back');
    var elemItem = elemStiker.querySelector('.stiker__item');

    var innerTranslateY = -24 * progress - 4 * progress;
    var outerTranslateY = 24 * progress;
    var backTransleteY = (17 - progress * 34);
    var backTransleteX = (17 - progress * 34);
    var backScale = (100 - 30 * zone(progress, 0.7, 1)) / 100;

    elemInner.style.transform = 'rotate(-45deg) translateY(' + innerTranslateY + 'em)';
    elemOuter.style.transform = 'translateY(' + outerTranslateY + 'em)';
    elemBack.style.transform = 'rotate(45deg) translate(' + backTransleteY + 'em, ' + backTransleteX + 'em) scale(' + backScale + ')';
    elemItem.style.transform = 'rotate(45deg)';

    if (progress <= 0.5) {
      elemItem.style.opacity = '1';
    } else {
      elemItem.style.opacity = '0';
    }
}
