function feedback() {
  var elemBtn = document.querySelector('.feedback-form__btn');
  var elemModal = document.querySelector('.feedback-modal');
  var elemStiker = elemModal.querySelector('.stiker');
  var elemSuccessfulSend = elemModal.querySelector('.feedback-modal__successful-send');
  var objStikers = new Stikers();

  var drawStiker = function (progress) {
    objStikers.drawToRight(elemStiker, progress);
  }

  inputsHandler();
  elemBtn.onclick = modalOpen;
  elemModal.onclick = modalClose;

  function inputsHandler() {
      var inputs = Array.from(document.querySelectorAll('.feedback-form__input'));

      inputs.map(function (item) {
          item.onblur = function (e) {
              if (e.target.value.trim()) {
                  item.classList.add('is_fill');
              } else {
                  item.classList.remove('is_fill');
                  item.value = "";
              }
          };
      });
  };


  function modalOpen() {
    elemModal.style.display = 'block';
    drawStiker(1);

    setTimeout(function(){
      successfulSend();
    }, 500);

    return false;
  }

  function modalClose() {
    animate({
      draw: drawStiker,
      from: 1,
      to: 100,
      duration: 500,
    });

    animate({
      duration: 500,
      draw: function(progress) {
        elemModal.style.opacity = 1 - progress;
      },
      after: function() {
         resetStyle();
      },
    });

    return false;
  }

  function successfulSend() {
    elemSuccessfulSend.style.display = 'block';
    animate({
      draw: drawStiker,
      from: 100,
      to: 1,
      duration: 500,
    });
  }

  function resetStyle() {
    elemModal.removeAttribute('style');
    elemSuccessfulSend.removeAttribute('style');
  }
}
