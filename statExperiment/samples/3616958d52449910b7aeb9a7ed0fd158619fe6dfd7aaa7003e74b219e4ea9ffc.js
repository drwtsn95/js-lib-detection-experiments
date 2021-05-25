(function($){
	jQuery(document).ready(function($){
		// Clone main menu for Responsive menu
		$( ".primary-menu-cont" ).clone().prependTo( "#responsive-menu" );
		$("#responsive-menu .primary-menu-cont").removeClass( "primary-menu-cont" );
		// Current Item
		var current = $("#site-navigation .current-menu-item > a").text();
		if (current) $(".responsive-menu-bar span").text( current );
		
		// Responsive Menu Expand/Collapse
		$(".open-responsive-menu").click(function () {
			$content = $('#responsive-menu');
			$content.slideToggle(500, function () {
				// do
			});
		});
				
		// Main menu underline
		$(".primary-menu-cont > ul > li > ul.children").parent( "li" ).addClass( "main-menu-dd" );
		$(".primary-menu-cont > ul > li > ul.sub-menu").parent( "li" ).addClass( "main-menu-dd" );
		
		$(".primary-menu-cont > ul > li > a").append('<span class="underline"></span>');
		$(".primary-menu-cont > ul > li > a").mouseover(function(){
			$(".underline", this).slideDown(100);
		}).mouseout(function() {
			$(".underline", this).slideUp(100);
     	});
		
		// Current Menu item
		//$(".primary-menu-cont ul > li > a > .underline").slideUp(100);
		
		// Submenus
		$(".primary-menu-cont ul li li.page_item_has_children > a").append('<i class="fa fa-arrow-right"></i>');
		$(".primary-menu-cont ul li li.menu-item-has-children > a").append('<i class="fa fa-arrow-right"></i>');
		
		// Brings drop-down navigation tapping for touch devices.
		$('.main-navigation').doubleTapToGo();
		
		// Mainmenu + Slider fix.
		if ( $( ".main-navigation" ).length ) {
			$("#content aside.widget:first-of-type .site-slider").css("margin-top", "auto");
		}
		
		// Clients : OWL carousel
		$(".owl-clients").owlCarousel({
			loop:true,
			autoplay: true,
			margin:10,
			responsive : {
				// breakpoint from 0 up
				0 : {
					items:1,
				},
				// breakpoint from 320 up
				321 : {
					items:2,
				},
				// breakpoint from 480 up
				480 : {
					items:4,
				}
			}
		});
		// Blog : OWL carousel
		$(".owl-blog").owlCarousel({
			loop:true,
			autoplay: true,
			margin:15,
			responsive : {
				// breakpoint from 0 up
				0 : {
					items:1,
				},
				// breakpoint from 320 up
				321 : {
					items:2,
				},
				// breakpoint from 480 up
				480 : {
					items:3,
				}
			}
		});
		
		// Back to Top
		jQuery('#back_top').click(function(){
			jQuery('html, body').animate({scrollTop:0}, 'normal');return false;
		});	
		jQuery(window).scroll(function(){
			if(jQuery(this).scrollTop() !== 0){jQuery('#back_top').fadeIn();}else{jQuery('#back_top').fadeOut();}
		});
		if(jQuery(window).scrollTop() !== 0){jQuery('#back_top').show();}else{jQuery('#back_top').hide();}
	});
})(jQuery);