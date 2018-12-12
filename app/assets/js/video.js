readyjs.push(function(){
  // loadYoutubeVideos();
});

function loadYoutubeVideos() {
    var items = [...document.getElementsByClassName('youtube')];
    var playBtns = [...document.getElementsByClassName('do-now__play-btn')];

    items.map((item,index) => {
        let url = item.dataset.video;
        let tmp = url.split('?v=');
        let video_id = tmp[1];
        item.style.backgroundImage = "url('https://i.ytimg.com/vi/"+video_id+"/maxresdefault.jpg')";
    })

    playBtns.map(item => {
        item.onclick = function(){
            let url = item.parentNode.dataset.video;
            let video_id = url.split('?v=')[1];
            let iframe = document.createElement('iframe');
            
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
