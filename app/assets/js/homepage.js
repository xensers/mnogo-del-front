function openCases() {
  document.documentElement.classList.add('homepage--cases');
}

var back = document.querySelector('.header__icons_back');

back.addEventListener('click', function(){
  document.documentElement.classList.remove('homepage--cases');
});
