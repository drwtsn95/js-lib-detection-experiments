(function($){var lazyloader_icon;Drupal.behaviors.lazyloader={attach:function(context,settings){if(!(context instanceof Document)){return;}
if(lazyloader_icon==undefined){lazyloader_icon=new Image();$(lazyloader_icon).attr({src:settings.lazyloader.icon}).addClass('lazyloader-icon');}
if(settings.lazyloader.icon!=''){$('img[data-echo]').each(function(){var $img=$(this);if(!$img.attr('data-echoed')){var $parent=$($img.parent());var $icon=$(lazyloader_icon).clone();var left=Math.floor($img.width()/2+settings.lazyloader.offsetX);var top=-Math.floor($img.height()/2-settings.lazyloader.offsetY);$icon.css({float:'left',position:'relative',top:top+'px',left:left+'px',});$($icon).insertAfter($img);$img.attr('data-echoed','1');}});}
echo.init({offset:settings.lazyloader.offset,throttle:settings.lazyloader.throttle,unload:settings.lazyloader.unload,debounce:settings.lazyloader.debounce,callback:function(element,op){$(element).next('.lazyloader-icon').remove();}});$('img[data-echo], [data-echo-background]').each(function(){$(this).parents().each(function(){if($(this).css('overflow')=='scroll'){$(this).bind('scroll',function(){lazyloaderDebounceOrThrottle(settings.lazyloader.debounce,settings.lazyloader.throttle)});}});});},detach:function(context,settings){echo.detach();},poll:null};})(jQuery);function lazyloaderDebounceOrThrottle(debounce,throttle){if(!debounce&&!!Drupal.behaviors.lazyloader.poll){return;}
clearTimeout(Drupal.behaviors.lazyloader.poll);Drupal.behaviors.lazyloader.poll=setTimeout(function(){echo.render();Drupal.behaviors.lazyloader.poll=null;},throttle);};;/*!echo-js v1.7.3 | (c) 2016 @toddmotto | https://github.com/toddmotto/echo*/!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):"object"==typeof exports?module.exports=e:t.echo=e(t)}(this,function(t){"use strict";var e,n,o,r,c,a={},u=function(){},d=function(t){return null===t.offsetParent},l=function(t,e){if(d(t))return!1;var n=t.getBoundingClientRect();return n.right>=e.l&&n.bottom>=e.t&&n.left<=e.r&&n.top<=e.b},i=function(){(r||!n)&&(clearTimeout(n),n=setTimeout(function(){a.render(),n=null},o))};return a.init=function(n){n=n||{};var d=n.offset||0,l=n.offsetVertical||d,f=n.offsetHorizontal||d,s=function(t,e){return parseInt(t||e,10)};e={t:s(n.offsetTop,l),b:s(n.offsetBottom,l),l:s(n.offsetLeft,f),r:s(n.offsetRight,f)},o=s(n.throttle,250),r=n.debounce!==!1,c=!!n.unload,u=n.callback||u,a.render(),document.addEventListener?(t.addEventListener("scroll",i,!1),t.addEventListener("load",i,!1)):(t.attachEvent("onscroll",i),t.attachEvent("onload",i))},a.render=function(n){for(var o,r,d=(n||document).querySelectorAll("[data-echo], [data-echo-background]"),i=d.length,f={l:0-e.l,t:0-e.t,b:(t.innerHeight||document.documentElement.clientHeight)+e.b,r:(t.innerWidth||document.documentElement.clientWidth)+e.r},s=0;i>s;s++)r=d[s],l(r,f)?(c&&r.setAttribute("data-echo-placeholder",r.src),null!==r.getAttribute("data-echo-background")?r.style.backgroundImage="url("+r.getAttribute("data-echo-background")+")":r.src!==(o=r.getAttribute("data-echo"))&&(r.src=o),c||(r.removeAttribute("data-echo"),r.removeAttribute("data-echo-background")),u(r,"load")):c&&(o=r.getAttribute("data-echo-placeholder"))&&(null!==r.getAttribute("data-echo-background")?r.style.backgroundImage="url("+o+")":r.src=o,r.removeAttribute("data-echo-placeholder"),u(r,"unload"));i||a.detach()},a.detach=function(){document.removeEventListener?t.removeEventListener("scroll",i):t.detachEvent("onscroll",i),clearTimeout(n)},a});;;