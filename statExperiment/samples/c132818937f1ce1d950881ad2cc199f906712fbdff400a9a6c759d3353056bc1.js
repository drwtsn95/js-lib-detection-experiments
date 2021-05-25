(function($){
	$(document).ready(function() {
		var $locked_containers = [];
		$( '.inf_infusionsoft_custom_html_form input[type="radio"], .inf_infusionsoft_custom_html_form input[type="checkbox"]' ).uniform();

		var $body = $('body');

		$body.on( 'click', 'span.inf_infusionsoft_close_button', function(){
			var container = $( this ).parent().parent();

			container.addClass( 'inf_infusionsoft_exit_animation' );

			if(container.hasClass('inf_infusionsoft_click_trigger')){
				setTimeout( function() {
					container.removeClass('inf_infusionsoft_visible');
					container.removeClass('inf_infusionsoft_animated');
					container.removeClass('inf_infusionsoft_exit_animation');
				}, 400 );
			}else{
				setTimeout( function() {
					container.remove();
				}, 400 );
			}

			$( 'body' ).removeClass( 'inf_infusionsoft_popup_active' );

			return false;
		});

		function update_stats_table( $type, $this_button ) {
			var $optin_id = $this_button.data( 'optin_id' ),
				$page_id = $this_button.data( 'page_id' ),
				$list_id = $this_button.data( 'list_id' );

			var $stats_data = JSON.stringify({
				'type': $type,
				'optin_id': $optin_id,
				'page_id': $page_id,
				'list_id': $list_id
			});
			$.ajax({
				type: 'POST',
				url: infusionsoftSettings.ajaxurl,
				data: {
					action : 'infusionsoft_handle_stats_adding',
					stats_data_array : $stats_data,
					update_stats_nonce : infusionsoftSettings.stats_nonce
				}
			});
		}

		function setCookieExpire( days ) {
			var ms = days*24*60*60*1000;

			var date = new Date();
			date.setTime( date.getTime() + ms );

			return "; expires=" + date.toUTCString();
		}

		function checkCookieValue( cookieName, value ) {
			return parseCookies()[cookieName] == value;
		}

		function parseCookies() {
			var cookies = document.cookie.split( '; ' );

			var ret = {};
			for ( var i = cookies.length - 1; i >= 0; i-- ) {
			  var el = cookies[i].split( '=' );
			  ret[el[0]] = el[1];
			}
			return ret;
		}

		function set_cookie( $expire, $cookie_content ) {
			$cookie_content = '' == $cookie_content ? 'etInfusionsoftCookie=true' : $cookie_content;
			cookieExpire = setCookieExpire( $expire );
			document.cookie = $cookie_content + cookieExpire + "; path=/";
		}

		function get_url_parameter( param_name ) {
			var page_url = window.location.search.substring(1);
			var url_variables = page_url.split('&');
			for ( var i = 0; i < url_variables.length; i++ ) {
					var curr_param_name = url_variables[i].split( '=' );
				if ( curr_param_name[0] == param_name ) {
					return curr_param_name[1];
				}
			}
		}

		//separate function for the setTimeout to make it work properly within the loop.
		function make_popup_visible( $popup, $delay, $cookie_exp, $cookie_content ){
			if ( ! $popup.hasClass( 'inf_infusionsoft_visible' ) ) {
                $('.accept_consent').removeAttr('checked');
				setTimeout( function() {
					$popup.addClass( 'inf_infusionsoft_visible inf_infusionsoft_animated' );
					$stats_data_container = 0 != $popup.find( '.inf_infusionsoft_custom_html_form' ).length ? $popup.find( '.inf_infusionsoft_custom_html_form' ) : $popup.find( '.inf_infusionsoft_submit_subscription' );
					update_stats_table( 'imp', $stats_data_container );

					if ( '' != $cookie_exp ) {
						set_cookie( $cookie_exp, $cookie_content );
					}

					if ( $( '.inf_infusionsoft_resize' ).length ) {
						$( '.inf_infusionsoft_resize.inf_infusionsoft_visible' ).each( function() {
							define_popup_position( $( this ), true, 0 );
						});
					}

					display_image( $popup );

				}, $delay );
			}
		}

		function display_image( $popup ) {
			setTimeout( function() {
				$popup.find( '.inf_infusionsoft_image' ).addClass( 'inf_infusionsoft_visible_image' );
			}, 500 );
		}

		function auto_popup( $current_popup_auto, $delay ) {
			var page_id = $current_popup_auto.find( '.inf_infusionsoft_submit_subscription' ).data( 'page_id' ),
				optin_id = $current_popup_auto.find( '.inf_infusionsoft_submit_subscription' ).data( 'optin_id' ),
				list_id = $current_popup_auto.find( '.inf_infusionsoft_submit_subscription' ).data( 'list_id' );

			if ( ! $current_popup_auto.hasClass( 'inf_infusionsoft_animated' ) ) {
				var $cookies_expire_auto = $current_popup_auto.data( 'cookie_duration' ) ? $current_popup_auto.data( 'cookie_duration' ) : false,
					$already_subscribed = checkCookieValue( 'inf_infusionsoft_subscribed_to_' + optin_id + list_id, 'true' );

				if ( ( ( false !== $cookies_expire_auto && ! checkCookieValue( 'etInfusionsoftCookie_' + optin_id, 'true' ) ) || false == $cookies_expire_auto ) && ! $already_subscribed ) {
					if ( false !== $cookies_expire_auto ) {
						make_popup_visible ( $current_popup_auto, $delay, $cookies_expire_auto, 'etInfusionsoftCookie_' + optin_id + '=true' );
					} else {
						make_popup_visible ( $current_popup_auto, $delay, '', '' );
					}
				}
			}
		}


        $('.inf_infusionsoft_click_trigger_element').on('click', function(e){
            var optin_id = $(this).data('optin_id')
            $( '.inf_infusionsoft_click_trigger:not(.inf_infusionsoft_visible)' ).each( function() {
                var $this_el = $( this );
                current_optin_id = $(this).find( '.inf_infusionsoft_submit_subscription' ).data( 'optin_id' );
                e.preventDefault();//prevent links from disrupting popup
                if(current_optin_id == optin_id){
                    make_popup_visible ( $this_el, 0, '', '' );
                }
            });

        });

        function exit_trigger($current_popup_exit){

            var page_id = $current_popup_exit.find( '.inf_infusionsoft_submit_subscription' ).data( 'page_id' ),
                optin_id = $current_popup_exit.find( '.inf_infusionsoft_submit_subscription' ).data( 'optin_id' ),
                list_id = $current_popup_exit.find( '.inf_infusionsoft_submit_subscription' ).data( 'list_id' );

            if ( ! $current_popup_exit.hasClass( 'inf_infusionsoft_animated' ) ) {
                var $cookies_expire_auto = $current_popup_exit.data( 'cookie_duration' ) ? $current_popup_exit.data( 'cookie_duration' ) : false,
                    $already_subscribed = checkCookieValue( 'inf_infusionsoft_subscribed_to_' + optin_id + list_id, 'true' );

                $( document ).mouseleave(function() {
                    if (( ( false !== $cookies_expire_auto && !checkCookieValue('etInfusionsoftCookie_' + optin_id, 'true') ) || false == $cookies_expire_auto ) && !$already_subscribed) {
                        if (false !== $cookies_expire_auto) {

                            return make_popup_visible($current_popup_exit, 0, $cookies_expire_auto, 'etInfusionsoftCookie_' + optin_id + '=true');

                        } else {

                            return make_popup_visible($current_popup_exit, 0, '', '');
                        }
                    }
                });
            }
        }


		function scroll_trigger( current_popup_bottom, is_bottom_trigger ) {
			var triggered = 0,
				page_id = current_popup_bottom.find( '.inf_infusionsoft_submit_subscription' ).data( 'page_id' ),
				optin_id = current_popup_bottom.find( '.inf_infusionsoft_submit_subscription' ).data( 'optin_id' );
				list_id = current_popup_bottom.find( '.inf_infusionsoft_submit_subscription' ).data( 'list_id' );

			if ( ! current_popup_bottom.hasClass( 'inf_infusionsoft_animated' ) ) {
				var	cookies_expire_bottom = current_popup_bottom.data( 'cookie_duration' ) ? current_popup_bottom.data( 'cookie_duration' ) : false,
					$already_subscribed = checkCookieValue( 'inf_infusionsoft_subscribed_to_' + optin_id + list_id, 'true' );

				var scroll_trigger = undefined;
				if ( true == is_bottom_trigger ) {
					var $radInfusionsoftBottomTrigger = $('.inf_infusionsoft_bottom_trigger');
                    scroll_trigger = $radInfusionsoftBottomTrigger.length ? $radInfusionsoftBottomTrigger.offset().top : $( document ).height() - 500;
				} else {
					var scroll_pos = current_popup_bottom.data( 'scroll_pos' ) > 100 ? 100 : current_popup_bottom.data( 'scroll_pos' );
					scroll_trigger = 100 == scroll_pos ? $( document ).height() - 50 : $( document ).height() * scroll_pos / 100;
				}
				//check document height vs window height( if its the same or less assume mobile and show slidein after 5 seconds)
				if ($(document).height() <= $(window).height()){
					setTimeout(
						function(){
							make_popup_visible ( current_popup_bottom, 0, '', '' );
						}, 5000
					);
				}
				$( window ).scroll( function(){
					if ( ( ( false !== cookies_expire_bottom && ! checkCookieValue( 'etInfusionsoftCookie_' + optin_id, 'true' ) ) || false == cookies_expire_bottom ) && ! $already_subscribed ) {
						if( $( window ).scrollTop() + $( window ).height() > scroll_trigger ) {
							if ( 0 == triggered ) {
								if ( false !== cookies_expire_bottom ) {
									make_popup_visible ( current_popup_bottom, 0, cookies_expire_bottom, 'etInfusionsoftCookie_' + optin_id + '=true' );
								} else {
									make_popup_visible ( current_popup_bottom, 0, '', '' );
								}

								triggered++;
							}
						}
					}
				});
			}
		}

		 if( $( '.inf_infusionsoft_auto_popup' ).length ) {
			$( '.inf_infusionsoft_auto_popup:not(.inf_infusionsoft_visible)' ).each( function() {
				var this_el = $( this ),
					delay = '' !== this_el.data( 'delay' ) ? this_el.data( 'delay' ) * 1000 : 0;
				auto_popup( this_el, delay );
			});
		 }

        if( $( '.inf_infusionsoft_infusionbar.inf_infusionsoft_infusionbar_trigger_auto' ).length ) {
            $( '.inf_infusionsoft_infusionbar.inf_infusionsoft_infusionbar_trigger_auto:not(.inf_infusionsoft_visible)' ).each( function() {
                var this_el = $( this ),
                    delay = '' !== this_el.data( 'delay' ) ? this_el.data( 'delay' ) * 1000 : 0;
                auto_popup( this_el, delay );
            });
        }

		if( $( '.inf_infusionsoft_trigger_bottom' ).length ) {

			$( '.inf_infusionsoft_trigger_bottom:not(.inf_infusionsoft_visible)' ).each( function(){
				scroll_trigger( $( this ), true );
			});

		}

        if( $( '.inf_infusionsoft_before_exit' ).length ) {

            $( '.inf_infusionsoft_before_exit:not(.inf_infusionsoft_visible)' ).each( function(){
                exit_trigger( $( this ), false );
            });

        }

		if( $( '.inf_infusionsoft_scroll' ).length ) {

			$( '.inf_infusionsoft_scroll:not(.inf_infusionsoft_visible)' ).each( function(){
				scroll_trigger( $( this ), false );
			});
		}

		if( $( '.inf_infusionsoft_trigger_idle' ).length ) {
			$( '.inf_infusionsoft_trigger_idle:not(.inf_infusionsoft_visible)' ).each( function() {
				var this_el = $( this ),
					page_id = this_el.find( '.inf_infusionsoft_submit_subscription' ).data( 'page_id' ),
					optin_id = this_el.find( '.inf_infusionsoft_submit_subscription' ).data( 'optin_id' ),
					list_id = this_el.find( '.inf_infusionsoft_submit_subscription' ).data( 'list_id' );

				if ( ! this_el.hasClass( 'inf_infusionsoft_animated' ) ) {
					var $cookies_expire_idle = this_el.data( 'cookie_duration' ) ? this_el.data( 'cookie_duration' ) : false,
						$already_subscribed = checkCookieValue( 'inf_infusionsoft_subscribed_to_' + optin_id + list_id, 'true' );
					var $idle_timeout = '' !== this_el.data( 'idle_timeout' ) ? this_el.data( 'idle_timeout' ) * 1000 : 30000,
						$delay = 0;

					if ( ( ( false !== $cookies_expire_idle && ! checkCookieValue( 'etInfusionsoftCookie_' + optin_id, 'true' ) ) || false == $cookies_expire_idle ) && ! $already_subscribed ) {
						$( document ).idleTimer( $idle_timeout );

						$( document ).on( 'idle.idleTimer', function() {
							if ( false !== $cookies_expire_idle ) {
								make_popup_visible ( this_el, $delay, $cookies_expire_idle, 'etInfusionsoftCookie_' + optin_id + '=true' );
							} else {
								make_popup_visible ( this_el, $delay, '', '' );
							}
						});
					}
				}
			});
		}

		if ( 'true' == get_url_parameter( 'inf_infusionsoft_popup' ) ) {
			$( '.inf_infusionsoft_after_comment' ).each( function() {
				auto_popup( $( this ), 0 );
			});
		}

		if ( $( '.inf_infusionsoft_after_order' ).length ) {
			$( '.inf_infusionsoft_after_purchase' ).each( function() {
				auto_popup( $( this ), 0 );
			});
		}

		var $radInfusionsoftLockedContainer = $('.inf_infusionsoft_locked_container');
        if( $radInfusionsoftLockedContainer.length ) {
			var $i = 0;

			$radInfusionsoftLockedContainer.each( function() {
				var $this_el = $( this ),
					content = $this_el.find( '.inf_infusionsoft_locked_content' ),
					form = $this_el.find( '.inf_infusionsoft_locked_form' ),
					page_id = $this_el.data( 'page_id' ),
					optin_id = $this_el.data( 'optin_id' );

				$this_el.data( 'container_id', $i );
				$locked_containers.push( content );

				if ( checkCookieValue( 'inf_infusionsoft_unlocked' + optin_id + page_id, 'true' ) ) {
					content.css( {'display' : 'block'} );
					form.remove();
				} else {
					content.remove();
					update_stats_table( 'imp', $this_el );
				}

				$i++;
			});
		}

		$body.on( 'click', '.inf_infusionsoft_locked_container .inf_infusionsoft_submit_subscription', function(){
			var current_container = $( this ).closest( '.inf_infusionsoft_locked_container' ),
				container_id = current_container.data( 'container_id' ),
				page_id = current_container.data( 'page_id' ),
				optin_id = current_container.data( 'optin_id' );

			perform_subscription( $( this ), current_container, container_id, page_id, optin_id );

			return false;
		});

		// unlock content immediately if custom HTML form is used.
		$body.on( 'click', '.inf_infusionsoft_locked_container .inf_infusionsoft_custom_html_form input[type="submit"], .inf_infusionsoft_locked_container .inf_infusionsoft_custom_html_form button[type="submit"]', function() {
			var current_container = $( this ).closest( '.inf_infusionsoft_locked_container' ),
				container_id = current_container.data( 'container_id' ),
				page_id = current_container.data( 'page_id' ),
				optin_id = current_container.data( 'optin_id' );

			unlock_content( current_container, container_id, page_id, optin_id );
		} );

		function unlock_content( current_container, container_id, locked_page_id, locked_optin_id ) {
			set_cookie( 365, 'inf_infusionsoft_unlocked' + locked_optin_id + locked_page_id + '=true' );
			current_container.find( '.inf_infusionsoft_locked_form' ).replaceWith( $locked_containers[container_id] );
			current_container.find( '.inf_infusionsoft_locked_content' ).css( { 'display' : 'block' } );
		}

		// Move inline forms into appropriate sections in Divi theme
		var $radInfusionsoftBelowPost = $('.inf_infusionsoft_below_post');
        if( $radInfusionsoftBelowPost.length ) {
			if ( $body.hasClass( 'inf_pb_pagebuilder_layout' ) ) {
				var bottom_inline = $radInfusionsoftBelowPost,
					divi_container = '<div class="inf_pb_row"><div class="inf_pb_column ra_pb_column_4_4"></div></div>';

				if ( bottom_inline.length ) {
					$( '.inf_pb_section' ).not( '.inf_pb_fullwidth_section' ).last().append( divi_container ).find( '.inf_pb_row' ).last().find( '.inf_pb_column' ).append( bottom_inline );
				}
			}
		}

		function define_popup_position( $this_popup, $just_loaded, $message_space ) {
			var this_popup = $this_popup.find( '.inf_infusionsoft_form_container' ),
				popup_max_height = this_popup.hasClass( 'inf_infusionsoft_popup_container' ) ? $( window ).height() - 40 : $( window ).height() - 20,
				real_popup_height = 0,
				flyin_percentage = this_popup.parent().hasClass( 'inf_infusionsoft_flyin' ) ? 0.03 : 0.05,
				percentage = this_popup.hasClass( 'inf_infusionsoft_with_border' ) ? flyin_percentage + 0.03 : flyin_percentage,
				breakout_offset = this_popup.hasClass( 'breakout_edge' ) ? 0.95 : 1,
				dashed_offset = this_popup.hasClass( 'inf_infusionsoft_border_dashed' ) ? 4 : 0,
				form_height = this_popup.find( 'form' ).innerHeight() + $message_space,
				form_add = true == $just_loaded ? 5 : 0;
                consent_height = this_popup.find( '.consent_wrapper').height();
                real_form_height = form_height + consent_height;


                //this_popup.find('form').css({'height': form_height + consent_height});


			var header_height = undefined;
			if ( this_popup.find( '.inf_infusionsoft_form_header' ).hasClass('split' ) ) {
				var image_height = this_popup.find( '.inf_infusionsoft_form_header img' ).innerHeight(),
					text_height = this_popup.find( '.inf_infusionsoft_form_header .inf_infusionsoft_form_text' ).innerHeight();
				header_height = image_height < text_height ? text_height + 30 : image_height + 30;
			} else {
				header_height = this_popup.find( '.inf_infusionsoft_form_header img' ).innerHeight() + this_popup.find( '.inf_infusionsoft_form_header .inf_infusionsoft_form_text' ).innerHeight() + 30;
			}

			this_popup.css( { 'max-height' : popup_max_height } );
			if ( this_popup.hasClass( 'inf_infusionsoft_popup_container' ) ) {
				var top_position = $( window ).height() / 2 - this_popup.innerHeight() / 2;
				this_popup.css( { 'top' : top_position + 'px' } );
			}

			this_popup.find( '.inf_infusionsoft_form_container_wrapper' ).css( { 'max-height' : popup_max_height - 20 } );


			var $body2 = $('body');
            if ( ( 768 > $body2.outerWidth() + 15 ) || this_popup.hasClass( 'inf_infusionsoft_form_bottom' ) ) {
				if ( this_popup.hasClass( 'inf_infusionsoft_form_right' ) || this_popup.hasClass( 'inf_infusionsoft_form_left' ) ) {
					this_popup.find( '.inf_infusionsoft_form_header' ).css( { 'height' : 'auto' } );
				}

				real_popup_height = this_popup.find( '.inf_infusionsoft_form_header' ).innerHeight() + this_popup.find( '.inf_infusionsoft_form_content' ).innerHeight() + 30 + form_add;

				if ( this_popup.hasClass( 'inf_infusionsoft_form_right' ) || this_popup.hasClass( 'inf_infusionsoft_form_left' ) ) {
					this_popup.find( '.inf_infusionsoft_form_container_wrapper' ).css( { 'height' : real_popup_height - 30 + dashed_offset } );
				}
			} else {
				if ( header_height < real_form_height ) {
					//real_popup_height = this_popup.find( 'form' ).innerHeight() + 30 + $message_space;
				    real_popup_height = real_form_height;
                    $('.inf_infusionsoft .inf_infusionsoft_form_container .inf_infusionsoft_form_content').css({'padding-top':'40', 'padding-bottom': '40'});
                    var topFix = consent_height;
                    $('.inf_infusionsoft .inf_infusionsoft_form_left .inf_infusionsoft_form_content form, .inf_infusionsoft .inf_infusionsoft_form_right .inf_infusionsoft_form_content form').css({'top': '-'+topFix+'px'});
                } else {
					real_popup_height = header_height + 30;
				}

				if ( this_popup.hasClass( 'inf_infusionsoft_form_right' ) || this_popup.hasClass( 'inf_infusionsoft_form_left' ) ) {
					this_popup.find( '.inf_infusionsoft_form_header' ).css( { 'height' : real_popup_height * breakout_offset - dashed_offset } );
					this_popup.find( '.inf_infusionsoft_form_content' ).css( { 'min-height' : real_popup_height - dashed_offset } );
					this_popup.find( '.inf_infusionsoft_form_container_wrapper' ).css( { 'height' : real_popup_height } );
				}
			}

			if ( real_popup_height > popup_max_height ) {
				this_popup.find( '.inf_infusionsoft_form_container_wrapper' ).addClass( 'inf_infusionsoft_vertical_scroll' );
			} else {
				this_popup.find( '.inf_infusionsoft_form_container_wrapper' ).removeClass( 'inf_infusionsoft_vertical_scroll' );
			}

			if ( $this_popup.hasClass( 'inf_infusionsoft_popup' ) ) {
				$body2.addClass( 'inf_infusionsoft_popup_active' );
			}
		}

		$body.on( 'click', '.inf_infusionsoft_submit_subscription', function() {
			perform_subscription( $( this ), '', '', '', '' );
			return false;
		});

		function perform_subscription( this_button, current_container, container_id, locked_page_id, locked_optin_id ) {
			var this_form = this_button.parent(),
				list_id = this_button.data( 'list_id' ),
				account_name = this_button.data( 'account' ),
				service = this_button.data( 'service' ),
				name = this_form.find( '.inf_infusionsoft_subscribe_name input' ).val(),
				last_name = undefined != this_form.find( '.inf_infusionsoft_subscribe_last input' ).val() ? this_form.find( '.inf_infusionsoft_subscribe_last input' ).val() : '',
				email = this_form.find( '.inf_infusionsoft_subscribe_email input' ).val(),
				page_id = this_button.data( 'page_id' ),
				webhook_url = this_button.data( 'center_webhook_url' ),

				disable_dbl_optin = this_button.data( 'disable_dbl_optin'),
				post_name = this_button.data('post_name'),
				cookie = this_button.data('cookie');
				optin_id = this_button.data( 'optin_id' );
				optin_type = (this_button.data('optin_type') == 'infusion' ? 'infusion' : 'standard');
				redirectUrl = this_button.data( 'redirect_url' );
				redirectTab = this_button.data( 'redirect' );
				redirect_delay = this_button.data( 'success_delay' ) + '000';
				redirect_delay = parseInt(redirect_delay);
				this_form.find( '.inf_infusionsoft_subscribe_email input' ).removeClass( 'inf_infusionsoft_warn_field' );

					if(this_button.hasClass('cursor-not-allowed')){
									//find the top level parent of but button clicked to find the error message for this specific form
									var parents = this_form.parents();
									parents.each(function(){
										 if($(this).hasClass('inf_infusionsoft_optin') || $(this).hasClass('inf_infusionsoft_infusionbar')){
												 top_parent = $(this);
										 }
									});
									var error_message = top_parent.find('.consent_error');
									var consent_form = top_parent.find('.infusion_consent_form') ;
									$(error_message).show();
									if ($(consent_form).hasClass('infusion_consent_closed')) {
											$(consent_form).removeClass('infusion_consent_closed');
											$(consent_form).addClass('infusion_consent');
									}
							return;
					}
			if ( '' == email ) {
				this_form.find( '.inf_infusionsoft_subscribe_email input' ).addClass( 'inf_infusionsoft_warn_field' );
			} else {
				$subscribe_data = JSON.stringify({ 'list_id' : list_id, 'account_name' : account_name, 'service' : service, 'name' : name, 'email' : email, 'page_id' : page_id, 'optin_id' : optin_id, 'last_name' : last_name, 'dbl_optin' : disable_dbl_optin, 'post_name' : post_name, 'cookie' : cookie });
				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: infusionsoftSettings.ajaxurl,
					data: {
						action : 'infusionsoft_subscribe',
						subscribe_data_array : $subscribe_data,
						subscribe_nonce : infusionsoftSettings.subscribe_nonce
					},
					beforeSend: function( data ) {
						this_button.addClass( 'inf_infusionsoft_button_text_loading' );
						this_button.find( '.inf_infusionsoft_subscribe_loader' ).css( { 'display' : 'block' } );
					},
					success: function( data ) {
						$('.infusion_consent_form').hide();//hide infusion consent text
						$('.consent_wrapper').hide();//hide all other forms consent text
						this_button.removeClass( 'inf_infusionsoft_button_text_loading' );
						this_button.find( '.inf_infusionsoft_subscribe_loader' ).css( { 'display' : 'none' } );
						if ( data ) {
							if ( '' != current_container && ( data.success || 'Invalid email' != data.error ) ) {
								unlock_content( current_container, container_id, locked_page_id, locked_optin_id );
							} else {
								if ( data.error ) {
									this_form.find( '.inf_infusionsoft_error_message' ).remove();
									this_form.prepend( '<h2 class="inf_infusionsoft_error_message">' + data.error + '</h2>' );
									this_form.parent().parent().find( '.inf_infusionsoft_form_header' ).addClass( 'inf_infusionsoft_with_error' );
								}
								if( data.success && '' == current_container && optin_type == 'infusion'){
										var topLevel = this_form.parent().parent();
										topLevel.find( '.inf_infusionsoft_success_message' ).addClass( 'inf_infusionsoft_animate_message' );
										topLevel.find( '.inf_infusionsoft_success_container' ).addClass( 'inf_infusionsoft_animate_success' );
										topLevel.find('.inf_infusionsoft_form_text').remove();
										//set_cookie( 365, 'inf_infusionsoft_subscribed_to_' + optin_id + list_id + '=true' );
									if(typeof(center) == "function") {
										center('associate', email);
									}
									//uncomment to reactivate center webhooks
									//submit_center_webhook(email, name, last_name, webhook_url);
										rapidbarSubmitPaddingNeeded =  ( jQuery('.inf_infusionsoft_infusionbar_form_content button').data('service') == 'redirect') ? 35 : 50;//set this before the bar is removed so I know how much padding to remove on other functions
										this_form.remove();
										setTimeout(function(){
												$('.inf_infusionsoft_infusionbar').remove();
										}, 3000);
										if(redirectUrl.length > 0){
												setTimeout(function(){
														if(redirectTab == 'new_tab') {
																window.open(redirectUrl);
														}else if(redirectTab == 'new_window'){
																window.open(redirectUrl, '_blank', 'toolbar=1,location=0,menubar=1');
														}else{
																window.location.href = redirectUrl;
														}
												}, redirect_delay);
										}
								}
								if ( data.success && '' == current_container && optin_type == 'standard') {
									this_form.parent().find( '.inf_infusionsoft_success_message' ).addClass( 'inf_infusionsoft_animate_message' );
									this_form.parent().find( '.inf_infusionsoft_success_container' ).addClass( 'inf_infusionsoft_animate_success' );
									this_form.remove();
									if(typeof(center) == "function") {
										center('associate', email);
									}
									//uncomment to reactivate center webhooks

									//submit_center_webhook(email, name, last_name, webhook_url);
									//set_cookie( 365, 'inf_infusionsoft_subscribed_to_' + optin_id + list_id + '=true' );
                                    if(redirectUrl.length > 0){
                                        setTimeout(function(){
                                            if(redirectTab == 'new_tab') {
                                                window.open(redirectUrl);
                                            }else if(redirectTab == 'new_window'){
                                                window.open(redirectUrl, '_blank', 'toolbar=1,location=0,menubar=1');
                                            }else{
                                                window.location.href = redirectUrl;
                                            }
                                        }, redirect_delay);
                                    }
								}
							}
							define_popup_position( this_form.parent().parent().parent().parent(), false, 50 );
						}
					}
				});
			}
		}

		function submit_center_webhook(email, name, last_name, url) {
			var full_name;
			var first_name = '';

			if(name == null){
				name = '';
			}

			//check if last name is blank if so
			//name is probably the full name
			//although they could have just left first name blank so this is not full proof

			if(last_name == '')
			{
				full_name = name;
			}else{
				first_name = name;
			}

			var data =
			{
				'email': email,
				'first_name': first_name,
				'last_name': last_name,
				'full_name': full_name,
			}

			var submit_data = {
				url: url,
				data: data
			}

			console.log(submit_data);
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: infusionsoftSettings.ajaxurl,
				data: {
					action : 'infusionsoft_center_webhooks',
					data: submit_data,
					center_nonce: infusionsoftSettings.center_nonce
				},
				beforeSend: function (data) {

				},
				success: function(response) {
					console.log(response);
				}

			});

		}

			$body.on( 'click', '.inf_infusionsoft_custom_html_form input[type="submit"], .inf_infusionsoft_custom_html_form button[type="submit"]', function() {
			var this_button = $( this ),
				form_container = this_button.closest( '.inf_infusionsoft_custom_html_form' );

			update_stats_table( 'con', form_container );
		} );

        $body.on( 'click','.inf_infusionsoft_redirect_page',function(e){
            e.preventDefault();
            var this_button = $( this );
            //list_id     = this_button.data( 'list_id' );
            optin_id    = this_button.data( 'optin_id' );
            type        = this_button.data( 'optin_type' );
            var popup_id = $(this).data('popup_id');
            var redirectUrl = $(this).data('redirect_url');
            redirectTab = this_button.data( 'redirect' );
            redirect_delay = this_button.data( 'success_delay' ) + '000';
            redirect_delay = parseInt(redirect_delay);
            var container = $(this).parent().parent().parent().parent().parent();
            container.addClass( 'inf_infusionsoft_exit_animation' );
            update_stats_table( 'con', this_button );
            rapidbarSubmitPaddingNeeded =  ( jQuery('.inf_infusionsoft_infusionbar_form_content button').data('service') == 'redirect') ? 35 : 50;//set this before the bar is removed so I know how much padding to remove on other functions


            //set_cookie( 365, 'inf_infusionsoft_subscribed_to_' + optin_id + list_id + '=true' );
            if(popup_id) {
                var optin = $('.inf_infusionsoft_' + popup_id);
                make_popup_visible(optin, 0, '', '');
            }else {
                if(redirectTab == 'new_tab') {
                    window.open(redirectUrl);
                }else if(redirectTab == 'new_window'){
                    window.open(redirectUrl, '_blank', 'toolbar=1,location=0,menubar=1');
                }else{
                    window.location.href = redirectUrl;
                }
            }
        });

        $body.on('click', '.accept_consent', function(){
            var parent = $(this).parent().parent().parent().get( 0 ).tagName;
            var button = $(parent + ' .inf_infusionsoft_submit_subscription');
            if($('.accept_consent').prop('checked')){
                button.removeClass('cursor-not-allowed');
            }else{
                button.addClass('cursor-not-allowed');
            }
        });

        $body.on('click', '.consent_wrapper .accept_consent', function(){
            var parent = $(this).parent().parent().parent().get( 0 ).tagName;
            var button = $(parent + ' .inf_infusionsoft_submit_subscription');
            if($(this).prop('checked')){
                button.removeClass('cursor-not-allowed');
            }else{
                button.addClass('cursor-not-allowed');
            }
        });

		$( window ).resize( function(){
			var $radInfusionsoftResize = $('.inf_infusionsoft_resize');
            if ( $radInfusionsoftResize.length ) {
				$radInfusionsoftResize.each( function() {
					define_popup_position( $( this ), false, 0 );
				});
			}
		});
	});

})(jQuery);


//once the window is loaded make sure that the body tag has the required class for infusionsoft to work
(function($){
    $(window).load(function(){
       if(!$('body').hasClass('inf_infusionsoft')){
           $('body').addClass('inf_infusionsoft');
       }
    });
}(jQuery));
