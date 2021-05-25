jQuery(document).ready(function($){
        //BEGIN detail page js
        if($('.mona-tu-url').length){
          $('.mona-tu-url').val(window.location.href);  
        }
        
        if($('#image360').length){
        var initReelImages = $('#image360').attr('data-images');
        if(initReelImages.split('|')[1] != ''){
            $('#image360').reel({images: initReelImages});
            $('.product-360-wrap .indicator').on('click', '.step-click', function(e){
                e.preventDefault();
                $(this).hasClass('left-step') ? $('#image360').trigger("stepLeft") : $('#image360').trigger("stepRight") ;            
            });
        }
        }   
        $('.pd-color-picker').on('click', '.cl-picker', function(e){
            var reelImages = $(this).attr('data-imgs');
            if(reelImages.split('|')[1] != ''){
                var reelImageString = reelImages.split('|')[1].split('..')[0];
                var reelImage = reelImages.split('|')[0].replace(/####/g, reelImageString);
                $('#image360').reel({images: reelImages});
            } else {
                $('#image360').attr('src', reelImages.split('|')[0]);
            }
            
            $(this).addClass('active').siblings().removeClass('active');
        });
        
        $('.bike-gallery-ul').lightGallery({
            mode: 'lg-fade',
            cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
            selector: '.glitem',
            thumbnail: true,
            exThumbImage: 'data-thumb',
        }); 
        //END detail page js
    });