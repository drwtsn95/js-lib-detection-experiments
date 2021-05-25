function isApp(){
	if(typeof Framework7 !=='undefined'){
		return true;
	}
	return false;
}
function getPageContainer(){
	if(isApp()){
		return myApp.getCurrentView().activePage.container;
	}
	return document;
}
$(document).on("click", ".ajaxL", function(e) {
  if (typeof e !== 'undefined') e.preventDefault();
  var href;
  if ($(this).is("a")) {
    href = $(this).attr("href");
    openURL(href);
  }
});

function getURLParms(url) {
  url=url.split("#")[0];
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function(s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = url.split('?')[1];

  urlParams = {};
	if(typeof query ==='undefined'){return urlParams;}
  while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);

	urlParams.URLpathname= (new URL(url)).pathname.split("/");
	urlParams.URLpathname= urlParams.URLpathname[urlParams.URLpathname.length-1]
  return urlParams;
}
var preBasket1 = {};
function loadPreBasket(){
  $("#tagsK span.tm-tag-custom").remove();
  $("#PNC").val(""); $("#PartNo").val(""); $("#EnteredTags").val("");
  var prms = getURLParms(window.location.href);
  if ((typeof localStorage.preBasket1 !== 'undefined')&&(typeof prms.URLpathname !=='undefined')&& (prms.URLpathname=='partsel.php')) {
    preBasket1 = JSON.parse(localStorage.preBasket1);
    if (typeof preBasket1[cntxParm.brand] !== 'undefined') {
      if (typeof preBasket1[cntxParm.brand]['PNC'] !== 'undefined') {
        for (var k in preBasket1[cntxParm.brand]['PNC']) {
          addSpTag("PNC", preBasket1[cntxParm.brand]['PNC'][k]['pn'],preBasket1[cntxParm.brand]['PNC'][k]['nm']);
        }
      }
      if (typeof preBasket1[cntxParm.brand]['PartNo'] !== 'undefined') {
        for (var k in preBasket1[cntxParm.brand]['PartNo']) {
          addSpTag("PartNo",  preBasket1[cntxParm.brand]['PartNo'][k]['pn'],preBasket1[cntxParm.brand]['PartNo'][k]['nm']);
        }
      }
    }
  }
	if (($("#tagsKIN").prevAll("span.tm-tag-pn-pnc").length ==0)&&($("#formSubject input[name='EnteredTags']").val() == '') && ($("#formSubject input[name='PNC']").val() == '') && ($("#formSubject input[name='PartNo']").val() == '')) {
		return ;
  }
  var curLang = getCurLang();
  var delTxt = (curLang=='ar')?"حذف الاختيارات":"Delete Choices";
  if($("#emptyBasketCont").length==0){
    $("<span id='emptyBasketCont' class='clearpbasket1Cont small " + ((curLang == 'ar') ? "rtl" : "") + "'><a onclick='emptyPreBasket();'><i class='fa fa-close'></i>" + delTxt+"</a></span>").insertBefore($("#tagsKIN").parent().parent().parent().find(".input-group"))
  }
	$("#partselsubmit").submit();
}
function emptyPreBasket() {
  $("#tagsK span.tm-tag-custom").remove();
  $("#emptyBasketCont").remove();
  $("#PNC").val(""); $("#PartNo").val(""); $("#EnteredTags").val("");
  var prms = getURLParms(window.location.href);
  if ((typeof localStorage.preBasket1 !== 'undefined') && (typeof prms.URLpathname !== 'undefined') && (prms.URLpathname == 'partsel.php')) {
    delete localStorage.preBasket1;
  }
}
$(document).ready(function() {
  var prms = getURLParms(window.location.href);
	redirectIfUCountryNotSet(prms);
  if (typeof prms.URLpathname !=='undefined'){
    if((prms.URLpathname=='partsel.php')&& (typeof prms['act'] !=='undefined')&& (prms['act'] == 'm')) {
        window.history.replaceState({
          href: window.location.href
        }, '', window.location.href);
        cntxParm = prms;
        delete cntxParm.URLpathname;
        renderAndShowPage("mainSelPage");
        loadPreBasket();
    } else{
      openURL(window.location.href, 2);
    }
  }else{
		prms.URLpathname=window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		setInvLangLINK(prms);
	}
});

window.addEventListener('popstate', function(e) {
  if (e.state)
    openURL(e.state.href, 1);
});

var activeRequests = 0;
$(document).ajaxSend( function( event, jqxhr, settings ) {
  if((typeof Pace !=='undefined')&&(!settings.url.endsWith("getTags.php"))) {
  if (activeRequests == 0)
    Pace.restart(); // stop
  activeRequests++;
  }
});
$(document).ajaxComplete( function( event, jqxhr, settings ) {
  if((typeof Pace !=='undefined')&&(!settings.url.endsWith("getTags.php"))) {
  activeRequests--;

  if (activeRequests == 0)
    Pace.stop(); // show progress indicator
  }
});
function redirectIfUCountryNotSet(prm){
  if(typeof localStorage.uCountry ==='undefined'){
		if((typeof prm.lang !=='undefined')&&(prm.lang=='en')){
			localStorage.uCountry='{"ucur":1,"tmp":1,"det":{"cryId":"244","currency":{"nm":{"en":"$","ar":"دولار","r":"USD","fn_ar":"دولار أمريكي","fn_en":"US Dollar"},"ex":{"AED":0.27,"SAR":0.27,"QAR":0.27,"KWD":3.31,"OMR":2.26,"BHD":2.65}},"lang":"en","c2l":"US","ar":"الولايات المتحدة الأمريكية","en":"United States of America"}}';
		}else{
      localStorage.uCountry ='{"ucur":1,"tmp":1,"det":{"cryId":142,"currency":{"nm":{"en":"SAR","ar":"ريال","r":"SAR","fn_ar":"ريال سعودي","fn_en":"Saudi Riyal"},"ex":{"AED":1.02,"USD":3.75,"QAR":1.01,"KWD":12.43,"OMR":9.74,"BHD":9.94}},"lang":"ar","c2l":"SA","ar":"السعودية","en":"Saudi Arabia"}}';
			/*
			localStorage.redURL= window.location.href;
			window.location.replace(reqMainURL);
			*/
		}
  }
}
function setInvLangLINK(prm){
	if($("#switchLangLink").length>0){
		if(window.location.pathname.indexOf(".php")==-1){return ;}
		var inv_prm= JSON.parse(JSON.stringify(prm));
		if(typeof inv_prm.lang =='undefined' ||(inv_prm.lang=='ar')){
			inv_prm.lang='en';
		}else{
			inv_prm.lang='ar';
		}
		inv_prm=$.param(inv_prm);
		var curPath= prm.URLpathname;
		if(typeof curPath=='undefined'){curPath= "partsel.php"}
		$("#switchLangLink").attr("href",site_url +curPath+"?"+ inv_prm);
	}
}
function openURL(href, noSC) {
  var prms = getURLParms(href);
	redirectIfUCountryNotSet(prms);
	setInvLangLINK(prms);
	if((typeof prms.URLpathname !=='undefined')&& ((prms.URLpathname=='cart.php')|| (prms.URLpathname=='cart'))){
    if((typeof prms.lang !=='undefined')&& ((prms.lang =='ar')|| prms.lang=='en')){
      pcart.lang=prms.lang;
    }
    if((typeof prms['viewcart'] ==='undefined')|| (prms['viewcart']=='1')){
    pcart.viewCartDom(prms);
    pcart.closeIframe();
  }else if((prms['viewcart']==2)&&(typeof prms['whid'] !=='undefined')){
    pcart.viewshippingPage(prms['whid']);
      pcart.closeIframe();
  }else if(prms['viewcart']==3){
      pcart.viewshipPayPage();
      pcart.closeIframe();
  } else if ((prms['viewcart'] == 4)&&prms.orderId &&prms.whid&&prms.lang) {
      pcart.showOrderConfPage(prms.orderId, 'epay', prms.whid, prms.lang);
  }
	}else  if (typeof prms['act'] !== 'undefined') {
    cntxParm = prms;
    if (prms['act'] == 'mg1') {
      openMainGroups(prms);
    } else if (prms['act'] == 'm') {
      $(".grph_Sel_Main").hide();
      renderAndShowPage("mainSelPage");
      loadPreBasket();
    } else if (prms['act'] == 'mg2') {
      checkSubGrp(prms['FigNo']);
    } else if (prms['act'] == 'mp') {
      loadPFig(prms['FigNo'], prms['imagef']);
      $(".sgrpName").hide();
      $(".sgrpName").parent().addClass("remove");
    }
  }
  if (typeof noSC === 'undefined')
    window.history.pushState({
      href: href
    }, '', href);
  else if (noSC == 2) {
    window.history.replaceState({
      href: href
    }, '', href);
  }
  $('html,body').scrollTop(0);
}
