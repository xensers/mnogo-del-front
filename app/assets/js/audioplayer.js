window.addEventListener('DOMContentLoaded', function(){
    audioPlayers = document.querySelectorAll('.audioplayer');
    if (audioPlayers) {
        for (var i = audioPlayers.length - 1; i >= 0; i--) {
            initAudioPlayer(audioPlayers[i]);
        }
    }
});

function initAudioPlayer(audioPlayer) {
    var audio    = audioPlayer.querySelector('audio');
    var pButton  = audioPlayer.querySelector('.audioplayer__button');
    var playhead = audioPlayer.querySelector('.audioplayer__playhead');
    var timeline = audioPlayer.querySelector('.audioplayer__timeline');
    var duration = audio.duration;

    var timelineWidth = timeline.offsetWidth;

    pButton.addEventListener("click", play);
    audio.addEventListener("timeupdate", timeUpdate, false);

    timeline.addEventListener("click", function(event) {
        audio.currentTime = duration * clickPercent(event);
        timeUpdate();
    }, false);

    function timeUpdate() {
        requestAnimationFrame(function(){
            var playPercent = (audio.currentTime / duration);
            playhead.style.transform = 'scaleX('+ playPercent +')';

            if (audio.currentTime == duration) {
                pButton.classList.remove('pause');
                pButton.classList.add('play');
            }
        });
    }

    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }

    function play() {
        if (audio.paused) {
            audio.play();
            pButton.classList.remove('play');
            pButton.classList.add('pause');
        } else {
            audio.pause();
            pButton.classList.remove('pause');
            pButton.classList.add('play');
        }
    }

    audio.addEventListener("canplaythrough", function() {
        duration = audio.duration;
    }, false);

    // getPosition
    // Returns elements left position relative to top-left of viewport
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }
}
