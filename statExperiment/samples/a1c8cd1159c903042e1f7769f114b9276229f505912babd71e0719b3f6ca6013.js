!function(t){"use strict";window.ff_bar_shortcode_init=function(){t(".ff-bar").each(function(){var o=t(this);o.css("transition-delay",o.attr("data-delay"))}),window.ff_bar_shortcode_wow=new WOW({boxClass:"ff-bar",animateClass:"ff-animated",offset:0,mobile:!0,live:!0,callback:function(o){var i=t(o);i.css("width",i.attr("data-width"))}}),window.ff_bar_shortcode_wow.init()},window.ff_bar_shortcode_reinit=function(){"ff_bar_shortcode_wow"in window&&window.ff_bar_shortcode_wow.stop(),t(".ff-bar").removeClass("ff-animated"),window.ff_bar_shortcode_init()},window.ff_bar_shortcode_init(),t(window).on("resize",function(){window.ff_bar_shortcode_init()})}(window.jQuery);