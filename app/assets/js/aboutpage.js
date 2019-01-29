var trustUsFeedback = function trustUsFeedback() {
    var self = this;

    this.items = Array.from(document.querySelectorAll('.trust-us__icons-item'));
    this.itemsWrapper = document.getElementsByClassName('trust-us__icons')[0];
    this.round = document.getElementById('js-logo-wrapper');
    this.backfeeds = Array.from(document.querySelectorAll('.audio-backfeed'));

    this.moveRound(this.items[0]);
    this.changeSlide(0);

    this.items.map(function (item, index) {
        item.onclick = function () {
            pauseAllPlayers();
            self.moveRound(item);
            self.changeSlide(index);
        };
    });
};

var inputsHandler = function inputsHandler() {
    this.inputs = Array.from(document.querySelectorAll('.feedback-form__input'));
    this.inputs.map(function (item) {
        item.onblur = function (e) {
            if (e.target.value.trim()) {
                item.classList.add('is_fill');
            } else {
                item.classList.remove('is_fill');
                item.value = "";
            }
        };
    });
};

trustUsFeedback.prototype.moveRound = function(element){
    var logoRect = element.getBoundingClientRect();
    var containerRect = this.itemsWrapper.getBoundingClientRect();
    var pos = {
        left: logoRect.left - containerRect.left,
        top: logoRect.top - containerRect.top
    }    
    this.round.style.left = pos.left + 'px';
    this.round.style.top  = pos.top + 'px';
}

trustUsFeedback.prototype.changeSlide = function (item_index) {
    this.backfeeds.map(function (item, index) {
        if (item_index === index) {
            item.classList.remove('is_hidden');
        } else {
            item.classList.add('is_hidden');
        }
    });
};

// Slider 
function initSlider() {
    var mySwiper = new Swiper('.began-slider', {
        pagination: {
            el: '.began-slider__pagination'
        },
        navigation: {
            nextEl: '.began-slider__next',
            prevEl: '.began-slider__prev'
        },
        effect: 'coverflow',
        spaceBetween: 20,
        speed: 500,
        breakpointsInverse: true,
        breakpoints: {
            1920: {
                spaceBetween: 120
            },
            3996: {
                spaceBetween: 950
            }

        }
    });
}


setTimeout(function(){
    var iteration = 0;
    var elem = document.getElementsByClassName('first-section__figure-img')[0];

    var interval = setInterval(function(){
        if (elem.style.transform) {
            elem.style.transform = '';
        } else {
            elem.style.transform = 'scale(-1, 1)';
        }
        iteration++;
        if (iteration >= 4) {
            clearInterval(interval);
        }
    }, 1000);
}, 2000);
