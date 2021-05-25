var randomNumber = Math.floor(1e7 * Math.random() + 1),
    buttonHtml = "";
function validateForm() {}
function loaderShow(e) {
    buttonHtml = $(e).html(); $(e).html("");$(e).append('<i class="fa fa-circle-o-notch fa-spin" style="margin-right:5px;"></i>Submitting');
    $(e).attr('attrwidth',$(e).css('width'));
    $(e).css('width','auto');
}
function loaderHide(e) {
   $(e).css('width',$(e).attr('attrwidth'));
   $(e).find('.fa-spin').remove();
   $(e).html(buttonHtml);
  
}
$(document).ready(function () {
    $("form").find("button[type='button']")
        .on("click", function () {        
            var e = [],
                r = [],
                a = !0,
                current = this;
                loaderShow(current);
                s = $(current).parents("form").attr("id");
                var fieldname = []; var errorArr =  [];var newfieldname = [];
    //clean Array name                
    $("#" + s).find('[type="checkbox"],[type="radio"]').each(function(){
        $(this).attr('name',$(this).attr('name').replace("[]", ""));
    });
    //Required Field Condition Start
    $("#" + s).find("input,textarea,select").not('[type="hidden"]').not('[field_required="false"]').each(function () {
        $(this).removeClass('form-border-red-textbox');
    });
    //Storing label For rapify saving form 
    var storeLabel = '';
    $("#" + s).find("input,textarea,select").each(function(){
            let tName1 = $(this).attr("name");
            if (null != tName1) {
                if($.inArray(tName1,newfieldname) >= 0){
                  return;
                }   
                newfieldname.push(tName1);
                  if($(this).attr('data-placeholder')){    
                    storeLabel += $(this).attr('data-placeholder')+';;';
                  }else{
                    storeLabel += $(this).attr('name')+';;';
                  }
            } 
    });
 
    $("#" + s).find("input,textarea,select").not('[type="hidden"]').not('[field_required="false"]').each(function () 
    {
        let tName = $(this).attr("name");
        if (null != tName) {
            if($.inArray(tName,fieldname) >= 0){
              return;
            }   
            fieldname.push(tName);
            let fieldType = $(this).attr("fieldtype");
            switch(fieldType){
               case 'inputField':
               case'':
                 if($(this).val()==''){
                     let nameholder = $(this).attr('data-placeholder');
                     a = !1;
                     errorArr.push(nameholder+' is required.');
                 }
                  //Email Invalid
                    if($(this).attr('name')=="email" && 0 == /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val()) && ($(this).focus())){ 
                        let nameholder1 = $(this).attr('data-placeholder');
                        $(this).addClass("form-border-red-textbox");
                        a = !1;
                        errorArr.push(nameholder1+' is invalid.');
                    }
               break; 
               case 'radioButtons':
                    var getName = $(this).attr('name');
                    console.log(getName);
                    if( $('[name="'+getName+'"]:checked').length <= 0){
                        $('[name="'+getName+'"]').addClass("form-border-red-textbox");
                         let nameholder = $(this).attr('data-placeholder');
                         a = !1;
                         errorArr.push(nameholder+' is required.');
                    }
               break; 
               case 'checkBoxes':
                    var getName = $(this).attr('name');
                    if( $('[name="'+getName+'"]:checked').length <= 0){
                        $('[name="'+getName+'"]').addClass("form-border-red-textbox");
                         let nameholder = $(this).attr('data-placeholder');
                         a = !1;
                         errorArr.push(nameholder+' is required.');
                    }
               break; 
               case 'dropdown':
                    if($(this).val()==''){
                       $(this).addClass("form-border-red-textbox");
                       let nameholder = $(this).attr('data-placeholder');
                       a = !1;
                       errorArr.push(nameholder+' is required.');
                 }
               break; 
            }
          
        }
     
    }); 
                         
    if(errorArr.length>0){
        loaderHide(current);
    }
    //Required Field Condition End
            if (
                ($(current).attr("disabled", !0),
                $.ajax({
                    url: "configuration/config.json?rm=" + randomNumber,
                    type: "get",
                    async: !1,
                    success: function (r) {
                        for (var a in (r))
                            for (var current in r[a])
                                if (r[a].hasOwnProperty(current) && current == s) {
                                    var o = r[a][s].form_required_fields;
                                    e = o.split(",");
                                }
                             
                    },
                }),
                1 == $("#" + s).find(".g-recaptcha").length)
            )
                if ($("#" + s).find(".g-recaptcha-response").length > 0) {
                    var o = new Array(),
                        i = $("#" + s)
                            .find(".g-recaptcha")
                            .attr("id"),
                        n = i.split("html_element_");
                    try {
                        var l = grecaptcha.getResponse(n[1]);
                    } catch (current) {
                        var c = "reCaptcha not verified";
                        errorArr.push(c);
                    }
                    "" == l && ((c = "Captcha is Invalid"), r.push(c), (a = !1), grecaptcha.reset(o[i]));
                } else if (a) {
                    $("script").each(function () {
                        if ($(this).attr("src").includes("www.google.com/recaptcha/api.js")) {
                            var e = $(this).attr("src");
                            $.urlParam = function (r) {
                                var a = new RegExp("[?&]" + r + "=([^&#]*)").exec(e);
                                return null == a ? 0 : a[1] || 0;
                            };
                        }
                    });
                    var d = $("#" + s)
                            .find(".g-recaptcha")
                            .text(),
                        m = window.location.pathname.split("/").pop();
                    if ("" == m) var u = "homepage";
                    else u = m;
                    var h = { action: u.replace(".", "_"), secret: $.urlParam("secretkey"), response: d };
                    $.post("library/captchav3.php", h, function (e) {
                        e.success, console.log(e);
                    });
                }
            if (a) {
                //lets make an array of html whose type checkbox and radio.
                $("#error_message").html("");
                $("#" + s).find('[type="checkbox"],[type="radio"]').each(function(){
                    $(this).attr('name',$(this).attr('name')+'[]');
                 });
                var f = $("#" + s).serialize() + "&formId=" + s +"&formplaceholder="+storeLabel;
                $.ajax({ url: "library/send_email.php", type: "post", dataType: "json", data: f }).done(function (e) {
                    //reset all
                    $("#" + s)
                    .find("input,textarea,select").not('[type="radio"],[type="checkbox"]')
                    .each(function () {
                        $(this).val(''); 
                    });
                    $("#" + s)
                    .find('[type="checkbox"],[type="radio"]')
                    .each(function () {
                        $(this).prop('checked',false);
                    });
                    //Comeback default checks
                    $("#" + s).find("input ,textarea,select").each(function () {
                        if($(this).attr("checked")=="checked"){
                                $(this).prop("checked",true);
                        }
                    });

                    
                    if (
                        (
                        $(current).attr("disabled", !1),
                        1 == e.code)
                    ) {
                        loaderHide(current);
                        var r = JSON.parse(e.data);
                        0 == r.after_submit && 0 != r.page_name && "" != r.page_name
                            ? (window.location.href = r.page_name + ".html")
                            : 0 == r.after_submit && "" != r.custom_url
                            ? (window.location.href = r.custom_url)
                            : 1 == r.after_submit &&
                              ($("#" + s)
                                  .find("#error_message")
                                  .html(r.success_message),
                              $("#" + s)
                                  .find("#error_message")
                                  .removeClass("error_response"),
                              $("#" + s)
                                  .find("#error_message")
                                  .addClass("success_response"),
                              $("#" + s)
                                  .find("#error_message")
                                  .css("color", "green"),
                              $(current).parents(".contact-outer-home").scrollTop(0));
                    } else
                        loaderHide(current),
                            $("#" + s)
                                .find("#error_message")
                                .html(e.message),
                            $("#" + s)
                                .find("#error_message")
                                .removeClass("success_response"),
                            $("#" + s)
                                .find("#error_message")
                                .addClass("error_response"),
                            $("#" + s)
                                .find("#error_message")
                                .css("color", "red"),
                            $(current).parents(".contact-outer-home").scrollTop(0);
                });
            } else {
                loaderHide(current), $(current).attr("disabled", !1);
                var p = errorArr.join("<br>");
                $("#" + s)
                    .find("#error_message")
                    .removeClass("success_response"),
                    $("#" + s)
                        .find("#error_message")
                        .addClass("error_response"),
                    $("#" + s)
                        .find("#error_message")
                        .html(p),
                    $(current).parents(".contact-outer-home").scrollTop(0);
            }
        }),
        $(window).width() <= 992 &&
            $(".submenus").each(function () {
                ("#" != $(this).attr("href") && "" != $(this).attr("href")) ||
                    $(this).click(function () {
                        "display:block !important" == $(this).next(".sub-menu").attr("style")
                            ? $(this).next(".sub-menu").attr("style", "display:none !important")
                            : ($(this).next(".sub-menu").attr("style"), $(this).next(".sub-menu").attr("style", "display:block !important"));
                    });
            });
});
