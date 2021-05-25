(function($){$(document).ready(function(){var $carousels=null;function setUpSlick(){if($(window).width()<768){if($carousels===null){$carousels=$('.rel_news__list[data-slick="true"]');$carousels.each(function(i,ele){$(ele).slick({responsive:[{breakpoint:4000,settings:"unslick"},{breakpoint:767,settings:{arrows:false,infinite:true,slidesToShow:1,slidesToScroll:1}}]});});}
return;}
if($(window).width()>=768){if($carousels!==null){$carousels.each(function(i,ele){$(ele).slick('unslick');});$carousels=null;}
return;}}
if($events!==undefined){$events.on('custom:resize',function(){setUpSlick();});}else{$(window).on('resize',function(){setUpSlick();});}
setUpSlick();});})(jQuery);