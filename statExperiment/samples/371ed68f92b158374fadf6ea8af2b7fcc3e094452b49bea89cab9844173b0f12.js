// home-page rating js
$(document).ready(function() {
    var ratingElem = $('.user-banner-rating input[name="star"]');
    ratingElem.change(function() {
      if (this.checked) {
        $(this).parent().addClass("active");
      }
    });
  });

var critic_value = document.getElementById("critic-rate_value").innerText;
  critic_rating = parseFloat(critic_value);
   if(typeof critic_rating !== "undefined" && critic_rating !== ""){
     if(critic_rating != 5) {
        var clapWidth = 11.6 * critic_rating + 9.7;
      } else {
        var clapWidth = 100;
      }
      $('.critic-rate span label.half').css("width",parseInt(clapWidth)+"%");
    }else {
     $('.critic-rate span label.half').css("width","0%");
    }

var user_value = document.getElementById("banner_user_rate").innerText;
  rating = parseFloat(user_value);
  if(typeof rating !== "undefined" && rating !== ""){
    if(rating != 5) {
      var clapWidth = 11.6 * rating + 9.7;
    } else {
      var clapWidth = 100;
    }
    $('.half_banner_user_rating').css("width",parseInt(clapWidth)+"%");
  }else {
    $('.half_banner_user_rating').css("width","0%");
  }


$('.banner_user_rate_js').each(function(){
     var rating = ($(this).attr('rating'));
     var slug = ($(this).attr('slug'));
     if(typeof rating !== "undefined" && rating !== ""){
         if(rating != 5) {
              var clapWidth = 11.6 * rating + 9.7;
          } else {
              var clapWidth = 100;
          }
          $(".half_user_"+slug).css("width",parseInt(clapWidth)+"%");
       }else{
          $(".half_user_"+slug).css("width","0%");
       }
   });
//    banner -user rating ends

$( document ).ready(function() {
   $('.critic_rate_js').each(function(){
     var rating = ($(this).attr('rating'));
     var slug = ($(this).attr('slug'));
     if(typeof rating !== "undefined" && rating !== ""){
        if(rating != 5) {
            var clapWidth = 11.6 * rating + 9.7;
        } else {
            var clapWidth = 100;
        }
        $(".half_critic_"+slug).css("width", parseInt(clapWidth)+"%");
      }else{
          $(".half_critic_"+slug).css("width","0%");
      }
   });

   $('.user_rate_js').each(function(){
     var rating = ($(this).attr('rating'));
     var slug = ($(this).attr('slug'));
     if(typeof rating !== "undefined" && rating !== ""){
         if(rating != 5) {
              var clapWidth = 11.6 * rating + 9.7;
          } else {
              var clapWidth = 100;
          }
          $(".half_user_"+slug).css("width",parseInt(clapWidth)+"%");
       }else{
          $(".half_user_"+slug).css("width","0%");
       }
   });

   $('.theatre_critic_rate_js').each(function(){
     var rating = ($(this).attr('rating'));
     var slug = ($(this).attr('slug'));
     if(typeof rating !== "undefined" && rating !== ""){
        if(rating != 5) {
              var clapWidth = 11.6 * rating + 9.7;
          } else {
              var clapWidth = 100;
          }
          $(".half_theatre_critic_"+slug).css("width",parseInt(clapWidth)+"%");
       }else{
          $(".half_theatre_critic_"+slug).css("width","0%");
       }
   });

   $('.theatre_user_rate_js').each(function(){
     var rating = ($(this).attr('rating'));
     var slug = ($(this).attr('slug'));
     if(typeof rating !== "undefined" && rating != ""){
          if(rating != 5) {
              var clapWidth = 11.6 * rating + 9.7;
          } else {
              var clapWidth = 100;
          }
          $(".half_theatre_user_"+slug).css("width",parseInt(clapWidth)+"%");
       }else{
          $(".half_theatre_user_"+slug).css("width","0%");
       }
   });
});

