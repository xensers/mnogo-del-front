var fromMedium;
var toMedium;
var stikers;
var elemShowAllCases;
var elemCasesEnd;

function onLoadedHomePage() {
    stikers = new Stikers().init('.stikers-group');
    elemCasesEnd = document.querySelector('.homepage__cases_end');
    elemShowAllCases = document.querySelector('.homepage__cases_show-all');

    document.querySelector('.header__icons_back').addEventListener('click', closeCases);
    elemShowAllCases.addEventListener('click', showAllCases);

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
    window.scrollTo(0, 0);

    document.documentElement.classList.remove('homepage--ready');
    document.querySelector('.homepage__cases > .oval-marker').style.display = 'none';

    fromMedium = function() {
        stikers.convertToGrid(4, false, true, false);
        elemCasesEnd.style.display = 'block';
        elemShowAllCases.style.display = 'none';
    }

    toMedium = function() {
        stikers.convertToSlider();
        elemCasesEnd.style.display = 'none';
        elemShowAllCases.style.display = 'block';
    }

    respondFrom(breakpoint.medium, fromMedium, true, false);
    respondTo(breakpoint.medium, toMedium, true, false);

    return false;
}

function closeCases() {
    document.documentElement.classList.remove('homepage--cases');
    window.location.hash = '';
    updateMenu();
    window.scrollTo(0, 0);

    document.documentElement.classList.add('homepage--ready');
    setTimeout(function(){
        document.querySelector('.homepage__cases > .oval-marker').style.display = 'block';
    }, 1000);

    fromMedium = function(){
        stikers.convertToGrid(3, 2, false, true);
    }

    toMedium = function(){
        stikers.convertToGrid(1, 1);
    }

    respondFrom(breakpoint.medium, fromMedium, true, false);
    respondTo(breakpoint.medium, toMedium, true, false);

    updateMenu();

    return false;
}

function showAllCases()
{
    elemCasesEnd.style.display = 'block';
    elemShowAllCases.style.display = 'none';
    stikers.convertToGrid(1, 0, 1);
    window.scrollTo(0, 0);
    return false;
}
