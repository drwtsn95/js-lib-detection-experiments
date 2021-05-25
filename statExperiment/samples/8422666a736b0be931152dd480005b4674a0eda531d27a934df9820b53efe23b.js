$(window).load(function(){
	//スクロール追従メニュー
	$(".sticky_area").sticky({ topSpacing: 0 });
});

(function($){
	$('#head_key_word_button').click(function() {
	// 変数初期化
	ret_val = true;

	// 検索条件としてのキーワードは未入力不可
	if($('#head_key_word').val().trim() == "") {
		// エラーメッセージ表示
		alert('キーワードを入力して下さい。');
		// ブランクが入っている可能性があるので念の為初期化する
		$('#head_key_word').val('');
		// Submit停止
		ret_val = false;
	}
	// 戻り値設定
	return ret_val;
	});

	//フォーム制御
	$('form').each(function(){
	var input = $(this).find('.search_area input[type=text]');
	var value = $(this).find('.search_area input[type=text]').val();
	input
	.focus(function(){
		if($(this).val() == value) {
		$(this).addClass('focus').val('');
		}
		if($(this).val() == '') {
		$(this).addClass('focus');
		}
	})
	.blur(function(){
		if($(this).val() == '') {
		$(this).removeClass('focus').val(value);
		}
	});
	$(this).find('.search_area input[type=button]').click(function(){
		if ( input.val() == value || input.val() == ('') ) {
		input.val('');
		return false;
		}
	});
	$(this).find('.search_area input[type=image]').click(function(){
		if ( input.val() == value || input.val() == ('')) {
		input.val('');
		return false;
		}
	});
	});

	//スムーズスクロール
	$('a[href^=#]').on('click',function() {
	var speed = 400;
	var href= $(this).attr("href");
	var target = $(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top;
	$('body,html').animate({scrollTop:position}, speed, 'swing');
	return false;
	});

	//スクロール追従メニュー6番目のliにクラスを付与
	$('.pulldown_box li:nth-child(6n)').each(function(){
	$(this).addClass('mr0');
	});

	var currentTab = $('.sticky_area').find('.active');
	$(".sticky_area > ul > li").hover(function() {
	$(this).children('.pulldown_box').stop(true, true).slideDown();
	$(this).not(currentTab).addClass('active');
	}, function() {
	$(this).children('.pulldown_box').stop(true, true).slideUp();
	$(this).not(currentTab).removeClass('active');
	});
	$(".sticky_area .pulldown_box").hover(function() {
	currentTab.children('a').addClass('border_bottom');
	}, function() {
	currentTab.children('a').removeClass('border_bottom');
	});
	$(".sticky_area > ul > li > a").hover(function() {
	if($(this).parent().hasClass("active") == false){
		currentTab.children('a').addClass('border_bottom');
	}
	}, function() {
	currentTab.children('a').removeClass('border_bottom');
	});

	//親要素の高さ取得
	$(".performance_area dd").each(function(){
	var parentHeight = $(this).parent().outerHeight();
	$(this).css('height', parentHeight + 'px');
	});

	//画像遅延読み込み
	var nophoto_small = "https://img.goo-net.com/goopit/assets/img/nophoto_small.gif";
	var nophoto_middle = "https://img.goo-net.com/goopit/assets/img/nophoto_middle.gif";
	var nophoto_big = "https://img.goo-net.com/goopit/assets/img/nophoto_big.gif";
	$(".aside img.lazy, .content_footer img.lazy").lazyload({
	effect: "fadeIn",
	placeholder: nophoto_middle
	});

	$(".main img.lazy").lazyload({
	effect: "fadeIn",
	placeholder: nophoto_big
	});
	$("img.lazy").lazyload({
		placeholder: nophoto_middle
	});
	$("#client_slider img.lazy").lazyload({
		event  : 'slide',
		container: $("#client_slider"),
		placeholder: nophoto_small
	});
	$("#staff_slider img.lazy").lazyload({
		event  : 'slide',
		container: $("#staff_slider"),
		placeholder: nophoto_small
	});
	$("#record_slider img.lazy").lazyload({
		event  : 'slide',
		container: $("#record_slider"),
		placeholder: nophoto_small
	});
	$("#coupon_slider img.lazy").lazyload({
		event  : 'slide',
		container: $("#coupon_slider"),
		placeholder: nophoto_small
	});
	$(".ranking_area img.lazy").lazyload({
		event  : 'slide',
		container: $(".ranking_area")
	});
	$(".image_box img.lazy").lazyload({
		placeholder: nophoto_middle
	});
	$(".performance_box img.lazy").lazyload({
		placeholder: nophoto_small
	});

	//ボックスをリンクに
	$(".box_link").on("click",function(){
		location.href = $(this).attr('data-url');
	});

	//親要素の高さ取得
	$(".single_list_box dt, .single_list_box em").each(function(){
		var parentHeight = $(this).closest("dl").outerHeight();
		$(this).css('height', parentHeight + 'px');
	});

	//PCモード
	var ua = window.navigator.userAgent.toLowerCase();
	var ver = window.navigator.appVersion.toLowerCase();
	$('#pcmode_off').click(function() {
	$.removeCookie("pit_mode");
	$.cookie('pit_mode', '', {path:'/', domain: window.location.host, expires: 1 });
	location.reload();
	return true;
	});
	$('#topic_path a.top').click(function() {
	$.removeCookie('area', {path:'/'});
	var redirect_url = $(this).attr('href');
	location.href = redirect_url;
	});
	$('.region_area #link_all a, .comNavi ul li a.top').click(function() {
	$.removeCookie('area', {path:'/'});
	var redirect_url = $(this).attr('data-href');
	location.href = redirect_url;
	});
	$('#topic_path a.clear').click(function() {
	$.removeCookie('area', {path:'/'});
	var redirect_url = $(this).attr('href');
	location.href = redirect_url;
	});
	$('#topic_path a.second').click(function() {
	$.removeCookie('area', {path:'/'});
	var redirect_url = $(this).attr('href');
	location.href = redirect_url;
	});
})(jQuery);

//別ページからのアンカーリンク設定
$(window).load(function (e) {
	var hash = location.hash;
	if($(hash).length){
	e.preventDefault();
	headerH = $(".sticky_area").height() + 13;
	var ua = window.navigator.userAgent.toLowerCase();
	var isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0);
	if (isIE) {
		setTimeout(function(){
		var position = $(hash).offset().top;
		$("html, body").scrollTop(Number(position)-headerH);
		},500);
	} else {
		var position = $(hash).offset().top;
		$("html, body").scrollTop(Number(position)-headerH);
	}
	}
});