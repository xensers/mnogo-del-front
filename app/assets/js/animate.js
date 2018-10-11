var activeDrawsList = [];
var showFrameRate = false;

function animate(options) {
  if (!options.delay)  options.delay = 0;
  if (!options.timing) options.timing = linear;
  if (!options.draw)   options.draw = function(progress){};
  if (!options.from)   options.from = 1;
  if (!options.to)     options.to = 100;
  if (!options.draw)   options.after = function(){};

  var fractionFrom = options.from / 100;
  var fractionTo = options.to / 100;

  setTimeout(function(){
    var start = performance.now();
    var timeLast = start;

    for (var i = activeDrawsList.length - 1; i >= 0; i--) {
      if (activeDrawsList[i] === options.draw) {
        return false;
      }
    }
    var animationIndex = activeDrawsList.push(options.draw);

    requestAnimationFrame(function animate(time) {
      var timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;

      if (fractionFrom < fractionTo) {
        timeFraction = timeFraction + fractionFrom;
        var terminationСondition = timeFraction < fractionTo;
      } else {
        timeFraction = -(timeFraction - fractionFrom);
        var terminationСondition = timeFraction > fractionTo;
      }

      var progress = options.timing(timeFraction);

      options.draw(progress);

      if (terminationСondition) {
        requestAnimationFrame(animate);

        if (showFrameRate) {
          console.log(frameRate(timeLast, time), Math.round(timeFraction * 100));
          timeLast = time;
        }
      } else {
        activeDrawsList.splice(activeDrawsList.indexOf(options.draw), 1);
        if (options.after) options.after();
      }
    });
  }, options.delay);

}

function frameRate(timeLast, timeNow)
{
  return Math.round(1000 / (timeNow - timeLast));
}

function zone(current, from, to, draw)
{

  current = current * 100;
  from    = from * 100;
  to      = to * 100;
  draw    = draw * 100;

  if (current >= from && current <= to)
  {
    var progress = (current - from) / (to - from);
    if (draw) draw(progress);
    return progress;
  } else if (current <= from) {
    return 0;
  } else if (current >= to) {
    return 1;
  }
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
