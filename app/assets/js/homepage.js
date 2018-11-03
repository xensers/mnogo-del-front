function openCases() {
  document.documentElement.classList.add('homepage--cases');

  respondFrom(breakpoint.medium, function(){
      // stikersGrid(1, 1);
      setTimeout(function(){
        stikersGrid(4, 4);
      }, 0)
  });

  respondTo(breakpoint.medium, function(){
      stikersGrid(1, 1);
  });

  return false;

}

function closeCases() {
  document.documentElement.classList.remove('homepage--cases');
  window.location.hash = '';

  respondFrom(breakpoint.medium, function(){
      stikersGrid(3, 2);
  });

  respondTo(breakpoint.medium, function(){
      stikersGrid(1, 1);
  });

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

  respondFrom(breakpoint.medium, function(){
      stikersGrid(3, 2);
  }, true);

  respondTo(breakpoint.medium, function(){
      stikersGrid(1, 1);
  }, true);

  // respondTo(breakpoint.medium, function(){
  //     closeCases();
  // }, true);


  var allLinks = document.getElementsByTagName('a');
  for (var i = allLinks.length - 1; i >= 0; i--) {
    var link = allLinks[i];
    if (link.hash === '#cases') {
      link.addEventListener('click', openCases);
    }
  }


});
