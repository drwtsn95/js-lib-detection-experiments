// 0. JAVASCRIPT LAYER [ 0.00 PRELOAD SCRIPTS ] #######################################################################

// 0.1. PRELOADER -----------------------------------------

jQuery('html').addClass('preloader');

// 0.1. END -----------------------------------------------

// 0.2 LOAD FUNCTIONS -------------------------------------

// 0.2. END -----------------------------------------------
// 0. JAVASCRIPT LAYER [ 0.01 GLOBAL DEFINE ] #########################################################################

;(function ($) {
  'use strict'

  var tmpl = function (id, data) {
    var f = tmpl.cache[id]
    return data ? f(data, tmpl) : function (data) {
      return f(data, tmpl)
    }
  }
  tmpl.cache = {}
  tmpl.encReg = /[<>&"'\x00]/g // eslint-disable-line no-control-regex
  tmpl.encMap = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;'
  }
  tmpl.encode = function (s) {
    return (s == null ? '' : '' + s).replace(
      tmpl.encReg,
      function (c) {
        return tmpl.encMap[c] || ''
      }
    )
  }
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return tmpl
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = tmpl
  } else {
    $.tmpl = tmpl
  }
}(this))




// 0. JAVASCRIPT LAYER [ 0.02 DEVICE CHECK ] ##########################################################################
    
// 0.1. DEVICE CHECK --------------------------------------------------------------------------------------------------

function initDeviceCheck() {

  var deviceAgent = navigator.userAgent.toLowerCase();

  jQuery('html').addClass('desktop');

  if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
    jQuery('html').removeClass('desktop');
    jQuery('html').addClass('ios');
    jQuery('html').addClass('mobile');
  }

  if (deviceAgent.match(/android/)) {
    jQuery('html').removeClass('desktop');
    jQuery('html').addClass('android');
    jQuery('html').addClass('mobile');
  }

  if (deviceAgent.match(/blackberry/)) {
    jQuery('html').removeClass('desktop');
    jQuery('html').addClass('blackberry');
    jQuery('html').addClass('mobile');
  }

  if (deviceAgent.match(/(symbianos|^sonyericsson|^nokia|^samsung|^lg)/)) {
    jQuery('html').removeClass('desktop');
    jQuery('html').addClass('mobile');
  }

}

// 0.1. END -----------------------------------------------------------------------------------------------------------
  
// 0.0 END ############################################################################################################
// 0. JAVASCRIPT LAYER [ 0.03 EQUAL HEIGHTS ] #########################################################################
    
// 0.1. EQUAL HEIGHTS -------------------------------------------------------------------------------------------------

/*
    http://codepen.io/micahgodbolt/pen/FgqLc

    Thanks to CSS Tricks for pointing out this bit of jQuery
    http://css-tricks.com/equal-height-blocks-in-rows/
    It's been modified into a function called at page load and then each time the page is resized.
    One large modification was to remove the set height before each new calculation.
*/

var equalheight;
equalheight = function (container) {
  var currentTallest = 0,
    currentRowStart = 0,
    topPosition = 0,
    currentDiv = 0,
    rowDivs = [],
    $el;
  jQuery(container).each(function () {

    $el = jQuery(this);
    jQuery($el).height('auto');
    topPosition = $el.position().top;

    if (currentRowStart != topPosition) {
      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
      rowDivs.length = 0; // empty the array
      currentRowStart = topPosition;
      currentTallest = $el.height();
      rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
};

// 0.1. END -----------------------------------------------------------------------------------------------------------

// 0.0 END ############################################################################################################

// 0.2 LOAD FUNCTIONS -------------------------------------

initDeviceCheck();

// 0.2. END -----------------------------------------------

// 0. JAVASCRIPT LAYER [ 0.00 PRELOAD SCRIPTS END ] ###################################################################
// 1. JAVASCRIPT LAYER [ 1.00 WINDOW READY START ] ####################################################################
jQuery(window).on('load', function($) {

  // PRELOADER --------------------------------------------

  jQuery('html').removeClass('preloader');
  jQuery('html').addClass('lab-app');

  // LOAD FUNCTIONS ---------------------------------------

  initToggleFunctions();
  initCarouselFunctions();
  initEqualheightsFunctions();
  initScrollIntoView();
  // initQuizFunctions();

// 1. JAVASCRIPT LAYER [ 1.01 GLOBAL FUNCTIONS ] ######################################################################

jQuery(window).on("resize", function () {

  // A.1. SCREEN SIZE CHECK ---------------------------------------------------------------------------------------------
  
  var screen = jQuery( window ).width();

  if(screen < 1024){
    if (jQuery(".m-dropdown-list:not(.m-language-selector)")) {
      jQuery(".m-language-selector").appendTo(".m-dropdown-list");
      jQuery(".m-language-selector").show();
    }
  }

  if(screen >= 1024) {

    if (jQuery(".m-dropdown-list .m-language-selector")) {
      jQuery(".m-language-selector").appendTo(".navbar");
    }

    jQuery(".o-content-cards .m-header .a-header").first().removeClass("collapsed");

  }

  // A.1. END -----------------------------------------------------------------------------------------------------------

  if(screen < 1024) {
    if (jQuery('.o-sub-nav .back-menu').length == 0) {
      jQuery('.o-sub-nav').prepend('<div class="back-menu">Back</div>');
    }
  
    jQuery('.navbar .nav-link').on('click', function(e) {
      var par = jQuery(this).parent();
      var subNav = jQuery(par).find('.o-sub-nav');
      if (subNav.hasClass('o-sub-nav')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        subNav.show();
        jQuery('.nav-link').hide();
      }
    });
  
    jQuery('.m-contact-form-holder .nav-link').on('click', function(e) {
      e.preventDefault();
      var par = jQuery(this).parent()
      jQuery(par).find('.o-sub-nav').show();
    });
  
    jQuery('.back-menu').on('click', function(e) {
      jQuery('.nav-link').show();
      jQuery('.o-sub-nav').hide();
  
    });
  
    // jQuery('a').on('touchend', function() {
    //   jQuery(this).click();
    // });
  } else {
    jQuery(".right-wrap").hover(function () {
      jQuery(this).toggleClass("show");
    });
  }

}).resize();


// A.2. RESOURCE PATHS ------------------------------------------------------------------------------------------------

var icons = 'assets/includes/icons/';

// A.2. END -----------------------------------------------------------------------------------------------------------

// A.3. MODAL VIDEO AUTOPLAY ------------------------------------------------------------------------------------------------

var stopVideos = function () {
	document.querySelectorAll('iframe').forEach(function(v) { 
    v.src = v.src;
  });
  document.querySelectorAll('video').forEach(function(v) { 
    v.pause() 
  });
};

var breadcrumb = jQuery('.a-breadcrumb a').attr('href');
sectionCookie = getCookie('section');

if ((breadcrumb = '/') && (sectionCookie !== '/')) {
  jQuery('.a-breadcrumb a').attr('href',sectionCookie);
  document.cookie = "section=/";
}

jQuery('.o-modal').on('shown.bs.modal', function (e) {
    // jQuery('.o-modal video').get(0).play();
});

jQuery('.o-modal').on('hidden.bs.modal', function (e) {
    stopVideos();
});

if(navigator.userAgent.match(/Trident\/7\./)) {
  jQuery('body').addClass('if-ie');
}
  
// A.3. END -----------------------------------------------------------------------------------------------------------


// 1. JAVASCRIPT LAYER [ 1.01 END ] ####################################################################################


// function scrollWinright() {
//   window.scrollBy(100, 0);
//   console.log('scroll right');
// }

// function scrollWinleft() {
//   window.scrollBy(-100, 0);
//   console.log('scroll left');
// }


// window.addEventListener('wheel', function(e) {

//   if (e.deltaY > 0) {
//     scrollWinright();
//   } else {
//     scrollWinleft();
//   }

// });


// open external links in new window
jQuery('a').each(function() {
  var a = new RegExp('/' + window.location.host + '/');
  // alert(this.href);

  if(!a.test(this.href)
    && this.href !== 'javascript:void(0)'
    && this.href !== 'javascript:void(0);'
    && this.href.indexOf('mailto:') === -1 ) {
    jQuery(this).click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      window.open(this.href, '_blank');
    });
  }
});


jQuery('#locs').change(function(){
  // console.log(this.value);
  jQuery('.o-location-block').hide();
  jQuery('#'+this.value).show();
});

// jQuery('.m-language-selector select').change(function(){
  // Set the HFLang cookie to the users new selection and redirect them to homepage
  // updateLocationCookie(this.value);

  // var redirectTo = jQuery(this).data('redirectto');
  // var langCode = jQuery(this).data('langcode');
  // updateLocationCookie(redirectTo, langCode);
// });

jQuery('.footer-region-selector').click(function() {
  // Set the HFLang cookie to the users new selection and redirect them to homepage
  updateLocationCookie(jQuery(this).attr('data-redirectto'), jQuery(this).attr('data-langcode'));
  // var langcode = jQuery(this).data('region');
  // updateLocationCookie(langcode);
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
        return "";
};

function updateLocationCookie(redirectTo, langCode) {
  // var region = '/' + langcode;
  // if (region == '/en') {
  //   region = '/'
  // }

  switch(langCode) {
    // United Kingdom
    case 'en-gb':
      cookieName = 'UK';
      break;
    // Canada
    case 'en-ca':
      cookieName = 'CA';
      break;
    // Germany
    case 'de':
      cookieName = 'DE';
      break;
    default:
      cookieName = 'USA';
      break;
  }

  document.cookie =  "acquia_extract:_HFLang=" + cookieName + ";0 ; path=/";

  // Redirect the user to the correct location
  document.location.href = redirectTo;
}



var firstloc = jQuery('.locs-list li:first').attr('data-value');
var firstloctext = jQuery('.locs-list li:first').text();

jQuery('.selected-loc').text(firstloctext);
jQuery('#'+firstloc ).show();


/* Lang Drop down styling */
jQuery('#langs-select').on('click', function() {
  jQuery('.lang-list').show();
});

jQuery('.lang-list li').on('click', function(e) {

  // updateLocationCookie(jQuery(this).attr('data-value'));
  updateLocationCookie(jQuery(this).attr('data-redirectto'), jQuery(this).attr('data-langcode'));

  setTimeout(function() {
    jQuery('.lang-list').hide();
  }, 20);


  jQuery('.lang-list').hide();
  jQuery('.selected-lang').text(jQuery(this).text());
  jQuery('.lang-list li').removeClass('active');
  jQuery('#'+jQuery(this).addClass('active'));


});

/* Contact US form Drop down styling */
jQuery('.locs-select').on('click', function() {
  jQuery('.locs-list').show();
});

jQuery('.locs-list li').on('click', function() {

  setTimeout(function() {
    jQuery('.locs-select ul').hide();
  }, 20);


  jQuery('.o-location-block').hide();
  jQuery('#'+jQuery(this).attr('data-value')).show();
  jQuery('.selected-loc').text(jQuery(this).text());
  jQuery('.locs-list li').removeClass('active');
  jQuery('#'+jQuery(this).addClass('active'));

});

jQuery(document).mouseup(function(e)
{
  var container = jQuery(".lang-list");

  if (!container.is(e.target) && container.has(e.target).length === 0)
  {
    container.hide();
  }
});

jQuery(document).mouseup(function(e)
{
  var container = jQuery(".locs-list");

  if (!container.is(e.target) && container.has(e.target).length === 0)
  {
    container.hide();
  }
});


// 1. JAVASCRIPT LAYER [ 1.02 SHOW/HIDE FUNCTIONS ] ###################################################################
// A. SHOW/HIDE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function initToggleFunctions() {

// A.1. BURGER MENU ---------------------------------------------------------------------------------------------------

    jQuery('.reveal').click(function(e) {

        var target = jQuery(this).attr('href');

        if (jQuery(target).hasClass('hidden') ) {

            jQuery(target).removeClass('hidden');
            jQuery('.reveal').addClass('close');

        } else {

            jQuery(target).addClass('hidden');
            jQuery('.reveal').removeClass('close');

        }
        e.preventDefault();

    });

// A.1. END -----------------------------------------------------------------------------------------------------------

// A.2. GENERAL SHOW --------------------------------------------------------------------------------------------------

    jQuery('.showhide').click(function(e) {

        var target = jQuery(this).attr('href');

        if (jQuery(target).hasClass('hidden') ) {

            jQuery(target).removeClass('hidden');
            jQuery('.showhide').addClass('close');

        } else {

            jQuery(target).addClass('hidden');
            jQuery('.showhide').removeClass('close');

        }

        e.preventDefault();

    });

// A.2. END -----------------------------------------------------------------------------------------------------------

// A.3. END -----------------------------------------------------------------------------------------------------------

    // A.2.1. TOGGLE DIV ----------------------------

    var currentContent = '';
    jQuery('.toggle-div').on('click', function(){
        currentContent = jQuery(this).attr('name');
        if(jQuery('#'+currentContent).hasClass('on')){
            jQuery('#'+currentContent).removeClass('on');
            jQuery('body').removeClass('modal-open');
        }else{
            hideAllContent();
            showCurrentContent(currentContent);
        }
    });

    function hideAllContent(){
        jQuery('.toggle-content').removeClass('on');
        jQuery('body').removeClass('modal-open');
    };

    function showCurrentContent(currentContentDiv){
        jQuery('#'+currentContentDiv).addClass('on');
        jQuery('body').addClass('modal-open');
    };

    // A.2.1. END -----------------------------------------

// A.3. END -----------------------------------------------------------------------------------------------------------

// A.4. SCROLL TO LINK ------------------------------------------------------------------------------------------------

    jQuery(".textLink").click(function(event){

        event.preventDefault();

        //calculate destination place
        var dest=0;
        if(jQuery(this.hash).offset().top > jQuery(document).height()-jQuery(window).height()){
            dest=jQuery(document).height()-jQuery(window).height();
        }else{
            dest=jQuery(this.hash).offset().top;
        }

        //go to destination
        jQuery('html,body').animate({scrollTop:dest}, 1000,'swing');

        //add class to burger
        jQuery('#mobi-nav').addClass('hide-nav');

        //add active class
        jQuery('.textLink').removeClass('active');
        jQuery(this).addClass('active');

    });

// A.4. END -----------------------------------------------------------------------------------------------------------

// A.5. SHOW HIDE LOGO ------------------------------------------------------------------------------------------------

    var t = jQuery('html').offset().top;

    jQuery(document).scroll(function(){

        if (document.documentElement.clientWidth > 640) {

            // Hide the logo, and show as you scroll
            if(jQuery(this).scrollTop() > t)
            {
                jQuery('.logo').css({"display":'block'});

            }else{
                jQuery('.logo').css({"display":'none'});
            }


        } else {}

    });

// A.5. END -----------------------------------------------------------------------------------------------------------

}

// A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1. JAVASCRIPT LAYER [ 1.02 END ] ###################################################################################
// 1. JAVASCRIPT LAYER [ 1.02 SHOW/HIDE FUNCTIONS ] ###################################################################
// A. SHOW/HIDE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function initCarouselFunctions() {

  // A.3. CAROUSEL SCRIPTS ----------------------------------------------------------------------------------------------
  
    // A.2.1. DESTROY CAROUSEL ------------------------------
  
    function slickInitialize() {  

        var time = 10;
        var $slick,
            isPause,
            tick,
            percentTime;
        
        $slick = jQuery('.m-carousel');
        $slick.slick({
          draggable: true,
          adaptiveHeight: false,
          dots: true,
          arrows: false,
          mobileFirst: true,
          pauseOnDotsHover: true,
          fade: true,
          cssEase: 'linear'
        });

        $slickFade = jQuery('.m-carousel-fade');
        $slickFade.slick({
          draggable: true,
          adaptiveHeight: false,
          dots: true,
          arrows: false,
          mobileFirst: true,
          autoplay: true,
          autoplaySpeed: 10000,
          pauseOnDotsHover: true,
          fade: true,
          cssEase: 'linear'
        });

        $slickSlide = jQuery('.m-carousel-slide');
        $slickSlide.slick({
          draggable: true,
          adaptiveHeight: false,
          dots: true,
          arrows: false,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 10000,
          pauseOnDotsHover: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
        });

        jQuery('.m-carousel-integration').each(function(index, element) {
          var $slickIntegrationPanel = jQuery(this);
          $slickIntegrationPanel.slick({
            infinite: true,
            draggable: false,
            adaptiveHeight: false,
            dots: false,
            arrows: true,
            appendArrows: $slickIntegrationPanel.parents('.m-carousel-wrap').find('.m-arrow-wrap'),
            prevArrow: '<svg class="a-prev" "width="30px" height="21px" viewBox="0 0 30 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-40.000000, -957.000000)" fill="#FFFFFF" fill-rule="nonzero"><g transform="translate(-40.000000, 909.000000)"><g transform="translate(121.500000, 56.000000) scale(-1, 1) translate(-121.500000, -56.000000) translate(80.000000, 12.000000)"><path d="M82.7322353,45.6278121 L73.5410633,36.2528412 C73.3651098,36.0745996 73.1036209,36.0202833 72.8732672,36.1173143 C72.6440623,36.2137593 72.4951079,36.4420398 72.4951079,36.6946953 L72.4951079,37.9446719 C72.4951079,38.1106675 72.5597333,38.2693974 72.674623,38.3865846 L78.9816052,44.8196896 L54.1127639,44.8196896 C53.7740693,44.8197482 53.5,45.0992395 53.5,45.4447072 L53.5,46.6946838 C53.5,47.0401514 53.7740693,47.3197013 54.1127639,47.3197013 L78.9816052,47.3197013 L72.674623,53.7528064 C72.5597333,53.8699935 72.4951079,54.0286649 72.4951079,54.194719 L72.4951079,55.4446956 C72.4951079,55.6974097 72.6441198,55.9256316 72.8732672,56.0220766 C72.9492667,56.0544203 73.0288278,56.0697132 73.1078144,56.0697132 C73.266994,56.0697132 73.423761,56.0062564 73.5410633,55.8866083 L82.7322353,46.5116374 C82.9716079,46.267478 82.9716079,45.8719715 82.7322353,45.6278121 Z" id="Path"></path></g></g></g></g></svg>',
            nextArrow: '<svg class="a-next" width="30px" height="21px" viewBox="0 0 30 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-40.000000, -957.000000)" fill="#FFFFFF" fill-rule="nonzero"><g transform="translate(-40.000000, 909.000000)"><g transform="translate(121.500000, 56.000000) scale(-1, 1) translate(-121.500000, -56.000000) translate(80.000000, 12.000000)"><path d="M82.7322353,45.6278121 L73.5410633,36.2528412 C73.3651098,36.0745996 73.1036209,36.0202833 72.8732672,36.1173143 C72.6440623,36.2137593 72.4951079,36.4420398 72.4951079,36.6946953 L72.4951079,37.9446719 C72.4951079,38.1106675 72.5597333,38.2693974 72.674623,38.3865846 L78.9816052,44.8196896 L54.1127639,44.8196896 C53.7740693,44.8197482 53.5,45.0992395 53.5,45.4447072 L53.5,46.6946838 C53.5,47.0401514 53.7740693,47.3197013 54.1127639,47.3197013 L78.9816052,47.3197013 L72.674623,53.7528064 C72.5597333,53.8699935 72.4951079,54.0286649 72.4951079,54.194719 L72.4951079,55.4446956 C72.4951079,55.6974097 72.6441198,55.9256316 72.8732672,56.0220766 C72.9492667,56.0544203 73.0288278,56.0697132 73.1078144,56.0697132 C73.266994,56.0697132 73.423761,56.0062564 73.5410633,55.8866083 L82.7322353,46.5116374 C82.9716079,46.267478 82.9716079,45.8719715 82.7322353,45.6278121 Z" id="Path"></path></g></g></g></g></svg>',
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1
                }
              }
            ]
          });
        });

        $slickTopics = jQuery('.m-carousel-topics');
        $slickTopics.slickFilterable({
          filterName: 'filter-heading',
          filter: function( category, slider, settings ) {
            return jQuery(this).hasClass( category );
          },
          slick: {
            infinite: true,
            draggable: false,
            adaptiveHeight: false,
            dots: true,
            arrows: false,
            rows: 2,
            slidesPerRow: 4,
            responsive: [
              {
                breakpoint: 376,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '80px'
                }
              },
              {
                breakpoint: 401,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '110px'
                }
              },
              {
                breakpoint: 426,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '120px'
                }
              },
              {
                breakpoint: 451,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '155px'
                }
              },
              {
                breakpoint: 476,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '175px'
                }
              },
              {
                breakpoint: 501,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '210px'
                }
              },
              {
                breakpoint: 526,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '225px'
                }
              },
              {
                breakpoint: 551,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '250px'
                }
              },
              {
                breakpoint: 576,
                settings: {
                  rows: 2,
                  slidesPerRow: 1,
                  centerMode: true,
                  centerPadding: '120px'
                }
              },
              {
                breakpoint: 768,
                settings: {
                  rows: 2,
                  slidesPerRow: 2,
                  centerMode: true,
                  centerPadding: '105px'
                }
              }
            ]
          }
        });

        // $slickQuiz = jQuery('.m-carousel-quiz');
        // $slickQuiz.slick({
        //   draggable: false,
        //   swipe: false,
        //   swipeToSlide: false,
        //   touchMove: false,
        //   adaptiveHeight: false,
        //   slidesToShow: 1,
        //   dots: false,
        //   arrows: false,
        //   mobileFirst: true,
        //   pauseOnDotsHover: false
        // });

        $slickContactUs = jQuery('.m-carousel-contact-us');
        $slickContactUs.slick({
          draggable: false,
          swipe: false,
          swipeToSlide: false,
          touchMove: false,
          adaptiveHeight: false,
          slidesToShow: 1,
          dots: false,
          arrows: false,
          pauseOnDotsHover: false,
          responsive: [{
            breakpoint: 1024,
            settings: 'unslick'
          }]
        });

        jQuery('.m-carousel-contact-us .medium-cta-with-arrow.next').on('click', function(e){
          $slickContactUs.slick('slickGoTo', 1, false);
        });

        jQuery('.m-carousel-contact-us .medium-cta-with-arrow.previous').on('click', function(e){
          $slickContactUs.slick('slickGoTo', 0, false);
        });
        
        // jQuery('.o-integration-panel .a-filter').each(function() {
        //   jQuery(this).on('click', function() {
        //     if (jQuery(this).hasClass('clear')) {
        //       jQuery('.o-integration-panel .a-filter').removeClass('active');
        //       $slickIntegrationPanel.slick('slickUnfilter');
        //       jQuery(this).addClass('active');
        //     } else {
        //       jQuery('.o-integration-panel .a-filter').removeClass('active');
        //       $slickIntegrationPanel.slick('slickUnfilter');
        //       var filterClass = jQuery(this).attr("data-filter");
        //       jQuery(this).addClass('active');
        //       $slickIntegrationPanel.slick('slickFilter', filterClass);
        //     }
        //   });
        // });
        
        // $barRound = jQuery('.a-progress');
        
        // jQuery('.m-carousel-wrap').on({
        //   mouseenter: function() {
        //     isPause = true;
        //   },
        //   mouseleave: function() {
        //     isPause = false;
        //   }
        // })
        
        // function startProgressbar() {
        //   resetProgressbar();
        //   percentTime = 0;
        //   isPause = false;
        //   tick = setInterval(interval, 10);
        // }
        // var $rbar = jQuery('.a-progress circle.a-fill');
        // var rlen = 2 * Math.PI * $rbar.attr('r');
        
        // function interval() {
          
        //   percentTime += 1 / (time + 0.1);
        //   $rbar.css({
        //     'stroke-dasharray': rlen,
        //     'stroke-dashoffset': rlen * (1 - percentTime / 100)
        //   });
      
        //   if (percentTime >= 100) {
        //     $slick.slick('slickNext');
        //     startProgressbar();
        //   }
       
        // }
  
        // jQuery('.m-progress-round-wrap').on('click', function(){
        //   var $pauseBtn = jQuery(this);
        //   if ($pauseBtn.hasClass('paused')){
        //     startProgressbar();
        //       $pauseBtn.removeClass('paused');
        //   } else {
        //     resetProgressbar();
        //       $pauseBtn.addClass('paused');
        //   }
        // });

        // jQuery('.slick-dots button').on('click', function(){
        //   jQuery('.m-progress-round-wrap').removeClass('paused');
        //   resetProgressbar();
        //   startProgressbar();
        // });

        // jQuery('.m-carousel').on('swipe', function(event, slick, direction){
        //   jQuery('.m-progress-round-wrap').removeClass('paused');
        //   resetProgressbar();
        //   startProgressbar();
        // });
        
        // function resetProgressbar() {
        //   clearTimeout(tick);
        // }
        
        // startProgressbar();
    }

    jQuery(document).ready(function(e) {
      slickInitialize();
    });

  
    // A.2.1. END -----------------------------------------
  
  // A.3. END -----------------------------------------------------------------------------------------------------------
  
}

(function( $ ) {
  $.fn.slickFilterable = function( options ) {

      var settings = $.extend({
          slideSelector: '> *',
          filterName: 'filter-slick',
          slick: {},
          beforeFilter: function() {},
          filter: function( element, category, slider, settings ) { return true; },
      }, options );

      return this.each(function() {
          var slider = jQuery(this),
              slides = slider.find( settings.slideSelector ),
              slickObj;

          slickObj = slider.slick( settings.slick );

          // Handle filter click
          jQuery('[data-' + settings.filterName + ']').on('click', function(event) {
              event.preventDefault();

              $('.o-topics .a-filter').removeClass('active');
              $(this).addClass('active');

              var category = jQuery(this).data(settings.filterName),
                  newSlides = $.extend(true, {}, slides),
                  newSlickOptions;

              if ( ! category ) return;

              if ( typeof settings.beforeFilter == 'function' ) {
                  settings.beforeFilter.call(this, category, slider, slides);
              }

              slider.slick('unslick');

              if ( category === 'all' ) {
                  slider.find( settings.slideSelector ).remove();
                  slider.append( newSlides );
                  slider.slick( settings.slick );

                  return;
              }

              if ( typeof settings.filter !== 'function' ) {
                  newSlides = newSlides.filter( settings.filter );
              } else {
                  newSlides = newSlides.filter( function() {
                      return settings.filter.call( this, category, slider, $.extend( true, {}, settings ) );
                  } );
              }

              slider.find( settings.slideSelector ).remove();
              slider.append( newSlides );
              slider.slick( settings.slick );
          });

          // Handle dropdown click
          jQuery('.m-filters-mobile .a-dropdown').change(function() {
            var category = jQuery(this).find(':selected').attr('data-filter-heading'),
            newSlides = $.extend(true, {}, slides),
            newSlickOptions;
            if ( ! category ) return;

            if ( typeof settings.beforeFilter == 'function' ) {
                settings.beforeFilter.call(this, category, slider, slides);
            }

            slider.slick('unslick');

            if ( category === 'all' ) {
                slider.find( settings.slideSelector ).remove();
                slider.append( newSlides );
                slider.slick( settings.slick );

                return;
            }

            if ( typeof settings.filter !== 'function' ) {
                newSlides = newSlides.filter( settings.filter );
            } else {
                newSlides = newSlides.filter( function() {
                    return settings.filter.call( this, category, slider, $.extend( true, {}, settings ) );
                } );
            }

            slider.find( settings.slideSelector ).remove();
            slider.append( newSlides );
            slider.slick( settings.slick );
          });
      });
  };
}(jQuery));
  
  // A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // 1. JAVASCRIPT LAYER [ 1.02 END ] ###################################################################################

// 1. JAVASCRIPT LAYER [ 1.02 SHOW/HIDE FUNCTIONS ] ###################################################################
// A. EQUAL HEIGHTS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function initEqualheightsFunctions() {

  equalheight('.classname');

  if(jQuery(window).width() > 767) {

    equalheight('.classname');

  }

}

// A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1. JAVASCRIPT LAYER [ 1.02 END ] ###################################################################################

// 1. JAVASCRIPT LAYER [ 1.10 SCROLL FUNCTIONS ] ######################################################################

// A. SCROLL FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Scroll function courtesy of Scott Dowding; http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling

function initScrollIntoView() {
  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();

    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height();
    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
    //original
    //return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  var position = jQuery(window).scrollTop();
  
  function scrollFunction() {
    // A.1.1.1. FADE IN UP --------------------------------
    jQuery('.a-siv-fiu').each(function() {
      if (isScrolledIntoView(this) === true) {
        jQuery(this).addClass('is-in-view');
      }
    });
    // A.1.1.1. END ---------------------------------------

    // A.1.1.2. FADE IN -----------------------------------
    jQuery('.a-siv-fi').each(function() {
      if (isScrolledIntoView(this) === true) {
        jQuery(this).addClass('is-in-view');
        jQuery(this).addClass('fadeIn');
      }
    });
    // A.1.1.2. END ---------------------------------------

    // A.1.1.3. FADE IN FROM LEFT -------------------------
    jQuery('.a-siv-fil').each(function() {
      if (isScrolledIntoView(this) === true) {
        jQuery(this).addClass('is-in-view');
        jQuery(this).addClass('slideInRight');
      }
    });
    // A.1.1.3. END ---------------------------------------

    // A.1.1.4. FADE IN FROM RIGHT ------------------------
    jQuery('.a-siv-fir').each(function() {
      if (isScrolledIntoView(this) === true) {
        jQuery(this).addClass('is-in-view');
      }
    });
    // A.1.1.4. END ---------------------------------------

    // A.1.1.5. FADE IN FROM RIGHT ------------------------
    jQuery('.a-siv-fis:nth-child(odd)').each(function() {
      if (isScrolledIntoView(this) === true) {
        jQuery(this).addClass('is-in-view');
        jQuery(this).addClass('fadeInLeft');
      }
    });
    // A.1.1.5. END ---------------------------------------

    // A.1.1.5. FADE IN FROM RIGHT ------------------------
    jQuery('.a-siv-fis:nth-child(even)').each(function() {
      if (isScrolledIntoView(this) === true) {
        jQuery(this).addClass('is-in-view');
        jQuery(this).addClass('fadeInRight');
      }
    });
    // A.1.1.5. END ---------------------------------------

    // A.1.1.6. MOBILE NAV FIXED/RELATIVE --------------------------------------------------------------------------------------

    var scroll = jQuery(window).scrollTop();
    if((scroll < position) && jQuery('html').hasClass('mobile')) {
      jQuery('.o-header .navbar').addClass('fixed');
    } else if(((scroll > position)) && (jQuery('html').hasClass('mobile')) && (jQuery('.m-toggler').attr('aria-expanded') == 'false') && (jQuery('.m-search').attr('aria-expanded') == 'false')) {
      jQuery('.o-header .navbar').removeClass('fixed');
    } 
    position = scroll;

    // A.1.1.6. END -----------------------------------------------------------------------------------------------------------
  }

  jQuery(window).scroll(function() {
    scrollFunction();
  });

  jQuery(document).ready(function() {
    scrollFunction();
  });

  jQuery('.m-toggler, .m-search').on('click', function(){
    jQuery('.navbar.fixed-top').addClass('fixed');
  });

// A.3. END -----------------------------------------------------------------------------------------------------------

// A.5. SCROLL TO TOP AND BOTTOM --------------------------------------------------------------------------------------

  var t = jQuery('html').offset().top;

  jQuery(document).scroll(function(){

    // Hide the logo, and show as you scroll
    if(jQuery(this).scrollTop() > t)
    {
      jQuery('body').addClass('sticky');

    }else{
      jQuery('body').removeClass('sticky');
      jQuery('.animated').removeClass('is-in-view');
      jQuery('.animated').removeClass('fadeInLeft');
      jQuery('.animated').removeClass('fadeInRight');
      jQuery('.animated').removeClass('fadeInUp');
      jQuery('.animated').removeClass('fadeIn');
    }

  });

  window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      jQuery('.animated').removeClass('is-in-view');
      jQuery('.animated').removeClass('fadeInLeft');
      jQuery('.animated').removeClass('fadeInRight');
      jQuery('.animated').removeClass('fadeInUp');
      jQuery('.animated').removeClass('fadeIn');
    }
  };

// A.5. END -----------------------------------------------------------------------------------------------------------

}

// A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1. JAVASCRIPT LAYER [ 1.02 END ] ###################################################################################
// function initQuizFunctions() {
    
//     function quizInitialize() {
//         jQuery('.large-cta-with-arrow.s1').attr('disabled', true);
//         jQuery('.large-cta-with-arrow.s1').addClass('disabled');
//         jQuery('.m-carousel-quiz input[type="radio"]').change(function() {
//             if (jQuery('input[data-radio="training-personal"]').is(':checked')) {
//                 jQuery('.large-cta-with-arrow.s1 .a-text').html('Submit');
//             }
//             else {
//                 jQuery('.large-cta-with-arrow.s1 .a-text').html('Next question');
//             }
//             jQuery('.large-cta-with-arrow.s1').attr('disabled', false);
//             jQuery('.large-cta-with-arrow.s1').removeClass('disabled');
//         });

//         var $quizCarousel = jQuery('.m-carousel-quiz');
        
//         jQuery('.m-carousel-quiz .large-cta-with-arrow').on('click', function(e){
//             e.preventDefault();
//             var $continueBtn = jQuery(this);

//             // First Slide
//             if ($continueBtn.hasClass('s1')) {
//                 if (jQuery('input[data-radio="training-personal"]').is(':checked')) { 
//                     //window.open('https://www.hemsleyfraser.com/contact-us-quiz', '_blank');
//                     if (window.location.href.indexOf('en-gb') > -1) {
//                         window.location.href = "https://www.hemsleyfraser.co.uk/training-courses";
//                     } else {
//                         window.location.href = "https://www.hemsleyfraser.com/contact-us-quiz";
//                     }
                    
//                     return false;
//                 } else if (jQuery('input[data-radio="training-team"]').is(':checked') || jQuery('input[data-radio="training-workforce"]').is(':checked')) {
//                     $quizCarousel.slick('slickGoTo', 1, false);
//                 }
//             }

//             // Second Slide
//             else if ($continueBtn.hasClass('s2')) {
//                 if (jQuery('input[data-radio="stand-alone program"]').is(':checked')) {
//                     jQuery('.m-card[data-radio="big-impact"]').css('display', 'none');
//                     jQuery('.m-card[data-radio="fully-bespoke"]').css('display', 'none');
//                     jQuery('.m-card[data-radio="off-the-shelf"]').css('display', 'block');
//                     jQuery('.m-card[data-radio="tailored-solution"]').css('display', 'block');
//                 }
//                 else if (jQuery('input[data-radio="organizational learning experience"]').is(':checked')) {
//                     jQuery('.m-card[data-radio="off-the-shelf"]').css('display', 'none');
//                     jQuery('.m-card[data-radio="tailored-solution"]').css('display', 'none');
//                     jQuery('.m-card[data-radio="big-impact"]').css('display', 'block');
//                     jQuery('.m-card[data-radio="fully-bespoke"]').css('display', 'block');
//                 }
//                 $quizCarousel.slick('slickGoTo', 2, false);
//             }

//             // Third Slide
//             else if ($continueBtn.hasClass('s3')) {
//                 if (jQuery('input[data-radio="off-the-shelf"]').is(':checked')) { 
//                     window.location.href = "/training-programs"
//                 } else if (jQuery('input[data-radio="tailored-solution"]').is(':checked')) { 
//                     window.location.href = "/training-programmes/team-training-solutions"
//                 } else if (jQuery('input[data-radio="big-impact"]').is(':checked')) { 
//                     window.location.href = "/organizational-learning/blended-learning/learning-as-a-service"
//                 } else if (jQuery('input[data-radio="fully-bespoke"]').is(':checked')) { 
//                     window.location.href = "/organizational-learning/blended-learning"
//                 }
//                 return false;
//             }
//             return false;
//         });

//         jQuery('.m-carousel-quiz .a-question').on('click', function(e){
//             if (jQuery(this).hasClass('s2')) {
//                 $quizCarousel.slick('slickGoTo', 0, false);
//             } else if (jQuery(this).hasClass('s3')) {
//                 $quizCarousel.slick('slickGoTo', 1, false);
//             }
//         });
//     }

//     jQuery(document).ready(function() {
//         quizInitialize();
//     });
// }

// console.log( "ready!" );

function showReadMore() {
    $this = jQuery(".a-hero-copy .copy-content");
    if($this) {
        jQuery(".a-hero-copy .copy-content").each(function() {
            if (jQuery($this).height() > jQuery($this).parent().height()) {
               jQuery("#show-hero-copy").css({'display':'inline-block'});
           }else {
            jQuery("#show-hero-copy").css({'display':'none'});
           }
       });
    };
};
showReadMore();

    jQuery(window).resize(function(){
         showReadMore();
     });

     jQuery("#show-hero-copy").on("click", function(e) {
         e.preventDefault();
         jQuery("#hero-copy").css({'max-height':'100%'});
         jQuery("#hero-copy").removeAttr('id');
         jQuery("#show-hero-copy").hide();
     });
});

var bLazy = new Blazy({
  loadInvisible: true,
  container: 'html.desktop .main-container'
});

//
// // var mCarouselWrap = new Blazy({
// //   loadInvisible: true,
// //   container: '.m-carousel-integration'
// // });
// //
// jQuery('.m-carousel-integration').on('afterChange', function(event, slick, direction){
//   alert('change');
//   bLazy.revalidate();
// });

// 1. JAVASCRIPT LAYER [ 1.00 WINDOW READY END ] ######################################################################

// 2. JAVASCRIPT LAYER [ 2.00 AJAXCOMPLETE ] ##########################################################################

jQuery( document ).ajaxComplete(function($) {
// 2. JAVASCRIPT LAYER [ 2.01 GLOBAL FUNCTIONS ] ######################################################################

// A.1. SCREEN SIZE CHECK ---------------------------------------------------------------------------------------------

// code goes here ...

// A.1. END -----------------------------------------------------------------------------------------------------------

// 2. JAVASCRIPT LAYER [ 2.01 END ] ###################################################################################

});

// 2. JAVASCRIPT LAYER [ 2.00 END ] ###################################################################################