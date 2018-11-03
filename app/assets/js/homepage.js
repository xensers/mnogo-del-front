function openCases() {
    document.documentElement.classList.add('homepage--cases');

    respondFrom(breakpoint.medium, function() {
        setTimeout(function() {
            stikersGrid(4, false, true);
        }, 0)
    }, true, false);

    respondTo(breakpoint.medium, function() {
        stikersGrid(1, 1, true);
    }, true, false);

    return false;

}

function closeCases() {
    document.documentElement.classList.remove('homepage--cases');
    window.location.hash = '';

    respondFrom(breakpoint.medium, function() {
        stikersGrid(3, 2, false, true);
    }, true, false);

    respondTo(breakpoint.medium, function() {
        stikersGrid(1, 1, true);
    }, true, false);

    updateMenu();

    return false;
}


/* Вешаем события */
ready(function() {
    document.querySelector('.header__icons_back').addEventListener('click', closeCases);

    if (window.location.hash === '#cases') {
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
});
