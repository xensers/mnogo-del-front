var activeDrawsList = [];

function animate(options) {
  if (!options.delay)  options.delay = 0;
  if (!options.timing) options.timing = linear;
  if (!options.draw)   options.draw = function(progress){};
  if (!options.from)   options.from = 1;
  if (!options.to)   options.to = 100;
  if (!options.draw)   options.after = function(){};

  var fractionFrom = options.from / 100;
  var fractionTo = options.to / 100;

  for (var i = activeDrawsList.length - 1; i >= 0; i--) {
    if (activeDrawsList[i] === options.draw) {
      return false;
    }
  }
  var animationIndex = activeDrawsList.push(options.draw);

  setTimeout(function(){
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
      var timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;

      if (fractionFrom < fractionTo) {
        timeFraction = timeFraction + fractionFrom;
        var end = timeFraction < fractionTo;
      } else {
        timeFraction = -(timeFraction - fractionFrom);
        var end = timeFraction > fractionTo;
      }

      var progress = options.timing(timeFraction);

      options.draw(progress);

      if (end) {
        requestAnimationFrame(animate);
      } else {
        activeDrawsList.splice(activeDrawsList.indexOf(options.draw), 1);
        if (options.after) options.after();
      }
    });
  }, options.delay);

}


// преобразователь в easeOut
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
// преобразователь в easeOut
function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}



function linear(progress) {
  return progress;
}

function quad(progress) {
  return Math.pow(progress, 2);
}
var quadEaseOut = makeEaseOut(quad);


function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction))
}
var circEaseOut = makeEaseOut(circ);


function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}
var backEaseOut = makeEaseOut(back);

function bounce(progress) {
  for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (progress >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
    }
  }
}
var bounceEaseOut = makeEaseOut(bounce);

function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
var elasticEaseOut = makeEaseOut(elastic);
