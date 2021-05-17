(function(d) {
            var responsiveStartStr = '<style>.h_iframe-aparat_embed_frame{position:relative;} .h_iframe-aparat_embed_frame .ratio {display:block;width:100%;height:auto;} .h_iframe-aparat_embed_frame iframe {position:absolute;top:0;left:0;width:100%; height:100%;}</style>';
            responsiveStartStr += '<div class="h_iframe-aparat_embed_frame"> <span style="display: block;padding-top: 56.2%"></span>';
            var responsiveEndStr = '</div>';
        var newiframe = document.createElement('iframe');
    newiframe.setAttribute('width','100%');
    newiframe.setAttribute('height','100%');
    newiframe.setAttribute('title', 'PH آب آکواریوم و نحوه تنظیم آن');
    newiframe.setAttribute('allowFullScreen','true');
    newiframe.setAttribute('webkitallowfullscreen','true');
    newiframe.setAttribute('mozallowfullscreen','true');
    newiframe.setAttribute('src','https://www.aparat.com/video/video/embed/videohash/dKkDg/vt/frame');
    setTimeout(function(){
            document.getElementById('15536794152079645').innerHTML = responsiveStartStr + responsiveEndStr;
        document.getElementById('15536794152079645').getElementsByClassName('h_iframe-aparat_embed_frame')[0].appendChild(newiframe);
        }, 200);
})();
