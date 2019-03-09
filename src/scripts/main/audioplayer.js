var audioPlayers = new Array();

readyjs.push(function(){
    audioPlayersNodeList = document.querySelectorAll('.audioplayer');
    if (audioPlayersNodeList) {
        for (var i = audioPlayersNodeList.length - 1; i >= 0; i--) {
            audioPlayers.push(new initAudioPlayer(audioPlayersNodeList[i]));
        }
    }
});

function pauseAllPlayers()
{
    for (var i = audioPlayers.length - 1; i >= 0; i--) {
        audioPlayers[i].pause();
    }
}

function initAudioPlayer(audioPlayerElem) {
    self = this;

    this.play = play;
    this.pause = pause;

    var audio    = audioPlayerElem.querySelector('audio');
    var pButton  = audioPlayerElem.querySelector('.audioplayer__button');
    var playhead = audioPlayerElem.querySelector('.audioplayer__playhead');
    var timeline = audioPlayerElem.querySelector('.audioplayer__timeline');
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
            pauseAllPlayers();

            pButton.classList.remove('play');
            pButton.classList.add('pause');
            audio.play();
        } else {
            pause();
        }
    }

    function pause()
    {
        pButton.classList.remove('pause');
        pButton.classList.add('play');
        audio.pause();
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
