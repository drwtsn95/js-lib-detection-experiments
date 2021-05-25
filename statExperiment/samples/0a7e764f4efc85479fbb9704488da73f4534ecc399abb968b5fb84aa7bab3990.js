// various functions for basket, shop informers, etc

function str_repeat(i, m) {
	for (var o = []; m > 0; o[--m] = i);
	return o.join('');
}

function sprintf() {
	var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
	while (f) {
		if (m = /^[^\x25]+/.exec(f)) {
			o.push(m[0]);
		}
		else if (m = /^\x25{2}/.exec(f)) {
			o.push('%');
		}
		else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+)?)?([b-fosuxX])/.exec(f)) {
			if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
				throw('Too few arguments.');
			}
			if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
				throw('Expecting number but found ' + typeof(a));
			}
			switch (m[7]) {
				case 'b': a = a.toString(2); break;
				case 'c': a = String.fromCharCode(a); break;
				case 'd': a = parseInt(a); break;
				case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
				case 'f': a = parseFloat(a).toFixed(m[6] ? m[6] : 0); break;
				case 'o': a = a.toString(8); break;
				case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
				case 'u': a = Math.abs(a); break;
				case 'x': a = a.toString(16); break;
				case 'X': a = a.toString(16).toUpperCase(); break;
			}
			a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a);
			c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
			x = m[5] - String(a).length - s.length;
			p = m[5] ? str_repeat(c, x) : '';
			o.push(s + (m[4] ? a + p : p + a));
		}
		else {
			throw('Huh ?!');
		}
		f = f.substring(m[0].length);
	}
	return o.join('');
}

function price_to_format(price, separator, decpoint){
	rr = /(\d*)\.?(\d*)/.exec(price);
	if(typeof(rr[1]) != 'undefined'){
		b = rr[1].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1"+separator);
	}
	return (rr[2] ? b + decpoint + rr[2] : b);
}

function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
}

function formatPrice(price, currObj){
	var data = price*currObj.rate;
	var znak = '';
	if(data<0){
		data*=-1;
		znak = '-';
	}

	data = price_to_format(sprintf(uCoz.shop_price_f[0], data), uCoz.shop_price_separator, (uCoz.shop_price_f[1] != '' ? uCoz.shop_price_f[1] : '.'));

	return currObj.dpos ? znak+""+currObj.disp+""+data : znak+""+data+""+currObj.disp;
}

function optChangePrice(obj, event){
	var obj_id = $(obj).attr('id').split('-');
	var id = obj_id[1];

  if( uCoz==undefined || uCoz.sh_goods[id] == undefined ){ return; }

	var pref = obj_id[0];
	if(obj.nodeName=='INPUT'){
		pref = pref.replace(/^q/, '');
	}

	var pos = undefined;
	var over = 0;
	var old_sum = 0;
	$.each($("[id^="+pref+"-"+id+"-oval-]"), function(){
		var o_val = '0';

		if(this.tagName == 'INPUT' && this.checked){
			var opt_over = $(this).attr('class').match(/(-?\d+(?:\.\d+)?)/);
			if( opt_over && opt_over[1] ){
				over += parseFloat(opt_over[1]);
			}
			o_val = ( $(this).attr('data-o-val') || '0' );
		}

		if(this.tagName == 'SELECT'){
			var opt_over = $(this).children(":selected").attr('class').match(/(-?\d+(?:\.\d+)?)/);
			if( opt_over && opt_over[1] ){
				over += parseFloat(opt_over[1]);
			}
			o_val = ( $(this).children(":selected").attr('data-o-val') || '0' );
		}

		if( o_val.search('%') != -1 ){
			o_val = uCoz.sh_goods[id].old_price * parseFloat(o_val) / 100;
		}

		old_sum += parseFloat(o_val);
		var match = $(this).attr('class').match(/pos(\d+)/);
		if(match && (parseInt(match[1])<pos || pos == undefined)) pos = parseInt(match[1]);
	});

	if($(obj).hasClass("pos"+pos) && uCoz.sh_goods[id].imgs != undefined && uCoz.sh_goods[id].imgs.length>1 && uCoz.sh_goods[id].imgs[obj.options.selectedIndex] != undefined){
		// var selector = pref != 'id' ? 'ipreview' : pref+'-gphoto-'+id;
		var selector = pref+'-gphoto-'+id;
		if(pref == 'id' && $('img#ipreview').length) selector='ipreview';
		$('img#'+selector).attr('src', uCoz.sh_goods[id].imgs[obj.options.selectedIndex]).attr('idx', obj.options.selectedIndex);
	}

	var cnt = $('#q'+pref+'-'+id+'-basket').val();
	if(cnt=='' || cnt==undefined) cnt=1;
	var curr = getCookie(uCoz.mf+'uShopCu') ? getCookie(uCoz.mf+'uShopCu') : uCoz.sh_curr_def;
	var price = formatPrice((over + parseFloat(uCoz.sh_goods[id].price)) * cnt, uCoz.sh_curr[curr]);
	$("."+pref+"-good-"+id+"-price").html(price);

	if(uCoz.sh_goods[id].old_price != '0.00'){
		$("."+pref+"-good-"+id+"-oldprice").html(formatPrice((old_sum + parseFloat(uCoz.sh_goods[id].old_price)) * cnt, uCoz.sh_curr[curr]));
	}
}

function checkNumber(obj, event, changePrice) {
	var err_msg = '';
	var obj_id = $(obj).attr('id').split('-');
	var pref = obj_id[0].replace(/^q/, '');
	var id = obj_id[1];

	$('#'+pref+'-'+id+'-options-selectors').find('input:checked, select').each(function(){
		if($(this).val() === ''){
			err_msg += '<li>'+$(this).parent().parent().find('span.opt').html().replace(':', '')+'</li>';
		}
	});

	if(err_msg !== ''){
		err_msg = checkNumber_err.replace('%err_msg%', err_msg);
		shop_alert('<div class="MyWinError">'+err_msg+'<div>', checkNumber_header, 'warning', 350, 100, {tm:8000, align:'left', icon:'/.s/img/icon/warning.png'});
	}else{
		if(/[^0-9\.\,\%\-]/.test(obj.value) == false){
			if(parseInt(changePrice)) setTimeout(function(){optChangePrice(obj)}, 100);
			return true;
		}
	}

	return false
}

function wishlist(obj) {
	if( lock_buttons ) return false;
	lock_buttons = 1;
	var tmp = obj.id.split('-');
	var pref = tmp[0];
	var id = tmp[1];
	$(obj).removeClass().addClass('wish').addClass('wait');
	_uPostForm('', {
		type:"POST",
		url:"/shop/wishlisth",
		data:{
			"goods_id":id,
			"pref":pref
		}
	});
	return false;
}

function clearWishlist(){
	if( lock_buttons ) return false;

	lock_buttons = 1;
	$.ajax({
		url: "/shop/wishlisth",
		type: "POST",
		async: true,
		data: {
			"clear": 1,
		}
	}).always(function( data ) {
		document.location.href='/shop';
	});

	return false;
}

function shopChangeGoodsOpt(url, pref, goods_id, obj) {
	var wrapObj;
	if(pref == 'id'){
		wrapObj = $('#id-'+goods_id+'-options-selectors').parents('div.list-item').length ?
			$('#id-'+goods_id+'-options-selectors').parents('div.list-item') :
			$('#id-'+goods_id+'-options-selectors').parents('table:eq(1)');
	}else if((pref == 'last_view') || (pref == 'top_view') || (pref == 'last_add')){
		wrapObj = $('#'+pref+'-'+goods_id+'-options-selectors').parents('table:first');
	}else if(pref.search('inf') == 0){
		wrapObj = $('#'+pref+'-'+goods_id+'-options-selectors').parents('div.goods-list');
	}else {
		try{
			wrapObj = uCoz.shop_goods_wrappers(pref, goods_id);
		}catch(e){
		}
	}

	_shopFadeControl(pref+'-'+goods_id+'-options-selectors', 1, wrapObj);
	var opt = new Array();
	var opt_id = $(obj).attr('id').split('-')[3];
	$('#'+pref+'-'+goods_id+'-options-selectors').find('input:checked, select').each(function(){
		if(this.value !== ''){
			opt.push(this.id.split('-')[3]+(parseInt(this.value) ? '-'+this.value :''));
		}
	});

	_uPostForm('', {
		url:url,
		data:{
			mode:'opt-sel',
			pref:pref,
			opt:opt.join(':'),
			opt_id:opt_id,
			cnt:( $('#q'+pref+'-'+goods_id+'-basket').val() || 1 )
		},
		type:'POST'}
	);
}

function _shopFadeControl(id, pos, obj){
	var el = (typeof(obj) == 'object') ? obj : $('#'+id);
	var top = 0;
	var left = 0;
	if(pos && el.length){
		top = el.position().top;
		left = el.position().left;
	}
	if(el.length){
		var g=document.createElement("div");
		var height = $(el).height();
		var scrollHeight = $(el)[0].scrollHeight;
		if(height < scrollHeight){
			height = scrollHeight;
		}
		$(g).addClass('myWinGrid').addClass('shop-fade').attr("id",id+'-fade').css({"left":left,"top":top,"position":"absolute","border":"#CCCCCC 1px solid","width":$(el).width()+'px',"height":height+'px',"z-index":11}).hide().on('mousedown', function(e){e.stopPropagation();e.preventDefault();_uWnd.globalmousedown();}).html('<div class="myWinLoad" style="margin:5px;"></div>');
		$(el).append(g);
		$(g).show();
	}
}

function ga_event(event_name) {
  var events = {
    'basket_add':'/shop/basket/add_ushop_',
    'basket_buynow':'/shop/basket/quick_ushop_',
    'basket_clear':'/shop/basket/clear_ushop_',
    'checkout_done':'/shop/checkout/done_ushop_',
    'checkout':'/shop/checkout_ushop_',
    'shop_autoreg':'/shop/user/autoreg_ushop_'
  };
  if(window._gaq !== undefined){
		_gaq.push(['_trackPageview', events[event_name]]);
  }
}