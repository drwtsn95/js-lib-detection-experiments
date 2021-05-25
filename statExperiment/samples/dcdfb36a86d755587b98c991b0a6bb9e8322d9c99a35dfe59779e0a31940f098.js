jQuery(function() {
	jQuery(".1614973542261981681-lazy").Lazy({
	  	effect: "fadeIn",
	    effectTime: 300,
	    threshold: 0,
	    afterLoad: function(element) {
	    	element.addClass('visible');
	    	element.parent('a').parent('.portfolio_type').addClass('loaded');
	        jQuery("#1614973542261981681").masonry( 'reloadItems' );
			jQuery("#1614973542261981681").masonry( 'layout' );
	    }
	});
});

jQuery(window).load(function(){ 
jQuery("#1614973542261981681").masonry({
  itemSelector: ".element",
  columnWidth: ".element",
  gutter: 30,
  transitionDuration: 0
});
jQuery("#1614973542261981681").imagesLoaded( function(){
    jQuery("#1614973542261981681").children(".element").each(function(){
        jQuery(this).addClass("fadeIn");
        jQuery(this).find("img").addClass("visible");
    });
});

jQuery('#infinite_load_more_1614973542261981681').click(function(){
	jQuery(this).hide();
    jQuery('#infinite_loading_1614973542261981681').addClass('visible');
    
    var startItem = parseInt(jQuery(this).attr('data-start'));
    var loadItems = parseInt(jQuery(this).attr('data-items'));
    
    jQuery.ajax({
	    url:"https://themes.themegoods.com/grandtour/landing/wp-admin/admin-ajax.php",
	    type:'POST',
	    data:'action=grandphotography_script_grid_portfolio_pagination_load&start='+startItem+'&items='+loadItems+'&columns=3&type=grid&photoframe=1',
	    success:function(results) {
	    	if(results != '')
	    	{
				var html = jQuery(results);
				jQuery("#1614973542261981681").append(html).masonry( 'appended', html ).masonry();
				
				jQuery("#1614973542261981681").imagesLoaded( function(){
					jQuery("#1614973542261981681").masonry( 'reloadItems' );
					jQuery("#1614973542261981681").masonry( 'layout' );
				});
				
				jQuery('#infinite_load_more_1614973542261981681').attr('data-start', parseInt(startItem+loadItems));

	    		jQuery(document).setiLightbox();
	    		jQuery('#infinite_loading_1614973542261981681').removeClass('visible');
	    		
	    		var newStartItems = parseInt(startItem + loadItems);
	    		if(newStartItems >= 35)
	    		{
	    			jQuery('#infinite_load_more_1614973542261981681').remove();
	    		}
	    		else
	    		{
	    			jQuery('#infinite_load_more_1614973542261981681').attr('data-start', newStartItems);
	    			jQuery('#infinite_load_more_1614973542261981681').show();
	    		}
	    	}
	    }
	})
});

jQuery('#infinite_load_more_1614973542261981681').waypoint(function(direction) {
    jQuery(this).trigger('click');
} , { offset: '100%' });

});
