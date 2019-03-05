function share()
{
  var TITLE          = encodeURI(document.title),
      DESCRIPTION    = encodeURI(document.head.querySelector("meta[name='description']").getAttribute("content")),
      IMAGE_SRC      = encodeURI(document.head.querySelector("meta[property='og:image']").getAttribute("content")),
      URL            = encodeURI(window.location.href);

  var shareUrl = {
    'twitter'       : 'https://twitter.com/intent/tweet?text='+TITLE+'&url='+URL,
    'facebook'      : 'https://www.facebook.com/sharer.php?u='+URL,
    'google'        : 'https://plus.google.com/share?url='+URL,
    'vk'            : 'https://vk.com/share.php?url='+URL+'&title='+TITLE+'&description='+DESCRIPTION+'&image='+IMAGE_SRC+'&noparse=true',
    'reddit'        : 'https://www.reddit.com/submit?url='+URL+'&title='+TITLE,
    'odnoklassniki' : 'https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl='+URL+'&st.comments='+DESCRIPTION,
  };

  var items = Array.from(document.querySelectorAll('a.share'));

  items.forEach(function (item, index) {
    for (key in shareUrl) {
      if(item.classList.contains(key)) {
        item.href = shareUrl[key];
        item.setAttribute('target', 'new');
      }
    }
  });
}
