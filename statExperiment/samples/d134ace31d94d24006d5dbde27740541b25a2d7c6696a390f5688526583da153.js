jQuery(document).ready(function($){
    let approachSection = $('.ui-ux-our-approach');

    if (approachSection) {
        let apprIt = $('.approach-list .approach-item');

        apprIt.on('click' , function () {

            if (!$(this).hasClass('active')){
                apprIt.find('.item-detail').fadeTo( 200, 0).css( 'pointer-events', 'none' );
                apprIt.removeClass('active');
                $(this).find('.item-detail').fadeTo( 200, 1).css( 'pointer-events', 'all' );
                $(this).addClass('active');
            }
        })
    }

});