$(document).ready(function(){
	/* Açılır Menü */
    $('ul.openthemenu > li:has(ul) > a').append(' <i class="fa fa-caret-down"></i>');
    $('ul.openthemenu > li li:has(ul) > a').append(' <i class="fa fa-caret-right floatright"></i>');
    $('ul.openthemenu > li:has(ul) > a').prop("href", "#")
    $('ul.openthemenu > li:has(ul) > a').css("cursor", "default")
    $('.openthemenu li').mouseenter(function () {
        $(this).parent().find("ul").hide();
        $(this).parent().parent().find("ul a").removeClass("opened");
        if ($(this).find('> ul').length) {
            $(this).find("> a").addClass("opened");
            $(this).find("> ul").show(); //slideDown(); fadeIn(); 
        }
    });
    $(".openthemenu").mouseleave(function () {
        $('.openthemenu ul').hide();
        $('.openthemenu a').removeClass("opened");
    });
	
	/* splash screen */
    $("#splashscreen").click(function () {
        $(this).remove();
    });
});

$(window).load(function () {
    


    /* Sol menüler accordion */
    $("#contentleft ul ul").hide();
    /*$('#contentleft li:has(ul) > a').append('<i class="fa fa-caret-down floatright"></i>');*/
    $("#contentleft .activesubmenu").parents().show();
    /*$("#contentleft li a").click(function () {
        if ($(this).parent().find('> ul').length) {
            $(this).parent().find("> ul").slideToggle(); //slideDown(); fadeIn();
            return false;
        }
    });*/

    /* Fancy */
    $(".fancybox").fancybox();
    $(".ozgecmisac").click(function () {
        $.fancybox({
            type: 'html',
            autoSize: false,
            content: $("#ozgecmis").html(),
            beforeClose: function () {
                $(".fancybox-inner").unwrap();
            }
        }); //fancybox
        return false;
    });

    // etkinlik detayı
    $(".etkinlikac").click(function () {
        var etkinlikhtml = "-";
        var etkinlikbaslik = $(this).parent().parent().html();
        var ilkhaber = $(this).parent().parent().attr("data-id");
		var seans = $(this).parent().parent().attr("data-sid");
		var icerik = $(this).parent().parent().html();
        $.ajax({
            type: 'POST',
            url: '/_static/actdetails.ashx',
            data: { type: ilkhaber, tw: seans },
            success: function (result) {
                etkinlikhtml = result;
                $.fancybox({
                    type: 'html',
                    autoSize: false,
                    content: etkinlikhtml,
                    beforeClose: function () {
                        $(".fancybox-inner").unwrap();
                    }
                });
            },
            error: function (er) {
                etkinlikhtml = "hata" + er.responseText;
            }
        });
        
        return false;
    });


    $("#baskanyardimcilari td strong").click(function () {

        var index = $(this).parent().index();
        var htmlicerik = $(this).parent().parent().next().find("td").eq(index).html();
        var resim = "<img src='" + $(this).parent().find("img").attr("src") + "' />"
        var baslik = $(this).text();

        $.fancybox({
            type: 'html',
            autoSize: false,
            content: "<h2>" + baslik + "</h2>" + resim + htmlicerik,
            beforeClose: function () {
                $(".fancybox-inner").unwrap();
            }
        }); //fancybox
        return false;
    });


    $(".videoclick2").click(function () {
        $.fancybox({
            'padding': 0,
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'title': this.title,
            'width': 800,
            'height': 600,
            'content': "<iframe style='width:800px; height:600px;' src='" + this.href.replace(new RegExp("watch\\?v=", "i"), 'v/') + "'></iframe>",
            'type': 'html',
        }); //fancybox
        return false;
    });

    /* Mobile menu */
    $(".mobileButton").click(function () {
        $("#navmenu").slideToggle();
    });

    /* _D_ */
    //$("#banner h2:first").addClass("active");
    //$("#banner h2").click(function () {
    //    var ind = $(this).index();
    //    $("#banner h2").removeClass("active");
    //    $(this).addClass("active");
    //    $("#banner div img").hide();
    //    $("#banner div img").eq(ind).css("margin-left", "200px");
    //    $("#banner div img").eq(ind).css("opacity", "0");
    //    $("#banner div img").eq(ind).animate({
    //        marginLeft: 0,
    //        opacity: 1
    //    }, 50);
    //    $("#banner div img").eq(ind).show();
    //    return false;
    //});



    var a = 0;
    $(".mobilemenu").click(function () {
        $("#navmenu").slideToggle();
        if (a == 0) {
            $("#subcontent,.menuimage,#zoominoutParent,#home").css("-webkit-filter", "blur(10px)");
            a = 1;
        }
        else {
            $("#subcontent,.menuimage,#zoominoutParent,#home").css("-webkit-filter", "blur(0px)");
            a = 0;
        }
    });

    /* Sipariş ver */
    $(".sipariset").click(function () {
        $("#siparisver").slideToggle();
        return false;
    });

    /* Son ürünler */
    var ms = 2123; var t = setInterval(au, ms);
    var n = $("#urunle > div");
    var na = n.length;
    var c = 0; n.hide(); sn();
    $(".nn").click(function () { if (c < (na - 1)) { c++; sn(); } else { c = 0; sn(); } clearInterval(t); t = setInterval(au, ms); return false; });
    $(".np").click(function () { if (c > 0) { c--; sn(); } else { c = (na - 1); sn(); } clearInterval(t); t = setInterval(au, ms); return false; });
    function au() { if (c < (na - 1)) { c++; sn(); } else { c = 0; sn(); } }
    function sn() { n.hide(); n.eq(c).fadeIn(200); }
    n.mouseleave(function () { t = setInterval(au, ms); });
    n.mouseenter(function () { clearInterval(t); });

    /* Input on foun */
    $("input[type=text]").click(function () {
        if ($(this).val() == $(this).attr("title"))
            $(this).val("");
    });

    

    /* Ana Sayfa Banner */
    $('#homebanner').bxSlider({
        adaptiveHeight: true,
        slideWidth: 295, // px
        auto: true,
        video: true,
        autoHover: false,
        pause: 3000, // delay
        pager: false,
        mode: 'fade' //vertical, horizontal
    });

    /* Ana Sayfa Banner */
    $('#commond').bxSlider({
        adaptiveHeight: false,
        auto: true,
        autoHover: true,
        pause: 4000, // delay
        pager: false,
        mode: 'horizontal' //vertical, horizontal
    });


    /* Ana Sayfa Markalar  */
    $('.subpage-banner').bxSlider({
        slideWidth: 295, // px
        minSlides: 1,
        maxSlides: 1,
        pager: false,
        slideMargin: 15,
        auto: true
    });

    /* Ana Sayfa Referanslar */
    $('#references2').bxSlider({
        slideWidth: 630, // px
        minSlides: 6,
        maxSlides: 6,
        slideMargin: 10,
        pager: false
    });

    /* Ana Sayfa haberler */
    $('#latestnews').bxSlider({
        slideWidth: 232, // px
        minSlides: 4,
        maxSlides: 4,
        pager: false,
        slideMargin: 23
    });



});

$(document).ready(function () {


$(".blankornot").attr("target","_blank");


    // scrollbar
    $(".scroll").mCustomScrollbar();
    $(".activity .acts").mCustomScrollbar();

    // banner alanı
    /*$(".smallbanner a:first").addClass("active");
    $(".bigbanner a").hide();
    $(".bigbanner a:first").show();
    $(".bigbanner").html("<img src='" + $(".smallbanner a:first img").attr("src") + "'/>");
    $(".smallbanner a").click(function () {
        $(".smallbanner a").removeClass("active");
        $(this).addClass("active");
        $(".bigbanner").html("<img src='" + $(this).find("img").attr("src") + "'/>");
        return false;
    });
    $(".smallbanner > div").css("width",($(".smallbanner a").length*86) + "px");
*/

    if ($(".fotogalerislider li").length > 0) {
        $(".fotogalerislider").lightSlider(
        {
            gallery: true,
            item: 1,
            thumbItem: 10,
            slideMargin: 0,
            speed: 500,
            auto: true,
            loop: true,
            pause: 4500,
            adaptiveHeight: true,
            vertical: true,
            verticalHeight: 500


        });
    }

    $(".brandsslider").lightSlider(
    {
        item: 7,
        auto: true,
        loop: true,
        pause: 2000
    });

    $(".mainsliderarea").lightSlider({
        gallery: true,
        item: 1,
        thumbItem: 6,
        slideMargin: 0,
        speed: 500,
        auto: true,
        loop: true,
        pause: 4500
    });

    // social share
    $(".share").click(function () {
        $(".socials").slideToggle();
        $(this).toggleClass("active");
        return false;
    });



    //ref
    var referans = $("#common > div > div");
    var ileri = $("#common .commonright");
    var geri = $("#common .commonleft");
    var toplamref = $("#common > div div div").length;
    var ref = $("#common > div div div");
    var goster = 6;
    referans.css("width", toplamref * 185);

    /* anasayfa haberler */
    anasayfahaber();
    function anasayfahaber() {
        $(".homenews .news ul li").hide();
        $(".homenews .news ul li.cat1032").show();
        var ilkhaber = $(".homenews .news ul li:visible:first").attr("data-id");
        $(".homenews .news ul li:visible:first").addClass("active");
        $.ajax({
            type: 'POST',
            url: '/_static/pagedetails.ashx',
            data: { type: ilkhaber },
            success: function (result) {
                $("#newdetails").html(result);
				var a = $("#newdetails iframe").attr("src")
				$("#newdetails iframe").attr("src", a + "?rel=0")
            },
            error: function () {
            }
        });
    }

    $(".newcats li a").click(function () {
        var id = $(this).attr("data-id");
        if (id == 1034) {
            id = 1036;
        }
        $(".homenews .news ul li").hide();
        $(".homenews .news ul li.cat" + id).show();
        $(".homenews .newcats li a").removeClass("active");
        if (id == 1034)
            $(".newcats li ul li:first-child").addClass("active");
        else
            $(this).addClass("active");

        // detay
        if (id == 37) {

            // video dtay

            var ilkhaber = $(".homenews .news ul li:visible:first").attr("data-id");
            $(".homenews .news ul li:visible:first").addClass("active");
            //$.get("/_static/video.ashx", { page_id: ilkhaber }).done(function (data) {
            //    $("#newdetails").html(data);
            //});
            $.ajax({
                type: 'POST',
                url: '/_static/videodetails.ashx',
                data: { type: ilkhaber },
                success: function (result) {
                    $("#newdetails").html(result);
					var a = $("#newdetails iframe").attr("src")
					$("#newdetails iframe").attr("src", a + "?rel=0")
                },
                error: function () {
                }
            });

            console.log("video:" + ilkhaber);

        }
        else {

            var ilkhaber = $(".homenews .news ul li:visible:first").attr("data-id");
            $(".homenews .news ul li:visible:first").addClass("active");
            //$.get("/_static/pagedetails.ashx", { page_id: ilkhaber }).done(function (data) {
            //    $("#newdetails").html(data);
            //});
            $.ajax({
                type: 'POST',
                url: '/_static/pagedetails.ashx',
                data: { type: ilkhaber },
                success: function (result) {
                    $("#newdetails").html(result);
					var a = $("#newdetails iframe").attr("src")
					$("#newdetails iframe").attr("src", a + "?rel=0")
                },
                error: function () {
                }
            });

        }

        return false;
    });


    $(".homenews .news li").click(function () {
        var ilkhaber = $(this).attr("data-id");



        if ($(this).hasClass("cat37")) {
            // video

            $(".homenews .news li").removeClass("active");
            $(this).addClass("active");
            $.ajax({
                type: 'POST',
                url: '/_static/video.ashx',
                data: { type: ilkhaber },
                success: function (result) {
                    $("#newdetails").html(result);
					var a = $("#newdetails iframe").attr("src")
					$("#newdetails iframe").attr("src", a + "?rel=0")
                },
                error: function (tr) {
                    $("#newdetails").html("İç hata.");
                }
            });
			
			
            console.log("video:" + ilkhaber);

        }
        else {
            //haber
            $(".homenews .news li").removeClass("active");
            $(this).addClass("active");
            $.ajax({
                type: 'POST',
                url: '/_static/pagedetails.ashx',
                data: { type: ilkhaber },
                success: function (result) {
                    $("#newdetails").html(result);
					var a = $("#newdetails iframe").attr("src")
					$("#newdetails iframe").attr("src", a + "?rel=0")
                },
                error: function () {
                }
            });
            console.log("haber:" + ilkhaber);
        }
		return false;
    });

    /* projeler */
    /* hızlı menü */
    projeler();
    function projeler() {
        var goster = 4;
        var adet = $(".project > div").length;
        var sayfaadet = Math.ceil(adet / goster);
        $(".projectnumber").html("");
        $(".projectnumber").append('<a class="projectleft" href="#"><img src="/images/blueleft.png" /></a>');
        for (i = 1; i <= sayfaadet; i++) {
            $(".projectnumber").append("<a class='paging' href='#'>" + i + "</a>");
        }
        $(".projectnumber").append('<a  class="projectright" href="#"><img src="/images/blueright.png" /></a>');
        $(".projectnumber a.paging").eq(0).addClass("active");
        $(".projectnumber a.paging").click(function () {
            $(".projectnumber a.paging").removeClass("active");
            $(this).addClass("active");
            var sayfa = $(this).text();
            $(".project > div").hide();
            for (i = (goster * sayfa) - goster; i < goster * sayfa; i++) {
                $(".project > div").eq(i).fadeIn(250);
            }
            return false;
        });
        $(".project > div").hide();
        for (i = 0; i < 4; i++) {
            $(".project > div").eq(i).show();
        }
        $(".projectleft").click(function () {
            var hangisayfa = $(".projectnumber a.active").text();
            var toplamsayfa = $(".projectnumber a.paging").length;
            if (hangisayfa > 1) {
                hangisayfa = hangisayfa - 1;
                $(".projectnumber a.paging").removeClass("active");
                $(".projectnumber a.paging").eq(hangisayfa - 1).addClass("active");
                $(".project > div").hide();
                for (i = (goster * hangisayfa) - goster; i < goster * hangisayfa; i++) {
                    $(".project > div").eq(i).fadeIn(250);
                }
            }
            return false;
        });
        $(".projectright").click(function () {
            var hangisayfa = parseInt($(".projectnumber a.active").text());
            var toplamsayfa = $(".projectnumber a.paging").length;
            if (hangisayfa < toplamsayfa) {
                hangisayfa = hangisayfa + 1;
                $(".projectnumber a.paging").removeClass("active");
                $(".projectnumber a.paging").eq(hangisayfa - 1).addClass("active");
                $(".project > div").hide();
                for (i = (goster * hangisayfa) - goster; i < goster * hangisayfa; i++) {
                    $(".project > div").eq(i).fadeIn(250);
                }
            }
            return false;
        });
    }

    /* etkinlikler */
    $(function () {
        $("#activitydates").datepicker({
            altField: "#realdate",
            altFormat: "dd-mm-yy",
            beforeShowDay: function (date) {
                var gun = date.getDate();
                var ay = date.getMonth() + 1;
                var yil = date.getFullYear();
                if (gun < 10) gun = "0" + gun;
                if (ay < 10) ay = "0" + ay;
                var fulltarih = gun + "-" + ay + "-" + yil;
                var highlight = etkinlikvarmi(fulltarih);
                if (highlight == 1) {
                    return [true, "AktiviteVar", highlight];
                } else {
                    return [true, '', ''];
                }
            },
            onSelect: function (dateText) {
    $(".activity .acts").mCustomScrollbar("destroy");
                var t = $("#realdate").val();
                $(".acts > div").hide();
                $("[data-time='" + t + "']").parent().show();
                if ($(".acts > div:visible").length < 1) {
                    if ($(".acts > span").length < 1)
                        $(".acts").append("<span class='noresult'>Etkinlik bulunamadı.</span>");
                }
                else {
                    $(".noresult").remove();
                }

                // sığdır
                if ($(".acts > div:visible").length == 1) {
                    $(".acts > div:visible").removeClass("col-md-6");
                    $(".acts > div:visible").addClass("col-md-12");
                }
                else if ($(".acts > div:visible").length == 2) {
                    $(".acts > div:visible").removeClass("col-md-6");
                    $(".acts > div:visible").addClass("col-md-12");
                }

                // sıfırla göster
                $(".resetactivity").css("visibility", "visible");

    $(".activity .acts").mCustomScrollbar();
            }
        });
    });

    $(".resetactivity").click(function () {
    $(".activity .acts").mCustomScrollbar("destroy");
        $(".acts > div").removeClass("col-md-12");
        $(".acts > div").addClass("col-md-6");
        $(".acts > div").show();
        $(this).css("visibility", "hidden");
    $(".activity .acts").mCustomScrollbar();
        return false;
    });

    function etkinlikvarmi(date) {
        if ($(".acts [data-time='" + date + "']").length > 0)
            return 1;
        else
            return 0;
    }

    etkinlikler();
    function etkinlikler() {
        var takvim = $(".ui-datepicker-calendar");
    }

    /* hızlı menü */
    hizlimenu();
    function hizlimenu() {
        var goster = 15;
        var adet = $(".services > div").length;
        var sayfaadet = Math.ceil(adet / goster);
        $(".servicesdots").html("");
        for (i = 1; i <= sayfaadet; i++) {
            $(".servicesdots").append("<a href='#'>" + i + "</a>");
        }
        $(".servicesdots a").eq(0).addClass("active");
        $(".servicesdots a").click(function () {
            $(".servicesdots a").removeClass("active");
            $(this).addClass("active");
            var sayfa = $(this).text();
            $(".services > div").hide();
            for (i = (goster * sayfa) - goster; i < goster * sayfa; i++) {
                $(".services > div").eq(i).fadeIn(250);
            }
            return false;
        });
        $(".services > div").hide();
        for (i = 0; i < 15; i++) {
            $(".services > div").eq(i).show();
        }
    }
    $.extend($.expr[':'], {
        'containsi': function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || '').toLowerCase()
                .indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
    $("#txtQuickSearch").keyup(function () {
        var txt = $(this).val();
        if (txt.length > 1) {
            //$('.services div a:not(:contains("' + txt + '"))').parent().hide();
            //$('.services div a:contains("' + txt + '")').parent().show();
            if ($(".services div").hide().filter(':containsi("' + txt + '")').length < 1) {
                if ($(".services span").length < 1) {
                    $(".services").append("<span class='noresult'>Aramanıza uygun sonuç bulunamadı.</span>");
                    $(".servicesdots").html("");
                }
            }
            else {
                $(".services div").hide().filter(':containsi("' + txt + '")').show();
                $(".servicesdots").html("");
                $(".noresult").remove();
            }
        }
        else {
            hizlimenu();
            $(".noresult").remove();
        }
    });

    /* navmenu */
    $(".nav").mouseenter(function () {
        $(".nav").css("position", "relative");
        $(".nav").css("z-index", "1001");
        $("body").append("<div id='destroyhim'></div>");
    });
    $(".nav").mouseleave(function () {
        $(".nav").css("position", "inherit");
        $(".nav").css("z-index", "inherit");
        $("#destroyhim").remove();
    });

    ileri.click(function () {
        if (goster < toplamref) {
            goster++;
            referans.animate({
                marginLeft: "-=185px"
            }, 500);
        }
        return false;
    });
    geri.click(function () {
        if (goster > 6) {
            goster--;
            referans.animate({
                marginLeft: "+=185px"
            }, 500);
        }
        return false;
    });

    // img { }
    $('#urundetay img')
        .wrap('<span style="display:inline-block"></span>')
        .css('display', 'block')
        .parent()
        .zoom();

    // brands
    var ms = 2123; var t = setInterval(au, ms);
    var n = $("#news > .new");
    var na = n.length;
    var c = 0; n.hide(); sn();
    $(".newright").click(function () { if (c < (na - 1)) { c++; sn(); } else { c = 0; sn(); } clearInterval(t); t = setInterval(au, ms); return false; });
    $(".newleft").click(function () { if (c > 0) { c--; sn(); } else { c = (na - 1); sn(); } clearInterval(t); t = setInterval(au, ms); return false; });
    function au() { if (c < (na - 1)) { c++; sn(); } else { c = 0; sn(); } }
    function sn() { n.hide(); n.eq(c).fadeIn(200); }
    n.mouseleave(function () { t = setInterval(au, ms); });
    n.mouseenter(function () { clearInterval(t); });

    product();
    function product() {
        var ms = 2123; var t = setInterval(au, ms);
        var n = $("#products > .product");
        var na = n.length;
        var c = 0; n.hide(); sn();
        $(".productright").click(function () { if (c < (na - 1)) { c++; sn(); } else { c = 0; sn(); } clearInterval(t); t = setInterval(au, ms); return false; });
        $(".productleft").click(function () { if (c > 0) { c--; sn(); } else { c = (na - 1); sn(); } clearInterval(t); t = setInterval(au, ms); return false; });
        function au() { if (c < (na - 1)) { c++; sn(); } else { c = 0; sn(); } }
        function sn() { n.hide(); n.eq(c).fadeIn(200); }
        n.mouseleave(function () { t = setInterval(au, ms); });
        n.mouseenter(function () { clearInterval(t); });
    }


    phones();
    function phones() {
        var ms = 3000; var t = setInterval(au, ms);
        var n = $(".phones > em");
        var na = n.length;
        var c = 0; n.hide(); sn();
        function au() { if (c < (na - 1)) { c++; sn(); } else { c = 0; sn(); } }
        function sn() { n.hide(); n.eq(c).fadeIn(200); }
        n.mouseleave(function () { t = setInterval(au, ms); });
        n.mouseenter(function () { clearInterval(t); });
    }




});








