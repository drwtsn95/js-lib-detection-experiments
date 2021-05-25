/**
 * Copyright (c) 2016 Gian MR
 * Gian MR Theme Custom Javascript
 *
 * @package Newkarma
 */

var $ = jQuery.noConflict();

(function( $ ) {
	/* http://www.w3schools.com/js/js_strict.asp */
	"use strict";

	$( document ).ready(
		function () {
			$( ".gmr-widget-carousel" ).owlCarousel(
				{
					items : 1,
					pagination:true,
					autoHeight:true,
					navigation: false,
					itemsDesktop : [1000,1], // 3 items between 1000px and 901px.
					itemsDesktopSmall : [900,1], // betweem 900px and 601px.
					itemsTablet: [600,1], // 3 items between 600 and 421.
					itemsMobile : [420,1]
				}
			);
		}
	); /* End document Ready */

})( jQuery );
