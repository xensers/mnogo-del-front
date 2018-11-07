var stikers = new Stikers().init('.stikers-group');

document.addEventListener("DOMContentLoaded", onLoadedHomePage);

function onLoadedHomePage() {
    document.querySelector('.header__icons_back').addEventListener('click', closeCases);

    respondTo(breakpoint.medium, function() {
        stikers.slider();
    }, true, true);

    respondFrom(breakpoint.medium, function() {
        if (window.location.hash === '#cases') {
            openCases();
        } else {
            closeCases();
        }
    }, true, true);

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

    respondFrom(breakpoint.medium, function() {
        stikers.grid(4, false, true, false);
    }, true, false);

    respondTo(breakpoint.medium, function() {
        stikers.slider();
    }, true, false);

    return false;
}

function closeCases() {
    document.documentElement.classList.remove('homepage--cases');
    window.location.hash = '';

    respondFrom(breakpoint.medium, function() {
        stikers.grid(3, 2, false, true);
    }, true, false);

    respondTo(breakpoint.medium, function() {
        stikers.slider();
    }, true, false);

    updateMenu();

    return false;
}
