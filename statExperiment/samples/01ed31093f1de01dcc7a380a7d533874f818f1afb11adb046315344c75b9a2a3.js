function getfbcount(a){var b=0;$.getJSON("http://graph.facebook.com/?ids="+a,function(c){b=c[a].shares,0===b&&(b=""),$(".js-yura-social__count--fb").html(b)}),setTimeout(function(){void 0===b&&(b="",$(".social_box .facebook span").html(b))},2e3)}function gettwcount(a){var b="";$.getJSON("http://urls.api.twitter.com/1/urls/count.json?url="+a+"&callback=?",function(a){b=a.count,0===b&&(b=""),$(".js-yura-social__count--tw").html(b)})}function getgpcount(a){var b="";window.services||(window.services={}),window.services.gplus={cb:function(a){b=parseInt(a),0===b&&(b=""),$(".js-yura-social__count--gp").html(b)}},$.getJSON("http://share.yandex.ru/gpp.xml?url="+a+"&callback=?",function(a){})}function initialize_google_maps_for_company(){function a(){var a=e.getPlace(),c={origin:a.geometry.location,destination:b,travelMode:google.maps.TravelMode.DRIVING};g.route(c,function(a,b){b===google.maps.DirectionsStatus.OK?f.setDirections(a):window.alert("Directions request failed due to "+b)})}$(".b-yura-modal__bg").fadeIn(),$(".b-yura-modal").fadeIn();var b=new google.maps.LatLng(this_company_lat,this_company_lng),c={zoom:15,center:b,mapTypeControl:!1},d=new google.maps.Map(document.getElementById("map-canvas"),c),e=(new google.maps.Marker({position:b,map:d,title:this_company_name}),new google.maps.places.Autocomplete(document.getElementById("js-yura-modal__input"),{types:["geocode"]}));e.addListener("place_changed",a);var f,g;g=new google.maps.DirectionsService,f=new google.maps.DirectionsRenderer,f.setMap(d)}!function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}(),function(a){a.fn.livefilter=function(c,d){return"undefined"==typeof c&&(c="init"),"object"==typeof c&&(d=c,c="init"),"init"===c?(d=a.extend({},a.fn.livefilter.defaults,d),a(this).data("lf-data",d),a(this).unbind(".livefilter").bind("keyup.livefilter",a.fn.livefilter.onKey(d))):"destroy"===c?(d=a(this).data("lf-data"),a(d.selector).filter("."+d.hiddenClass)[d.showFn](),a(this).unbind(".livefilter")):b("action unknown",c),a(this)},a.fn.livefilter.onKey=function(c){var d=function(){var d=a(this).val();b("filtering",d),d?a(c.selector).filter(":icontains("+d+")")[c.showFn]().removeClass(c.hiddenClass).end().filter(":not(:icontains("+d+"))")[c.hideFn]().addClass(c.hiddenClass):a(c.selector).removeClass(c.hiddenClass)[c.showFn]()};return c.debounce&&(b("debounce active",c.debounce),d=a.fn.livefilter.debounce(d,c.debounce)),d},a.fn.livefilter.debounce=function(a,b){var c;return function(){function d(){a.apply(e,f),c=null}var e=this,f=arguments;c&&clearTimeout(c),c=setTimeout(d,b||100)}},a.expr[":"].icontains=function(a,b,c,d){return(a.textContent||a.innerText||jQuery(a).text()||"").toLowerCase().indexOf(c[3].toLowerCase())>=0};var b=function(){"undefined"!=typeof console&&console.log&&console.log(Array.prototype.slice.call(arguments).join(", "))};a.fn.livefilter.defaults={selector:"tbody tr",debounce:500,hiddenClass:"lf-hidden",showFn:"show",hideFn:"hide"}}(jQuery),$(document).ready(function(){"use strict";var a=$('link[rel="canonical"]').attr("href"),b='<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">';if($("head").append(b),$(document).width()>=760){var c='<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,300,700">';$("head").append(c),$("body").css("font-family","'Roboto', sans-serif"),setTimeout(function(){gettwcount(a),getfbcount(a),getgpcount(a)},300)}var d=$(".b-yura-social__link--fb");d.attr("href",d.attr("href")+a);var e=$(".b-yura-social__link--tw");e.attr("href",e.attr("href")+a);var f=$(".b-yura-social__link--gp");f.attr("href",f.attr("href")+a),$('textarea[name="opening_hours"]').attr("placeholder","Sunday: Closed\nMonday: 09:00 pm - 18:00 pm\nTuesday: 09:00 pm - 18:00 pm\nWednesday: 09:00 pm - 18:00 pm\nThursday: 09:00 pm - 18:00 pm\nFriday: 09:00 pm - 18:00 pm\nSaturday: Closed"),$('textarea[name="description"]').attr("placeholder","The minimum description length of 160 characters.\nDo not copy the description from other sources!\nBefore publishing we check the uniqueness of the description."),$.get("/ajax.php?kind=getcatlist",function(a){$(".js-yura-right__cat").html(a)}),$(".js-yura-right__cat").change(function(){var a=$(".js-yura-right__cat").val();$.get("/ajax.php?kind=region&id="+a,function(a){$(".js-yura-right__reg").html(a),$(".js-yura-right__reg").removeAttr("disabled"),$(".js-yura-right__loc").html("<option>Select region</option>"),$(".js-yura-right__loc").attr("disabled","")})}),$(".js-yura-right__reg").change(function(){var a=$(".js-yura-right__reg").val(),b=$(".js-yura-right__cat").val();$.get("/ajax.php?kind=locality&id_cat="+b+"&id_reg="+a,function(a){$(".js-yura-right__loc").html(a),$(".js-yura-right__loc").removeAttr("disabled")})}),$(".js-yura-right__loc").change(function(){var a=$(".js-yura-right__loc").val(),b=$(".js-yura-right__reg").val(),c=$(".js-yura-right__cat").val();0!==a&&0!==b&&0!==c&&$.get("/ajax.php?kind=navlink&id_cat="+c+"&id_reg="+b+"&id_loc="+a,function(a){document.location.href=a})}),$(".js-yura-livefilter__select").livefilter({selector:".js-yura-livefilter__item"}),$(".js-yura-map-box__modal").click(function(){initialize_google_maps_for_company()}),$(".b-yura-modal__close").click(function(){$(".b-yura-modal__bg").fadeOut(),$(".b-yura-modal").fadeOut()}),$(".b-yura-modal__bg").click(function(){$(".b-yura-modal__bg").fadeOut(),$(".b-yura-modal").fadeOut()}),$(document).keyup(function(a){27==a.keyCode&&($(".b-yura-modal__bg").fadeOut(),$(".b-yura-modal").fadeOut())})});