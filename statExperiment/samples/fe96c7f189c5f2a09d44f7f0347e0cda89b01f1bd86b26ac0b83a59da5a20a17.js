
        
            jq(function(){
                 var minMargin=0;
                 var countSlide=jq(".subMSlides").length;
                 var maxMargin=-(countSlide-1)*1200;

                jq(".m_arrow_left").on("click",function(){moveLeft();});
                jq(".m_arrow_right").on("click",function(){moveRight();});

                function moveRight(){
                     var mr=parseInt(jq(".inner_container").css("margin-right"));
                     if(mr==maxMargin)  return false;

                     jq(".inner_container").animate({marginRight: "-="+1200+"px"},500);
                }
                function moveLeft(){
                    var mr=parseInt(jq(".inner_container").css("margin-right"));
                    if(mr==0) return false;
                    jq(".inner_container").animate({marginRight: "+="+1200+"px"},500);

                }

            });
        
        
            jq(function(){
                jq("#linkservices_10 .more_btn").on("click",function(){

                     if(jq(this).parent().find("ul>.small_more").length){
                         jq(this).parent().find("ul>.small_more").slideToggle("slow",function(){
                                if (jq(this).is(":visible")) {
                                     jq(this).parent().parent().find(".more_btn").text("کمتر");
                                } else {
                                     jq(this).parent().parent().find(".more_btn").text("بیشتر");
                                }

                         });
                     }
                     else{
                     if(jq("#linkservices_10 .more_div").hasClass("more_active")){
//                     debugger;
                        var el=jq("#linkservices_10 .more_div.more_active");
                        var dId=el.attr("data-id");
                        if(el.attr("data-id") !=jq(this).attr("data-id")){
                            el.slideToggle("slow");
                            jq("#linkservices_10 .more_btn[data-id="+dId+"]").text("بیشتر");
                            jq("#linkservices_10 .more_div").removeClass("more_active");
                            jq("#linkservices_10 .ls_box").removeClass("box_active");
                        }


                     }

                      if(jq(this).parent().hasClass("box_active"))
                          jq(this).parent().removeClass("box_active");
                      else
                          jq(this).parent().addClass("box_active");

                        var id=jq(this).attr("data-id");
                       jq("#linkservices_10 .more_div[data-id="+id+"]").slideToggle("slow",function(){
                            if (jq(this).is(":visible")) {
                                 jq("#linkservices_10 .more_btn[data-id="+id+"]").text("کمتر");
                                 jq(this).addClass("more_active");
                            } else {
                                  jq("#linkservices_10 .more_btn[data-id="+id+"]").text("بیشتر");
                                  jq(this).removeClass("more_active");
                            }

                       });
                     }
                });

            });
        
            
            jq(function(){
                var $el, $ps, $up, totalHeight;
                var cut_text_height=jq("#page-wrap0 .cut_text").height();
                var $height_p_0=jq(".sidebar_box_0 > p:first-child").height();
                if($height_p_0  > cut_text_height){
                    jq("#btn_cta_190").addClass("has_class_more");
                }
				jq(".sidebar_box_0 .read-less").fadeOut(0);
                jq(".sidebar_box_0 > p:first-child").css("max-height",cut_text_height);
                jq(".sidebar_box_0 .read-more-button").click(function() {
                    totalHeight = 0;
                    $el = jq(this);
                    $p  = $el.parent();
                    $up = $p.parent();
                    $p.siblings(".btn_cta").removeClass("has_class_more");
                    $up.find(" > p:first-child")
                        .css({
                            // Set height to prevent instant jumpdown when max height is removed
                            "height": $up.find(" > p:first-child").height(),
                            "max-height": 9999
                        })
                        .animate({
                            "height":  $height_p_0
                        },1000);

                    // fade out read-more
                    $p.fadeOut();
                    jq(".sidebar_box_0 .read-less").fadeIn(1000);

                    // prevent jump-down
                    return false;

                });

                jq(".sidebar_box_0 .read-less-button").click(function() {
                    $el = jq(this);
                    $p  = $el.parent();
                    $up = $p.parent();
                    $p.siblings(".btn_cta").addClass("has_class_more");
                    totalHeight = $up.find(" > p:first-child").height();
                    $up.find(" > p:first-child")
                        .css({
                            // Set height to prevent instant jumpdown when max height is removed
                            "height": totalHeight,
                            "max-height": 9999
                        })
                        .animate({
                            "height": cut_text_height
                        },1000);
                    $p.fadeOut();
                    jq(".sidebar_box_0 .read-more").fadeIn(1000);
                    return false;
			    });
            });
        
            jq(function(){
                jq(".search-icon2").unbind("click").bind("click",function(){
                    var str=jq("#co2_search").val();
                    str= str.replace(/-/g, "_");
                    str= str.replace(/ /g, "-");
                    window.location.href = "https://30o2.com/search-r-" + str;
                });

                jq("#co2_search").keypress(function(e){
                   // debugger;
                    if(e.which == 13){//Enter key pressed
                        jq(".search-icon2").click();//Trigger search button click event
                    }
                });
            });
        
            jq(function(){

                    jq("#srch_icon").unbind("click").bind("click",function(){
                        jq("#second_texbox").focus();
                        if(jq("#second_texbox").val() == ""){
                            jq("#second_texbox").toggleClass("search_open");
                            jq("#result_search").addClass("setTop");

                            if(jq("#second_texbox").is(".search_open"))
                                jq("#p_box").css({width:"400px"});
                            else
                                jq("#p_box").css({width:"250px"});

                            jq(".shoptag_srch_box").addClass("setTop");
                            jq(".closeIcon").toggleClass("closeShow");
                        }
                        else
                        {
                            var str=jq("#second_texbox").val();
                            str= str.replace(/-/g, "_");
                            str= str.replace(/ /g, "-");
                            window.location.href = "https://30o2.com/search-r-" + str;

                        }

                         jq("#second_texbox").keypress(function(e){
                                if(e.which == 13){//Enter key pressed
                                    jq("#srch_icon").trigger("click");//Trigger search button click event
                                }
                            });
                    });


                jq(".closeIcon").on("click",function(){
                     jq("#second_texbox").removeClass("search_open");
                     jq("#p_box").css({width:"250px"});
                     jq("#second_texbox").val("");
                     jq(".closeIcon").removeClass("closeShow");
                });




            });
        
             jq(function(){
                 if(jq(window).scrollTop()>0)
                    jq(".co2_header").addClass("change_bg");
                  else
                    jq(".co2_header").removeClass("change_bg");


                 jq(window).bind("scroll",function(){
                    var menuHeight = jq(".co2_header").height();
                    var menuScrollTop = jq(".co2_header").offset().top ;

                    var navHeight = jq( window ).height() - menuScrollTop - menuHeight;

                     if (jq(this).scrollTop() > navHeight){
                            jq(".co2_header").addClass("change_bg");
                        }
                     else{
                            jq(".co2_header").removeClass("change_bg");
                        }
                 });

             });
        
            jq(function(){
                if (jq("#back-to-top").length) {
                    var scrollTrigger = 100, // px
                        backToTop = function () {
                            var scrollTop = jq(window).scrollTop();
                            if (scrollTop > scrollTrigger) {
                                jq("#back-to-top").addClass("show");
                            } else {
                                jq("#back-to-top").removeClass("show");
                            }
                        };
                    backToTop();
                    jq(window).on("scroll", function () {
                        backToTop();
                    });
                    jq("#back-to-top").on("click", function (e) {
                        e.preventDefault();
                        jq("html,body").animate({
                            scrollTop: 0
                        }, 500);
                    });
                }
            });
        
            jq(function(){
                jq("body").on("click",".body-open-popup-1",function(){
                    jq("#body_popup_1").addClass("open-popup");
                    jq("body").css("overflow","hidden");
                });
                jq("body").on("click",".body-open-popup-2",function(){
                    jq("#body_popup_2").addClass("open-popup");
                    jq("body").css("overflow","hidden");
                });
                jq("body").on("click",".body-close-popup-1",function(){
                    jq("#body_popup_1").removeClass("open-popup");
                    jq("body").css("overflow","initial");
                });
                jq("body").on("click",".body-close-popup-2",function(){
                    jq("#body_popup_2").removeClass("open-popup");
                    jq("body").css("overflow","initial");
                });
                jq("#body_popup_1").on("click",".icon-close-popup",function(){
                    jq("#body_popup_1").removeClass("open-popup");
                    jq("body").css("overflow","initial");
                });
                jq("#body_popup_2").on("click",".icon-close-popup",function(){
                    jq("#body_popup_2").removeClass("open-popup");
                    jq("body").css("overflow","initial");
                });
            });
        ;jq(function(){AOS.init();});