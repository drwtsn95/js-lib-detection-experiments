(function(d) {
            var responsiveStartStr = '<style>.h_iframe-aparat_embed_frame{position:relative;} .h_iframe-aparat_embed_frame .ratio {display:block;width:100%;height:auto;} .h_iframe-aparat_embed_frame iframe {position:absolute;top:0;left:0;width:100%; height:100%;}</style>';
            responsiveStartStr += '<div class="h_iframe-aparat_embed_frame"> <span style="display: block;padding-top: 56.2%"></span>';
            var responsiveEndStr = '</div>';
        var newiframe = document.createElement('iframe');
    newiframe.setAttribute('width','100%');
    newiframe.setAttribute('height','100%');
    newiframe.setAttribute('title', 'لیفت آندوسکوپیک ابرو');
    newiframe.setAttribute('allowFullScreen','true');
    newiframe.setAttribute('webkitallowfullscreen','true');
    newiframe.setAttribute('mozallowfullscreen','true');
    newiframe.setAttribute('src','https://www.aparat.com/video/video/embed/videohash/yPTrI/vt/frame');
    setTimeout(function(){
            document.getElementById('22008496292').innerHTML = responsiveStartStr + responsiveEndStr;
        document.getElementById('22008496292').getElementsByClassName('h_iframe-aparat_embed_frame')[0].appendChild(newiframe);
        }, 200);
})();
