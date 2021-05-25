/* ==============================================
Preload
=============================================== */
$(window).load(function () { // makes sure the whole site is loaded
    'use strict';
    $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
    // $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow': 'visible'});
    $(window).scroll();
});

/* ==============================================
Sticky nav
=============================================== */
$(window).scroll(function () {
    'use strict';
    if ($(this).scrollTop() > 1) {
        $('header').addClass("sticky");
    }
    else {
        $('header').removeClass("sticky");
    }
});

/* ==============================================
Menu
=============================================== */
$('a.open_close').on("click", function () {
    'use strict';
    $('.main-menu').toggleClass('show');
    $('.layer').toggleClass('layer-is-visible');
});
$('a.show-submenu').on("click", function () {
    'use strict';
    $(this).next().toggleClass("show_normal");
});
$('a.show-submenu-mega').on("click", function () {
    'use strict';
    $(this).next().toggleClass("show_mega");
});
if ($(window).width() <= 480) {
    $('a.open_close').on("click", function () {
        'use strict';
        $('.cmn-toggle-switch').removeClass('active');
    });
}

/* ==============================================
Common
=============================================== */
/* Tooltip*/
$('.tooltip-1').tooltip({html: true});

/* Accordion*/
function toggleChevron(e) {
    'use strict';
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('icon_set_1_icon-11 icon_set_1_icon-10');
}

$('.panel-group').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);

/* Animation on scroll */
new WOW().init();

/* ==============================================
Video modal dialog + Parallax + Scroll to top + Incrementer
=============================================== */
$(function () {
    'use strict';
    $('.video').magnificPopup({type: 'iframe'});
    /* video modal*/
// $('.parallax-window').parallax({}); /* Parallax modal*/

// Image popups
    $('.magnific-gallery').each(function () {
        'use strict';
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {enabled: true}
        });
    });

    /* Hamburger icon*/
    var toggles = document.querySelectorAll(".cmn-toggle-switch");
    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }
    ;

    function toggleHandler(toggle) {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");
        });
    };

    /* Scroll to top*/
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').on("click", function () {
        $('body,html').animate({scrollTop: 0}, 500);
    });
});

/* Quantity input*/
// This button will increment the value
$('.qtyplus').on("click", function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('name');
    // Get its current value
    var currentVal = parseInt($('input[name=' + fieldName + ']').val(), 10);
    // If is not undefined
    if (!isNaN(currentVal)) {
        // Increment
        $('input[name=' + fieldName + ']').val(currentVal + 1);
    } else {
        // Otherwise put a 0 there
        $('input[name=' + fieldName + ']').val(1);
    }
});
// This button will decrement the value till 0
$(".qtyminus").on("click", function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('name');
    // Get its current value
    var currentVal = parseInt($('input[name=' + fieldName + ']').val(), 10);
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 0) {
        // Decrement one
        $('input[name=' + fieldName + ']').val(currentVal - 1);
    } else {
        // Otherwise put a 0 there
        $('input[name=' + fieldName + ']').val(0);
    }
});

/* Cat nav onclick active */
$('ul#cat_nav li a').on('click', function () {
    'use strict';
    $('ul#cat_nav li a.active').removeClass('active');
    $(this).addClass('active');
});

/* ==============================================
Carousel
=============================================== */
$('.carousel_testimonials').owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    animateIn: 'flipInX',
    margin: 30,
    stagePadding: 30,
    smartSpeed: 450,
    responsiveClass: true,
    responsive: {
        600: {
            items: 1
        },
        1000: {
            items: 1,
            nav: false
        }
    }
});

$(function () {
    if ($("#daterange").length === 0) {
        // return;
    }
    var calendar_options = {
        separator: '-',
        autoClose: true,
        showShortcuts: false,
        stickyMonths: true,
        language: document.documentElement.lang,
        minDays: 1,
        startDate: new Date(),
        startOfWeek: 'monday',
        container: 'body',
        getValue: function () {
            if ($('#datepicker').val() && $('#datepicker2').val())
                return $('#datepicker').val() + ' - ' + $('#datepicker2').val();
            else
                return '';
        },
        setValue: function (s, s1, s2) {
            $('#datepicker').val(s1);
            $('#datepicker2').val(s2);
        }
    };

    var mode;
    $('#datepicker, #datepicker2').click(function () {
        if (this.id == 'datepicker') {
            mode = 0;
        }
        if (this.id == 'datepicker2') {
            mode = 1;
        }
        var offset = $(this).offset();
        var calendar_offset = {left: offset.left, top: offset.top + $(this).height() + 20};
        initDP(calendar_options, calendar_offset);
    });

    function initDP(options, calendar_offset) {
        var dp = {};

        if ($("#daterange").data('dateRangePicker')) {
            $("#daterange").data('dateRangePicker').destroy();
        }
        $("#daterange").dateRangePicker(options)
            .bind('datepicker-open', function () {

                $('.date-picker-wrapper').offset(calendar_offset);

                dp['start_date'] = $('#datepicker').val();
                dp['end_date'] = $('#datepicker2').val();
                dp['start_date_time'] = $('.date-picker-wrapper .first-date-selected:not(.nextMonth)').attr('time');
                dp['end_date_time'] = $('.date-picker-wrapper .last-date-selected:not(.nextMonth)').attr('time');

                if (mode === 1) {
                    disableBackward(dp['start_date_time']);
                }
            })
            .bind('datepicker-first-date-selected', function (event, obj) {
                dp['start_date'] = moment(obj.date1).format('YYYY-MM-DD');
            });
        if ($('#datepicker').length && $('#datepicker').val() !== '' && $('#datepicker2').val() !== '') {
            $("#daterange").data('dateRangePicker').setDateRange($('#datepicker').val(), $('#datepicker2').val());
        }
        setTimeout(function () {
            $("#daterange").data('dateRangePicker').open();
            $('.date-picker-wrapper .month-wrapper').on('click', 'table td .day.valid', function () {
                var curr_time = $(this).attr('time');

                if (mode === 0) {
                    var start_date = moment.unix(curr_time / 1000).format('YYYY-MM-DD');
                    var restricted_dates = [
                        '2018-08-20',
                        '2018-08-21',
                        '2018-08-22'
                    ];
                    if(restricted_dates.indexOf(start_date) != -1)
                    {
                        alert('Check-in for ' + restricted_dates.join(',') + ' dates disabled. Please try another dates.');
                        return;
                    }
                    if (start_date !== dp['end_date']) {

                    }
                    if (curr_time < dp['end_date_time']) {
                        if (dp['end_date'] !== undefined) {
                            $("#daterange").data('dateRangePicker').setDateRange(start_date, dp['end_date']);
                        }
                    }
                    if (curr_time >= dp['end_date_time'] || dp['end_date_time'] === undefined) {
                        disableBackward(curr_time);
                        $('.date-picker-wrapper').animate({
                            left: $('#datepicker2').offset().left,
                            top: $('#datepicker2').offset().top + $('#datepicker2').height() +20
                        }, 200);
                        mode = 1;
                        return true;
                    }
                }
                if (mode === 1) {
                    var end_date = moment.unix(curr_time / 1000).format('YYYY-MM-DD');
                    if (dp['start_date'] !== undefined && end_date !== dp['start_date']) {
                        $("#daterange").data('dateRangePicker').setDateRange(dp['start_date'], end_date);
                    } else {
                        return false;
                    }
                }
                $('#check_avail').show();
            });
        }, 0);
    }

    function disableBackward(anchor_timestamp) {
        $('.date-picker-wrapper .day.valid').filter(function () {
            return $(this).attr('time') < anchor_timestamp;
        }).each(function () {
            $(this).removeClass('valid').addClass('invalid');
        });
    }
});

// });