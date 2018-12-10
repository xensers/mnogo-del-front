

document.addEventListener('DOMContentLoaded', () => {
    console.log("About Page loaded...");
    var feedbackIcons = new trustUsFeedback();

    initSlider();
    loadVideos();
})




var trustUsFeedback = function(){
    this.items = Array.from(document.querySelectorAll('.trust-us__icons-item'));
    this.itemsWrapper = document.getElementsByClassName('trust-us__icons')[0];
    this.round = document.getElementById('js-logo-wrapper');
    this.backfeeds = Array.from(document.querySelectorAll('.audio-backfeed'));
    
    this.moveRound(this.items[0]);  
    this.changeSlide(0);

    this.items.map((item,index) => {
        item.onclick = () => {            
            this.moveRound(item);
            this.changeSlide(index);
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
}

trustUsFeedback.prototype.changeSlide = function(item_index) {
    this.backfeeds.map((item, index) => {        
        if(item_index === index) {
            item.classList.remove('is_hidden');
        } else {
            item.classList.add('is_hidden');
        }
    })
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
        speed: 500,
        breakpointsInverse: true,
        breakpoints: {
            1920: {
                spaceBetween: 120
            }
        }
    })
}



function loadVideos() {
    var items = [...document.getElementsByClassName('youtube')];
    var playBtns = [...document.getElementsByClassName('do-now__play-btn')];

    items.map((item,index) => {
        let url = item.dataset.video;
        let tmp = url.split('?v=');
        let video_id = tmp[1];
        item.style.backgroundImage = "url('https://i.ytimg.com/vi/"+video_id+"/maxresdefault.jpg')";
    })

    playBtns.map(item => {
        item.onclick = function(){
            let url = item.parentNode.dataset.video;
            let video_id = url.split('?v=')[1];
            let iframe = document.createElement('iframe');
            
            iframe.src = 'https://www.youtube.com/embed/' + video_id + '?rel=0&autoplay=1&showinfo=0';
            
            iframe.setAttribute('allow', 'autoplay');
            iframe.setAttribute("allowfullscreen", true);
            iframe.setAttribute("frameborder", 0);            
            iframe.style.width = "100%";     
            iframe.style.height = "100%";     
            iframe.style.position = "absolute";                                    
            item.parentNode.appendChild(iframe);
        }
    })


}