var Scrolltop = {
	options: {
		initClass: '.page-scrollTop',
		activeClass: 'page-scrollTop--active',
		scrollSpeed: 500
	},
	init: function() {
		var _this = this;
		
		if ($(_this.options.initClass).length) {
		
			_this.checkScroll(_this);
			_this.scrollClick(_this);
			
		}
	},
	checkScroll: function(_this) {
		
		$(window).scroll(function() {
			
			var curentPosition = $(this).scrollTop();
				
			if (curentPosition > 100) {
			
			    if (!$(_this.options.initClass).hasClass(_this.options.activeClass)) {
					$(_this.options.initClass).addClass(_this.options.activeClass);
				}
				
			} else {
			
				$(_this.options.initClass).removeClass(_this.options.activeClass);
				
			}

		});
		
	},
	scrollClick: function(_this) {
		
		$(_this.options.initClass).click(function(e) {
			   
		    e.preventDefault();
		    
			$('body, html').animate({
				scrollTop: 0
			}, _this.options.scrollSpeed);	
			
		});
			
	}
}

Scrolltop.init();	