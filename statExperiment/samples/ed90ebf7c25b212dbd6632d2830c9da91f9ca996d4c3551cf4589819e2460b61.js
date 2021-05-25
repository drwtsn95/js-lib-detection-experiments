$(document).ready(function(){
		var my_karusel_8 = 0;
		setTimeout(function(){
			jQuery('.caruselfoto').each(function (index1, element1){
				jQuery(this).addClass('carusel'+index1);
				jQuery('.opacity_str span',this).append('<input type="hidden" value="'+index1+'">');
				if(jQuery('.hide .li', this).length > 1){
					var my_karusel_1 = 0;
					var my_karusel_2 = 0;
					var my_karusel_3 = jQuery(this).width();
					jQuery('.hide .li', this).each(function (index, element) {
						if(my_karusel_3 > my_karusel_1 + jQuery(this).width()) {
							my_karusel_1 = my_karusel_1 + jQuery(this).width();
							my_karusel_2 = index + 1;
						}
					});
					if(jQuery('.hide .li', this).length == my_karusel_2){jQuery('.opacity_str', this).css('display', 'none');}
					else{
						jQuery('.opacity_str.strl_r', this).css('display', 'block');
						if($(this).is('.caruselfotoauto')){
							$(this).append('<input type="hidden" class="carusel_float" value="right">');
							setInterval(function(){
								var my_karusel_4 = '.caruselfoto'+index1;
								
								var my_karusel_5 = '.caruselfoto'+my_karusel_4+' .opacity_str';
								var my_karusel_6 = jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').width() - jQuery('.caruselfoto'+my_karusel_4).width();
								var my_karusel_7 = jQuery('.caruselfoto'+my_karusel_4+' .caruselfoto_width').val();
								if(!$('.caruselfoto'+index1).is('.active')) {
									jQuery('.caruselfoto'+index1).addClass('active');
									my_karusel_8 = 1;
									var my_karusel_9 = jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').css('left');
									my_karusel_9 = my_karusel_9.substr(0, my_karusel_9.length - 2);
									if ($(my_karusel_4+' input.caruselfoto_float').val() == 'right'){
										if (my_karusel_6 > my_karusel_9){
											my_karusel_9 = my_karusel_9 - my_karusel_7;
											if (-my_karusel_6 > my_karusel_9 || -my_karusel_6 == my_karusel_9) {
												jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').animate({left:-my_karusel_6 + 'px'});
												jQuery(my_karusel_5+'.strl_r').css('display', 'none');
												jQuery(my_karusel_5 +'.strl_l').css('display', 'block');
												$(my_karusel_4+' input.caruselfoto_float').val('left');
											}
											else{
												jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').animate({left:my_karusel_9 + 'px'});
												jQuery(my_karusel_5 + '.strl_l').css('display', 'block');
												//$(my_karusel_4+' input.caruselfoto_float').val('left');
											}
											index = $(my_karusel_4).find('#knopki2 li.act').index();
											$(my_karusel_4).find('#knopki2 li.act').removeClass('act');
											$(my_karusel_4).find('#knopki2 li').eq(index+1).addClass('act');
										}
									}
									else if ($(my_karusel_4+' input.caruselfoto_float').val() == 'left'){
										my_karusel_9 = my_karusel_9 * -1 - my_karusel_7;
										if (my_karusel_9 < 0 || my_karusel_9 == 0) {
											jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').animate({left:0 + 'px'});
											jQuery(my_karusel_5+'.strl_l').css('display', 'none');
											jQuery(my_karusel_5 + '.strl_r').css('display', 'block');
											$(my_karusel_4+' input.caruselfoto_float').val('right');
										}
										else {
											jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').animate({left:'-' + my_karusel_9 + 'px'});
											jQuery(my_karusel_5 + '.strl_r').css('display', 'block');
										//	$(my_karusel_4+' input.caruselfoto_float').val('right');

										}
										index = $(my_karusel_4).find('#knopki2 li.act').index();
										$(my_karusel_4).find('#knopki2 li.act').removeClass('act');
										$(my_karusel_4).find('#knopki2 li').eq(index-1).addClass('act');
									}
									setTimeout(function () {
										jQuery('.caruselfoto'+index1).removeClass('active');
										my_karusel_8 = 0;
									}, 400);
								}
							}, 5000);
						}
					}
				}else{
					jQuery('.opacity_str', this).css('display', 'none');
				}
			});
		},400);
			jQuery('.caruselfoto .opacity_str span').click(function () {
				var my_karusel_4 = '.caruselfoto'+jQuery('input',this).val();
				var my_karusel_5 = '.caruselfoto'+my_karusel_4+' .opacity_str';
				var my_karusel_6 = jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').width() - jQuery('.caruselfoto'+my_karusel_4).width();
				var my_karusel_7 = jQuery('.caruselfoto'+my_karusel_4+' .caruselfoto_width').val();
				if(my_karusel_8 == 0) {
					my_karusel_8 = 1;
					var my_karusel_9 = jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').css('left');
					my_karusel_9 = my_karusel_9.substr(0, my_karusel_9.length - 2);
					if (jQuery(this).parent().is('.strl_r')){
						if (my_karusel_6 > my_karusel_9){
							my_karusel_9 = my_karusel_9 - my_karusel_7;
							if (-my_karusel_6 > my_karusel_9 || -my_karusel_6 == my_karusel_9) {
								jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').animate({left:-my_karusel_6 + 'px'});
								jQuery(this).parent().css('display', 'none');
								jQuery(my_karusel_5 + '.strl_l').css('display', 'block');
								$(my_karusel_4+' input.caruselfoto_float').val('left');
							}
							else{
								jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').animate({left:my_karusel_9 + 'px'});
								jQuery(my_karusel_5 + '.strl_l').css('display', 'block');
							}
							index = $(this).parents('.caruselfoto').find('#knopki2 li.act').index();
							$(this).parents('.caruselfoto').find('#knopki2 li.act').removeClass('act');
							$(this).parents('.caruselfoto').find('#knopki2 li').eq(index+1).addClass('act');
						}
					}
					if (jQuery(this).parent().is('.strl_l')){
						my_karusel_9 = my_karusel_9 * -1 - my_karusel_7;
						if (my_karusel_9 < 0 || my_karusel_9 == 0) {
							jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').animate({left:0 + 'px'});
							jQuery(this).parent().css('display', 'none');
							jQuery(my_karusel_5 + '.strl_r').css('display', 'block');
							$(my_karusel_4+' input.caruselfoto_float').val('right');
						}
						else {
							jQuery('.caruselfoto'+my_karusel_4+' .hide .ul').animate({left:'-' + my_karusel_9 + 'px'});
							jQuery(my_karusel_5 + '.strl_r').css('display', 'block');
						}
						
						index = $(this).parents('.caruselfoto').find('#knopki2 li.act').index();
						$(this).parents('.caruselfoto').find('#knopki2 li.act').removeClass('act');
						$(this).parents('.caruselfoto').find('#knopki2 li').eq(index-1).addClass('act');
					}
					setTimeout(function () {
						my_karusel_8 = 0;
					}, 400);
				}
			});
		$('#knopki2 li').click(function(){
		//	if(!$('#knopki2 li').is('.act')){
			if(!$(this).parents('.caruselfoto').is('.active')){
				$(this).parents('.caruselfoto').addClass('active');
				var my_karusel_8 = 1;
				var knopki_width = 0;
				var knopki_width_4 = $('#knopki2 li.act').index();
				$('#knopki2 li.act').removeClass('act');
				$(this).addClass('act');
				var knopki_width_5 = $(this).parents('.caruselfoto');
				var knopki_width_2 = $(this).parents('.caruselfoto').find('.ul')
				var knopki_width_1 = knopki_width_2.css('left');
				knopki_width_1 = knopki_width_1.substr(0, knopki_width_1.length - 2);
				
				var knopki_width_3 = ($(this).index()-knopki_width_4)* 1123;
				
				if(knopki_width_4 > $(this).index()){
					knopki_width = knopki_width_1 - knopki_width_3;
					if($(this).index() == 0){knopki_width_5.find('.opacity_str.strl_l').css('display', 'none');}
					knopki_width_5.find('.opacity_str.strl_r').css('display', 'block');
				}else{
					knopki_width = (knopki_width_3 - knopki_width_1)*-1;
					if($(this).index()+1 == $('#knopki2 li').size()){knopki_width_5.find('.opacity_str.strl_r').css('display', 'none');}
					knopki_width_5.find('.opacity_str.strl_l').css('display', 'block');
				}
				
				knopki_width_2.animate({left:knopki_width+'px'});
				setTimeout(function () {
					knopki_width_5.removeClass('active');
					var my_karusel_8 = 0;
				}, 600);
			}
		//	}
			return false;
		});
			
			
	});	
