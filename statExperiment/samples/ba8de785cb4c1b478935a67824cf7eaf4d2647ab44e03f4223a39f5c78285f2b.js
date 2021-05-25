function roundNumberWith2Dex(num) {
	return Math.round(num * 100) / 100;
}

jQuery.fn.extend({
	scrollToMe: function () {
		var x = jQuery(this).offset().top - $("header").height();
		jQuery('html,body').animate({scrollTop: x}, 400);
	}
});

$(function () {
	var errors_section = $("#errors");
	if (errors_section.length) {
		errors_section.focus();
		errors_section.scrollToMe();
	}
});

$(function () {
	function updateDisplayedGifts() {
		var monthly = $(".donate-segment input:checked").val();
		$(".donate ul li").hide();
		$(".donate ul li[data-monthly='"+monthly+"']").show();
	}
	$(".donate-segment input").change(function(){
		updateDisplayedGifts();
	});
	updateDisplayedGifts();
});

$(function () {
	
	function updateDisplayedGifts() {
		var monthly = $("input[name='donation-monthly']:checked").val();

		$(".donate-page .donate-gifts ul li").hide();
		$(".donate-page .donate-gifts ul li[data-monthly='"+monthly+"']").show();
	}
	

	function updateSummary() {
		
		
		var monthly_text = "";
		var paymentsCount = 1;
		
		if ($("input[name='donation-monthly']:checked").val() == '1')
		{
			paymentsCount = $("#donationPayments").val();
			monthly_text = paymentsCount + " ";
			
			$("#summary-payment-total").show();
			$(".each-payment").show();
		}
		else
		{
			$("#summary-payment-total").hide();
			$(".each-payment").hide();
		}
		
		var donationPaymentType = $("input[name='donation-monthly']:checked ~ span").text();
		$("#summary-payment-type").text(monthly_text + donationPaymentType);
		
		var donationAmount = parseFloat($("#donationAmount").val());
		var donation_commission_fee = (donations_payment_commission * donationAmount);
		$("#summary-amount").text(donationAmount);
		$("#commission_fee").text(roundNumberWith2Dex(donation_commission_fee));
		
		var total_to_pay = donationAmount;
		if ($("#add_commission_fee").is(":checked")) {
			total_to_pay += donation_commission_fee;
		}
		$("#total_to_pay").text(roundNumberWith2Dex(total_to_pay));
		
		
		$("#summary-payment-total-price").text((donationAmount * paymentsCount));
		

		var $selectedGift = $(".gift-radio:checked");
		var selectedGiftId = $selectedGift.data("id");
		var $gift = $(".gift[data-id='"+selectedGiftId+"']");
		
		if ($gift.hasClass("disabled") || $gift.find(".info strong").text().length == 0)
		{
			$("#gift-in-return").hide();
		}
		else
		{
			$("#gift-in-return").show();
			var selectedGiftName = $gift.find(".info strong").text();
		}
		
		$("#summary-gift").text(selectedGiftName);
	}
	
	$("#donationPayments").on("change",function(){
		
		if (parseInt($(this).val()) > 1) {
			$("#donation-monthly-1").click();
			
		}
		else {
			$("#donation-monthly-0").click();
			
		}
		
		updateSummary();
	});
	
	$("#donationAmount").on("change",function(){
		
		var monthly = $("input[name='donation-monthly']:checked").val();
		var donationAmount = parseFloat($("#donationAmount").val());
		var $selectedGift = $(".gift-radio[data-monthly='"+monthly+"']:checked");
		
		if ($selectedGift.length > 0)
		{
			var selectedGiftAmount = parseFloat($selectedGift.data("amount"));
			
			if (donationAmount < selectedGiftAmount)
			{
				$(".gift-radio[data-monthly='"+monthly+"']").prop("checked", false);
				$(".gift").removeClass("selected");
			}
		}
		
		updateSummary();
	});

	$(".gift-radio").click(function(){
		
		$(".gift").removeClass("selected");
		$(this).parents(".gift").addClass("selected");
		
		
		var amount = $(this).data("amount");
		var monthly = $(this).data("monthly");
		var payments = (monthly == "1") ? $(this).data("payments") : 1;
		$("#donationAmount").val(amount);
		$("#donationPayments").val(payments);
		updateSummary();
		$("#go-step-2").trigger("click");
	});
	
	$("input[name='donation-monthly']").change(function(){
		
		updateDisplayedGifts();
		
		var monthly = $("input[name='donation-monthly']:checked").val();
		
		
		if (monthly == "1")
		{
			$("#select-payments").show();
			$(".per_payment").show();
		}
		else
		{
			$("#select-payments").hide();
			$(".per_payment").hide();
		}
		
		
		var $firstGift = $(".donate-gifts ul li[data-monthly='"+monthly+"']").first().find(".gift-radio");
		
		var _amount = 10;
		var _monthly = monthly == "1";
		var _payments = (_monthly) ? 2 : 1;
		
		if ($firstGift.length > 0)
		{
			_amount = $firstGift.data("amount");
			_monthly = $firstGift.data("monthly");
			_payments = $firstGift.data("payments");
		}
		
		$("#donationAmount").val(_amount);
		$("#donationPayments").val(_payments);
		
		updateSummary();
		
	});
	
	$("#add_commission_fee").change(function(){
		
		updateSummary();
	});
	
	updateSummary();
	updateDisplayedGifts();
	
});

$(function () {

	$(".donate-page .stepwizard a, .donate-page .steps-buttons a").click(function(e){
		e.preventDefault();

		var target = $(this).attr("href");

		if (target) {
			$(".donate-page .step").hide();
			$(target).show().focus();

			$(".donate-page .stepwizard a").removeClass("active");
			$(".donate-page .stepwizard a[href='"+target+"']").addClass("active");

			window.location.hash = target;

			$('html,body').animate({
				scrollTop: ($(target).offset().top - 198)
			}, 500);
		}
	});

	if (window.location.hash) {
		
		var hash = window.location.hash;
		if (hash == '#errors') {
			
			var target = '#step-2';

			$(".donate-page .step").hide();
			$(target).show().focus();

			$(".donate-page .stepwizard a").removeClass("active");
			$(".donate-page .stepwizard a[href='"+target+"']").addClass("active");
		}
		else {
			$(".donate-page .stepwizard a[href='"+hash+"']").trigger('click');
		}
	}

});


$("#contribution_appearance_nickname").on("keydown", function(){
	$("#contribution_appearance-3").prop("checked", true);
});


if (typeof MATCHING_MULTIPLY !== 'undefined') {
	
	$(".update-matching-total").on("keyup change", function(){
		
		var selector = $(this).data("matching-total");
		
		$(selector).html( ( parseFloat($(this).val()) * MATCHING_MULTIPLY ) );
	});
}



$(document).ready(function(){
	
	$(".update-matching-total").change();
});