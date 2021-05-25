!function(){var t={players:document.getElementsByClassName("video-js"),info:function(t){return videojs(t).mediainfo},isPlayingVideo:function(t){return!videojs(t).paused()},isPlayingAd:function(t){return!(!videojs(t).ima3||!this.isAdActive(t))&&!videojs(t).ima3.adPlayer.paused()},isPlayingVideoOrAd:function(t){return this.isPlayingVideo(t)||this.isPlayingAd(t)},isAdActive:function(t){return"true"===t.getAttribute("data-ads-active")},adIsActive:function(t){return console.warn("The adIsActive() method is deprecated. Please use isAdActive() instead"),this.isAdActive(t)},playVideo:function(t){this.isPlayingVideo(t)||videojs(t).play()},pauseVideo:function(t){this.isPlayingVideo(t)&&videojs(t).pause()},playAd:function(t){this.isPlayingAd(t)||videojs(t).ima3.adPlayer.play()},pauseAd:function(t){this.isPlayingAd(t)&&videojs(t).ima3.adPlayer.pause()},stopAd:function(t){videojs(t).ima3&&videojs(t).ima3.adsManager&&videojs(t).ima3.adsManager.stop()},playVideoOrAd:function(t){this.isAdActive(t)?this.playAd(t):this.playVideo(t)},pauseVideoOrAd:function(t){this.isAdActive(t)?this.pauseAd(t):this.pauseVideo(t)},muteVideo:function(t){videojs(t).muted(!0)},unmuteVideo:function(t){videojs(t).muted(!1)},muteAd:function(t){return!!videojs(t).ima3&&void videojs(t).ima3.adPlayer.volume(0)},unmuteAd:function(t){return!!videojs(t).ima3&&void videojs(t).ima3.adPlayer.volume(.5)},muteVideoOrAd:function(t){this.isAdActive(t)?this.muteAd(t):this.muteVideo(t)},unmuteVideoOrAd:function(t){this.isAdActive(t)?this.unmuteAd(t):this.unmuteVideo(t)},start:function(e,a){t.prepare.player(e),t.init.player(e,a)},when:function(t,e,a){videojs(t).on(e,function(){a(this)})},forAll:function(t){for(var e=0;e<this.players.length;e++)t(this.players[e])},isInViewport:function(t,e,a){e&&"number"==typeof e||(e=0),a&&Array.isArray(a)||(a=[0,0,0,0]);var i=t.getBoundingClientRect();return i.top+e+Number(a[0])>=0&&i.right-e+Number(a[1])<=window.innerWidth&&i.bottom-e+Number(a[2])<=window.innerHeight&&i.left+e+Number(a[3])>=0},isMobile:function(){var t=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||window.opera),t},isMobileOrTablet:function(){var t=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||window.opera),t}};window.bcJumpstart=t,t._version=2}(),function(){bcJumpstart.enableCrossAccountPlayback=function(t){if("true"!==t.getAttribute("data-cross-account-eval-executed")){var e=t.getAttribute("data-jumpstart-account"),a=t.getAttribute("data-jumpstart-player"),i=t.getAttribute("data-brand"),r="production",n=!1;if(e&&a&&i&&bcJumpstart.accounts[i]&&bcJumpstart.accounts[i].account_id!==e&&(n=!0,bcJumpstart.accounts[i].staging_config.player_id==a&&(r="staging")),n){t.setAttribute("data-cross-account-eval-executed","true");var o="default";for(account in bcJumpstart.accounts)bcJumpstart.accounts[account].account_id==e&&(o=bcJumpstart.accounts[account][r+"_config"].player_id,t.setAttribute("data-shared-from",account),t.setAttribute("data-shared-to",i));t.setAttribute("data-preventstart","true"),t.setAttribute("data-jumpstart-player",o);var s=document.createElement("script");s.src="//cdn.video.timeinc.com/configs/"+i+"/"+r+".js",document.body.appendChild(s),s.onload=function(){t.removeAttribute("data-brand"),t.setAttribute("data-preventstart","false"),bcJumpstart.start(t)},s.onerror=function(){console.error("Jumpstart: Cross Account Video Proceeding With Origin Account Config"),t.removeAttribute("data-brand"),t.setAttribute("data-preventstart","false"),bcJumpstart.start(t)}}}}}(),function(){var t={manual:function(t,e,a){var i=videojs(t);i.catalog.getVideo(e,function(t,e){i.catalog.load(e),a&&i.ready(function(){i.play()})})},auto:function(t,e){for(var a=0;a<e.length;a++)e[a].addEventListener("click",function(){var e=this.getAttribute("data-video-id");bcJumpstart.loadplay.manual(t,e,!0)})},playlist:{load:function(t,e,a){var i=videojs(t);return e?void i.catalog.getPlaylist(e,function(t,e){i.catalog.load(e),a&&i.ready(function(){i.play()})}):i.playlist()},play:function(t,e,a){var i=videojs(t);if("next"===e||"previous"===e)i.playlist[e]();else{if("number"!=typeof e)return i.playlist.currentItem();i.playlist.currentItem(e)}a&&i.ready(function(){i.play()})}}};bcJumpstart.loadplay=t}(),function(){bcJumpstart.autoplay=function(t){var e=t.getAttribute("data-autoplay");if(!bcJumpstart.isMobileOrTablet()&&"false"!==e){if("true"===e)return void bcJumpstart.playVideoOrAd(t);var a=document.referrer.indexOf(location.protocol+"//"+location.host)>=0,i=t.getAttribute("data-autoplay-referrers"),r=!1;if("external"!==e||a||(r=!0),"internal"===e&&a&&(r=!0),r)bcJumpstart.playVideoOrAd(t);else if(i){i=i.split(",");for(var n=0;n<i.length;n++)document.referrer.indexOf(i[n].trim())>=0&&bcJumpstart.playVideoOrAd(t)}}}}(),function(){function t(){var r=window.pageYOffset;return i===r?void a(t):(i=r,e(),a(t),void 0)}bcJumpstart.scrollFunctions=[];var e=function(){for(var t=0;t<bcJumpstart.scrollFunctions.length;t++)bcJumpstart.scrollFunctions[t]()},a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame,i=window.pageYOffset;a&&t()}(),function(){bcJumpstart.scrollFunctions.push(function viewplay(){bcJumpstart.forAll(function(t){var e=t.getAttribute("data-ready"),viewplay=t.getAttribute("data-viewplay"),a=!bcJumpstart.isMobileOrTablet(),i=t.getAttribute("data-viewplay-tracker"),r=t.offsetHeight/2,n=t.getAttribute("data-view-offset");n&&(n=n.split(",")),e&&viewplay&&"false"!==viewplay&&(bcJumpstart.isInViewport(t,r,n)?"played"!==i&&a&&(bcJumpstart.playVideoOrAd(t),t.setAttribute("data-viewplay-tracker","played")):i&&"paused"!==i&&(bcJumpstart.pauseVideoOrAd(t),t.setAttribute("data-viewplay-tracker","paused")),"true"!==t.getAttribute("data-stoppable")&&(t.addEventListener("click",function(){this.setAttribute("data-viewplay","false")}),t.setAttribute("data-stoppable","true")))})})}(),function(){var t={enabled:!1,wrap:function(t){var e=document.createElement("div");e.classList.add("jumpstart-sticky-outer");var a=t.getAttribute("data-sticky-theme")||"3";e.classList.add("jumpstart-sticky-theme-"+a);var i=document.createElement("div");i.classList.add("jumpstart-sticky-inner");var r=document.createElement("div");r.classList.add("jumpstart-sticky-controls"),r.innerHTML='<div class="jumpstart-sticky-resize-btn"></div><div class="jumpstart-sticky-close-btn"></div><div class="jumpstart-sticky-slide-btn"></div>',i.appendChild(r),t.parentNode.insertBefore(e,t),e.appendChild(i),i.appendChild(t)},enableControls:function(t){for(var e=0;e<t.length;e++){var a="true"===t[e].getAttribute("data-controllable");if(!a){var i=t[e].querySelector(".jumpstart-sticky-resize-btn");i.addEventListener("click",function(){var t=this.parentElement.parentElement;t.classList.contains("jumpstart-sticky-large")?t.classList.remove("jumpstart-sticky-large"):t.classList.add("jumpstart-sticky-large")});var r=t[e].querySelector(".jumpstart-sticky-slide-btn");r.addEventListener("click",function(){var t=this.parentElement.parentElement,e=t.querySelector(".video-js");t.classList.contains("jumpstart-sticky-slide")?(t.classList.remove("jumpstart-sticky-slide"),e.setAttribute("data-sticky-hidden","false"),bcJumpstart.playVideoOrAd(e)):(t.classList.add("jumpstart-sticky-slide"),e.setAttribute("data-sticky-hidden","true"),bcJumpstart.pauseVideoOrAd(e),t.removeAttribute("style"))});var n=t[e].querySelector(".jumpstart-sticky-close-btn");n.addEventListener("click",function(t){var e=this.parentElement.parentElement,a=e.querySelector(".video-js"),i=a.getAttribute("data-sticky-theme")||"3";if("3"==i){bcJumpstart.isPlayingVideoOrAd(a)?bcJumpstart.pauseVideoOrAd(a):(bcJumpstart.when(a,"ads-ad-started",function(t){bcJumpstart.pauseVideoOrAd(document.getElementById(t.id()))}),bcJumpstart.when(a,"ads-pod-started",function(t){bcJumpstart.pauseVideoOrAd(document.getElementById(t.id()))})),a.setAttribute("data-stickyplay","false");for(var r=0;r<bcJumpstart.scrollFunctions.length;r++)"stickyplay"==bcJumpstart.scrollFunctions[r].name&&bcJumpstart.scrollFunctions[r]()}else{var n=e.querySelector(".jumpstart-sticky-slide-btn");n.click()}}),t[e].setAttribute("data-controllable","true")}}},enableDragging:function(t){var e="true"===t.getAttribute("data-draggable");if(!e){var a,i,r,n,o=!1,s=t;s.addEventListener("mousedown",function(t){o=!0,r=s.offsetLeft,n=s.offsetTop,a=t.pageX,i=t.pageY}),document.addEventListener("mousemove",function(t){if(o?document.body.style.userSelect="none":document.body.style.userSelect="inherit",o){var e=s.parentElement.classList.contains("jumpstart-sticky-active");if(e){var c=20,d=function(e){var i=r+t.pageX-a,n=document.body.clientWidth-s.offsetWidth-c;return i>=n&&(i=n),i<=0&&(i=0),document.body.clientWidth/2>i?"left"===e?i+c/2+"px":"auto":"right"===e?-(i-n)+"px":"auto"},u=function(e){var a=n+t.pageY-i,r=window.innerHeight-s.offsetHeight-c;return a>=r&&(a=r),a<=0&&(a=0),window.innerHeight/2>a?"top"===e?a+c/2+"px":"auto":"bottom"===e?-(a-r)+"px":"auto"};s.style.left=d("left"),s.style.top=u("top"),s.style.right=d("right"),s.style.bottom=u("bottom")}}}),document.addEventListener("mouseup",function(t){o=!1}),t.setAttribute("data-draggable","true")}},init:function(){bcJumpstart.forAll(function(e){"desktop"===e.getAttribute("data-stickyplay")&&(bcJumpstart.isMobileOrTablet()||e.setAttribute("data-stickyplay","true"));var a="true"===e.getAttribute("data-stickyplay"),i="true"===e.getAttribute("data-sticky-wrapped");a&&!i&&(t.wrap(e),e.setAttribute("data-sticky-wrapped","true"),t.enabled=!0)}),t.enableControls(document.querySelectorAll(".jumpstart-sticky-controls")),bcJumpstart.forAll(function(e){e.parentElement.classList.contains("jumpstart-sticky-inner")&&t.enableDragging(e.parentElement)}),t.style()},handle:function(){for(var e=0;e<bcJumpstart.scrollFunctions.length;e++)if("stickyplay"==bcJumpstart.scrollFunctions[e].name)return;bcJumpstart.scrollFunctions.push(function stickyplay(){var e=[];bcJumpstart.forAll(function(a){var i=a.parentElement.getBoundingClientRect().top<=window.innerHeight,r="true"===a.getAttribute("data-stickyplay"),n="true"===a.getAttribute("data-ready"),o="true"==a.getAttribute("data-sticky-wrapped"),s="true"==a.getAttribute("data-last-played");i&&r&&n&&s&&(o||t.init(),e.push(a))});var a=e[e.length-1],i=!1,r=!1,n=0;if(a){i=a.parentElement.parentElement,n=i.classList.contains("jumpstart-sticky-active")?i.offsetHeight/2.5:a.offsetHeight/2.5;var o=a.getAttribute("data-view-offset");o&&(o=o.split(","),n+=Number(o[0])),r=i.getBoundingClientRect().top+n<=0}var s=function(){for(var t=document.querySelectorAll(".jumpstart-sticky-active"),e=0;e<t.length;e++)t[e].classList.remove("jumpstart-sticky-active"),t[e].classList.add("jumpstart-sticky-inactive")},c=function(t){var e=t.querySelector(".jumpstart-sticky-inner");e.classList.contains("jumpstart-sticky-slide")&&bcJumpstart.pauseVideoOrAd(e.querySelector(".video-js"))};if(i&&r)s(),c(i),i.classList.add("jumpstart-sticky-active"),i.classList.remove("jumpstart-sticky-inactive");else{var d=document.querySelector(".jumpstart-sticky-active");d&&(d.classList.remove("jumpstart-sticky-active"),d.classList.add("jumpstart-sticky-inactive"))}})},style:function(){if(t.enabled){var e=document.createElement("link");e.type="text/css",e.rel="stylesheet",e.href="//cdn.video.timeinc.com/jumpstart/v2/css/jumpstart-sticky.min.css",document.head.appendChild(e)}}};bcJumpstart.stickyplay=function(){bcJumpstart.isMobileOrTablet()||(t.init(),t.handle())},bcJumpstart.stickyplay()}(),function(){bcJumpstart.accounts={coastalliving:{account_id:"717659024",staging_config:{player_id:"rklIyUX5Wl"},production_config:{player_id:"default"}},cookinglight:{account_id:"1260616200",staging_config:{player_id:"HyesZSISA"},production_config:{player_id:"default"}},departures:{account_id:"3281700262001",staging_config:{player_id:"HysIeeUEg"},production_config:{player_id:"default"}},thedrive:{account_id:"4453423237001",staging_config:{player_id:"ByfwXfYY"},production_config:{player_id:"default"}},entertainmentweekly:{account_id:"219646971",staging_config:{player_id:"B1WUO3562"},production_config:{player_id:"default"}},essence:{account_id:"716147494",staging_config:{player_id:"SJGmXdXTO"},production_config:{player_id:"default"}},extracrispy:{account_id:"4863540596001",staging_config:{player_id:"SJOIKftY"},production_config:{player_id:"default"}},fansided:{account_id:"4523394907001",staging_config:{player_id:"HkYGGB3ue"},production_config:{player_id:"H1kffS2dg"}},foodandwine:{account_id:"1660653193",staging_config:{player_id:"SJ6MKWKF"},production_config:{player_id:"default"}},fortune:{account_id:"2111767321001",staging_config:{player_id:"H16y53vkx"},production_config:{player_id:"default"}},foundry:{account_id:"2678795020001",staging_config:{player_id:"B1FpNCG8g"},production_config:{player_id:"B1FpNCG8g"}},golf:{account_id:"416418725",staging_config:{player_id:"SJNdaGcK"},production_config:{player_id:"default"}},health:{account_id:"1125866826",staging_config:{player_id:"HJmOH6O5t"},production_config:{player_id:"default"}},hellogiggles:{account_id:"4607804089001",staging_config:{player_id:"S1d2awVXl"},production_config:{player_id:"default"}},instyle:{account_id:"429048909",staging_config:{player_id:"BkIrpQrO"},production_config:{player_id:"default"}},instyleuk:{account_id:"463898948",staging_config:{player_id:"default"},production_config:{player_id:"default"}},myrecipes:{account_id:"429048911",staging_config:{player_id:"SJ3KvaOt"},production_config:{player_id:"default"}},onetimeinc:{account_id:"1543367584",staging_config:{player_id:"HJM9r9Pvl"},production_config:{player_id:"default"}},people:{account_id:"416418724",staging_config:{player_id:"BJpKzVWK"},production_config:{player_id:"default"}},peopleenespanol:{account_id:"958536773",staging_config:{player_id:"B1dLEKJxl"},production_config:{player_id:"default"}},pethero:{account_id:"5542599127001",staging_config:{player_id:"BJlvkvP7ub"},production_config:{player_id:"default"}},realsimple:{account_id:"507936866",staging_config:{player_id:"HyByeUad"},production_config:{player_id:"default"}},sik:{account_id:"2157889318001",staging_config:{player_id:"SkzutW8B1e"},production_config:{player_id:"r1ZfrwIye"}},southernliving:{account_id:"474428695",staging_config:{player_id:"HJksn33Zg"},production_config:{player_id:"default"}},sportsillustrated:{account_id:"2157889318001",staging_config:{player_id:"rkSj7cPd"},production_config:{player_id:"default"}},sunset:{account_id:"1138497952",staging_config:{player_id:"SJRk3h3Wx"},production_config:{player_id:"default"}},time:{account_id:"293884104",staging_config:{player_id:"Bk63cZD6"},production_config:{player_id:"SJa0Thl7"}},tpe:{account_id:"4604582129001",staging_config:{player_id:"SJY24FR0"},production_config:{player_id:"default"}},travelandleisure:{account_id:"3281700261001",staging_config:{player_id:"rJfJWpZKt"},production_config:{player_id:"default"}},xojane:{account_id:"4838167537001",staging_config:{player_id:"Skz9CCikx"},production_config:{player_id:"default"}}}}(),function(){bcJumpstart.prepare={player:function(t){if("true"!=t.getAttribute("data-prepared")&&"true"!=t.getAttribute("data-ready")){var e=t.getAttribute("data-account"),a=t.getAttribute("data-player");t.removeAttribute("data-account"),t.removeAttribute("data-player"),t.setAttribute("data-jumpstart-account",e),t.setAttribute("data-jumpstart-player",a),t.setAttribute("data-prepared","true")}}},bcJumpstart.init={player:function(t,e){if(bcJumpstart.enableCrossAccountPlayback(t),"true"!=t.getAttribute("data-preventstart")&&"true"!=t.getAttribute("data-intializing")&&(t.setAttribute("data-intializing","true"),"true"!=t.getAttribute("data-ready"))){var a=t.getAttribute("data-jumpstart-account"),i=t.getAttribute("data-jumpstart-player");t.getAttribute("data-brand");bcJumpstart.init.brightcove(t,a,i,e)}},brightcove:function(t,e,a,i){var r=document.createElement("script");r.src="//players.brightcove.net/"+e+"/"+a+"_default/index.min.js",t.parentNode.insertBefore(r,t.nextSibling),r.onload=function(){t.setAttribute("data-account",e),t.setAttribute("data-player",a),"true"==t.getAttribute("data-controls")&&t.setAttribute("controls","true");try{bc(t)}catch(e){console.error("Jumpstart: failed to start",t,e)}videojs(t).ready(function(){t=document.getElementById(this.id()),bcJumpstart.init.coreListeners(t,i)})}},coreListeners:function(t,e){var a=!window.bcJumpstart.isInViewport(t,t.offsetHeight/2),i="true"!==t.getAttribute("data-is-lead");a&&i&&(t.setAttribute("data-viewplay","false"),t.getAttribute("data-is-lead")&&(t.setAttribute("data-autoplay","false"),t.setAttribute("data-stickyplay","false"))),t.setAttribute("data-ready","true");var r=function(t,e,a){bcJumpstart.when(t,e,function(){t.setAttribute("data-ads-active",a)})};r(t,"ads-ad-started","true"),r(t,"ads-pod-started","true"),r(t,"ads-ad-ended","false"),r(t,"ads-pod-ended","false"),r(t,"adserror","false");var n=function(t,e){bcJumpstart.when(t,e,function(){var e=t.id;bcJumpstart.forAll(function(t){var a="true"==t.getAttribute("data-ready"),i="true"==t.getAttribute("data-multiplay");t.id!==e&&a&&!i?(bcJumpstart.pauseVideoOrAd(t),t.setAttribute("data-last-played","false")):t.setAttribute("data-last-played","true");for(var r=0;r<bcJumpstart.scrollFunctions.length;r++)bcJumpstart.scrollFunctions[r]()});var a=t.parentElement.parentElement,i=a.classList.contains("jumpstart-sticky-active"),r="true"==t.getAttribute("data-sticky-hidden");i&&r&&bcJumpstart.pauseVideoOrAd(t)})};n(t,"play"),n(t,"ads-play"),n(t,"ads-ad-started"),bcJumpstart.init.specialEvents(t,e)},specialEvents:function(t,e){e&&e(),bcJumpstart.autoplay(t);for(var a=0;a<bcJumpstart.scrollFunctions.length;a++)bcJumpstart.scrollFunctions[a]();var i=new CustomEvent("jumpstartPlayerReady");if(t.parentElement.dispatchEvent(i),bcJumpstart._readyPlayers?bcJumpstart._readyPlayers++:bcJumpstart._readyPlayers=1,bcJumpstart._readyPlayers==bcJumpstart.players.length){var r=new CustomEvent("allJumpstartPlayersReady");window.dispatchEvent(r)}},core:function(){bcJumpstart.forAll(function(t){bcJumpstart.start(t)})}}}(),function(){var t=function(){console.warn("JUMPSTART: Rebinding is no longer required. Please remove your deprecated rebind method call.")};bcJumpstart.rebind={all:t,core:t,stickyplay:t,viewplay:t},bcJumpstart.ready=function(t,e){e?"true"==e.getAttribute("data-ready")?t(e):e.parentElement.addEventListener("jumpstartPlayerReady",function(e){var a=e.target.querySelector("video");t(document.getElementById(videojs(a).id()))},!1):bcJumpstart._readyPlayers==bcJumpstart.players.length?t():window.addEventListener("allJumpstartPlayersReady",function(e){t(e)},!1)}}(),function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var a=document.createEvent("CustomEvent");return a.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),a}return"function"!=typeof window.CustomEvent&&(t.prototype=window.Event.prototype,void(window.CustomEvent=t))}(),function(){var t=new CustomEvent("jumpstartLoad");window.dispatchEvent(t)}(),function(){bcJumpstart.init.core()}();
