readyjs.push(function(){
    var elemsStikers = document.querySelectorAll('.stiker');
    for (var i = elemsStikers.length - 1; i >= 0; i--) {
        var elemStiker = elemsStikers[i],
            // elemNumber = elemStiker.querySelector('.stiker__number'),
            elemWrap   = elemStiker.querySelector('.stiker__wrap');

        var deg = (Math.random() * 10) - 5;

        // elemNumber.innerHTML = '№' + (i + 1) + '. ';
        elemWrap.style.transform = 'rotate(' + deg + 'deg)';
    }
});

function Stikers() {
    var self = this;

    var stikerGroupOnResize,
        timerForGrid;

    var elemGroup,
        elemsStikers,
        elemsStikersArray,
        elemsStikersMatrix,
        elemControlDotsContainer,
        elemControlNext,
        elemControlPrev;


    this.init = function(selector) {
        elemGroup                = document.querySelector(selector);
        elemsStikers             = elemGroup.querySelectorAll('.stiker');
        elemControlNext          = elemGroup.querySelector('.stikers-group__next');
        elemControlPrev          = elemGroup.querySelector('.stikers-group__prev');
        elemControlDotsContainer = elemGroup.querySelector('.stikers-group__dots');
        elemsStikersArray        = Array.prototype.slice.call(elemsStikers);

        elemGroup.classList.add('stikers-group');
        elemGroup.classList.onselectstart = function() {return false};

        createDots(elemsStikers);

        elemControlNext.onclick = function () {
            self.slideNext(elemsStikers);
        };
        elemControlPrev.onclick = function () {
            self.slidePrev(elemsStikers);
        };

        requestAnimationFrame(function() {
            for (var i = elemsStikers.length - 1; i >= 0; i--) {
                var elemStiker = elemsStikers[i],
                    elemNumber = elemStiker.querySelector('.stiker__number'),
                    elemWrap   = elemStiker.querySelector('.stiker__wrap');

                var deg = (Math.random() * 10) - 5;

                elemWrap.style.transform = 'rotate(' + deg + 'deg)';
            }
        });

        return this;
    }

    this.convertToGrid = function(cols, rows, showTitle, random) {
        if (cols <= 0) {
          throw new Error("Значение rows должно быть положительным");
        }

        if (rows < 0) {
          throw new Error("Значение cols должно больше нуля");
        }

        clearTimeout(timerForGrid);
        elemGroup.classList.remove('stikers__slider');

        timerFromGrid = setTimeout(function () {
            elemsStikersMatrix = new Array();

            if (random) {
                elemsStikersArray.sort(compareRandom);
            } else {
                elemsStikersArray = Array.prototype.slice.call(elemsStikers);
            }

            if (!rows) {
                rows = Math.ceil(elemsStikersArray.length / cols);
            }

            if (showTitle) {
                var xFactor = 1.15,
                    yFactor = 1.55;
            } else {
                var xFactor = 1.15, 
                    yFactor = 1.15;
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
                var i   = 0,
                    row = 0,
                    col = 0,
                    index;
                for (var i = 0; i <= elemsStikersArray.length - 1; i++) {
                    var elemStiker = elemsStikersArray[i];

                    resetStiker(elemStiker);

                    if (!elemsStikersMatrix[row]) {
                        elemsStikersMatrix[row] = new Array();
                    }

                    if (!elemsStikersMatrix[row][col]) {
                        elemsStikersMatrix[row][col] = new Array();
                    }

                    index = elemsStikersMatrix[row][col].push(elemStiker) - 1;

                    (function(i, col, row, index, elemsStikersMatrix, showTitle) {
                        var elemStiker = elemsStikersMatrix[row][col][index],
                            elemTitle  = elemStiker.querySelector('.stiker__title'),
                            elemWrap   = elemStiker.querySelector('.stiker__wrap');
                            elemTitle.style.display = 'none';

                        if (showTitle) {
                            var xFactor = 2.5, 
                                yFactor = 9;
                        } else {
                            var xFactor = 2.5,
                                yFactor = 2.5;
                        }

                        setTimeout(function() {
                            requestAnimationFrame(function() {
                                var x = (16 + xFactor) * col,
                                    y = (16 + yFactor) * row;

                                elemStiker.style.transform = 'translate(' + x + 'em, ' + y + 'em)';
                                if (showTitle) {
                                    elemTitle.style.display = 'block';
                                }
                            });
                        }, 100 * i)
                    })(i, col, row, index, elemsStikersMatrix, showTitle);

                    col++;
                    if (col >= cols) {
                        col = 0;
                        row++;
                        if (row >= rows) {
                            row = 0;
                        }
                    }
                }

                for (var row = elemsStikersMatrix.length - 1; row >= 0; row--) {
                    for (var col = elemsStikersMatrix[row].length - 1; col >= 0; col--) {
                        initStikers(elemsStikersMatrix[row][col]);
                    }
                }
            }, 300);
        }, 100);

        return this;
    }

    this.convertToSlider = function () {
        this.convertToGrid(1, 1, true);
        elemGroup.classList.add('stikers__slider');

        return this;
    }

    this.slideNext = function() {
        for (var iteration = elemsStikers.length - 1; iteration >= 0; iteration--) {
            if (elemsStikers[iteration].classList.contains('active')) {
                var elemStiker = elemsStikers[iteration],
                    elemWrap   = elemStiker.querySelector('.stiker__wrap'),
                    stikerDraw = getTheRightDraw(elemStiker, iteration);

                animate({
                    timing: linear,
                    duration: 500,
                    draw: stikerDraw,
                    from: 0,
                    to: 90,
                    before: function() {
                        elemWrap.style.overflow = 'visible';
                    },
                    after: function() {
                        nextStiker(elemsStikers);
                        animate({
                            timing: linear,
                            duration: 700,
                            draw: stikerDraw,
                            from: 90,
                            to: 0,
                            after: function() {
                                elemWrap.style.overflow = 'hidden';
                            }
                        });
                    }
                });
                return this;
            }
        }
        return this;
    }

    this.slidePrev = function() {
        for (var iteration = elemsStikers.length - 1; iteration >= 0; iteration--) {
            if (+elemsStikers[iteration].style.zIndex == 0) {
                var elemStiker = elemsStikers[iteration],
                    elemWrap   = elemStiker.querySelector('.stiker__wrap'),
                    stikerDraw = getTheRightDraw(elemStiker, iteration);

                animate({
                    timing: linear,
                    duration: 500,
                    draw: stikerDraw,
                    from: 0,
                    to: 90,
                    before: function() {
                        elemWrap.style.overflow = 'visible';
                    },
                    after: function() {
                        prevStiker(elemsStikers, true);
                        animate({
                            timing: linear,
                            duration: 700,
                            draw: stikerDraw,
                            from: 90,
                            to: 0,
                            after: function() {
                                elemWrap.style.overflow = 'hidden';
                            }
                        });
                    }
                });
                return this;
            }
        }
        return this;
    }

    var createDots = function(elemsStikers) {
        for (var i = elemsStikers.length - 1; i >= 0; i--) {
            var elemDot = document.createElement('span');
            elemControlDotsContainer.insertBefore(elemDot, null);
        }
    };

    var updateDots = function(elemsStackStikers) {
        var elemsControlDots = elemControlDotsContainer.querySelectorAll('span');

        for (var i = elemsControlDots.length - 1; i >= 0; i--) {
            elemsControlDots[i].classList.remove('active');
        }

        for (var i = elemsStackStikers.length - 1; i >= 0; i--) {
            if (elemsStackStikers[i].classList.contains('active')) {
               elemsControlDots[i].classList.add('active');
               return self;
            }
        }

        elemsControlDots[elemsStikers.length - 1].classList.add('active');
        return self;
    }

    var initStikers = function(elemsStackStikers) {
        for (var i = elemsStackStikers.length - 1; i >= 0; i--) {
            var elemStiker = elemsStackStikers[i];

            elemStiker.classList.remove('active');
            elemStiker.style.zIndex = i;
        }

        iteration = elemsStackStikers.length - 1;
        if (elemsStackStikers.length > 1) {
            initStiker(elemsStackStikers, iteration, false, true);
        } else {
            initStiker(elemsStackStikers, iteration, true, true);
        }
    }

    var initStiker = function(
        elemsStackStikers, iteration,
        single, firstInit, noAnimateInit
    ) {
        var progress;
        var elemStiker = elemsStackStikers[iteration],
            elemWrap   = elemStiker.querySelector('.stiker__wrap'),
            elemInner  = elemStiker.querySelector('.stiker__inner'),
            elemArena  = elemStiker.querySelector('.stiker__arena'),
            elemOuter  = elemStiker.querySelector('.stiker__outer'),
            elemBack   = elemStiker.querySelector('.stiker__back'),
            elemFront  = elemStiker.querySelector('.stiker__front');

        var stikerDraw   = getTheRightDraw(elemStiker, iteration),
            stikerZIndex = +elemStiker.style.zIndex;

        elemStiker.classList.add('active');
        updateDots(elemsStackStikers);


        if (single) {
            requestAnimationFrame(function() {
                stikerDraw(0);
            })
        } else {

            var move = function(event) {
                elemArena.onmouseover = undefined;
                elemArena.onmouseout = undefined;

                progress = -(event.offsetY / this.offsetHeight - 1) + 0.05;
                if (progress > .1 && progress < 1) {
                    requestAnimationFrame(function(time) {
                        stikerDraw(progress);
                    })
                }
            }

            var outTimer;
            elemStiker.onmouseover = function(event) {
                clearTimeout(outTimer);
                animate({
                    timing: linear,
                    duration: 3000,
                    draw: stikerDraw,
                    from: 0,
                    to: 10,
                });
            }

            elemStiker.onmouseout = function(event) {
                outTimer = setTimeout(function(){
                    animate({
                        timing: linear,
                        duration: 3000,
                        draw: stikerDraw,
                        from: 10,
                        to: 0,
                    });
                }, 300);
            }

            elemArena.onmouseover = function(event) {
                animate({
                    timing: linear,
                    duration: 3000,
                    draw: stikerDraw,
                    from: 10,
                    to: 15,
                });
            }

            elemArena.onmouseout = function(event) {
                animate({
                    timing: linear,
                    duration: 3000,
                    draw: stikerDraw,
                    from: 15,
                    to: 10,
                });
            }

            elemArena.onmousedown = function(event) {
                elemStiker.style.zIndex = '999';
                document.querySelector('.layout__header').style.zIndex = '0';
                requestAnimationFrame(function() {
                    elemWrap.style.overflow = 'visible';
                    elemArena.style.height = '200%';
                    elemArena.style.width = '200%';
                    elemArena.onmousemove = move;
                });
            }

            elemArena.onmouseup = function(event) {
                elemStiker.style.zIndex = stikerZIndex;
                document.querySelector('.layout__header').style.zIndex = '';
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
                            nextStiker(elemsStackStikers);
                            animate({
                                timing: linear,
                                duration: 700,
                                draw: stikerDraw,
                                from: 100,
                                to: 13,
                                after: function() {
                                    resetStiker(elemStiker);
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

    var resetStiker = function(elemStiker) {
        var elemWrap  = elemStiker.querySelector('.stiker__wrap'),
            elemInner = elemStiker.querySelector('.stiker__inner'),
            elemArena = elemStiker.querySelector('.stiker__arena'),
            elemOuter = elemStiker.querySelector('.stiker__outer'),
            elemFront = elemStiker.querySelector('.stiker__front'),
            elemBack  = elemStiker.querySelector('.stiker__back');

        elemStiker.onmouseover = undefined;
        elemStiker.onmouseout  = undefined;
        elemArena.onmouseover  = undefined;
        elemArena.onmouseout   = undefined;
        elemArena.onmousedown  = undefined;
        elemArena.onmouseup    = undefined;
        elemArena.onmousemove  = undefined;

        elemStiker.classList.remove('active');

        requestAnimationFrame(function() {
            elemInner.style.transform = "";
            elemOuter.style.transform = "";
            elemBack.style.transform  = "";
            elemFront.style.transform = "";
            elemArena.style.left      = "";
            elemArena.style.right     = "";
        });
    }

    var nextStiker = function(elemsStackStikers, noAnimateInit) {
        requestAnimationFrame(function(t){
            var lastIndex, newIndex;
            for (var i = elemsStackStikers.length - 1; i >= 0; i--) {

                lastIndex = +elemsStackStikers[i].style.zIndex;
                newIndex  = lastIndex + 1;

                if (newIndex > elemsStackStikers.length - 1) {
                    newIndex = 0;
                } else if (newIndex < 0) {
                    newIndex = elemsStackStikers.length - 1;
                }

                elemsStackStikers[i].style.zIndex = newIndex;
                if (newIndex == elemsStackStikers.length - 1) {
                    initStiker(elemsStackStikers, i, false, false, noAnimateInit);
                } else {
                    resetStiker(elemsStackStikers[i]);
                }
            }
        });
    }

    var prevStiker = function(elemsStackStikers, noAnimateInit) {
        requestAnimationFrame(function(t){
            var lastIndex, newIndex;
            for (var i = elemsStackStikers.length - 1; i >= 0; i--) {
                lastIndex = +elemsStackStikers[i].style.zIndex;
                newIndex  = lastIndex - 1;

                if (newIndex > elemsStackStikers.length - 1) {
                    newIndex = 0;
                } else if (newIndex < 0) {
                   newIndex = elemsStackStikers.length - 1;
                }

                elemsStackStikers[i].style.zIndex = newIndex;
                if (newIndex == elemsStackStikers.length - 1) {
                    initStiker(elemsStackStikers, i, false, false, noAnimateInit);
                } else {
                    resetStiker(elemsStackStikers[i]);
                }
            }
        });
    }

    var stikerDrawToRight = function(elemStiker, progress) {
        var elemWrap  = elemStiker.querySelector('.stiker__wrap'),
            elemInner = elemStiker.querySelector('.stiker__inner'),
            elemArena = elemStiker.querySelector('.stiker__arena'),
            elemOuter = elemStiker.querySelector('.stiker__outer'),
            elemFront = elemStiker.querySelector('.stiker__front'),
            elemBack  = elemStiker.querySelector('.stiker__back');

        var innerTranslateY = -24 * progress - 4 * progress,
            outerTranslateY = 24 * progress,
            backTransleteY  = -(17 - progress * 34),
            backTransleteX  = (17 - progress * 34),
            backScale       = (100 - 30 * zone(progress, 0.7, 1)) / 100;

        elemInner.style.transform = 'rotate(45deg) translateY(' + innerTranslateY + 'em)';
        elemOuter.style.transform = 'translateY(' + outerTranslateY + 'em)';
        elemFront.style.transform = 'rotate(-45deg)';
        elemBack.style.transform  = 'rotate(-45deg) translate(' + backTransleteY + 'em, ' + backTransleteX + 'em) scale(' + backScale + ')';

        if (progress <= 0.5) {
          elemFront.style.opacity = '1';
        } else {
          elemFront.style.opacity = '0';
        }
    }

    var stikerDrawToLeft = function(elemStiker, progress) {
        var elemWrap  = elemStiker.querySelector('.stiker__wrap'),
            elemInner = elemStiker.querySelector('.stiker__inner'),
            elemArena = elemStiker.querySelector('.stiker__arena'),
            elemOuter = elemStiker.querySelector('.stiker__outer'),
            elemBack  = elemStiker.querySelector('.stiker__back'),
            elemFront = elemStiker.querySelector('.stiker__front');

        var innerTranslateY = -24 * progress - 4 * progress,
            outerTranslateY = 24 * progress,
            backTransleteY  = (17 - progress * 34),
            backTransleteX  = (17 - progress * 34),
            backScale       = (100 - 30 * zone(progress, 0.7, 1)) / 100;

        elemInner.style.transform = 'rotate(-45deg) translateY(' + innerTranslateY + 'em)';
        elemOuter.style.transform = 'translateY(' + outerTranslateY + 'em)';
        elemFront.style.transform = 'rotate(45deg)';
        elemBack.style.transform  = 'rotate(45deg) translate(' + backTransleteY + 'em, ' + backTransleteX + 'em) scale(' + backScale + ')';

        if (progress <= 0.5) {
          elemFront.style.opacity = '1';
        } else {
          elemFront.style.opacity = '0';
        }
    }

    var getTheRightDraw = function(elemStiker, iteration) {
        var elemArena  = elemStiker.querySelector('.stiker__arena');

        elemArena.style.left = '0';
        elemArena.style.right = 'auto';

        return function(progress) {
            stikerDrawToRight(elemStiker, progress);
        };
    }
}
