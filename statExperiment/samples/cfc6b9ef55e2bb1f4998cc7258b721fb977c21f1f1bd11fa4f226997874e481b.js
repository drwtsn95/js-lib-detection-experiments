/* OT Document JAVASCRIPT */
jQuery.noConflict();
jQuery(document).ready(function($) {
	
	$('a.ot_scrollable').bind('click', function(e) {
		e.preventDefault();
		$('html,body').animate({scrollTop: $(this.hash).offset().top});                                                         
	});
	
	$('.ot-porfolio .catItemView').hover(function(){
		$(".ot-overlay", this).stop().animate({bottom:'0'},{queue:false,duration:300});
		// $(".ot-overlay", this).stop().animate({opacity:'1'},{queue:false,duration:300});
	}, function() {
		$(".ot-overlay", this).stop().animate({bottom:'-100%'},{queue:false,duration:300});
		// $(".ot-overlay", this).stop().animate({opacity:'0'},{queue:false,duration:300});
	});
});

