/**
 * Сокращение для добавления события DOMContentLoaded
 * @param {Function} listener Cлушатель события
 */
function ready(listener) {
    document.addEventListener("DOMContentLoaded", listener);
}

/**
 * Custom Event Resize
 */
(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();


/**
 * Добавление событий
 * @param {[type]}   object   DOM узел
 * @param {string}   type     Тип прослушиваемого события.
 * @param {Function} listener Cлушатель события
 */
function addEvent(object, type, listener) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, listener, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, listener);
    } else {
        object["on" + type] = listener;
    }
};

/**
 * сompareFunction для arr.sort, для сортироки случйном порядке
 */
function compareRandom(a, b) {
    return Math.random() - 0.5;
}

/**
 * Получение DOM дерева другой страницы
 * @param  {String}   url      URL страницы
 * @param  {Function} callback Передаваемая функция
 */
function getDocument(url, callback)
{
  var http = new XMLHttpRequest();
  http.open('GET', url);
  http.onreadystatechange = function ()
  {
    if (this.readyState == 4 && this.status == 200) {
      var doc = new DOMParser().parseFromString(this.responseText, "text/html");  // преобразовать текст в HTML

      callback(doc);
    }
  }
  http.send(null);
}



function smoothScrollToAnchor (){
    var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
        V = 0.3;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    for (var i = 0; i < linkNav.length; i++) {
        var hash = linkNav[i].href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        var elemTo = false;
        if (hash !== '#') {
            var elemTo = document.querySelector(hash);
        }
        if (elemTo) {
            linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
                var offsetHeader = document.querySelector('.layout__header').offsetHeight
                e.preventDefault(); //отменяем стандартное поведение
                var w = window.pageYOffset,  // производим прокрутка прокрутка
                    hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
                t = document.querySelector(hash).getBoundingClientRect().top - 50,  // отступ от окна браузера до id
                    start = null;
                requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
                function step(time) {
                    if (start === null) start = time;
                    var progress = time - start,
                        r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
                    window.scrollTo(0,r);
                    if (r != w + t) {
                        requestAnimationFrame(step)
                    } else {
                        location.hash = hash  // URL с хэшем
                    }
                }
            }, false);
        }
    }
}

readyjs.push(smoothScrollToAnchor);
