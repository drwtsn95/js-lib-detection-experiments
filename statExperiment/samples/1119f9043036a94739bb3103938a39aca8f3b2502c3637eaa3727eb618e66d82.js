(function($) {
	"use strict";
	console.log( loadmore.url );
	var button = $('.pagination-ajax > button');
	var page = 2;
	var loading = false;
	var maxpage = button.data( 'maxpage' );
	var layout  = button.data( 'layout' );
	var loadmore_style  = button.data( 'loadmore_style' );
	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: 400 /* milliseconds) adjust to the highest acceptable value */
	};
	
	function _product_loadmore_ajax(){
		loading = true;
		button.addClass( 'loading' );
		var data = {
			action: 'sw_product_ajax_load_more',
			nonce: loadmore.nonce,
			page: page,
			query: loadmore.query,
			posts_per_page: loadmore.posts_per_page,
			layout: layout
		};
		$.post( loadmore.url, data, function(res) {
			if( res.success) { 
				var newItems = $(res.data);
				setTimeout(function(){
					if( layout == 'grid' ){
						$('.blog-content').isotope();
						$('.blog-content').isotope('reloadItems').isotope( "insert", newItems );
					}else{
						$('#product_listing').append(newItems);
					}
				}, 500);
				page = page + 1;
				loading = false;
				button.removeClass( 'loading' );
				if( maxpage < page ){
					button.addClass( 'loaded' );
				}
			} else {
				console.log( 'No data to show' );
			}
		});
	}
	if( loadmore_style == 1 ){
		$(window).scroll(function(){
			if( ! loading && scrollHandling.allow ) {
				scrollHandling.allow = false;
				setTimeout(scrollHandling.reallow, scrollHandling.delay);
				var offset = $(button).offset().top - $(window).scrollTop();	
				if( maxpage < page ){
					button.addClass( 'loaded' );
				}
				if( 1000 > offset && maxpage >= page ) {
					_product_loadmore_ajax();
				}
			}
		});
	}else{		
		button.on( 'click', function(){
			if( maxpage >= page ){			
				_product_loadmore_ajax();
			}
		});
	}
}(jQuery));