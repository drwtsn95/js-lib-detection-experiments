var xq = 0;
var gid = 16336;
var tb_extra_data='custom_id=16336';
var gbook_isshow=1;
var id = (typeof getParameter=='undefined')?'':getParameter("id");
var sid = (typeof getParameter=='undefined')?'':getParameter("sid");
if(sid=='') sid = (typeof getParameter=='undefined')?'':getParameter("sourceid");
if(sid=='') sid = (typeof getParameter=='undefined')?'':getParameter("Sid");
var plat = (typeof getParameter=='undefined')?'1':getParameter("plat");

var zid=0;
var id_ct=0;
var appid=0;
var tb_check_sids_list={"1":{"zixun_pc":"48","zixun_wap":"43"},"61":{"zixun_pc":"48","zixun_wap":"43"},"98":{"zixun_pc":"46","zixun_wap":"43"},"330":{"zixun_pc":"48","zixun_wap":"49"},"360":{"zixun_pc":"48","zixun_wap":"49"},"782":{"zixun_pc":"46","zixun_wap":"43"},"1157":{"zixun_pc":"46","zixun_wap":"43"},"1244":{"zixun_pc":"46","zixun_wap":"43"},"1245":{"zixun_pc":"46","zixun_wap":"43"},"1260":{"zixun_pc":"46","zixun_wap":"43"},"1562":{"zixun_pc":"46","zixun_wap":"43"},"1652":{"zixun_pc":"46","zixun_wap":"43"},"1699":{"zixun_pc":"46","zixun_wap":"43"},"1738":{"zixun_pc":"46","zixun_wap":"43"},"1740":{"zixun_pc":"46","zixun_wap":"43"},"162219":{"zixun_pc":"46","zixun_wap":"43"},"162221":{"zixun_pc":"46","zixun_wap":"43"},"162223":{"zixun_pc":"46","zixun_wap":"43"},"162303":{"zixun_pc":"46","zixun_wap":"43"}};

var tb_config_id = (tb_check_sids_list[sid]?tb_check_sids_list[sid]['zixun_pc']:0)||46;
//爱奇艺
fromMedia = '';
if(sid&&(sid==162371||sid==1755)){
	var fromMedia = "aiqiyi";
	tb_extra_data = tb_extra_data+'&frommedia=aiqiyi';
}
var tb_custom_config = {
	id:tb_config_id,
    title:"",
	fromMedia:fromMedia,
};
if (typeof(user_id) != "undefined" && user_id>0) {
	tb_extra_data = tb_extra_data+'&user_id='+user_id;
}
 

var page_url = encodeURIComponent(escape(window.location.href));
var referer_url = encodeURIComponent(escape(document.referrer));

var show_tb=1;
var UseLog100API = 1;
var CacheType = 1;
function QdIncludeJS(file, callback,errCallBack,isAsync) {
	var src,charset;
	if(typeof(file) =='string'){
		src = file;
	}else{
		src = file.src;
		if(file.charset){
			charset = file.charset;
		}
	}
	isAsync = (isAsync == true) ? true : false;
    var js = document.createElement('script');
    var _doc = document.getElementsByTagName('head')[0];
    _doc.appendChild(js);

    js.setAttribute('type', 'text/javascript');
	charset && js.setAttribute('charset',charset);
	isAsync && js.setAttribute('async', isAsync);
    js.setAttribute('src', src);
    if (!window.ActiveXObject) { //if not IE
        js.onload = function () {
            callback && callback();
        }
		js.onerror = function(){
			errCallBack&&errCallBack();			
		}
		
    } else {
		js.timer = setTimeout(function(){
			errCallBack&&errCallBack();
		},15000);
		js.onreadystatechange = function(){
			if( js.readyState == 'loaded'){
				js.timer&&clearTimeout(js.timer);
				callback && callback();
			}
		}
    }
    return false;
}

if (referer_url) {
	QdIncludeJS("http://data78.tbkf.net/baidu_sem.php?ReferUrl="+referer_url, function () {
		if (typeof basekw != 'undefined'){
			tb_extra_data = tb_extra_data +'&basekw='+basekw;
		}	
	});
}
function showGbook(type){
	if(!gbook_isshow){
		var _style = document.createElement('style');
		_style.innerHTML = 'body .ggy_lyb,body .ggy_txt,body .hd_cont3{height:0px;display:none;overflow:hidden;}';
		document.getElementsByTagName('head')[0].appendChild(_style);
		return;
	}
	QdIncludeJS('http://msg78.tbkf.net/pc/gbook2018/QdMessage.php?type='+type+"&utf=0", function() {
		message.init({
			element : '.ggy_txt',	
			id_tbtel : false,	
			lyAjaxUrl : 'https://data78.tbkf.net/gbookadd.php',	
			lyFormUrl :  'https://data78.tbkf.net/gbookadd.php',	
			dhAjaxUrl : 'https://data78.tbkf.net/Telephone_new.php',	
			tokensrc : 'http://data78.tbkf.net/guid.php',	
			titlesrc : 'http://msg78.tbkf.net/pc/gbook2018/images/msgBoard.title.png',	
			styleHref : 'http://msg78.tbkf.net/pc/gbook2018/qdMessage.style.css',	
			legalHref:'/htmfw/flsm.htm',
			isShowGbook:gbook_isshow,
        	captchaAjaxUrl:'https://data78.tbkf.net/checkcode.php',
        	smsAjaxUrl:'https://data78.tbkf.net/captcha.php',
            xcxImgUrl:'//static78.tbkf.net/imgs/xcx/qrcode.jpg',
			msgConfig : {
					id : id,
					gid : gid,
	                xq : xq,
					uid : (typeof window.uuid!='undefined')?window.uuid:'',
					fromurl:page_url,
					referer:referer_url,
					initime:new Date().getTime()/1000,
					uck:(typeof window.log100Api!='undefined')?log100Api.serializeData(log100Api.log100Data,'&'):'',
					tkid:(typeof window._t_k_i_d_!='undefined')?window._t_k_i_d_:'',
					utf:0,
					platid:plat
			},
			phoneConfig : {
					id_ct : id_ct,
					id_cpinfo : zid,
					appid : appid,
					uid : (typeof window.uuid!='undefined')?window.uuid:'',
					idhhseat : 1,
					gid : 16336,
					uck:(typeof window.log100Api!='undefined')?log100Api.serializeData(log100Api.log100Data,'&'):'',
					tkid:(typeof window._t_k_i_d_!='undefined')?window._t_k_i_d_:''
			}
		});
	});
}
function alertShowGbook(type){
	QdIncludeJS('http://msg78.tbkf.net/pc/alert/alert.message.php?utf=0',function(){
		alertMessage.init({
			prefix : 'alert_',	
			element : '#VaneryB',	
			id_tbtel : false,	
			lyAjaxUrl : 'https://data78.tbkf.net/gbookadd.php',	
			lyFormUrl :  'https://data78.tbkf.net/gbookadd.php',	
			dhAjaxUrl : 'https://data78.tbkf.net/Telephone_new.php',	
			tokensrc : 'http://data78.tbkf.net/guid.php',
			titlesrc : 'http://msg78.tbkf.net/pc/alert/images/meg-img1.jpg',
			isShowGbook:gbook_isshow,	
			styleHref : 'http://msg78.tbkf.net/pc/alert/alert.message.css',	
        	captchaAjaxUrl:'https://data78.tbkf.net/checkcode.php',
        	smsAjaxUrl:'https://data78.tbkf.net/captcha.php',
			msgConfig : {
					id : id,
					gid : gid,
	                xq : xq,
					uid : (typeof window.uuid!='undefined')?window.uuid:'',
					fromurl:page_url,
					referer:referer_url,
					initime:new Date().getTime()/1000,
					uck:(typeof window.log100Api!='undefined')?log100Api.serializeData(log100Api.log100Data,'&'):'',
					tkid:(typeof window._t_k_i_d_!='undefined')?window._t_k_i_d_:'',
					utf:0,
					platid:plat
			},
			phoneConfig : {
					id_ct : id_ct,
					id_cpinfo : zid,
					appid : appid,
					uid : (typeof window.uuid!='undefined')?window.uuid:'',
					idhhseat : 1,
					gid : 16336,
					uck:(typeof window.log100Api!='undefined')?log100Api.serializeData(log100Api.log100Data,'&'):'',
					tkid:(typeof window._t_k_i_d_!='undefined')?window._t_k_i_d_:''
			}
		});
	});
}

function showTongBao(type){
	if (show_tb && zid && appid){
        var logData = window.log100Api && window.log100Api.log100Data;
		if (logData) {
            var uckAll = logData._u_c_k_+"|"+logData.ev_u_c_k_;
            var uckLoadid = logData.uckloadid;
			tb_extra_data = tb_extra_data + '&uckloadid='+uckLoadid + '&uckAll='+uckAll;
		}
		if (typeof window._t_k_i_d_!='undefined') {
			tb_extra_data = tb_extra_data + '&tkid='+window._t_k_i_d_;		
		}
		tb_extra_data = tb_extra_data + '&isweb=1&pinit=1614765120';
		var url_tongbao='https://qudao.tbkf.net/TongBao/static/TblistBoostrapAsync.js?type='+type+'&r=2021030317';
		QdIncludeJS({src:url_tongbao,charset:'utf-8'});
	}
}
function showMonthCount(type) {
	if(typeof window.uuid !='undefined'){
		var month_count_url = "http://data78.tbkf.net/adver_count_month.php?id="+id+"&gid="+gid+"&sid="+sid+"&uuid="+window.uuid+"&type=0&referer="+referer_url+"&rd="+Math.random();
		QdIncludeJS(month_count_url);
	}
}

function domReady(fn){	// ready 处理
	if(!fn){return}
	if( document.readyState === "complete" || ( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
		return setTimeout( fn, 1 );
	}
	function completed(){
		if(document.addEventListener){
			document.removeEventListener('DOMContentLoaded',completed,false);
			window.removeEventListener('load',completed,false);
		}else if(document.attachEvent){
			if(document.readyState=='complete'){
				document.detachEvent('onreadystatechange',completed);
				window.detachEvent('onload',completed);
			}
		}
		fn();
	}
	if(document.addEventListener){		//标准浏览器
		document.addEventListener('DOMContentLoaded',completed,false);
		window.addEventListener('load',completed,false);
	}else if(document.attachEvent){		//IE浏览器
		document.attachEvent('onreadystatechange',completed);
		window.attachEvent('onload',completed);
	}
}
function isIE8_(){	// 判断IE6、7、8
	var ua = window.navigator.userAgent;
    if (ua.indexOf("MSIE 6")!=-1||ua.indexOf("MSIE 7")!=-1||ua.indexOf("MSIE 8")!=-1){
    	return true;
    }
    return false;
}
function initLog100Api(){
	if(typeof log100Api != 'undefined'){
		log100Api.ready({
			'options':{				
				'QDPlatId': 0,
				'QDSiteType': 1,
				'gid': gid,
				'QDPageType':(typeof QDPageType!='undefined')?QDPageType:'',
			},
			'eventOptions':{
			},
			'log100Config':{
				'pageShow' : false,
				'scrollPosition':true
			},
			'callback': function(){
				showGbook(1);
				showTongBao(1);
				//showMonthCount(1);
			}
		});
	}else{
		showGbook(5);
		showTongBao(5);
	}
}

if ((typeof UseLog100API !='undefined') && UseLog100API) {
	QdIncludeJS("https://uck100.tbkf.net/uck/", function(){
		QdIncludeJS({src:"http://log200.tbkf.net/get.big.data.min.php?v=online&r=9b60535767ca7d99",charset:'gb2312'}, function(){
			if(isIE8_()){
				domReady(initLog100Api);
			}else{
				initLog100Api();
			}
		},function(){
			showGbook(2);
			showTongBao(2);
		});
	}, function(){
		showGbook(4);
		showTongBao(4);
	});
} else {
	showGbook(3);
	showTongBao(3);
}

QdIncludeJS('http://msg78.tbkf.net/pc/alert/alert.php', function(){
	domReady(function(){
		// alert gbook message
		var msgCallBtn = byClassName('showQuickMessage');
		if(false){	
			// 开通
			alertFn&&alertFn('showQuickMessage');
		}else{
			// 未开通
			var tbarBox = byClassName('ui-tbar-box');
			tbarBox.length && (tbarBox[0].style.background = 'url(http://www.78.cn/images/banner_bottom.png)');
			for(var i=0,len=msgCallBtn.length;i<len;i++){
				var element = msgCallBtn[i];
				if(element.tagName.toUpperCase()=='A'){
					element.href="#guestbook";
				}else{
					element.style.display = 'none';
				}
			}
		}
	});
});

var count_url="http://data78.tbkf.net/adver_count.php?id="+id+"&gid="+gid+"&sid="+sid+'&ReferUrl='+referer_url+"&PageUrl="+page_url+"&type=0&rd="+Math.random();
var sem_url='http://tj.tbkf.net/Count.php?PageUrl='+page_url+'&ReferUrl='+referer_url+"&rd="+Math.random();
var tongbao_url='http://qudao.tbkf.net/TongBao/tongji.js?rd=2021030317';
var common_url='http://www.78.cn/qdfooter.php?ref='+page_url+"&rd="+Math.random();

var tjHTMlStr = '<div style="display:none">';
tjHTMlStr+=unescape("%3Cscript src='" + count_url + "' %3E%3C/script%3E");
tjHTMlStr+=unescape("%3Cscript src='" + sem_url + "' %3E%3C/script%3E");
tjHTMlStr+=unescape("%3Cscript src='" + tongbao_url + "' %3E%3C/script%3E");
tjHTMlStr+=unescape("%3Cscript src='" + common_url + "' %3E%3C/script%3E");
tjHTMlStr+='</div>';
document.write(tjHTMlStr);


//if (window.frames.length != parent.frames.length) {
	//var month_count_url = "http://data23.tbkf.net/xx.php?id="+id+"&gid="+gid+"&sid="+sid+"&uuid="+window.uuid+"&type=0&referer="+referer_url+"&rd="+Math.random();
	//QdIncludeJS(month_count_url);
	//alert("memory stack over flow!");
	//var month_count_url = "http://data78.tbkf.net/xx2.php?id="+id+"&gid="+gid+"&sid="+sid+"&uuid="+window.uuid+"&type=0&referer="+referer_url+"&rd="+Math.random();
	//QdIncludeJS(month_count_url);　
	//window.top.location.href="http://app.k18.com/download/index.html?appid=6&iframe=1";
//}
//爱奇艺代码
if(sid&&(sid==162371||sid==1755)){
	QdIncludeJS("//static.iqiyi.com/js/common/tpct.min.js")
}
