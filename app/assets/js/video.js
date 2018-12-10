document.addEventListener('DOMContentLoaded', function(){
  var elemsVideosLinks = document.querySelectorAll('.YouTubeVideo');

  for (var i = elemsVideosLinks.length - 1; i >= 0; i--) {
    var elemVideoLink = elemsVideosLinks[i];
    var videoID = YouTubeGetID(elemVideoLink.href);

    elemVideoLink.target = '_blank';
    elemVideoLink.style.backgroundImage = 'url(https://img.youtube.com/vi/' + videoID + '/0.jpg)';
  }
});

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
