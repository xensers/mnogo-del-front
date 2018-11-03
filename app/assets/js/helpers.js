function boom() {
    var audio = new Audio();
    audio.preload = 'auto';
    audio.src = '/assets/media/boom.mp3';
    audio.play();
}

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
