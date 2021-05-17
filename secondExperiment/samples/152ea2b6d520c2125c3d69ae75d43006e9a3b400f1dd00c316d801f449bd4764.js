
window.bushTypeSizes = {
    tree: {
        width: 90,
        height: 91
    },
    pugalo: {
        width: 80,
        height: 49
    },
    dog: {
        width: 80,
        height: 73
    }
};
window.firstBushResize = false;
function zoomBushesOut(percent) {
    window.bushTypeSizes.tree.width -= (window.bushTypeSizes.tree.width * percent) / 100;
    window.bushTypeSizes.pugalo.width -= (window.bushTypeSizes.pugalo.width * percent) / 100;
    window.bushTypeSizes.dog.width -= (window.bushTypeSizes.dog.width * percent) / 100;

    window.bushTypeSizes.tree.height -= (window.bushTypeSizes.tree.height * percent) / 100;
    window.bushTypeSizes.pugalo.height -= (window.bushTypeSizes.pugalo.height * percent) / 100;
    window.bushTypeSizes.dog.height -= (window.bushTypeSizes.dog.height * percent) / 100;
}

function zoomBushesIn(percent) {
    window.bushTypeSizes.tree.width += (window.bushTypeSizes.tree.width * percent) / 100;
    window.bushTypeSizes.pugalo.width += (window.bushTypeSizes.pugalo.width * percent) / 100;
    window.bushTypeSizes.dog.width += (window.bushTypeSizes.dog.width * percent) / 100;

    window.bushTypeSizes.tree.height += (window.bushTypeSizes.tree.height * percent) / 100;
    window.bushTypeSizes.pugalo.height += (window.bushTypeSizes.pugalo.height * percent) / 100;
    window.bushTypeSizes.dog.height += (window.bushTypeSizes.dog.height * percent) / 100;
}

$(function () {

    $('.box-bush__img').on('click', function() {
        var types = $(this).data('type');
        var type2 = $(this).data('type');
        var type = $(this).data('type');

        if ($(this).children().attr("src") == "/assert/images/bush/" + type + "-2-top-bush.png") {
            $(this).children().attr("src", "/assert/images/game/" + type + ".png")
        } else {
            $(this).children().attr("src", "/assert/images/bush/" + type + "-2-top-bush.png");

            if (type != 'big') {
                $('.box-bush__img[data-type="big"]').children().attr("src", "/assert/images/game/big.png");
            }

            if (type != 'normal') {
                $('.box-bush__img[data-type="normal"]').children().attr("src", "/assert/images/game/normal.png");
            }

            if (type != 'small') {
                $('.box-bush__img[data-type="small"]').children().attr("src", "/assert/images/game/small.png");
            }

            if (type != 'pugalo') {
                $('.box-bush__img[data-type="pugalo"]').children().attr("src", "/assert/images/game/pugalo.png");
            }

            if (type != 'dog') {
                $('.box-bush__img[data-type="dog"]').children().attr("src", "/assert/images/game/dog.png");
            }
        }

        $(document).on({

            mouseenter: function(){
                var type = $(this).data('type');
                if (type !== undefined) {
                    $(this).css("background-image", "url('/assert/images/bush/" + type + "-2-error-bush.png')");

                } else if (types === 'dog') {
                    $(this).css("background-image", "url('/assert/images/bush/" + type2 + "-2-hover-bush.png')");

                    $(this).css("width", window.bushTypeSizes.dog.width + "px");
                    $(this).css("height", window.bushTypeSizes.dog.height + "px");

                } else if (types === 'pugalo') {

                    $(this).css("background-image", "url('/assert/images/bush/" + type2 + "-2-hover-bush.png')");

                    $(this).css("width", window.bushTypeSizes.pugalo.width + "px");
                    $(this).css("height", window.bushTypeSizes.pugalo.height + "px");

                } else {
                    $(this).css("background-image", "url('/assert/images/bush/" + type2 + "-2-hover-bush.png')");
                    $(this).css("width", window.bushTypeSizes.tree.width + "px");
                    $(this).css("height", window.bushTypeSizes.tree.height + "px");
                }
            },

            mouseleave: function () {
                var type = $(this).data('type');
                $(this).css("background-image", "url('/assert/images/bush/" + type + "-2-bush2.png')");


            }},'.gameArea');

    });

});



(new WOW).init(), $(function () {
    function e(e) {
        var t;
        try {
            t = $.datepicker.parseDate(c, e.value)
        } catch (e) {
            t = null
        }
        return t
    }

    var t = new Date, a = new Date, i = a.getTime() / 1e3 - t.getTime() / 1e3,
        n = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
        o = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    $(".clock").FlipClock(i, {countdown: !0, language: "ru-ru"}), $(".click .game-ag-img").click(function () {
        $(this).closest(".game-ag").find(".game-ag-img").removeClass("active"), $(this).addClass("active")
    }), $(".lan-select img").attr("src", $(".lan-list .current img").attr("src")), $(".lan-select span").text($(".lan-list .current span").text()), $(".lan-select").click(function () {
        $(".lan-list").slideToggle(), $(this).toggleClass("active")
    }), $(".header-articles").niceScroll({
        cursorcolor: "#e23b37",
        cursoropacitymin: "1",
        cursorwidth: "11",
        background: "#e9d7c7",
        cursorfixedheight: "40",
        cursorborder: "1px solid #e23b37"
    }), $(".tbody, .table-history").niceScroll({
        cursorcolor: "#e23b37",
        cursoropacitymin: "1",
        cursorwidth: "10",
        background: "#ffffff",
        cursorfixedheight: "40",
        cursorborder: "1px solid #e23b37",
        cursorborderradius: "3px",
        emulatetouch: !0,
        touchbehavior: !0,
        railoffset: {top: 0, left: 20},
        zindex: 10
    }), $(".slider-team").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<img class="prev" src="/assert/images/slider-prev.png" alt="">',
        nextArrow: '<img class="next" src="/assert/images/slider-next.png" alt="">',
        cssEase: "linear",
        speed: 0,
        responsive: [{breakpoint: 1200, settings: {slidesToShow: 3}}, {
            breakpoint: 992,
            settings: {slidesToShow: 2}
        }, {breakpoint: 768, settings: {slidesToShow: 1}}]
    }), $(".header-navbar, .header-navbar-page").click(function () {
        $(".header-menu, .menu-page").addClass("active")
    }), $(".header-menu, .menu-page").click(function () {
        $(this).removeClass("active")
    }), $(".accordion-question, .accordion-close").click(function () {
        $(this).closest(".accordion").toggleClass("active").find(".accordion-text").slideToggle()
    });
    var c = "yy-mm-dd", s = $(".elem-date__from").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: !0,
        changeYear: !0,
        dayNamesMin: n,
        monthNamesShort: o,
        hideIfNoPrevNext: !0
    }).on("change", function () {
        r.datepicker("option", "minDate", e(this))
    }), r = $(".elem-date__to").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: !0,
        changeYear: !0,
        dayNamesMin: n,
        monthNamesShort: o,
        hideIfNoPrevNext: !0
    }).on("change", function () {
        s.datepicker("option", "maxDate", e(this))
    });
    $(".popover-stat").popover({container: "body"}), $(".btn-up").click(function () {
        $("html, body").animate({scrollTop: 0}, 600)
    }), $(".popup-cashout .sum-cashout").change(function () {
        var e;
        e = 100 * parseInt($(this).val()), $(this).closest(".popup-cashout").find(".ingots .total span").text(e)
    });

});