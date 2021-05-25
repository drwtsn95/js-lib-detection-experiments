// Scroll To Top
$(document).ready(function(){
 $(window).scroll(function(){
  if ($(this).scrollTop() > 100) {
   $('.scrollup').fadeIn();
  } else {
   $('.scrollup').fadeOut();
  }
 });
 $('.scrollup').click(function(){
  $("html, body").animate({ scrollTop: 0 }, 600); return false;
 });
});

// Drop Menu
$(document).ready(function() {
  $( 'header #mainmenu ul li' ).hover(
    function(){ $(this).children('header #mainmenu ul li ul').slideDown(200); },
    function(){ $(this).children('header #mainmenu ul li ul').slideUp(200); }
  );
});

// Lasttickers
$(document).ready(function() {
  $('.ticker').tickerme({
    fade_speed: 500,
    duration: 5000,
    auto_stop: false
  });
});

// Lasttickers
//Specify affected tags. Add or remove from list:
var tgs = new Array( 'p');

//Specify spectrum of different font sizes:
var szs = new Array( 'xx-small','x-small','small','medium','large','x-large','xx-large' );
var startSz = 2;

function ts( trgt,inc ) {
  if (!document.getElementById) return
    var d = document,cEl = null,sz = startSz,i,j,cTags;
    
    sz += inc;
    if ( sz < 0 ) sz = 0;
    if ( sz > 6 ) sz = 6;
    startSz = sz;

  if (!( cEl = d.getElementById( trgt ) ) ) cEl = d.getElementsByTagName( trgt )[ 0 ];
  if(inc == 0){
    if (cEl.style.removeProperty) {
      cEl.style.removeProperty('font-size');
    } else {
      cEl.style.removeAttribute('font-size');
    }

    for ( i = 0 ; i < tgs.length ; i++ ) {
      cTags = cEl.getElementsByTagName( tgs[ i ] );
      for ( j = 0 ; j < cTags.length ; j++ ) cTags[ j ].style.removeProperty('font-size');
    }
    startSz = 2;
  }else{
    cEl.style.fontSize = szs[ sz ];
    
    for ( i = 0 ; i < tgs.length ; i++ ) {
      cTags = cEl.getElementsByTagName( tgs[ i ] );
      for ( j = 0 ; j < cTags.length ; j++ ) cTags[ j ].style.fontSize = szs[ sz ];
    }
  }
} 

// Mobail Menu
$(document).ready(function(){
  $('#headerphone button.mainmenu').on('click',function(){
    $('#sidebarphone').toggleClass('menuisopen');
  });
  $('#sidebarphone button.closemenu').on('click',function(){
    $('#sidebarphone').toggleClass('menuisopen');
  });
});

// Mobail Menu
(function($) {
  $.fn.menumaker = function(options) {
    var cssmenu = $(this),
      settings = $.extend({
        title: "Menu",
        format: "dropdown",
        sticky: false
      }, options);
      return this.each(function() {
        $(this).find("#menu-button").on('click', function() {
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) {
              mainmenu.hide().removeClass('open');
            } else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
              mainmenu.find('ul').show();
            }
          }
        });
        cssmenu.find('li ul').parent().addClass('has-sub');
        multiTg = function() {
          cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
          cssmenu.find('.submenu-button').on('click', function() {
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open')) {
              $(this).siblings('ul').removeClass('open').hide();
            } else {
              $(this).siblings('ul').addClass('open').show();
            }
          });
        };
        if (settings.format === 'multitoggle') multiTg();
        else cssmenu.addClass('dropdown');
        if (settings.sticky === true) cssmenu.css('position', 'fixed');
        resizeFix = function() {
          if ($(window).width() > 768) {
            cssmenu.find('ul').show();
          }
          if ($(window).width() <= 768) {
            cssmenu.find('ul').hide().removeClass('open');
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);
      });
    };
})(jQuery);
(function($) {
    $(document).ready(function() {
        $(document).ready(function() {
            $(".mobailmenu").menumaker({
                title: "",
                format: "multitoggle"
            });
            $(".mobailmenu").prepend("<div id='menu-line'></div>");
            var foundActive = false,
                activeElement, linePosition = 0,
                menuLine = $(".mobailmenu #menu-line"),
                lineWidth, defaultPosition, defaultWidth;
            $(".mobailmenu > ul > li").each(function() {
                if ($(this).hasClass('active')) {
                    activeElement = $(this);
                    foundActive = true;
                }
            });
            if (foundActive === false) {
                activeElement = $(".mobailmenu > ul > li").first();
            }
            defaultWidth = lineWidth = activeElement.width();
            defaultPosition = linePosition = activeElement.position().left;
            menuLine.css("width", lineWidth);
            menuLine.css("left", linePosition);
            $(".mobailmenu > ul > li").hover(function() {
                    activeElement = $(this);
                    lineWidth = activeElement.width();
                    linePosition = activeElement.position().left;
                    menuLine.css("width", lineWidth);
                    menuLine.css("left", linePosition);
                },
                function() {
                    menuLine.css("left", defaultPosition);
                    menuLine.css("width", defaultWidth);
                });
        });
    });
})(jQuery);