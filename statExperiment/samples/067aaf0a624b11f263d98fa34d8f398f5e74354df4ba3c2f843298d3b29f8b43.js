$(function(){
  $('.flats-from-var__link--red')
    .add('.tagline-var__link')
    .add('.see-video__link')
    .add('.see-video-var__link--popup')
    .add('.see-video-var2__link')
      .magnificPopup();

  if ($(window).width() <= 610) {
    $('.our-photos-list').owlCarousel({
      items: 1,
      nav: true,
      navText: ['', '']
    });
  }

  $('.our-photo-wrapper').magnificPopup({
    type: 'image',
    zoom : {
      enabled: true,
      duration: 300
    }
  });

  $('.see-video-var__link--you').click(function(e){
    e.preventDefault();
    $(this).after('<iframe class="see-video-var__video" src="https://www.youtube.com/embed/HS_facWs9vk" frameborder="0" allowfullscreen></iframe>');
    $(this).remove();
  });

  function scrollToPlugin(elemClass) {
    $('.' + elemClass).click(function () {
      var elementClick = '#'+$(this).attr("href").split("#")[1],
        destination = $(elementClick).offset().top;
      $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 60}, 1000);
      return false;
    });
  }

  scrollToPlugin("flats-from-var__link--trans");
  scrollToPlugin("form-section-var__link");

  $('.order-form__check-label').change(function(){
    $(this).toggleClass('active');
  });
});