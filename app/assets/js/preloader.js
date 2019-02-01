var Preloader = new Preloader();

function Preloader(){
    var self = this;

    var elemPreloader;
    var timer;
    var status = false;

    this.run = function() {
        elemPreloader = document.getElementById('preloader');
        document.documentElement.classList.add('loading');
        status = false;
        timer = setTimeout(function() {
            self.open();
        }, 3000);

        window.addEventListener("load", function(){
            if (!status) {
                self.close();
            }
        });
    }

    this.open = function() {
        status = true;
        document.documentElement.classList.add('loading');

        requestAnimationFrame(function(){
            elemPreloader.style.display = 'flex';
            elemPreloader.style.opacity = '1';
        });

        setTimeout(function() {
            self.close();
        }, 5500);
    }

    this.close = function() {
        clearTimeout(timer);
        status = false;

        requestAnimationFrame(function(){
            elemPreloader.style.display = 'none';
            document.documentElement.classList.remove('loading');
            document.documentElement.classList.add('loaded');
        })
    }
}
