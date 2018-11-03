var breakpoint = {
    'small':  767,
    'medium': 992,
    'large':  1200
};

function respondTo(breakpoint, callback, runWhenCalled, addEvent)
{
    if (breakpoint >= window.innerWidth) {
      var active = true;
      if (runWhenCalled){
        console.log('run');
        callback();
      }
    } else {
      var active = false;
    }

    if (addEvent) {
      console.log('addEvent');
      window.addEventListener("optimizedResize", function() {
        console.log('event')
          if (!active) {
            active = true;
            if (breakpoint >= window.innerWidth) return callback();
          }
          if (breakpoint <= window.innerWidth) active = false;
      });
    }
}

function respondFrom(breakpoint, callback, runWhenCalled, addEvent)
{

    if (breakpoint <= window.innerWidth) {
      var active = true;
      if (runWhenCalled){
        console.log('run');
        callback();
      }
    } else {
      var active = false;
    }

    if (addEvent) {
      console.log('addEvent');
      window.addEventListener("optimizedResize", function() {
        console.log('event')
          if (!active) {
            active = true;
            if (breakpoint <= window.innerWidth) return callback();
          }
          if (breakpoint >= window.innerWidth) active = false;
      });
    }
}
