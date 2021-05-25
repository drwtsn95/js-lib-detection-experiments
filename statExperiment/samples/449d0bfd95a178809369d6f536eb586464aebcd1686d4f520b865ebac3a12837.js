if(jQuery('#pp_page_title_img_blur').val()!='') {
	(function() {
	  jQuery(window).scroll(function() {
	    var oVal;
	    oVal = jQuery(window).scrollTop() / 400;
	    if(oVal>1)
	    {
		    oVal = 1;
	    }
	    
	    return jQuery("#bg_blurred").css("opacity", oVal);
	  });
	
	}).call(this);
}

if(jQuery('#pp_page_title_img_blur').val()!='') {
	(function() {
	  jQuery(window).scroll(function() {
	    var oVal;
	    oVal = jQuery(window).scrollTop() / 140;
	    if(oVal>1)
	    {
		    oVal = 1;
	    }
	    oVal = parseFloat(1-oVal);
	    
	    return jQuery("#page_caption.hasbg .page_title_wrapper .page_title_inner").css("opacity", oVal);
	  });
	
	}).call(this);
}

jQuery(document).ready(function(){ 
	"use strict";

	jQuery(document).setNav();
	
	jQuery(window).resize(function(){
		jQuery(document).setNav();
	});
	
	/*var sliderLayout = jQuery('#tg_blog_slider_layout').val();
	
	if(jQuery(window).width()>=960 && jQuery(window).height() < 800)
	{
		if(sliderLayout == 'slider' || sliderLayout == 'fixed-slider')
		{
			jQuery('#post_featured_slider').css('height', '400px');
			jQuery('#post_featured_slider li .slider_image').css('height', '400px');
		}
		else
		{
			jQuery('#post_featured_slider').css('height', '250px');
			jQuery('#post_featured_slider li .slider_image').css('height', '250px');
		}
	}
	else
	{
		if(sliderLayout == 'slider' || sliderLayout == 'fixed-slider')
		{
			jQuery('#post_featured_slider').css('height', '500px');
			jQuery('#post_featured_slider li .slider_image').css('height', '500px');
		}
		else
		{
			jQuery('#post_featured_slider').css('height', '300px');
			jQuery('#post_featured_slider li .slider_image').css('height', '300px');
		}
	}
	
	jQuery(window).resize(function(){
		if(jQuery(window).width()>=960 && jQuery(window).height() < 800)
		{
			if(sliderLayout == 'slider' || sliderLayout == 'fixed-slider')
			{
				jQuery('#post_featured_slider').css('height', '400px');
				jQuery('#post_featured_slider li .slider_image').css('height', '400px');
			}
			else
			{
				jQuery('#post_featured_slider').css('height', '250px');
				jQuery('#post_featured_slider li .slider_image').css('height', '250px');
			}
		}
		else
		{
			if(sliderLayout == 'slider' || sliderLayout == 'fixed-slider')
			{
				jQuery('#post_featured_slider').css('height', '500px');
				jQuery('#post_featured_slider li .slider_image').css('height', '500px');
			}
			else
			{
				jQuery('#post_featured_slider').css('height', '300px');
				jQuery('#post_featured_slider li .slider_image').css('height', '300px');
			}
		}
	});*/

	jQuery('.fancy_video, .lightbox_vimeo, .lightbox_youtube').magnificPopup({
	  	src: jQuery(this).attr('href'),
	  	type: 'inline',
	  	removalDelay: 300,
	  	mainClass: 'mfp-fade'
	});
	
	jQuery('a.fancy-gallery, .pp_gallery a').magnificPopup({
	  	type: 'image',
	  	removalDelay: 300,
	  	mainClass: 'mfp-fade',
	  	gallery:{
	    	enabled:true
		}
	});
	
	jQuery('.img_frame').magnificPopup({
	  	type: 'image',
	  	removalDelay: 300,
	  	mainClass: 'mfp-fade'
	});
    
    jQuery('#menu_expand_wrapper a').on( 'click', function(){
    	jQuery('#menu_wrapper').fadeIn();
	    jQuery('#custom_logo').animate({'left': '15px', 'opacity': 1}, 400);
	    jQuery('#menu_close').animate({'left': '-10px', 'opacity': 1}, 400);
	    jQuery(this).animate({'left': '-60px', 'opacity': 0}, 400);
	    jQuery('#menu_border_wrapper select').animate({'left': '0', 'opacity': 1}, 400).fadeIn();
    });
	
	jQuery('#menu_close').on( 'click', function(){
		jQuery('#custom_logo').animate({'left': '-200px', 'opacity': 0}, 400);
	    jQuery(this).stop().animate({'left': '-200px', 'opacity': 0}, 400);
	    jQuery('#menu_expand_wrapper a').animate({'left': '20px', 'opacity': 1}, 400);
	    jQuery('#menu_border_wrapper select').animate({'left': '-200px', 'opacity': 0}, 400).fadeOut();
	    jQuery('#menu_wrapper').fadeOut();
	});
	
	jQuery(window).resize(function() {
		if(jQuery(this).width() < 768)
		{
			jQuery('#menu_expand_wrapper a').trigger('click');
		}
	});
	
	var isDisableRightClick = jQuery('#pp_enable_right_click').val();
	
	if(isDisableRightClick!='')
	{
		jQuery(this).bind("contextmenu", function(e) {
	    	e.preventDefault();
	    });
	}
	
	function rePortfolioLayout() {
	
		var jQuerycontainer = jQuery('#portfolio_filter_wrapper, .portfolio_filter_wrapper');
		var windowWidth = jQuerycontainer.width();
		
		if(jQuery('#pp_menu_layout').val() == 'leftmenu' && jQuery(window).width() > 768)
		{
			windowWidth = parseInt(windowWidth + 265);
		}
		
		var jQueryportfolioColumn = jQuerycontainer.data('columns');
		var columnValue;
		var masonryOpts;
		
		if(jQuery('#pp_menu_layout').val() == 'leftmenu')
		{
			var windowWidth = jQuerycontainer.width();
		}

		if(windowWidth > 959)
		{
			columnValue = parseInt(windowWidth / jQueryportfolioColumn);
		}
		else if(windowWidth < 959 && windowWidth > 480)
		{
			columnValue = parseInt(windowWidth / jQueryportfolioColumn);
		}
		else if(windowWidth <= 480)
		{
			columnValue = 480;
		}
		
	    masonryOpts = {
		  columnWidth: columnValue
		};

	    jQuerycontainer.isotope({
	      resizable: false,
	      itemSelector : '.element',
	      masonry: masonryOpts
	    } ).isotope();

	}
	
	// cache jQuery window
	var $window = jQuery(window);
  
	// cache container
	var jQuerycontainer = jQuery('#portfolio_filter_wrapper, .portfolio_filter_wrapper');
	
	// start up isotope with default settings
	jQuerycontainer.imagesLoaded( function(){
	    rePortfolioLayout();
	    $window.smartresize( rePortfolioLayout );
	    
	    jQuerycontainer.children('.element').children('.gallery_type').each(function(){
		    jQuery(this).addClass('fadeIn');
	    });
	    
	    jQuerycontainer.children('.element').children('.portfolio_type').each(function(){
		    jQuery(this).addClass('fadeIn');
	    });
	    
	    jQuerycontainer.children('.element').mouseenter(function(){
		    jQuery(this).addClass('hover');
	    });
	    
	    jQuerycontainer.children('.element').mouseleave(function(){
		    jQuerycontainer.children('.element').removeClass('hover');
	    });
	    
	    jQuery(this).addClass('visible');
	});
    
    //Add to top button when scrolling
    jQuery(window).scroll(function() {
	 	var calScreenWidth = jQuery(window).width();
		
		if(jQuery(this).scrollTop() > 200) {
		    jQuery('#toTop').stop().css({opacity: 0.5, "visibility": "visible"}).animate({"visibility": "visible"}, {duration:1000,easing:"easeOutExpo"});
		} else if(jQuery(this).scrollTop() == 0) {
		    jQuery('#toTop').stop().css({opacity: 0, "visibility": "hidden"}).animate({"visibility": "hidden"}, {duration:1500,easing:"easeOutExpo"});
		}
	});
 
	jQuery('#toTop, .hr_totop').on( 'click', function() {
		jQuery('body,html').animate({scrollTop:0},800);
	});
	
	var isDisableDragging = jQuery('#pp_enable_dragging').val();
	
	if(isDisableDragging!='')
	{
		jQuery("img").mousedown(function(){
		    return false;
		});
	}
	
	if(jQuery('#pp_topbar').val()==0)
	{
		var topBarHeight = jQuery('.header_style_wrapper').height();
	}
	else
	{
		var topBarHeight = parseInt(jQuery('.header_style_wrapper').height()-jQuery('.header_style_wrapper .above_top_bar').height());
	}
	
	var logoHeight = jQuery('#custom_logo img').height();
	var logoMargin = parseInt(jQuery('#custom_logo').css('marginTop'));
	var menuPaddingTop = parseInt(jQuery('#menu_wrapper div .nav li > a').css('paddingTop'));
	var menuPaddingBottom = parseInt(jQuery('#menu_wrapper div .nav li > a').css('paddingBottom'));
	var SearchPaddingTop = parseInt(jQuery('.top_bar #searchform button').css('paddingTop'));
	
	jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.header_style_wrapper').height())+'px');
	
	jQuery(window).resize(function(){
	    if(jQuery(this).width()>768)
	    {
	    	jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.header_style_wrapper').height())+'px');
		    jQuery('.logo_wrapper').css('marginTop', '');
		    jQuery('.top_bar #searchform button').css('paddingTop', '');
	    }
	    else
	    {
	    	jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.header_style_wrapper').height())+'px');
	    }
	});
	
	jQuery(window).scroll(function(){
		var scrollTop = jQuery(window).scrollTop();
		var docHeight = jQuery(document).height();
		var winHeight = jQuery(window).height();
		var scrollPercent = (scrollTop) / (docHeight - winHeight);
		var scrollPercentRounded = Math.round(scrollPercent*100);
		
		jQuery('#post_indicator').css('width', scrollPercentRounded+'%');
	});
	
	jQuery(window).scroll(function(){
	    if(jQuery('#pp_fixed_menu').val()==1)
	    {
	    	if(jQuery(this).scrollTop() >= 200){
	    		jQuery('.header_style_wrapper .above_top_bar').hide();
	    		jQuery('.extend_top_contact_info').hide();
	    		
	    		jQuery('.top_bar').addClass('scroll');
	    		jQuery('#post_info_bar').addClass('scroll');
	        }
	        else if(jQuery(this).scrollTop() < 200)
	        {
	        	jQuery('.header_style_wrapper .above_top_bar').show();
	        	jQuery('.extend_top_contact_info').show();
	    	    
	    	    jQuery('#custom_logo img').removeClass('zoom');
	    	    jQuery('#custom_logo img').css('maxHeight', '');
	    	    
	    	    jQuery('#custom_logo').css('marginTop', parseInt(logoMargin)+'px');
	    		
	    		jQuery('#menu_wrapper div .nav > li > a').css('paddingTop', menuPaddingTop+'px');
	    		jQuery('#menu_wrapper div .nav > li > a').css('paddingBottom', menuPaddingBottom+'px');;
	    		
	    		jQuery('.top_bar').removeClass('scroll');
	    		jQuery('#post_info_bar').removeClass('scroll');
	        }
	   }
	   else
	   {
	       if(jQuery(this).scrollTop() >= 200)
	       {
	       		jQuery('.header_style_wrapper').addClass('nofixed');
	       }
	       else
	       {
	       		jQuery('.header_style_wrapper').removeClass('nofixed');
	       }
	   }
	});
	
	jQuery('.post_img img').imagesLoaded(function(){
		jQuery(this).parent('.post_img').addClass('fadeIn');
	});
	
	jQuery(document).mouseenter(function()
	{	
	    jQuery('body').addClass('hover');	
	});	
	
	jQuery(document).mouseleave(function()
	{	
	    jQuery('body').removeClass('hover');	
	});	
	
	var siteBaseURL = jQuery('#pp_homepage_url').val();
	if(jQuery('#pp_ajax_search').val() != '')
    {
		jQuery('#s').on('input', function() {
			jQuery.ajax({
				url:siteBaseURL+"/wp-admin/admin-ajax.php",
				type:'POST',
				data:'action=grandblog_ajax_search&s='+jQuery('#s').val(),
				success:function(results) {
					jQuery("#autocomplete").html(results);
					
					if(results != '')
					{
						jQuery("#autocomplete").addClass('visible');
						jQuery("#autocomplete").show();
						jQuery("body.js_nav .mobile_menu_wrapper").css('overflow', 'visible');
					}
					else
					{
						jQuery("#autocomplete").hide();
						jQuery("body.js_nav .mobile_menu_wrapper").css('overflow', 'scroll');
					}
				}
			})
		});
		
		jQuery("#s").keypress(function(event) {
		    if (event.which == 13) {
		        event.preventDefault();
		        jQuery("form#searchform").submit();
		    }
		});
		
		jQuery('#s').focus(function(){
			if (jQuery('#autocomplete').html() != ''){
				jQuery("#autocomplete").addClass('visible');
				jQuery("#autocomplete").fadeIn();
			}
		});
		
		jQuery('#s').blur(function(){
	      jQuery("#autocomplete").fadeOut();
		});
	}
	
	jQuery('.animated').imagesLoaded(function() {
		var windowWidth = jQuery(window).width();
	
		if(windowWidth >= 960)
		{
			jQuery(this).waypoint(function(direction) {
				var animationClass = jQuery(this).data('animation');
			
				jQuery(this).addClass(animationClass, direction === 'down');
				
			} , { offset: '100%' });
		}
	});
	
	jQuery('#mobile_nav_icon').on( 'click', function() {
		jQuery('body,html').animate({scrollTop:0},100);
		jQuery('body').toggleClass('js_nav');
		jQuery('#close_mobile_menu').addClass('open');
		
		if(is_touch_device())
		{
			jQuery('body.js_nav').css('overflow', 'auto');
		}
	});
	
	jQuery('#close_mobile_menu').on( 'click', function() {
		jQuery('body').removeClass('js_nav');
		jQuery(this).removeClass('open');
	});
	
	jQuery('.mobile_menu_close a').on( 'click', function() {
		jQuery('body').removeClass('js_nav');
	});
	
	jQuery('#search_icon').on( 'click', function() {
		jQuery('body,html').animate({scrollTop:0},100);
		jQuery('body').toggleClass('js_nav');
		jQuery('body').addClass('overflow_hidden');	
		jQuery('#close_mobile_menu').addClass('open');
		jQuery('.mobile_menu_wrapper').find('#searchform').find('#s').focus();
		
		if(is_touch_device())
		{
			jQuery('body.js_nav').css('overflow', 'auto');
		}
	});
	
	jQuery('.close_alert').on( 'click', function() {
		var target = jQuery(this).data('target');
		jQuery('#'+target).fadeOut();
	});			
	
	jQuery('.tooltip').tooltipster();
        
    jQuery('#option_wrapper').mouseenter(function()
	{	
	    jQuery('body').addClass('overflow_hidden');	
	});	
	
	jQuery('#option_wrapper').mouseleave(function()
	{	
	    jQuery('body').removeClass('overflow_hidden');	
	});	
	
	jQuery('.animate').waypoint(function(direction) {
		var windowWidth = jQuery(window).width();
	
		jQuery(this).addClass('visible', direction === 'down');
	    
	} , { offset: '80%' });
	
	if(jQuery.browser.msie && parseFloat(jQuery.browser.version)<10)
	{
		jQuery('.animate').css('opacity', 1);
		jQuery('.animate').css('visibility', 'visible');
		
		jQuery('.animated').each(function() {
			jQuery(this).css('opacity', 1);
			jQuery(this).css('visibility', 'visible');
		});
	}
	
	jQuery('#page_share, #post_share_text, #post_info_share').click(function(){
		jQuery('#overlay_background').addClass('visible');
		jQuery('#overlay_background').addClass('share_open');
		jQuery('#fullscreen_share_wrapper').css('visibility', 'visible');
	});
	
	jQuery('#overlay_background').click(function(){
		if(!jQuery('body').hasClass('js_nav'))
		{
			jQuery('#overlay_background').removeClass('visible');
			jQuery('#overlay_background').removeClass('share_open');
			jQuery('#fullscreen_share_wrapper').css('visibility', 'hidden');
		}
	});
	jQuery(".nav-tabs a").click(function(){
		jQuery(this).tab('show');
	});

});

jQuery(window).on('resize load',adjustIframes);
