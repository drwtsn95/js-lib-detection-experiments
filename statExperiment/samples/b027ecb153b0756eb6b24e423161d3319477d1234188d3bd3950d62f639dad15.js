function mini_update_qty_options() {
    $('.owq-option input[type="checkbox"]').each(function() {
        $qty = $(this).closest('tr').find('.owq-input');
        opt_qty = Number($qty.val()) || 0;
        
        if ($qty.data('max') && opt_qty > $qty.data('max')) {
            $qty.closest('tr').addClass('no-stock');
        } else {
            $qty.closest('tr').removeClass('no-stock');
        }
        
        if ($(this).data('id') && opt_qty > 0) {
            $(this).val($(this).data('id') + $(this).data('split') + opt_qty).data('price', $(this).data('fprice') * opt_qty).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
    });
    $('.owq-option select').each(function() {
        $qty = $(this).closest('div').find('.owq-input');
        opt_qty = Number($qty.val()) || 0;
        
        $(this).find('option').each(function(){
            if ($(this).data('id')) {
                if (opt_qty < 1) opt_qty = 1;
                $(this).val($(this).data('id') + '|' + opt_qty).data('price', $(this).data('fprice') * opt_qty);
            } else {
                $(this).val('').data('price', 0);
            }
        });
    });
    if ($('.owq-option input[type="checkbox"]').length > 0) {
        $('.owq-option input[type="checkbox"]').first().trigger('change');
    } else {
        $('.owq-option select').first().trigger('change');
    }
}

$(function() {
    $('.backtotop').click(function(){
       $('html, body').animate({scrollTop:0}, 'slow');
   });
});

$(document).ready(function(){
    $('.product-mini-cart .owq-option .owq-input').on('input',function(){
        mini_update_qty_options();
    });
    $('.product-mini-cart .owq-quantity-mini .owq-add').on('click', function() {
        $input = $(this).closest('tr').find('.__cart_size_quantity');
        qty = (Number($input.val()) || 0)+1;
        $input.val(qty).trigger('input');
    });
    $('.product-mini-cart .owq-quantity-mini .owq-sub').on('click', function() {
		$input = $(this).closest('tr').find('.__cart_size_quantity');
        qty = (Number($input.val()) || 0)-1;
        if (qty < 1) qty = '';
        $input.val(qty).trigger('input');
    });
    mini_update_qty_options();
    
    $('.product-mini-cart .owq-area-hw input[type="text"]').on('input', function(){
        $div = $(this).closest('div.form-group');
        $width = $div.find('.owq-input-width');
        $height = $div.find('.owq-input-height');
        $error = $div.find('.owq-error');
        $div.removeClass('has-error').find('.has-error').removeClass('has-error');
        $div.find('.text-danger').remove();
        $checkbox = $div.find('input[type="checkbox"]');
        width = Number($width.val()) || 0;
        height = Number($height.val()) || 0;        
        $checkbox.prop('checked', false);
        if (width && height) {
            if ($checkbox.data('min-width') && width < $checkbox.data('min-width')) {
                $width.closest('td').addClass('has-error');
                $error.html('<div class="text-danger">Минимум '+$checkbox.data('min-width')+' '+$checkbox.data('unit')+'</div>');
            } else if ($checkbox.data('max-width') && width > $checkbox.data('max-width')) {
                $width.closest('td').addClass('has-error');
                $error.html('<div class="text-danger">Максимум '+$checkbox.data('max-width')+' '+$checkbox.data('unit')+'</div>');
            } else if ($checkbox.data('min-height') && height < $checkbox.data('min-height')) {
                $height.closest('td').addClass('has-error');
                $error.html('<div class="text-danger">Минимум '+$checkbox.data('min-height')+' '+$checkbox.data('unit')+'</div>');
            } else if ($checkbox.data('max-height') && height > $checkbox.data('max-height')) {
                $height.closest('td').addClass('has-error');
                $error.html('<div class="text-danger">Максимум '+$checkbox.data('max-height')+' '+$checkbox.data('unit')+'</div>');
            } else {
                $checkbox.data('price', width * height * $checkbox.data('mul') * $checkbox.data('mul') * $checkbox.data('fprice'));
                $checkbox.val(width + 'x' + height);
                $checkbox.prop('checked', true);
            }
        }                
        $checkbox.trigger('change');
    });    
	
    $('.product-mini-cart .owq-area-hw .owq-input-width').trigger('input');
	
	$('.product-mini-cart .cart-add').on('click', function() {	
		
		var elementButton = $(this);
		var data = elementButton.closest('.product-mini-cart').serialize();
		var product = elementButton.closest('.__product');
		
		var totalQuantity = 0;
		
		product.find('.__cart_size_quantity').each(function() {
			totalQuantity += Number($(this).val());
		});
		
		totalQuantity = totalQuantity == 0 ? 1 : totalQuantity;
		
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: data,
			dataType: 'json',
			beforeSend: function() {
				elementButton.button('loading');
			},
			complete: function() {
				elementButton.button('reset');
			},
			success: function(json) {				
				
				$('.__cart_size_quantity').val(0);
				
				$('.alert, .text-danger').remove();
				$('.form-group').removeClass('has-error');

				if (json['error']) {
					if (json['error']['option']) {
						for (i in json['error']['option']) {
							var element = $('#input-option' + i.replace('_', '-'));

							if (element.parent().hasClass('input-group')) {
								element.parent().after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
							} else {
								element.after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
							}
						}
					}

					if (json['error']['recurring']) {
						$('select[name=\'recurring_id\']').after('<div class="text-danger">' + json['error']['recurring'] + '</div>');
					}

					// Highlight any found errors
					$('.text-danger').parent().addClass('has-error');
				}

				if (json['success']) {
					
				    try { rrApi.addToBasket(product.data('id')) } catch(e) {}	
				
					cart.update_body();
					
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span><br /><span id="cart-total-price"> ' + json['total_price'] + '</span>');
					
					elementButton.closest('.product-mini-cart').find('.message-cart').show();
					
				}
				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	});
	
});