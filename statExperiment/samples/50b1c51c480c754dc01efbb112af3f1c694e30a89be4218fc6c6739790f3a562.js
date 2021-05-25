(function ($) {
  "use strict";

  $(function () {
		
		$.fancybox({
      maxWidth: 500,
			width: 400,
			closeBtn: false,
      paddign: "30",
			autoSize : false,
			autoHeight: true,
      content: $('.x-cityCheck').html(),
        'afterClose' : function() {
            window._mediator.start();
        }
    });
		
		
	})
})(jQuery);