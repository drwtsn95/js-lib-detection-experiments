(function($) {
    jQuery(document).ready(function()
    {
        var get_fal = $(".fal-hafez.shortcode #get_fal");

        if($(get_fal).length >0 ){
            $(get_fal).on("click",function(){

                var fal_popup = '<div class="poem_single_page fal">' +

                    '<div class="inner">' +
                    '<div class="content">' +
                    '<div class="close">بستن</div>' +
                    '<div class="loading"><div class="lds-ellipsis"><div></div><div></div><div></div></div>'+
                    '</div>' +
                    '</div>' +
                    '</div>';
                $("body").append(fal_popup);

                $(".poem_single_page.fal .close").on("click",function(){
                    $(this).closest(".fal").remove();
                });

                $.ajax({
                    type: 'POST',
                    url: fal_hafez_setting.ajaxurl,
                    data: {
                        'action': 'get_fal_hafez'
                    },
                    success: function (resp) {
                        if(resp.success === true){
                            $(".poem_single_page.fal .content .loading").html(resp.html);
                        }
                        else if(resp.success === false && resp.message){
                            alert(resp.message);
                        }
                    },
                    error: function () {
                        alert("خطایی در دریافت فال رخ داده است");
                    }
                });
            });
        }


        /*$("#poem_audio_player").on("click",function()
        {
            var audio = $("#poem_audio");

            if(!$(this).hasClass("playing"))
            {
                $(this).addClass("playing");
                audio[0].play();
            }
            else
            {
                $(this).removeClass("playing");
                audio[0].pause();
            }
        });

        var poem_audio_url = $("#poem_audio_url").data("src");
        var poem_audio = $("<audio id='poem_audio' src='"+poem_audio_url+"' autoplay>");

        setTimeout(function () {
            $("#poem_audio_player").trigger("click");
        },3000);*/

    });
}(jQuery));

