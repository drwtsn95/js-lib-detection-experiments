function adapt_head() {
    if($(window).width() < 350){
        $('.log_div').css('margin','20px 30px 16px 30px');
        $('.menu_img').css('margin','27px 30px 0 0');
        $('.menu_hover').css('margin','27px 30px 0 0');
        $('.logo').css('margin','0 0 -20px 0');
        $('.logo').css('zoom','0.7');
        $('header>ul').hide();
        $('.menu_img').show();
        $('.menu').hide();
        $('.menu_hover').hide();
    } else if ($(window).width() < 405){
        $('.menu_img').css('margin','29px 50px 0 0');
        $('.menu_hover').css('margin','29px 50px 0 0');
        $('.logo').css('zoom','0.7');
        $('header>ul').hide();
        $('.menu_img').show();
        $('.logo').css('margin','0 0 -20px 0');
        $('.log_div').css('margin','20px 30px 16px 30px');
        $('.menu').hide();
        $('.menu_hover').hide();
    } else if ($(window).width() < 575){
        $('.log_div').css('margin','15px 30px 16px 30px');
        $('.logo').css('margin','0 0 -20px 0');
        $('.logo').css('zoom','1');
        $('header>ul').hide();
        $('.menu_img').show();
        $('.menu').hide();
        $('.menu_hover').hide();
    } else if ($(window).width() < 1000){
        $('.log_div').css('margin','8px 30px 8px 50px');
        $('.logo').css('margin','0');
        $('.logo').css('zoom','1');
        $('header>ul').hide();
        $('.menu_img').show();
        $('.menu').hide();
        $('.menu_hover').hide();
    } else if($(window).width() < 1220){
        $('.log_div').css('margin','8px 30px 8px 50px');
        $('header').css('font-size','13px');
        $('.logo').css('margin','0');
        $('.logo').css('zoom','1');
        $('header>ul').show();
        $('.menu_img').hide();
        $('.menu').hide();
        $('.menu_hover').hide();
    } else{
        $('.log_div').css('margin','8px 110px 8px 100px');
        $('header').css('font-size','15px');
        $('.logo').css('margin','0');
        $('.logo').css('zoom','1');
        $('.menu_hover').hide();
        $('.menu_img').hide();
        $('header>ul').show();
    }
}
$(document).ready(function () {
    adapt_head();
    $('.menu').html('<ul>'+$('header>ul').html()+'</ul>');
    $(window).resize(function () {
        adapt_head();
    });
    $('.menu_img').click(function () {
        $('.menu_img').hide();
        $('.menu_hover').show();
        $('.menu').show();
    });
    $('.menu_hover').click(function () {
        $('.menu_img').show();
        $('.menu_hover').hide();
        $('.menu').hide();
    })
});
