

document.addEventListener('DOMContentLoaded', () => {
    console.log("About Page loaded...");
    var feedbackIcons = new trustUsFeedback();

    initSlider();
})




var trustUsFeedback = function(){
    this.items = Array.from(document.querySelectorAll('.trust-us__icons-item'));
    this.itemsWrapper = document.getElementsByClassName('trust-us__icons')[0];
    this.round = document.getElementById('js-logo-wrapper');
    
    this.moveRound(this.items[0]);

    this.items.map((item,index) => {
        item.onclick = () => {            
            this.moveRound(item);
        }
    })
}

trustUsFeedback.prototype.moveRound = function(element){
    var logoRect = element.getBoundingClientRect();
    var containerRect = this.itemsWrapper.getBoundingClientRect();

    var pos = {
        left: logoRect.left - containerRect.left,
        top: logoRect.top - containerRect.top
    }    

    this.round.style.left = pos.left + 'px';
    this.round.style.top = pos.top + 'px';
    this.round.style.transform = 'translate(-27%, -30%)';
}




// Slider 



function initSlider(){
    var mySwiper = new Swiper('.began-slider', {  
        pagination: {
            el: '.began-slider__pagination',
        },
        navigation: {
            nextEl: '.began-slider__next',
            prevEl: '.began-slider__prev',
        },
        effect: 'coverflow',
        spaceBetween: 20,
        speed: 500
    })
}