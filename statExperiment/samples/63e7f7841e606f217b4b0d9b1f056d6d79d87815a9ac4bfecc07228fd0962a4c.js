(function($) { // Fix for usercoded getAQuoteResponsive2
	// Which prevents inputmask from bein loaded
	if (typeof $.inputmask !== 'undefined') {
		var phone = $('.mod-form2-get-a-quote #phone');
		var isTouchDevice = 'ontouchstart' in window || navigator.MaxTouchPoints || navigator.msMaxTouchPoints;
		var isSelectionRangeSupported = !!('setSelectionRange' in $('<input type="text">')[0]);

		if (isTouchDevice) {
			phone.attr('type', 'tel');
		}

		phone.on('focus', function() {
			phone.triggerHandler('input');

			if (!phone.val() && isSelectionRangeSupported) {
				phone[0].setSelectionRange(0, 0);
			}

			if (!phone.val() && phone.data('lastValue')) {
				phone.val(phone.data('lastValue'));
			}
		}).on('blur', function() {
			phone.data('lastValue', phone.val());
		});

		phone.inputmask({
			mask: '(999) 999-9999',
			placeholder: 'x',
			onBeforeWrite: function(event, buffer, caretPos, opts) {
				if (isTouchDevice && event.type === 'keypress' && event.originalEvent && isSelectionRangeSupported) {
					setTimeout(function() {
						phone[0].setSelectionRange(caretPos, caretPos);
					}, 0);
				}
			}
		});
	}

	/* eslint-disable no-undef*/
	$('.directions').on('click', function() {
		if (typeof createEventJs !== 'undefined') {
			createEventJs('Directions', 'Click', {
				DealerObject: gaObjects.DealerObject,
				ToAddress: gaObjects.ToAddress
			});
		}

		if (typeof _dfaq !== 'undefined') {
			_dfaq.push(['trackEvent', 'Directions', 'Click', {
				DealerObject: daObjects.DealerObject,
				ToAddress: daObjects.ToAddress
			} ]);
		}

		if (typeof sd !== 'undefined' && dfSiteConfig.VwAnalyticsEnabled) {
			sd('send', 'event', 'event90', 'Click', 'Get Directions', '', true);
		}
	});
	/* eslint-enable no-undef*/

	$(function() {
		function showForm() {
			$('.hidden-fields').removeClass('hidden');
		}

		$('.submit-button').on('click', showForm);
		$('.cemail input').on('focus', showForm);
	});
})(jQuery);
