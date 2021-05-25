window.jQuery || document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"><\/script>');

jQuery(document).ready(function ($) {
    replaceVideoThumb($);
    jQuery(".pswp__counter").bind("DOMSubtreeModified", function ($) {
        replaceImageDlg($);
    });
    setTimeout(function () {
        if (fifuVideoVars.fifu_woocommerce == 'on')
            fifu_fix_zoom();

        if (fifuVideoVars.fifu_divi_active == 'on')
            fifu_fix_divi();

        if (fifuVideoVars.fifu_is_elementor_active == 'on')
            fifu_fix_elementor();
    }, 200);
});

jQuery(document).click(function ($) {
    // zoom
    jQuery("a.woocommerce-product-gallery__trigger").on("click", function ($) {
        setTimeout(function () {
            replaceImageDlg($);
        }, 100);
    });
    // arrows
    jQuery("button.pswp__button").on("click", function ($) {
        replaceImageDlg($);
    });
});

jQuery(document).on("mouseover", function ($) {
    jQuery("#site-header-cart").on("mouseenter", function ($) {
        jQuery(".fifu-video").css("display", "inline");
        jQuery(".fifu-video").css("opacity", "100");
    });
})

jQuery(document).keydown(function (e) {
    setTimeout(function () {
        switch (e.which) {
            case 37:// left
                replaceImageDlg($);
                break;
            case 39:// right
                replaceImageDlg($);
                break;
        }
    }, 100);
});

function replaceVideoThumb($) {
    // check if elementor exists
    $position = typeof jQuery('div.elementor')[0] == "undefined" && fifuVideoVars.fifu_flatsome_active == 'on' ? 'unset' : 'relative';

    var height;
    var width;

    if (fifuVideoVars.fifu_home == 'on')
        selector = 'img.fifu-video';
    else
        selector = 'img';

    jQuery(selector).each(function (index) {
        src = jQuery(this).attr('src');
        if (!is_video_img(src))
            return;

        // the second condition is for related products
        if (fifuVideoVars.fifu_video_thumb_enabled_home == 'on' || fifuVideoVars.fifu_video_thumb_enabled_page == 'on' || jQuery(this).parent().parent().parent().attr('class') == 'products') {
            jQuery(this).css('opacity', 100);
            return;
        }

        // minimum video width
        minWidth = fifuVideoVars.fifu_video_min_width;
        width = jQuery(this)[0].width;
        if (minWidth && (width != null && (width < Number(minWidth) || width == 0)) && fifuVideoVars.fifu_is_home_or_shop == 'off') {
            jQuery(this).css('opacity', 100);
            return;
        }

        src = jQuery(this).attr('src');
        if (is_video_img(src)) {
            url = video_url(src);
            url = add_parameters(url, src);
            $autoplay = fifuVideoVars.fifu_autoplay_enabled == 'on' ? 'allow="autoplay"' : '';
            $background = '/wp-content/plugins/fifu-premium/includes/images/16x9-transparent.png';
            if (fifuVideoVars.fifu_video_black == 'on')
                $background = $background.replace('transparent', 'black');
            $video = '<div class="fifu_wrapper"><div class="fifu_h_iframe" style="position:' + $position + '"><img class="fifu_ratio" src="' + $background + '"/><iframe class="fifu_iframe" ' + fifuVideoVars.fifu_lazy_src_type + '"' + url + '" allowfullscreen frameborder="0" ' + $autoplay + ' "></iframe></div></div>';
            jQuery(this).replaceWith($video);
        }
    });
}

function replaceImageDlg($) {
    jQuery('div.pswp__zoom-wrap').each(function () {
        index = jQuery('.pswp__counter').html().split(' ')[0] - 1;
        element = jQuery('.woocommerce-product-gallery__image')[index];
        dataThumb = jQuery(element).attr('data-thumb');
        if (!is_video_img(dataThumb))
            return;
        url = video_url(dataThumb)
        img = jQuery(this).find('img.pswp__img');
        w = jQuery(window).width() * 0.62;
        if (!img[0])
            jQuery(this).replaceWith('<div class="pswp__zoom-wrap" style="transform: translate3d(0px, 0px, 0px) scale(1);">' + '<div class="wrapper"><div class="video-wrapper">' + '<iframe class="pswp__video" src="' + url + '" frameborder="0" allowfullscreen="" width="' + w + '" height="' + w * 9 / 16 + '"></iframe>' + '</div></div></div>');
    });
}

jQuery(document).ajaxComplete(function ($) {
    jQuery('.fifu-video').each(function (index) {
        jQuery(this).css('opacity', '100');
    });
});

function is_video_img($src) {
    return !$src ? null : is_youtube_img($src) || is_vimeo_img($src) || is_cloudinary_video_img($src) || is_tumblr_video_img($src) || is_imgur_video_img($src) || is_facebook_video_img($src) || is_instagram_video_img($src) || is_gag_video_img($src);
}

function is_youtube_img($src) {
    return $src.includes('img.youtube.com');
}

function is_vimeo_img($src) {
    return $src.includes('i.vimeocdn.com');
}

function is_cloudinary_video_img($src) {
    return $src.includes('res.cloudinary.com') && $src.includes('/video/');
}

function is_tumblr_video_img($src) {
    return $src.includes('tumblr.com');
}

function is_imgur_video_img($src) {
    return $src.includes('imgur.com');
}

function is_facebook_video_img($src) {
    return $src.includes('facebook.com');
}

function is_instagram_video_img($src) {
    return $src.includes('instagram.com');
}

function is_gag_video_img($src) {
    return $src.includes('9cache.com');
}

function video_id($src) {
    if (is_youtube_img($src))
        return youtube_id($src);
    if (is_vimeo_img($src))
        return vimeo_id($src);
    if (is_facebook_video_img($src))
        return facebook_id($src);
    return null;
}

function youtube_parameter($src) {
    return $src.split('?')[1];
}

function youtube_id($src) {
    return $src.split('/')[4];
}

function vimeo_id($src) {
    return $src.split('?')[1];
}

function facebook_id($src) {
    return $src.split('/')[3];
}

function video_url($src) {
    if (is_youtube_img($src))
        return youtube_url($src);
    if (is_vimeo_img($src))
        return vimeo_url($src);
    if (is_cloudinary_video_img($src))
        return cloudinary_url($src);
    if (is_tumblr_video_img($src))
        return tumblr_url($src);
    if (is_imgur_video_img($src))
        return imgur_url($src);
    if (is_facebook_video_img($src))
        return facebook_url($src);
    if (is_instagram_video_img($src))
        return instagram_url($src);
    if (is_gag_video_img($src))
        return gag_url($src);
    return null;
}

function youtube_url($src) {
    return 'https://www.youtube.com/embed/' + youtube_id($src) + '?' + youtube_parameter($src) + '&enablejsapi=1';
}

function vimeo_url($src) {
    return 'https://player.vimeo.com/video/' + vimeo_id($src);
}

function cloudinary_url($src) {
    return $src.replace('jpg', 'mp4');
}

function tumblr_url($src) {
    $tmp = $src.replace('https://78.media.tumblr.com', 'https://vt.media.tumblr.com');
    return $tmp.replace('_smart1.jpg', '.mp4');
}

function imgur_url($src) {
    return $src.replace('jpg', 'mp4');
}

function facebook_url($src) {
    return 'https://www.facebook.com/video/embed?video_id=' + facebook_id($src);
}

function instagram_url($src) {
    return $src.replace('media/?size=l', 'embed/');
}

function gag_url($src) {
    return $src.split('_')[0] + '_460svvp9.webm';
}

jQuery(document).ready(function ($) {
    enabled = fifuVideoVars.fifu_mouse_vimeo_enabled == 'on';
    if (!enabled)
        return;

    jQuery('iframe').each(function (index) {
        if (this.src.includes("vimeo.com")) {
            jQuery(this).on("mouseover", function () {
                $f(this).api("play");
            }).mouseout(function () {
                $f(this).api("pause");
            });
        }
    });
});

function onYouTubeIframeAPIReady() {
    enabled = fifuVideoVars.fifu_mouse_youtube_enabled == 'on';
    if (!enabled)
        return;

    jQuery('iframe').each(function (index) {
        if (this.src.includes("youtu")) {
            var x = new YT.Player(this);
            jQuery(this).on("mouseover", function () {
                x.playVideo();
            }).mouseout(function () {
                x.pauseVideo();
            });
        }
    });
}

function add_parameters(url, src) {
    loop = fifuVideoVars.fifu_loop_enabled == 'on';
    autoplay = fifuVideoVars.fifu_autoplay_enabled == 'on';
    video_related = fifuVideoVars.fifu_video_related_enabled == 'on';

    if ((loop || autoplay || video_related) && !url.includes('?'))
        url += '?muted=0&autopause=1';

    if (autoplay)
        url += '&autoplay=1';

    if (this.src.includes("youtu"))
        url += video_related ? '&rel=1' : '&rel=0';

    if (loop) {
        url += '&loop=1';
        if (is_youtube_img(src))
            url += '&playlist=' + video_id(src);
    }

    return url;
}

// for ajax load more plugin
window.almComplete = function (alm) {
    jQuery('img.fifu-video').css('opacity', 100);
    replaceVideoThumb($);
};

/* style issues */

function fifu_fix_elementor() {
    jQuery('div.fifu_wrapper').each(function (index) {
        // portfolio
        if (jQuery(this).parent().attr('class').includes('elementor-portfolio')) {
            jQuery(this).parent().attr('class', '');
            if (jQuery(this).parent().parent().attr('class').includes('elementor-')) {
                jQuery(this).parent().parent().attr('class', '');
            }
        }
        // posts
        if (jQuery(this).parent().attr('class').includes('elementor-post')) {
            jQuery(this).parent().attr('class', '');
        }
        // product category
        if (jQuery(this).parent().parent().attr('class').includes('product-category')) {
            jQuery(this).parent().parent().attr('class', '');
        }
    });
}

function fifu_fix_zoom() {
    jQuery('img[role=presentation]').css('z-index', '-100');
}

function fifu_fix_divi() {
    jQuery('div.fifu_h_iframe > div.fluid-width-video-wrapper').attr('class', '');
}
