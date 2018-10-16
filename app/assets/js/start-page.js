/**
 * Показать стартовую
 */
function startPageOpen()
{
  document.documentElement.classList.add('start-page--open');
  document.querySelector('.start-page__close').addEventListener("click", startPageClose);
}

/**
 * Открытие/Закрытие меню стартовой
 */
function startPageMenuToggle() {
    document.querySelector('.start-page__menu').classList.toggle('open');
}

/**
 * Закрыть стартовую
 */
function startPageClose()
{
  document.documentElement.classList.add('start-page--closing');
    setTimeout(function(){
      document.documentElement.classList.remove('start-page--open');
      document.documentElement.classList.remove('start-page--closing');
  }, 1000);
}

/* Вешаем события */
document.addEventListener("DOMContentLoaded", function loadedStartPage() {
  document.querySelector('.start-page__menu').addEventListener("click", startPageMenuToggle);
});
