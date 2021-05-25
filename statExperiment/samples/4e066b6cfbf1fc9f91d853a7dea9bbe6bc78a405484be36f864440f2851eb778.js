equalAmountOfBlueberriesInEachMuffin = function() {
  $("ul.novedades").each(function(){
    var maxHeight = -1;
    $(this).find('li .content').each(function() {
      maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
   });
   $(this).find('li .content').each(function() {
     $(this).height(maxHeight);
   });
    
  });
}


fixStuffToTop = function() {
  var windowWidth = $(window).width();
  if (windowWidth > 767) {
    $("aside").stick_in_parent({
      offset_top: 65,
      // parent: 'body'
    });
  }
  else {
    $("aside").trigger("sticky_kit:detach");    
  }
}

headerTitles = function() {
  var windowWidth = $(window).width();
  if (windowWidth < 767) {
    if ( !$('h2.mclovin').length ) {
      var title = $('article header .text h4').html();
      // console.log(title);
      $("<h2 class='mclovin'></h2>").insertBefore( "article header" );
      $('h2.mclovin').html(title);
    }    
  }
  else {
    $('h2.mclovin').remove();
  }
}

// heroHeight = function(){
//   var windowHeight = $(window).height();
//   var headerHeight = $('header #top').height();
//   if ( ($('body.mobile').length) && (windowHeight < 800)) {
//     $('#hero li.slick-slide').height(windowHeight - headerHeight);
//   }
// };

navExpands = function () {
  $('header').addClass('nav-is-open');
  $('button.lines-button.x').addClass('close');
  $('section, footer').addClass('fade');
}
navCollapses = function () {
  $('header').removeClass('nav-is-open');
  $('button.lines-button.x').removeClass('close');
  $('section, footer').removeClass('fade');
}

secondaryNavExpands = function () {
  $('.section-header').addClass('nav-is-open');
  $('.section-header a.chevron').addClass('close');
  $('body > section > *:not(.section-header), body > footer').css({ "transition": "opacity 0.15s", "opacity": "0.15" });
}
secondaryNavCollapses = function () {
  $('.section-header').removeClass('nav-is-open');
  $('.section-header a.chevron').removeClass('close');
  $('body > section > *:not(.section-header), body > footer').css({ "transition": "none",  "opacity": "1" });
}

sidebarNavExpands = function () {
  $('aside').addClass('nav-is-open');
  $('aside a.chevron').addClass('close');
}
sidebarNavCollapses = function () {
  $('aside').removeClass('nav-is-open');
  $('aside a.chevron').removeClass('close');
}


mobileClass = function () {
  var windowWidth = $(window).width();
  if ((windowWidth > 600) && (windowWidth <= 850)) {
    $('body').addClass('tablet');
  } else {
    $('body').removeClass('tablet');
  };
  if ( windowWidth <= 600 ) {
    $('body').addClass('mobile');
  } else {
    $('body').removeClass('mobile');
  };
  if ( windowWidth > 850 ) {
    $('body').addClass('desktop');
  } else {
    $('body').removeClass('desktop');
  }  
}
fixToTop = function () {
  var aside = $('.fix-to-top')
  if (aside.length) {
    aside.scrollToFixed({ 
    marginTop: 80, 
    zIndex: 0,
    limit: 
      function() {
        var limit = $('body > footer').offset().top -  aside.outerHeight(true) - 25;
        return limit;
        },
      }
    );
  }  
}

function onScrollInit( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');

    osElement.css({
        '-webkit-animation-delay':  osAnimationDelay,
        '-moz-animation-delay':     osAnimationDelay,
        'animation-delay':          osAnimationDelay
    });

    var osTrigger = ( trigger ) ? trigger : osElement;

    osTrigger.waypoint(function() {
        osElement.addClass('animated').addClass(osAnimationClass);
    },{
        // triggerOnce: true,
        offset: '100%'
    });
  });
}

function fixNav() {
  if ($('body').hasClass('desktop')) {  
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
      $('#main-nav').addClass('fixed');
      $('section').addClass('fixed-nav');
    } else {
      $('#main-nav').removeClass('fixed');
      $('section').removeClass('fixed-nav');
    }
  }
}

novedadesArrowsPosition = function () {
  var novedadesImg = $('.novedades li.institucional .img');
  var imgHeight = novedadesImg.height();
  $(novedadesImg).parents('.novedades').find('.slick-arrow').css({'top' : ((imgHeight - 60) / 2)})
  // console.log(imgHeight);
}

novedadesBkgImgHeight = function () {
  var novedadesImg2 = $('.novedades li.institucional .img');
  var imgHeight = novedadesImg2.height();
  $('.novedades li .bkg-img').height(imgHeight);
  // console.log(imgHeight);
}

$(document).ready(function () {
  mobileClass();
  onScrollInit( $('.os-animation') );
  onScrollInit( $('.staggered-animation'), $('.staggered-animation-container') );
  new WOW().init();
  $(window).scroll(fixNav);
  fixNav();
  fixStuffToTop();
  headerTitles();
  setTimeout(function() {
    equalAmountOfBlueberriesInEachMuffin();
  }, 1000);
  

  // Placeholder text disappears on focus
  $('input,textarea').focus(function(){
    $(this).data('placeholder',$(this).attr('placeholder'));
    $(this).attr('placeholder','');
  }).blur(function(){
    $(this).attr('placeholder',$(this).data('placeholder'));
  });

  // Animated Hamburger Icon  
  $('button.lines-button.x').click(function() {
    if ( !$(this).hasClass('close') ) {
      navExpands();         
    } else {
      navCollapses();
    }      
    return false;
  });

  // Secondary Nav
  $('.section-header > .wrapper').click(function() {
    if ($(window).width() <= 850) {
      var action_trigger = $(this).children('a.chevron');
      if ( !$(action_trigger).hasClass('close') ) {
        secondaryNavExpands();
      } else {
        secondaryNavCollapses();
      }      
      return false;
    }
  });


  // Sidebar Nav
  $('aside > h2').click(function() {
    if ($(window).width() <= 767) {
      var action_trigger = $(this).children('a.chevron');
      if ( !$(action_trigger).hasClass('close') ) {
        sidebarNavExpands();
      } else {
        sidebarNavCollapses();
      }
      return false;
    }
  });


  $('footer .col > a, #home #secciones li > a, .novedades li > a').hover(function() {
    $(this).parent().toggleClass('hovered');
  });

  $('footer a[href*="facebook"]').hover(function() {
    $(this).parents('#bottom').toggleClass('facebook');
  });
  $('footer a[href*="linkedin"]').hover(function() {
    $(this).parents('#bottom').toggleClass('linkedin');
  });
  $('footer a[href*="google"]').hover(function() {
    $(this).parents('#bottom').toggleClass('gplus');
  });
  $('footer a[href*="mailto"]').hover(function() {
    $(this).parents('#bottom').toggleClass('mailto');
  });
  $('footer a[href*="whatsapp"]').hover(function() {
    $(this).parents('#bottom').toggleClass('whatsapp');
  });
  $('footer .social a').hover(function() {
    $(this).siblings().toggleClass('fade');
  });

  // Footer toggles
   $('footer .toggle-trigger').click(function() {
    $(this).toggleClass('rotate');
    $(this).parent().find('.toggle').slideToggle();
    $(this).find('span').text(function(_, text) {
        return text === '' ? 'Mas' : '';
    });
    return false;
  });

  

  // homepage
  $('#hero').slick({
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
    infinite: true,
    speed: 500,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4500,
    fade: true,
  });

  $('ul.novedades').slick({
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [    
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
  });

  $('ul.galeria').slick({
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
  //   responsive: [    
  //   {
  //     breakpoint: 600,
  //     settings: {
  //       dots: false,
  //     }
  //   }
  // ]
  });

  // heroHeight();

  setTimeout(function(){ 
    novedadesArrowsPosition();
  }, 10);

  
  $('.youtube-popup').magnificPopup({type:'iframe'});
  $('.google-search-popup').magnificPopup({
    type:'iframe',
    height: '80%'
  });
  
  // Multilevel Accodion Sidebar Menu
  $(".multilevel-accordion .accordion a").click(function() {
      var empty_link = $(this).attr("href");
      var link = $(this);
      var closest_ul = link.closest("ul");
      var parallel_active_links = closest_ul.find(".active")
      var closest_li = link.closest("li");
      var link_status = closest_li.hasClass("active");
      var count = 0;

      if (empty_link == "#") {
        closest_ul.find("ul").slideUp( "fast", function() {
          if (++count == closest_ul.find("ul").length)
            parallel_active_links.removeClass("active");
        });

        if (!link_status) {
          closest_li.children("ul").slideDown('fast');
          closest_li.addClass("active");
        }
        return false;
      }
  });

  // Google Maps
  if ($('#map').length) {
    // Define your locations: HTML content for the info window, latitude, longitude
    var locations = [
      ['<div class="burbuja"><h3>Servicio de Emergencias</h3><p>Conde 851</p><p>Buenos Aires</p><p>(+54 11) 4556 4800</p></div>', -34.576833, -58.450917, "/images/markers/sanatorio.svg"],
      ['<div class="burbuja"><h3>Línea D</h3><p>Estación Olleros</p></div>', -34.569972, -58.444306, "/images/markers/subte-d.svg"],
      ['<div class="burbuja"><h3>Línea B</h3><p>Estación Federico Lacroze</p></div>', -34.587278, -58.454083, "/images/markers/subte-b.svg"],
      ['<div class="burbuja"><h3>Ferrocarril Gral. Urquiza</h3><p>Estación Federico Lacroze</p></div>', -34.586611, -58.455333, "/images/markers/ferrocarril-urquiza.svg"],
      ['<div class="burbuja"><h3>Ferrocarril Mitre</h3><p>Estación Colegiales</p></div>', -34.572667, -58.448306, "/images/markers/ferrocarril-mitre.svg"]
    ];
    
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: new google.maps.LatLng(-34.576833, -58.450917),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
      scrollwheel: false,
      styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
    });

    var infowindow = new google.maps.InfoWindow({
    });

    var markers = new Array();
    
    // Add the markers and infowindows to the map
    for (var i = 0; i < locations.length; i++) {  
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: locations[i][3]
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
      
    }

    function autoCenter() {
      //  Create a new viewpoint bound
      var bounds = new google.maps.LatLngBounds();
      //  Go through each...
      for (var i = 0; i < markers.length; i++) {  
        bounds.extend(markers[i].position);
      }
      //  Fit these bounds to the map
      map.fitBounds(bounds);
    }
    autoCenter();
  }



  // Formularios  // -+-+-+-+-+-+-+-+-+-+
  if($('#example1').length) {
    $('#example1').ketchup();
  }
  
  if($('#example2').length) {
    $('#example2').ketchup({
      validationAttribute: 'rel',
      errorContainer: $('<div>', {
        'class': 'ketchup-error-container-alt',
        html: '<ol></ol>'
      }),
      initialPositionContainer: function(errorContainer, field) {
        //errorContainer = the error-container with all childs
        //field = the field that needs to get validated
      },
      positionContainer: function(errorContainer, field) {},
      showContainer: function(errorContainer) {
        errorContainer.slideDown('fast');
      },
      hideContainer: function(errorContainer) {
        errorContainer.slideUp('fast');
      }
    });
  }
  
  if($('#example3').length) {
    $('#example3').ketchup();
  }
  
  if($('#example4').length) {
    $('#example4').ketchup();
  }
  // End Formularios  // -+-+-+-+-+-+-+-+-+-+
  
  // Basic Accordion //  
  $('.accordion .heading-toggle').click(function(){
    //Expand or collapse this panel
    $(this).toggleClass('current');
    $(this).siblings('.heading-toggle').removeClass('current');
    $(this).nextAll('.accordion-content').first().slideToggle('fast');
    //Hide the other panels
    $(".accordion-content").not($(this).nextAll('.accordion-content').first()).slideUp('fast');
  });

  if ($('#typeahead').length) {
    var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  var states = ['Activa Salud SRL', 'Asoc. Española De S.M de Belgrano', 'Asoc. Ital. de SS.MM.de Belgrano', 
    'Asoc. Mutual Pers.Jerar.Bcos', 'ADOS - Comodoro Rivadavia', 'Asoc. Médica De Pergamino', 'Cobermed',
    'Direccion Gral. Personal Fuerza', 'Direccion de O.S Del S.P.F.', 'Dialitys S.A', 'Genesen S.A.', 
    'Iter Medicina SA', 'Investigaciones Vasculares', 'Llansa', 'Medicals', 'O.S.E.C.A.C.',
    'O.S.Je.R.a.', 'OSPEDYC', 'O.S.Pers.J.Club e Hipodromos', 'Obra Social De Petroleros OSPE', 'Obra Social E.W.Hope',
    'OPDEA (Direc. Alimentacion)', 'OSPATCA (Adm de la Construcción)', 'O.S.P.A - Presonal Aeronautico', 
    'OSDE', 'OSDEPYM-Obra Soc.Emp.-Pyme', 'OSETYA-OS Deempletextiles Y Af.', 'Obra Social Viajantes Vend. – OSVVRA', 
    'O.S. Personal de Farmacia', 'O.S. Personal Aeronautico', 'OSTEE (Obra Social Traba. Emp. Electricidad)', 'O.S Agentes de Propaganda Medica', 'O.S Jardineros', 'O.S de Personal De Panaderias',
    'O.S De Actores', 'Os. de Futbolistas', 'O.S de Tecnicos de Futbol', 'OMINT', 'Os Pers. Obras Y Servicios Sanitarios', 'OSFATLYF', 'OS Modelos Argentinos', 'Rganización Medica', 'Os Pers. Auxiliar De Casas de Familia', 'Privamed', 'Programas De Salud S.A.', 'Revension Salud', 'PREFEX', 'SADAIC', 'Sindicato Empleados del Caucho', 'Swiss Medical Group SA', 'SCIS SA', 'Servicios Y Prestaciones Medicas SA', 'Union Personal', 'Universal Assistance SA', 'Worl Y Baires SA'
  ];

  $('#typeahead .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'states',
    source: substringMatcher(states)
  }).on('typeahead:selected', function(event, selection) {
    var my_key = selection;
    // alert(my_key);
    $('#message').show().html('<i class="fa fa-check"></i><strong>' + my_key + '</strong>' + ' tiene habilitada la atención en nuestra institución.');
    $('#nope').hide();
  });

  }
  $('#typeahead-messages #nope, #typeahead-messages #message').hide();

  $('#typeahead input').keyup(function() {
    if ($('.tt-menu').hasClass('tt-empty')) {
      // console.log('empty');
      $('#nope').show().html('No se encontraron resultados.');
      $('#message').hide();
    }
    else {
      $('#nope').hide();
    }
  });
  $('body').click(function() {
    if(!$('input.tt-input').attr('placeholder')=='' || $(this).attr('placeholder')==null){
        $('#nope').hide();
    }
  });


  







});


$(window).load(function () {
  setTimeout(function(){ 
    novedadesArrowsPosition();
    novedadesBkgImgHeight();
  }, 15);

  $('a.turnos-online').click(function() {
    $('.chathiper-min').click();
    return false;
  });

});



$(window).resize(function () {
  // heroHeight();
  mobileClass();  
  fixStuffToTop();
  headerTitles();
  $('ul.novedades li .content').height('');
  setTimeout(function() {
    equalAmountOfBlueberriesInEachMuffin();
    novedadesArrowsPosition();
    novedadesBkgImgHeight();
  }, 100);
  
});








