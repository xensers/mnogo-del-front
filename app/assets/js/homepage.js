function onLoadedHomePage() {
    window.stikers = new Stikers().init('.stikers-group');

    document.querySelector('.header__icons_back').addEventListener('click', closeCases);

    if (window.location.hash == '#cases') {
        openCases();
    } else {
        closeCases();
    }

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

    document.querySelector('.homepage__cases > .oval-marker').style.display = 'none';

    respondFrom(breakpoint.medium, function() {
        stikers.convertToGrid(4, false, true, false);
    }, true, false);

    respondTo(breakpoint.medium, function() {
        stikers.convertToSlider();
    }, true, false);

    return false;
}

function closeCases() {
    document.documentElement.classList.remove('homepage--cases');
    window.location.hash = '';
    updateMenu();

    setTimeout(function(){
        document.querySelector('.homepage__cases > .oval-marker').style.display = 'block';
    }, 1000);

    respondFrom(breakpoint.medium, function() {
        stikers.convertToGrid(3, 2, false, true);
    }, true, false);

    respondTo(breakpoint.medium, function() {
        stikers.convertToSlider();
    }, true, false);

    updateMenu();

    return false;
}
