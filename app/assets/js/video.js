readyjs.push(loadYoutubeVideos);

function loadYoutubeVideos() {
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

    var items = [].concat(_toConsumableArray(document.getElementsByClassName('youtube')));
    var playBtns = [].concat(_toConsumableArray(document.getElementsByClassName('do-now__play-btn')));

    items.map(function(item,index) {
        var url = item.dataset.video;
        var tmp = url.split('?v=');
        var video_id = tmp[1];
        item.style.backgroundImage = "url('https://i.ytimg.com/vi/"+video_id+"/maxresdefault.jpg')";
    })

    playBtns.map(function(item) {
        item.onclick = function(){
            var url = item.parentNode.dataset.video;
            var video_id = url.split('?v=')[1];
            var iframe = document.createElement('iframe');
            
            iframe.src = 'https://www.youtube.com/embed/' + video_id + '?rel=0&autoplay=1&showinfo=0';
            
            iframe.setAttribute('allow', 'autoplay');
            iframe.setAttribute("allowfullscreen", true);
            iframe.setAttribute("frameborder", 0);
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.position = "absolute";
            item.parentNode.appendChild(iframe);
        }
    })
}

function loadYoutubeLinks()
{
  var elemsVideosLinks = document.querySelectorAll('.YouTubeVideo');
  for (var i = elemsVideosLinks.length - 1; i >= 0; i--) {
    var elemVideoLink = elemsVideosLinks[i];
    var videoID = YouTubeGetID(elemVideoLink.href);

    elemVideoLink.target = '_blank';
    elemVideoLink.style.backgroundImage = 'url(https://img.youtube.com/vi/' + videoID + '/0.jpg)';
  }
}

function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}
