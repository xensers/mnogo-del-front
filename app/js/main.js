document.addEventListener("DOMContentLoaded", function() {

     document.querySelector('.menu__burger').addEventListener("click", function() {
        document.documentElement.classList.toggle('menu--open');
    });


    var menuItems = document.querySelectorAll('.menu__item');

    for (var i = menuItems.length - 1; i >= 0; i--) {
        menuItems[i].style.transitionDelay = i * 0.2 + 's';
    }


    window.addEventListener("scroll" ,function(e) {

        var headerElem = document.querySelector('.header');

        if (window.pageYOffset > 30) {
            headerElem.classList.add('scroll');
        } else {
            headerElem.classList.remove('scroll');
        }
    });


     document.querySelector('.start-page__menu').addEventListener("click", function() {
        this.classList.toggle('open');
    });

      document.querySelector('.start-page__close').addEventListener("click", function() {
        document.documentElement.classList.add('start-page--closing');
         setTimeout(function(){
            document.documentElement.classList.remove('start-page--open');
            document.documentElement.classList.remove('start-page--closing');
        }, 1000);
     });

});
