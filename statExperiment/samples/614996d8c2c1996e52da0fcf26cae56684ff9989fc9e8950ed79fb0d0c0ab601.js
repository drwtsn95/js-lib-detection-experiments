window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.customMedia = {
    '--ssm': '(max-width:575.98px)',
    '--sm': '(min-width: 576px) and (max-width: 767.98px)',
    '--sm-max': '(max-width: 768px)',
    '--md': '(min-width: 768px) and (max-width: 991.98px)',
    '--lg': '(min-width: 992px) and (max-width: 1199.98px)',
};


var cookieContent = "";
var cookieName = 'JS_UserInfo' + "=";
var ca = document.cookie.split(';');
for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(cookieName) == 0) {
        cookieContent = c.substring(cookieName.length, c.length);
        break;
    }
}

var jsEnvironmentRT = {
    userInfo: {}
};

if(cookieContent) {
    var usertoParse = atob(cookieContent);
    usertoParse = JSON.parse(usertoParse, function(k, v){
        if(v === "true") {
            return true;
        }else if(v === "false") {
            return false;
        } else {
            return v;
        }
    });

    jsEnvironmentRT.userInfo = usertoParse;
} else {
    if(typeof jsEnvironment !== 'undefined') {
        jsEnvironmentRT.userInfo = jsEnvironment.userInfo;
        jsEnvironmentRT.userInfo["IsBancoEstadoMember"] = jsEnvironment.userInfo.IsBancoEstado;
        jsEnvironmentRT.userInfo["IsCug2Member"] = jsEnvironment.userInfo.IsCug2;
        jsEnvironmentRT.userInfo["IsCug3Member"] = jsEnvironment.userInfo.IsCug3;
    } else {
        jsEnvironmentRT.userInfo["IsBancoEstadoMember"] = false;
        jsEnvironmentRT.userInfo["IsCug2Member"] = false;
        jsEnvironmentRT.userInfo["IsCug3Member"] = false;
        jsEnvironmentRT.userInfo["IsLoggedIn"] = false;
        jsEnvironmentRT.userInfo["OrgName"] = null;
    }
}


if(jsEnvironmentRT.userInfo.IsCug2Member === undefined) jsEnvironmentRT.userInfo.IsCug2Member = false;

$(document).ready(function () {
    lazySizes.init();

    $('.rt-widget .popover-dismiss').popover({
        trigger: 'hover',
        container: '.popover-container',
        toggle: 'popover',
        placement: 'bottom',
    });

    $('.rt-widget .popover-dismiss').popover({
        trigger: 'hover',
        container: '.popover-container',
        toggle: 'popover',
        placement: 'bottom',
    });

    $(".rt-widget .menu").addClass("menu-loaded");
    $(".rt-widget .menu").removeClass("d-none");

    var lastPopover = '';

    $('.rt-widget .popover-dismiss').on('shown.bs.popover', function (ev) {
        lastPopover = ev.currentTarget.id;
    });

    $('.rt-widget .popover-dismiss').on('hidden.bs.popover', function () {
        lastPopover = '';
    });

    $('.rt-widget .popover-dismiss').on('click', function(el){
        var popOverId = el.currentTarget.id;

        if(lastPopover === popOverId) {
            $('#' + lastPopover).popover('hide');
        } else {
            $('#' + popOverId).popover('show');
        }
    });

    $(window).scroll(function () {
        var w = jQuery(this);
        var menu = jQuery(".rt-widget .menu");
        if ((w.scrollTop() + w.innerHeight()) > $("footer").offset().top) {
            menu.addClass("hide-footer");
        } else {
            menu.removeClass("hide-footer");
        }
    });

    var videoBtn = document.getElementById('video-icon');
    var videoGroup = document.getElementById('default-video-group');

    if (videoBtn) {
        videoBtn.setAttribute('data-toggle', 'modal');
        videoBtn.setAttribute('data-target', '.bd-example-modal-xl');

        var notification = document.createElement('div');
        notification.innerHTML = 1;
        notification.classList.add('notification');
        videoGroup.appendChild(notification);

        var url_value = "";
        var url = jQuery(".rt-widget .video-modal").data('video');
        var nameEQ = 'videoUrl' + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                url_value = c.substring(nameEQ.length, c.length);
                break;
            }
        }

        if (url_value === url) {
            jQuery(".rt-widget #default-video-group > .notification").addClass('d-none');
        }

        jQuery('.rt-widget .bd-example-modal-xl').on('shown.bs.modal', function () {
            $('.modal-backdrop').addClass('rt-widget');
            var video = '<iframe src="' + url + '" width="100%" height="450" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
            jQuery(".rt-widget .video-modal").html(video);

            if (url_value !== url) {
                var expires = "";
                var date = new Date();
                date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
                document.cookie = 'videoUrl' + "=" + url + expires + "; path=/";

                jQuery(".rt-widget #default-video-group > .notification").addClass('d-none');
            }
        }).on('hidden.bs.modal', function () {
            jQuery(".rt-widget .video-modal").html("");
        });

        var o = setInterval(function () {
            if (!jQuery(".rt-widget #default-video-group .notification").is(":visible")) {
                clearInterval(o);
                return false;
            }
            var movement = (jQuery(window).outerWidth() > 768) ? -20 : -10;
            var duration = 1;
            TweenMax.to(".rt-widget #default-video-group .notification", duration / 4, {
                y: movement,
                ease: Power2.easeOut
            });
            TweenMax.to(".rt-widget #default-video-group .notification", duration / 2, {
                y: 0,
                ease: Bounce.easeOut,
                delay: duration / 4
            });
        }, 3000);
    }

    if (jsEnvironmentRT.userInfo.IsBancoEstadoMember === true && jsEnvironmentRT.userInfo.IsCug2Member === false && jsEnvironmentRT.userInfo.IsCug3Member === false) {
        document.querySelectorAll(".rol-bancoestado").forEach(function (e) {
            e.className = e.className.replace(/d\-none/g, "");
        });
    } else if (jsEnvironmentRT.userInfo.IsBancoEstadoMember === false && jsEnvironmentRT.userInfo.IsCug2Member === false && jsEnvironmentRT.userInfo.IsCug3Member === true) {
        document.querySelectorAll(".rol-cug3").forEach(function (e) {
            e.className = e.className.replace(/d\-none/g, "");
        });
    } else {
        document.querySelectorAll(".rol-generico").forEach(function (e) {
            e.className = e.className.replace(/d\-none/g, "");
        });
    }
    document.querySelectorAll("*[class*='rol-'].d-none").forEach(function (e) {
        e.parentNode.removeChild(e);
    });

});