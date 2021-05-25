/*
 * FILTERS
 */
function filterSpacesInput(ipt) {
    ipt.value = ipt.value.replace(/[\s]*/g, '');
}

/* eVPS Plasm */
function Select( $select ) {
    var val = $select.find('select option:selected').text();

    $select.find('.select_val').html( val );
}
function Tabs( $elem, funct ) {
    if( $elem.hasClass('curr') ) {
        return false;
    }
    var $parent = $elem.parents('.tabs').first();
    $parent.find('.tab').removeClass('curr');
    $elem.addClass('curr');

    if(funct !== undefined) {
        funct();
    }
}

function CalcSize() {
    $('.calc_steps_clone_block').each(function () {
        $(this).width( $(this).parents('.td').first().width() );
    });
}

function SmartPack( add, $elem ) {
    var $table = $elem.parents('.table').first();
    var $os_data = $table.find('.name em');
    var $os_data_container = $table.find('.name');
    var $price = $table.find('.total_price span');
    var $old_price = $table.find('.total_price em');
    var $btn = $table.find('.total_btn');
    var $root = $table.find('.td.root span');
    var $os = $table.find('.td.os span');

    var old_total_price = '';
    var ww = $(window).width();
    if (add) {
        if( document.cookie.indexOf('showdesktop') < 0 && ww < 860 ) {
            var $before = $table.find('.total_price_before');
            if( $before.length < 1 ) {
                $before = $('<div class="total_price_before" style="overflow: hidden; display: none;"></div>').insertBefore( $table.find('.total_price') );
            }

            $before.html( $table.next('.smart_about').html() );
            $before.slideDown(400);

            var total_price = $price.data('price-smart');
            var link = $btn.data('href-smart');
            if( $old_price.length > 0 ) {
                old_total_price = $old_price.data('price-smart');
            }
        }
        else {
            $('.price_table_header .name').addClass('open');
            $os_data_container.addClass('open');
           // $os_data.show();
            var total_price = $price.data('price-smart');
            var link = $btn.data('href-smart');
            if( $old_price.length > 0 ) {
                old_total_price = $old_price.data('price-smart');
            }

            $table.next('.smart_about').removeClass('close');
            $table.next('.smart_about').slideDown(400);
            $root.eq(0).addClass('hidden');
            $root.eq(1).removeClass('hidden');
            $os.eq(0).addClass('hidden');
            $os.eq(1).removeClass('hidden');
        }
    }
    else {
        if( document.cookie.indexOf('showdesktop') < 0 && ww < 860 ) {
            var $before = $table.find('.total_price_before');
            if( $before.length > 0 ) {
                $before.slideUp(400);
            }
            var total_price = $price.data('price');
            var link = $btn.data('href');
            if( $old_price.length > 0 ) {
                old_total_price = $old_price.data('price');
            }
        }
        else {
            $('.price_table_header .name').removeClass('open');
            $os_data_container.removeClass('open');
            //$os_data.hide();
            var total_price = $price.data('price');
            var link = $btn.data('href');
            if( $old_price.length > 0 ) {
                old_total_price = $old_price.data('price');
            }

            $table.next('.smart_about').addClass('close');
            $table.next('.smart_about').slideUp(400);
            $root.eq(0).removeClass('hidden');
            $root.eq(1).addClass('hidden');
            $os.eq(0).removeClass('hidden');
            $os.eq(1).addClass('hidden');
        }
    }

    $price.html(total_price);
    if( $old_price.length > 0 ) {
        $old_price.find('strong').html(old_total_price);
    }
    $btn.attr('href', link);
    $('#global_order_btn').attr('href', link);
}

function tariff ( id, list ) {
    var _this = this;
    this.list = list;
    this.$tariffs = $( '#' + id );
    this.$header = this.$tariffs.find('.tariffs_header');
    this.$text = this.$tariffs.find('.tariffs_note');
    this.$price = this.$tariffs.find('.tariffs_price span');
    this.$square_top = this.$tariffs.find('.square_3');
    this.$square_left = this.$tariffs.find('.square_1');
    this.$square_right = this.$tariffs.find('.square_2');
    this.$text_left = this.$tariffs.find('.tariff_data_1');
    this.$texte_right = this.$tariffs.find('.tariff_data_2');
    this.$text_bottom = this.$tariffs.find('.tariff_data_3');
    this.$tariff_list = this.$tariffs.find('.tariffs_list li');
    this.$order_btn = this.$tariffs.find('.tariffs_btn');

    this.time = 400;
    this.animation_time = 700;
    this.curr_tariff = 0;
    this.prev_tariff = 0;
    this.start = false;

    _this.next_timeout = null;
    _this.animation_timeout = null;

    this.init = function () {
        _this.$tariff_list.click(function () {
            _this.checkTariff( $(this) );
        });

        _this.$header.html( _this.list[0]['title'] );
        _this.$text.html( _this.list[0]['text'] );
        _this.$price.html( _this.list[0]['price'] );
        _this.$text_left.html( _this.list[0]['left-text-top'] +' <span>' + _this.list[0]['left-text'] + '</span>' );
        _this.$texte_right.html( _this.list[0]['right-text-top'] +' <span>' + _this.list[0]['right-text'] + '</span>' );
        _this.$text_bottom.html( _this.list[0]['bottom-text-top'] +' <span>' + _this.list[0]['bottom-text'] + '</span>' );

        _this.$square_top.find('.square_small').eq( _this.list[0]['top-square'][0] ).addClass('light');
        _this.$square_left.find('.square_small').eq( _this.list[0]['left-square'][0] ).addClass('light');
        _this.$square_right.find('.square_small').eq( _this.list[0]['right-square'][0] ).addClass('light');
        _this.$order_btn.attr('href', _this.list[0]['order-href']);

        _this.curr_tariff += 1;
        _this.next_timeout = setTimeout( _this.next, _this.time );
    };

    this.stopTimer = function () {
        clearTimeout( _this.next_timeout );
        clearTimeout( _this.animation_timeout );
        _this.next_timeout = null;
        _this.animation_timeout = null;
    };

    this.startTimer = function () {
        $('.tariffs_list li').removeClass('slider-item-clicked');
        _this.next_timeout = setTimeout( _this.next, _this.time );
    };

    this.checkTariff = function ( $elem ) {
        if( _this.start ) {
            //return false;
        }
        var index = $elem.index();
        _this.stopTimer();

        if( index >= _this.curr_tariff ) {
            _this.curr_tariff = index;
        }
        else {
            _this.prev_tariff = _this.curr_tariff-1;
            _this.curr_tariff = index;
        }
        _this.next( true );

        $('.tariffs_list li').removeClass('slider-item-clicked');
        $elem.addClass('slider-item-clicked');
        // location change
        //if ($elem.data('href')) {
            //window.location = $elem.data('href');
        //};
    };

    this.inArray = function (arr, val) {
        var ln = arr.length;
        var in_array = false;
        for(var i=0; i<ln; i++) {
            if( $.trim(arr[i]) == $.trim(val) ) {
                in_array = true;
                break;
            }
        }
        return in_array;
    };

    this.checkTariffIndexes = function ( arr_max, arr_min ) {
        var ln = arr_max.length;
        var arr_result = [];
        for( var i=0; i<ln; i++ ) {
            var val = arr_max[i];
            if( ! _this.inArray( arr_min, val ) ) {
                arr_result[arr_result.length] = val;
            }
        }

        return arr_result;
    }
    this.squareAfter = function ( arr, $square ) {
        var ln = arr.length;
        for( var i=0; i<ln; i++ ) {
            $square.find('.square_small').eq( arr[i] ).addClass('after_light').removeClass('light');
        }
    }
    this.squareBefore = function ( arr, $square ) {

        $square.find('.square_small').each(function ( i ) {

            if( _this.inArray(arr, i) ) {
                if( !$(this).hasClass('light') ) {
                    $(this).removeClass('after_light').addClass('before_light');
                }
            }
            else {
                if( $(this).hasClass('before_light') ) {
                    $(this).addClass('after_light').removeClass('before_light').removeClass('light');
                }
                else {
                    if( $(this).hasClass('light') ) {
                        $(this).addClass('after_light').removeClass('light');
                    }
                }
            }

        });
    }
    this.squareEndBack = function ( $square ) {
        $square.find('.square_small').removeClass('after_light');
    }
    this.squareEndForward = function ( position, $square ) {
        var ln = _this.list[_this.curr_tariff][ position + '-square' ].length;
        for( var i=0; i<ln; i++ ) {
            var val = _this.list[_this.curr_tariff][ position + '-square' ][i];

            $square.find('.square_small').eq( val ).removeClass('before_light').addClass('light');
        }
    }
    this.next = function ( stop ) {
        if( _this.start ) {
            //return false;
        }
        _this.start = true;
        clearTimeout(_this.next_timeout);
        _this.next_timeout = null;
        if( _this.curr_tariff >= _this.list.length ) {
            _this.curr_tariff = 0;
        }

        var top_prev_arr = _this.list[_this.prev_tariff]['top-square'];
        var left_prev_arr = _this.list[_this.prev_tariff]['left-square'];
        var right_prev_arr = _this.list[_this.prev_tariff]['right-square'];

        _this.squareBefore( _this.list[_this.curr_tariff]['top-square'], _this.$square_top );
        _this.squareBefore( _this.list[_this.curr_tariff]['left-square'], _this.$square_left );
        _this.squareBefore( _this.list[_this.curr_tariff]['right-square'] ,_this.$square_right );

        _this.$tariff_list.removeClass('curr');
        _this.$tariff_list.eq(_this.curr_tariff).addClass('curr');
        _this.$header.html( _this.list[_this.curr_tariff]['title'] );
        _this.$text.html( _this.list[_this.curr_tariff]['text'] );
        _this.$price.html( _this.list[_this.curr_tariff]['price'] );
        _this.$text_left.html( _this.list[_this.curr_tariff]['left-text-top'] +' <span>' + _this.list[_this.curr_tariff]['left-text'] + '</span>' );
        _this.$texte_right.html( _this.list[_this.curr_tariff]['right-text-top'] +' <span>' + _this.list[_this.curr_tariff]['right-text'] + '</span>' );
        _this.$text_bottom.html( _this.list[_this.curr_tariff]['bottom-text-top'] +' <span>' + _this.list[_this.curr_tariff]['bottom-text'] + '</span>' );
        _this.$order_btn.attr('href', _this.list[_this.curr_tariff]['order-href']);

        if( stop === undefined ) {
            _this.animation_timeout = setTimeout(function () {
                if( _this.prev_tariff > _this.curr_tariff ) {
                    _this.squareEndBack( _this.$square_top );
                    _this.squareEndBack( _this.$square_left );
                    _this.squareEndBack( _this.$square_right );
                }
                else {
                    _this.squareEndForward( 'top', _this.$square_top );
                    _this.squareEndForward( 'left', _this.$square_left );
                    _this.squareEndForward( 'right', _this.$square_right );
                }

                _this.prev_tariff = _this.curr_tariff;
                _this.curr_tariff += 1;
                clearTimeout(_this.animation_timeout);
                _this.animation_timeout = null;
                _this.start = false;
                _this.next_timeout = setTimeout( _this.next, _this.time );

            },_this.animation_time);
        }
        else {
            _this.animation_timeout = setTimeout(function () {
                if( _this.prev_tariff > _this.curr_tariff ) {
                    _this.squareEndBack( _this.$square_top );
                    _this.squareEndBack( _this.$square_left );
                    _this.squareEndBack( _this.$square_right );
                }
                else {
                    _this.squareEndForward( 'top', _this.$square_top );
                    _this.squareEndForward( 'left', _this.$square_left );
                    _this.squareEndForward( 'right', _this.$square_right );
                }
                _this.prev_tariff = _this.curr_tariff;
                _this.curr_tariff += 1;
                clearTimeout(_this.animation_timeout);
                _this.animation_timeout = null;
                _this.start = false;

            },_this.animation_time);
        }
    };

    this.init();
}

function Stars( $elem ) {
    var $parent = $elem.parents('.select_stars').first();
    var index = $elem.index();
    var data_input = $parent.data('input');
    if( data_input ) {
        $( '#' + data_input).val(index);
    }

    $parent.find('.star').each(function (i) {
        if( i <= index ) {
            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });
}

function checkboxChangeHandler() {
    var $label = $(this).parents('label').first();

    if( $(this)[0].checked ) {
        $label.addClass('checked');
        SmartPack( 1, $label );
    } else {
        $label.removeClass('checked');
        SmartPack( 0, $label );
    }
    return false;
}

function radioChangeHandler() {
    var $label = $(this).parents('.radio').first();

    var $inputs = $('input[name="' + $(this).attr('name') + '"]');

    if( $(this)[0].checked ) {
        $inputs.each(function () {
            $(this).parents('.radio').first().removeClass('checked');
        });
        $label.addClass('checked');
    }
    return false;
}

function selectChangeHandler () {
    Select( $(this).parents('.select').first() );
    if( $(this).parents('.select').first().hasClass('prices') ) {
        var index = $(this).find('option:selected').val();

        $('.smart_about').slideUp(0);
        $('.th.name').removeClass('open');
        $('.price_table_cells').removeClass('open');

        var $tableList = $('.price_table_cells').eq(index);
        var $table = $($tableList[0]);
        $table.addClass('open');

        $('.price_table_cells .checkbox.checked').each(function (i) {
            var $label = $(this);
            $label.removeClass('checked');
            SmartPack( 0, $label );
        });

        var $btnList = $table.find('.price .total_btn');
        var $btn = $($btnList[0]);
        $('#global_order_btn').attr('href', $btn.attr('href'));
    }
    if( $(this).attr('id') == 'contacts-question-type' ) {
        var val = $(this).find('option:selected').val();
        if( val == 'tech' ) {
            $('#tech_row').removeClass('hidden');
        }
        else {
            $('#tech_row').addClass('hidden');
        }
    }
}


$(document).on('change', '.checkbox input', checkboxChangeHandler);

$(document).on('change', '.radio input', radioChangeHandler);

$(document).ready(function () {
    $('.tariffs_hint').click(function () {
        var $elem = $('.tariffs_hint_text');
        if( $elem.hasClass('close') ) {
            $('.tariffs_list li.curr').addClass('slider-item-clicked');
            defined_tariff.stopTimer();
            $(this).addClass('open');
            $elem.removeClass('close');
            $elem.slideDown(400);

        } else {
            defined_tariff.startTimer();
            $(this).removeClass('open');
            $elem.addClass('close');
            $elem.slideUp(400);
        }
    });

    $('.smart_about_close').click(function () {
        var $parent = $(this).parents('.smart_about').first();
        $parent.addClass('close');
        $parent.slideUp(400);
    });

    $('#calc').click(function () {
        var $parent = $(this).parents('.calc_tab').first();
        var steps = $parent.find('.calc_steps_list .td').length;

        CalcAnimate( steps, 0, $parent );
        return false;
    });

    $('.calc_future_elem').click(function () {
        if( $(this).hasClass('curr') ) {
            return false;
        }
        $('.calc_future_elem').removeClass('curr');
        $(this).addClass('curr');

        $('.calc_future_list_elem').addClass('hidden');
        $('.calc_future_list_elem').eq( $(this).index() ).removeClass('hidden');
    });
    $('.calc_future_list_elem button').click(function () {
        var indx = $('.calc_future_list_elem').not('.hidden').index();
        if( $(this).hasClass('next') ) {
            $('.calc_future_elem').eq( indx ).addClass('done');
            var index = indx + 1;
        }
        else {
            var index = indx - 1;
        }
        $('.calc_future_elem').removeClass('curr');
        $('.calc_future_elem').eq( index ).addClass('curr');

        $('.calc_future_list_elem').addClass('hidden');
        $('.calc_future_list_elem').eq( index ).removeClass('hidden');

        return false;
    });

    $('.calc_icon input').change(function () {
        CalcCheck( $(this), true );
    });
    $('.calc_future_arrows_back').click(function () {
        if ( $(this).hasClass('disabled') ) {
            return false;
        }
        var $parent = $(this).parents('.calc_tab').first();
        var $arrows = $parent.find('.calc_future_arrows');
        var $curr = $parent.find('.calc_future_list .calc_future_list_elem').not('.hidden');
        var index = $curr.index();
        if( index < 0 ) {
            $arrows.find('.calc_future_arrows_back').addClass('disabled');
            return false;
        }
        $curr.animate({
            opacity: 0
        },400,function() {
            var $next = $curr.prev('.calc_future_list_elem');
            $arrows.find('span').html( index );
            $curr.addClass('hidden');
            $next.css({
                opacity: 0
            });
            $next.removeClass('hidden');
            if(index-1 == 0) {
                $arrows.find('.calc_future_arrows_back').addClass('disabled');
            }
            $arrows.find('.calc_future_arrows_next').removeClass('disabled');
            $next.animate({
                opacity: 1
            },400);
        });

        return false;
    });
    $('.calc_future_arrows_next').click(function () {
        if ( $(this).hasClass('disabled') ) {
            return false;
        }
        var $parent = $(this).parents('.calc_tab').first();
        var $arrows = $parent.find('.calc_future_arrows');
        var $curr = $parent.find('.calc_future_list .calc_future_list_elem').not('.hidden');
        var index = $curr.index();

        $parent.find('.calc_steps_list .td').eq( index ).find('.calc_steps_clone').animate({
            width: '100%'
        },600);
        $curr.animate({
            opacity: 0
        },400,function() {
            var $next = $curr.next('.calc_future_list_elem');
            $arrows.find('span').html( index+2 );
            $curr.addClass('hidden');
            $next.css({
                opacity: 0
            });
            $next.removeClass('hidden');
            $arrows.find('.calc_future_arrows_back').removeClass('disabled');
            $arrows.find('.calc_future_arrows_next').addClass('disabled');
            $next.animate({
                opacity: 1
            },400,function(){
                CalcCheck( $next );
            });
        });

        return false;
    });

    $('.enter_block_content .tab').click(function () {
        var $elem = $(this);
        Tabs( $elem, function() {
            var $parent = $elem.parents('.enter_block_content').first();
            $parent.find('.enter_tab').addClass('hidden');
            $parent.find('.enter_tab').eq( $elem.index()).removeClass('hidden');
        });
        return false;
    });
    $('.calc .tab').click(function () {
        var $elem = $(this);
        Tabs( $elem, function () {
            var $tabs = $elem.parents('.calc').first().siblings('.calc').find('.calc_tab');
            $tabs.addClass('hidden');
            $tabs.eq( $elem.data('id')-1 ).removeClass('hidden');
        } );
        CalcSize();
        return false;
    });

    $('.nav_icon').click(function () {
        $(this).parents('nav').addClass('open_mobile_nav');
        var $menu = $(this).parents('nav').first().find('ul').not('.nav_drop_down_ul');
        $menu.css({
            left: -250
        });
        $menu.addClass('open');
        $menu.animate({
            left: 0
        },300, function () {

        });
    });
    $('.menu_nav_icon, .menu_nav_close').click(function () {
        var $nav = $(this).parents('nav').first();
        var $menu = $nav.find('ul');
        $menu.animate({
            left: -250
        },300, function () {
            $menu.removeClass('open');
            $nav.removeClass('open_mobile_nav');
            $menu.css({
                left: 0
            });
        });
    });

    $('.enter_btn').click(function ( e ) {
        e.stopPropagation();
        var $enter = $('.enter_block');
        if( $enter.hasClass('hidden') ) {
            $enter.removeClass('hidden');
        }
        else {
            $enter.addClass('hidden');
        }
        $('.enter_block_login_content').removeClass('hidden');
        $('.enter_block_phone_content').addClass('hidden');
        $('.enter_block_sms_content').addClass('hidden');



        $('.nav_drop_down_handler').removeClass('opened');
        $('.nav_drop_down').addClass('hidden');
        $('.nav_drop_down').attr('style', '');
        $('.nav_drop_down').removeAttr('style');
        $('.lang_list').addClass('hidden');
        return false;
    });
    $('.enter_block_close').click(function () {
        $('.enter_block').addClass('hidden');
    });

    $('.select select').change(selectChangeHandler);
    $('.select').each(function () {
        Select( $(this) );
    });

    // Accordion in Sliders List fo show Slider php code
    $('.accordion').accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        animate: 300
    });

    $('.order_steps_total_prev').click(function () {
        if( $(this).hasClass('disabled') ) {
            return false;
        }
        var step = $('.order_steps_total_num span').html()*1;

        var next = step-1;
        $('.order_steps_total_num span').html(next);

        $('.order_steps .order_step').addClass('hidden');
        $('.order_steps .order_step').eq(next-1).removeClass('hidden');
        if( next === 1 ) {
            $('.order_steps_total_prev').addClass('disabled');
        }
        else {
            $('.order_steps_total_prev').removeClass('disabled');
        }
    });
    $('.order_steps_total_next').click(function () {

        $('#mh_hosting_order').submit();

        // if( $(this).hasClass('disabled') ) {
        //     return false;
        // }
        // var step = $('.order_steps_total_num span').html()*1;

        // $('.order_steps .order_step').addClass('hidden');
        // $('.order_steps .order_step').eq(step).removeClass('hidden');

        // var next = step+1;
        // $('.order_steps_total_num span').html(next);
        // if( step === 2 ) {
        //     $('.order_steps_total_num,.order_steps_total_prev,.order_steps_total_next').addClass('hidden');
        //     $('.order_steps_btn').show();
        // }
        // else {
        //     $('.order_steps_total_prev').removeClass('disabled');
        // }
    });

    $('.enter_block_login_content form').submit(function () {
        $(this).parents('.enter_block_login_content').first().addClass('hidden');
        $(this).parents('.enter_block_content').first().find('.enter_block_phone_content').removeClass('hidden');
        return false;
    });
    $('.enter_block_phone_content form').submit(function () {
        $(this).parents('.enter_block_phone_content').first().addClass('hidden');
        $(this).parents('.enter_block_content').first().find('.enter_block_sms_content').removeClass('hidden');
        return false;
    });

    $('.select_stars .star').mouseover(function () {
        Stars( $(this) );
    });
    $('.select_stars .star').click(function () {
        Stars( $(this) );
    });

    $('#form_next_btn').click(function () {

        var error = false;
        elems = ['form_subject', 'form_text'];

        elems.forEach(function(item) {

            if (!$('#' + item).val()) {
                $('#' + item + '_error').removeClass('hidden');
                $('#' + item + '_error_icon').addClass('error');
                error = true;
            } else {
                $('#' + item + '_error').addClass('hidden');
                $('#' + item + '_error_icon').removeClass('error');
            }
        });

        // check email
        var item = 'form_email';

        if (!$('#' + item).val().match(/^[\w\-\.]+\@(?:[0-9a-zа-я\-]{1,}\.)+[a-zа-я]{2,}[0-9a-zа-я\-]*$/i)) {
            $('#' + item + '_error').removeClass('hidden');
            $('#' + item + '_error_icon').addClass('error');
            error = true;
        } else {
            $('#' + item + '_error').addClass('hidden');
            $('#' + item + '_error_icon').removeClass('error');
        }

        if (error) {
            return false;
        }

        $('#form_prev').addClass('hidden');
        $('#form_next').removeClass('hidden');
        return false;
    });
    $('#form_prev_btn').click(function () {
        $('#form_prev').removeClass('hidden');
        $('#form_next').addClass('hidden');
        return false;
    });

    // генерация кода для кнопок мирохоста
    $("#mirohost-buttons img").click( function() {
        $('.mirohost-buttons-list img').removeClass('curr');
        $(this).addClass('curr');
        var html = '<a href="https://mirohost.net/"><img src="' + $(this).attr("src") + '" alt="' + $(this).attr("alt") + '" width="88" height="31" /></a>';
    	$("#c88x31").val( html );
    });

    // show mobile or desktop version
    var mirohost_domain_index = window.location.host.toLowerCase().indexOf('mirohost');
    var mirohost_domain = window.location.host.substr(mirohost_domain_index);
    document.cookie = "showdesktop=0; path=/;";// domain=."+mirohost_domain+";";

    $('.show_desktop').on('click', function() {
        document.cookie = "showdesktop=1; path=/;";// domain=."+mirohost_domain+";";
        location.reload(true);
        return false;
    });
    $('.show_mobile').on('click', function() {
    	var date = new Date(0);
//    	document.cookie = "show_desktop=; path=/; domain=."+mirohost_domain+"; expires=" + date.toUTCString();
    	document.cookie = "showdesktop=0; path=/;";// domain=."+mirohost_domain+";";
   		location.reload(true);
        return false;
    });

    $('#mirohost-buttons .btn').click(function() {
        $('.mirohost-buttons-list img').removeClass('curr');
        $('#mirohost-buttons textarea').val('');
        return false;
    });
    $('#c88x31').focus(function() {
        $(this).select();
        return false;
    });

    $('.lang_curr, .lang_curr a').click(function () {
        $(this).parents('.lang').find('.lang_list').toggleClass('hidden');

        $('.enter_block').addClass('hidden');
        $('.nav_drop_down').addClass('hidden');
        $('.nav_drop_down').attr('style', '');
        $('.nav_drop_down').removeAttr('style');
        $('.nav_drop_down_handler').removeClass('opened');

        return false;
    });


    CalcSize();

    $('.redirect_popup_btn_ok').click(function () {
        location.href = $(this).parents('.redirect_popup').first().data('href');
        is_popup_redirect = false;
        clearTimeout(popup_redirect_timeout);
        popup_redirect_timeout = null;

        setTimeout(function () {
            $('body').removeClass('popup_open');

            $('.redirect_popup').addClass('hidden');
            $('.fade_').addClass('hidden');
        },100);
    });
    $('.redirect_popup_btn_cancel').click(function () {
        is_popup_redirect = false;
        clearTimeout(popup_redirect_timeout);
        popup_redirect_timeout = null;

        $('body').removeClass('popup_open');

        $('.redirect_popup').addClass('hidden');
        $('.fade_').addClass('hidden');

        $('.enter_block').removeClass('hidden');
        $('.lang_list').removeClass('hidden');
        $('.redirect_popup_loader').removeClass('start');
    });
    $('.other_site').click(function () {
        is_popup_redirect = true;
        var text = $(this).data('text');
        var title = $(this).data('title');

        var $rdt = $('.redirect_popup_title');
        var $rdtext = $('.redirect_popup_text');

        $rdt.html(title);
        $rdtext.html(text);

        $('body').addClass('popup_open');

        $('.redirect_popup').data('href', $(this).attr('href'));
        $('.redirect_popup').removeClass('hidden');
        $('.fade_').removeClass('hidden');

        $('.enter_block').addClass('hidden');
        $('.lang_list').addClass('hidden');

        var h = $('.redirect_popup_bg').outerHeight();
        var t = ($(window).height() - h) / 2;

        $('.redirect_popup_reducer').css({
            top: t
        });
        $('.redirect_popup_loader').addClass('start');
        var href = $(this).attr('href');

        popup_redirect_timeout = setTimeout(function () {
            if( is_popup_redirect ) {
                location.href = href;

                is_popup_redirect = false;
                clearTimeout(popup_redirect_timeout);
                popup_redirect_timeout = null;

                setTimeout(function () {
                    $('body').removeClass('popup_open');

                    $('.redirect_popup').addClass('hidden');
                    $('.fade_').addClass('hidden');
                },100);
            }
        }, 3000);

        return false;
    });
    $('.nav_drop_down_handler').click(function () {
        var $dd = $(this).parents('li').first().find('.nav_drop_down');

        if ($dd.hasClass('hidden')) {
            $(this).addClass('opened');
            $dd.removeClass('hidden');
            if($('nav').hasClass('open_mobile_nav') ) {
                $dd.show(400);
            }
        }
        else {
            $(this).removeClass('opened');
            $dd.addClass('hidden');
            if($('nav').hasClass('open_mobile_nav') ) {
                $dd.hide(400);
                setTimeout(function () {
                    $dd.attr('style', '');
                    $dd.removeAttr('style');
                },410)
            }
        }
    });

    $('.lang .radio a').click(function (e) {
        var jthis = $(this);
        // jthis.parents('.lang').first().find('.radio').removeClass('checked');
        // jthis.parents('.radio').first().addClass('checked');
        ['ua', 'ru', 'en'].forEach(function (lc) {
            if (jthis.hasClass('lang_' + lc)) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + 365);
                document.cookie = 'ul=' + lc + '; path=/; expires=' + exdate.toGMTString() + ';';
            }
        });
    });

    $('.autofocus').focus();
});

jQuery(window).resize(function (e) {
    var ww = $(window).width();
    CalcSize();
    if(ww>=970) {
        $('nav ul').removeClass('open_mobile_nav');
    }
    if(!$('nav').hasClass('open_mobile_nav') ) {
        $('.nav_drop_down_handler').removeClass('opened');
        $('.nav_drop_down').addClass('hidden');
        $('.nav_drop_down').attr('style', '');
        $('.nav_drop_down').removeAttr('style');
    }
});
jQuery(document).click(function (e) {
    e.stopPropagation();
    if( $(e.target).parents().filter('.enter_block').length<1 ) {
        $('.enter_block').addClass('hidden');
    }
    if( $(e.target).parents().filter('.lang_list').length<1 ) {
        $('.lang_list').addClass('hidden');
    }

    if( $(e.target).parents().filter('.enter_block').length<1 ) {
        $('.enter_block').addClass('hidden');
    }

    if( $('nav ul').hasClass('open') ) {
        if( ! $(e.target).hasClass('nav_icon') && $(e.target).parents().filter('.nav_icon').length<1 ) {
            if( ! $(e.target).hasClass('menu_nav_icon') && $(e.target).parents().filter('.menu_nav_icon').length<1 ) {
                if( !$(e.target).hasClass('open') && $(e.target).parents().filter('.open').length<1 ) {
                    var $nav = $('nav');
                    var $menu = $('nav ul');
                    $menu.animate({
                        left: -250
                    },300, function () {
                        $nav.removeClass('open_mobile_nav');
                        $menu.removeClass('open');
                        $menu.css({
                            left: 0
                        });
                    });
                }
            }
        }
    }

    if( $(e.target).parents().filter('nav').length<1 ) {
        $('.nav_drop_down').addClass('hidden');
        $('.nav_drop_down').attr('style', '');
        $('.nav_drop_down').removeAttr('style');
        $('.nav_drop_down_handler').removeClass('opened');
    }
});

function Percents( percent, time ) {
    var curr_percent = parseInt( $('.calc_status_progress p span').first().html() ) ;
    if( isNaN ( curr_percent ) ) {
        curr_percent = 0;
    }
    curr_percent++;

    if( curr_percent > percent ) {
        return false;
    }
    $('.calc_status_progress p span').html( curr_percent + '%' );
    setTimeout(function () {
        Percents(percent,time);
    },time);
}
function CalcAnimate( steps, index, $parent ) {
    var $points = $parent.find('.calc_points .calc_point');
    $points.removeClass('calc_point_curr');
    if( index+1 > steps ) {
        $parent.find('.calc_result_block').removeClass('hidden');
        return false;
    }
    var time = 15000/steps;
    if(index == 0) {
        time /= 2;
    }

    var $elem = $parent.find('.calc_steps_list .td').eq( index );

    var $curr = $points.eq(index);
    $curr.addClass('calc_point_curr');

    $elem.find('.calc_steps_clone').animate({
        width: '100%'
    },time, function () {
        $curr.find('span').eq(0).addClass('hidden');
        $curr.find('span').eq(1).removeClass('hidden');
        CalcAnimate( steps, index+1, $parent );
    });
}
function CalcCheck( $elem, check ) {
    var $parent = $elem.parents('.calc_tab').first();
    if( check ) {
        $elem.parents('.calc_icon').first().siblings('.calc_icon').removeClass('checked');
        $elem.parents('.calc_icon').first().addClass('checked');
        var checked = 1;
    }
    else {
        var checked = $elem.find('.calc_icon.checked').length > 0 ? 1 : 0;
    }

    var $arrows = $parent.find('.calc_future_arrows');
    var index = $parent.find('.calc_future_list .calc_future_list_elem').not('.hidden').index();

    if( index == 0 && checked === 1 ) {
        $arrows.find('.calc_future_arrows_back').addClass('disabled');
        $arrows.find('.calc_future_arrows_next').removeClass('disabled');
    }
    if( index == 1 && checked === 1 ) {
        $arrows.find('.calc_future_arrows_back').removeClass('disabled');
        $arrows.find('.calc_future_arrows_next').removeClass('disabled');
    }
    // console.log( index );
}

function DomainTabs(num) {
    var curr = document.getElementById('tab_link_'+num);
    if(curr.className.indexOf('current')>=0) {
        return false;
    }
    var curr_tab = document.getElementById('tab_'+num);
    var tabs = document.getElementsByClassName('tab_');
    var tab_links = document.getElementsByClassName('tab_link');

    var select = document.getElementById('tab_link_mirror');
    var index = num-1;
    select.selectedIndex = index;

    var ln = tabs.length;

    for(var i=0; i<ln; i++) {
        var tab = tabs[i];
        var tab_link = tab_links[i];

        tab.className = 'tab_';
        tab_link.className = 'tab_link';
    }

    curr.className = 'tab_link current';
    curr_tab.className = 'tab_ current';
}

function SearchArea() {
    var checkbox = document.getElementById('all');
    var list = document.getElementsByClassName('domain');
    var ln = list.length;
    var checked = (checkbox.checked) ? true : false;
    for(var i=0; i<ln; i++) {
        list[i].checked = checked;
    }
}

function TabsSelect() {
    var select = document.getElementById('tab_link_mirror');
    var index = select.selectedIndex*1+1;

    //alert(1)

    DomainTabs(index);
}

function addMask($input)
{
    $input.mask("+38 (999) 999-99-99");
}

function removeMask($input)
{
    $input.unmask();
}

function changeMask($checkbox, $input)
{
    if (!$checkbox.checked) {
        addMask($input);
    } else {
        removeMask($input);
    }
}

jQuery(document).on('focus', '.phone_cell .form_phone', function (event) {
    var $parent = jQuery(this).parents('.phone_cell').find('.checkbox input');
    changeMask($parent[0], jQuery(this));
});
jQuery(document).on('click', '.phone_cell .checkbox input', function (event) {
    var $parent = jQuery(this).parents('.phone_cell').find('.form_phone');
    changeMask( jQuery(this)[0], $parent );
});

jQuery(document).ready(function () {
    jQuery('.checkbox input').each(checkboxChangeHandler);
    jQuery('.radio input').each(radioChangeHandler);
    jQuery('.select select').each(selectChangeHandler);
    if (jQuery('#form_stars')) {
        var collection = jQuery('.select_stars>.star');
        Stars( $(collection[jQuery('#form_stars').val()]) );
    };

    if( $('#tariffs').length > 0 ) {
        defined_tariff = new tariff( 'tariffs', tariff_list );
    }

    /*
    jQuery('.tariffs_list.on_evps > li').click(function (e) {
        element = event.target;
        console.log(element);
        console.log(jQuery(element).data('href'));
        if (jQuery(element).data('href')) {
            window.location = jQuery(element).data('href');
        };
    });
     */

    if (window.payCommonFormInit) {
        payCommonFormInit();
    }

    if (window.setPhonesInit) {
        setPhonesInit();
    }
});

$(window).resize(function() {
    var ww = $(window).width();
    if( document.cookie.indexOf('showdesktop') < 0 && ww > 859 ) {
        $('.total_price_before').hide();
        $('.smart_about').hide();
        $('.smart .checkbox').removeClass('checked');
        if ($('.smart .checkbox input').size()) {
            $('.smart .checkbox input').get(0).checked = false;
        }
    }

    if( ww > 970 && $('nav').hasClass('open_mobile_nav') ) {
        $('nav').removeClass('open_mobile_nav')
        $('nav ul').removeClass('open')
        $('body').removeClass('popup_open').removeClass('_cache')
    }
});


// StripeGateway
jQuery(document).ready(function () {
    if ($('#stripe-payment-form')) {
        var $form = $('#stripe-payment-form');

        $form.submit(function(event) {
            // Disable the submit button to prevent repeated clicks:
            $form.find("[type='submit']").attr('disabled', 'disabled');
            // Request a token from Stripe:
            Stripe.card.createToken($form, stripeResponseHandler);
            // Prevent the form from being submitted:
            return false;
        });

        function stripeResponseHandler(status, response) {
            // Grab the form:
            var $form = $('#stripe-payment-form');

            if (response.error) { // Problem!
                // Show the errors on the form:
                if (response.error.code != undefined && stripeErrors[response.error.code] != undefined) {
                    $form.find('#stripe-payment-error').html(stripeErrors[response.error.code]);
                    // $form.find('#stripe-payment-additional-error').html(stripeAdditionalErrors);
                } else if (response.error.type != undefined && stripeErrors[response.error.type] != undefined) {
                    $form.find('#stripe-payment-error').html(stripeErrors[response.error.type]);
                    // $form.find('#stripe-payment-additional-error').html(stripeAdditionalErrors);
                } else {
                    $form.find('#stripe-payment-error').html(response.error.message);
                    // $form.find('#stripe-payment-additional-error').html(stripeAdditionalErrors);
                }
                $form.find("[type='submit']").removeAttr('disabled'); // Re-enable submission

            } else { // Token was created!
                // Get the token ID:
                var token = response.id;

                var $chform = $('#stripe-charge-form');

                // Insert the token ID into the form so it gets submitted to the server:
                $chform.find('input[name="stripe_token"]').val(token);

                // Submit the form:
                $chform.get(0).submit();
            }
        }
    }
});
