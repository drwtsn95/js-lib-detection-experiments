
jQuery(document).ready(

  function() {

    $( "#queen_click").on("click", function() {

        $('html,body').animate({
                scrollTop: $(".tab-content").offset().top - 100},'slow');


        $( "#twin_click" ).removeClass('active');
        $( "#deluxe_click" ).removeClass('active');

        console.log("Panel Toggle for Hotel Selection: Queen ...");
    });

    $( "#twin_click").on("click", function() {

        $('html,body').animate({
                scrollTop: $(".tab-content").offset().top - 100},'slow');

        $( "#queen_click" ).removeClass('active');
        $( "#deluxe_click" ).removeClass('active');

        console.log("Panel Toggle for Hotel Selection: Twin ...");
    });

    $( "#deluxe_click").on("click", function() {

        $('html,body').animate({
                scrollTop: $(".tab-content").offset().top - 100},'slow');

        $( "#queen_click" ).removeClass('active');
        $( "#twin_click" ).removeClass('active');

        console.log("Panel Toggle for Hotel Selection: Deluxe ...");
    });

});
