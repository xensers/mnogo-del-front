var fromMedium;
var toMedium;


function onLoadedHomePage() {
    window.stikers = new Stikers().init('.stikers-group');

    document.querySelector('.header__icons_back').addEventListener('click', closeCases);

    if (window.location.hash == '#cases') {
        openCases();
    } else {
        closeCases();
    }

    respondFrom(breakpoint.medium, function(){
        fromMedium();
    }, false, true);
    respondTo(breakpoint.medium, function(){
        toMedium();
    }, false, true);

    var allLinks = document.getElementsByTagName('a');
    for (var i = allLinks.length - 1; i >= 0; i--) {
        var link = allLinks[i];
        if (link.hash === '#cases') {
            link.addEventListener('click', openCases);
        }
    }
}

function openCases() {
    document.documentElement.classList.add('homepage--cases');
    window.location.hash = 'cases';
    updateMenu();

    document.documentElement.classList.remove('homepage--ready');
    document.querySelector('.homepage__cases > .oval-marker').style.display = 'none';

    fromMedium = function() {
        stikers.convertToGrid(4, false, true, false);
    }

    toMedium = function() {
        stikers.convertToSlider();
    }

    respondFrom(breakpoint.medium, fromMedium, true, false);
    respondTo(breakpoint.medium, toMedium, true, false);

    return false;
}

function closeCases() {
    document.documentElement.classList.remove('homepage--cases');
    window.location.hash = '';
    updateMenu();

    document.documentElement.classList.add('homepage--ready');
    setTimeout(function(){
        document.querySelector('.homepage__cases > .oval-marker').style.display = 'block';
    }, 1000);

    fromMedium = function(){
        stikers.convertToGrid(3, 2, false, true);
    }

    toMedium = function(){
        stikers.convertToSlider();
    }

    respondFrom(breakpoint.medium, fromMedium, true, false);
    respondTo(breakpoint.medium, toMedium, true, false);

    updateMenu();

    return false;
}
