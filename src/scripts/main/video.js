readyjs.push(loadYoutubeVideos);

function loadYoutubeVideos() {
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

    var items = [].concat(_toConsumableArray(document.getElementsByClassName('youtube')));

    items.map(function(item,index) {
        var url = item.href;
        var video_id = YouTubeGetID(url);
        item.style.backgroundImage = "url('https://i.ytimg.com/vi/"+video_id+"/maxresdefault.jpg')";

        var playBtn = document.createElement('div');
        playBtn.classList.add('youtube__play-btn');
        item.appendChild(playBtn);

        item.onclick = function(){
          var iframe = document.createElement('iframe');

          iframe.src = 'https://www.youtube.com/embed/' + video_id + '?rel=0&autoplay=1&showinfo=0';
          
          iframe.setAttribute('allow', 'autoplay');
          iframe.setAttribute("allowfullscreen", true);
          iframe.setAttribute("frameborder", 0);
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.position = "absolute";
          iframe.style.top = "0";
          iframe.style.left = "0";
          this.onclick = function(){
            return false;
          };
          this.innerHTML = '';
          this.appendChild(iframe);

          return false;
        }
    });
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
