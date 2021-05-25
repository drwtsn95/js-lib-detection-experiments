jQuery(window).load(function() {
	var current_width = $(window).width();
    if(current_width < 768) {
		jQuery('.overlayimage').remove();
		jQuery('#buttons a.removelink').each(function(){
            // and test its normalized href against the url pathname regexp
                jQuery(this).removeAttr('href');
        });
		jQuery('#buttons a.removelink').each(function(){
            // and test its normalized href against the url pathname regexp
                jQuery(this).addClass('dropdown');
        });
		jQuery('#buttons .dropdown').unbind('click').click(function(){
			if(jQuery(this).next().is(':visible')) {
				jQuery(this).next().slideUp();
			} else {
				jQuery(this).next().slideDown();
			}
			//jQuery(this).next().slideToggle('slow',function(){
				
				//});
		});
	}
	if(current_width > 767) {
		// $('#buttons .scroll-pane').jScrollPane();
		jQuery('#buttons a').each(function(){
            // and test its normalized href against the url pathname regexp
                jQuery(this).removeClass('dropdown');
				
        });
	}
});

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 500);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


// usage:
jQuery(window).smartresize(function(){
  // code that takes it easy...
  //update stuff
  var current_width = jQuery(window).width();
    if(current_width < 768) {
		jQuery('.overlayimage').remove();
		jQuery('#buttons a.removelink').each(function(){
            // and test its normalized href against the url pathname regexp
                jQuery(this).removeAttr('href');
        });
		jQuery('#buttons a').each(function(){
            // and test its normalized href against the url pathname regexp
                jQuery(this).addClass('dropdown');
        });
		jQuery('#buttons .dropdown').unbind('click').click(function(){
			if(jQuery(this).next().is(':visible')) {
				jQuery(this).next().slideUp();
			} else {
				jQuery(this).next().slideDown();
			}
		});
	}
	if(current_width > 767) {
		// $('#buttons .scroll-pane').jScrollPane();
		jQuery('#buttons a').each(function(){
            // and test its normalized href against the url pathname regexp
                jQuery(this).removeClass('dropdown');
				
        });
	}   
});
