
function utl_param(url, name){
	return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

(function($){
	$.fn.shiftClick = function() {
		var lastSelected;
		var checkBoxes = $(this);
		this.each(function() {
			$(this).click(function(ev) {
				if (ev.shiftKey) {
					var last = checkBoxes.index(lastSelected);
					var first = checkBoxes.index(this);
					var start = Math.min(first, last);
					var end = Math.max(first, last);
					var chk = lastSelected.checked;
					for (var i = start; i < end; i++) {
						checkBoxes[i].checked = chk;
					}
				} else {
					lastSelected = this;
				}
			})
		});
	};
})(jQuery);


$(document).ready(function(){
$('.submenu > a').click(function(e){
	e.preventDefault();
	var submenu = $(this).siblings('ul');
	var li = $(this).parents('li');
	var submenus = $('#sidebar li.submenu ul');
	var submenus_parents = $('#sidebar li.submenu');
	if(li.hasClass('open'))		{
		if(($(window).width() > 768) || ($(window).width() < 479)) {
			submenu.slideUp();
		} else {
			submenu.fadeOut(250);
		}
		li.removeClass('open');
	} else			{
		if(($(window).width() > 768) || ($(window).width() < 479)) {
			submenus.slideUp();
			submenu.slideDown();
		} else {
			submenus.fadeOut(250);
			submenu.fadeIn(250);
		}
		submenus_parents.removeClass('open');
		li.addClass('open');
	}
});

var ul = $('#sidebar > ul');

$('#sidebar > a').click(function(e){
	e.preventDefault();
	var sidebar = $('#sidebar');
	if(sidebar.hasClass('open'))
	{
		sidebar.removeClass('open');
		ul.slideUp(250);
	} else		{
		sidebar.addClass('open');
		ul.slideDown(250);
	}
});

// === Resize window related === //
$(window).resize(function()			{
	if($(window).width() > 479)				{
		ul.css({'display':'block'});
		$('#content-header .btn-group').css({width:'auto'});
	}
	if($(window).width() < 479)				{
		ul.css({'display':'none'});
		fix_position();
	}
	if($(window).width() > 768)				{
		$('#user-nav > ul').css({width:'auto',margin:'0'});
		$('#content-header .btn-group').css({width:'auto'});
	}
});

if($(window).width() < 468)			{
	ul.css({'display':'none'});
	fix_position();
}
if($(window).width() > 479)			{
	$('#content-header .btn-group').css({width:'auto'});
	ul.css({'display':'block'});
}

$('.tip').tooltip();
$('.tip-left').tooltip({ placement: 'left' });
$('.tip-right').tooltip({ placement: 'right' });
$('.tip-top').tooltip({ placement: 'top' });
$('.tip-bottom').tooltip({ placement: 'bottom' });

function fix_position()			{
	var uwidth = $('#user-nav > ul').width();
	$('#user-nav > ul').css({width:uwidth,'margin-left':'-' + uwidth / 2 + 'px'});

	var cwidth = $('#content-header .btn-group').width();
	$('#content-header .btn-group').css({width:cwidth,'margin-left':'-' + uwidth / 2 + 'px'});
}

});



/* mousetrap v1.6.0 craig.is/killing/mice */
(function(r,t,g){function u(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function y(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return k[a.which]?k[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function v(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function z(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],A[c]&&(c=A[c]),b&&"keypress"!=b&&B[c]&&(c=B[c],g.push("shift")),v(c)&&g.push(c);h=c;e=b;if(!e){if(!n){n={};for(var l in k)95<l&&112>l||k.hasOwnProperty(l)&&(n[k[l]]=l)}e=n[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function C(a,b){return null===a||a===t?!1:a===b?!0:C(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,m;for(m in n)a[m]?b=!0:n[m]=0;b||(w=!1)}function h(a,b,m,f,c,h){var g,e,k=[],l=m.type;if(!d._callbacks[a])return[];"keyup"==l&&v(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||n[e.seq]==e.level)&&l==e.action){var q;(q="keypress"==l&&!m.metaKey&&!m.ctrlKey)||(q=e.modifiers,q=b.sort().join(",")===q.sort().join(","));q&&(q=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||q)&&d._callbacks[a].splice(g,1),k.push(e))}return k}function g(a,b,m,f){d.stopCallback(b,
b.target||b.srcElement,m,f)||!1!==a(b,m)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=y(a);b&&("keyup"==a.type&&x===b?x=!1:d.handleKey(b,D(a),a))}function k(a,c,m,f){function e(c){return function(){w=c;++n[a];clearTimeout(r);r=setTimeout(b,1E3)}}function h(c){g(m,c,a);"keyup"!==f&&(x=y(c));setTimeout(b,10)}for(var d=n[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
z(c[d+1]).action);l(c[d],p,f,a,d)}}function l(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?k(a,g,b,c):(c=z(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||t;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var n={},r,x=!1,p=!1,w=!1;d._handleKey=function(a,
c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=w||v(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)l(a[d],b,c)};u(a,"keypress",e);u(a,"keydown",e);u(a,"keyup",e)}if(r){var k={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",
18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},B={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},A={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},n;for(g=1;20>g;++g)k[111+g]="f"+g;for(g=0;9>=g;++g)k[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||C(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.addKeycodes=function(a){for(var b in a)a.hasOwnProperty(b)&&(k[b]=a[b]);n=null};c.init=function(){var a=c(t),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};
c.init();r.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=c);"function"===typeof define&&define.amd&&define(function(){return c})}})("undefined"!==typeof window?window:null,"undefined"!==typeof window?document:null);




/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
;(function(root,factory){if(typeof define==='function'&&define.amd){define(factory)}else if(typeof exports==='object'){module.exports=factory()}else{root.NProgress=factory()}})(this,function(){var NProgress={};NProgress.version='0.2.0';var Settings=NProgress.settings={minimum:0.08,easing:'linear',positionUsing:'',speed:200,trickle:true,trickleSpeed:200,showSpinner:true,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:'body',template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};NProgress.configure=function(options){var key,value;for(key in options){value=options[key];if(value!==undefined&&options.hasOwnProperty(key))Settings[key]=value}return this};NProgress.status=null;NProgress.set=function(n){var started=NProgress.isStarted();n=clamp(n,Settings.minimum,1);NProgress.status=(n===1?null:n);var progress=NProgress.render(!started),bar=progress.querySelector(Settings.barSelector),speed=Settings.speed,ease=Settings.easing;progress.offsetWidth;queue(function(next){if(Settings.positionUsing==='')Settings.positionUsing=NProgress.getPositioningCSS();css(bar,barPositionCSS(n,speed,ease));if(n===1){css(progress,{transition:'none',opacity:1});progress.offsetWidth;setTimeout(function(){css(progress,{transition:'all '+speed+'ms linear',opacity:0});setTimeout(function(){NProgress.remove();next()},speed)},speed)}else{setTimeout(next,speed)}});return this};NProgress.isStarted=function(){return typeof NProgress.status==='number'};NProgress.start=function(){if(!NProgress.status)NProgress.set(0);var work=function(){setTimeout(function(){if(!NProgress.status)return;NProgress.trickle();work()},Settings.trickleSpeed)};if(Settings.trickle)work();return this};NProgress.done=function(force){if(!force&&!NProgress.status)return this;return NProgress.inc(0.3+0.5*Math.random()).set(1)};NProgress.inc=function(amount){var n=NProgress.status;if(!n){return NProgress.start()}else if(n>1){return}else{if(typeof amount!=='number'){if(n>=0&&n<0.2){amount=0.1}else if(n>=0.2&&n<0.5){amount=0.04}else if(n>=0.5&&n<0.8){amount=0.02}else if(n>=0.8&&n<0.99){amount=0.005}else{amount=0}}n=clamp(n+amount,0,0.994);return NProgress.set(n)}};NProgress.trickle=function(){return NProgress.inc()};(function(){var initial=0,current=0;NProgress.promise=function($promise){if(!$promise||$promise.state()==="resolved"){return this}if(current===0){NProgress.start()}initial++;current++;$promise.always(function(){current--;if(current===0){initial=0;NProgress.done()}else{NProgress.set((initial-current)/initial)}});return this}})();NProgress.render=function(fromStart){if(NProgress.isRendered())return document.getElementById('nprogress');addClass(document.documentElement,'nprogress-busy');var progress=document.createElement('div');progress.id='nprogress';progress.innerHTML=Settings.template;var bar=progress.querySelector(Settings.barSelector),perc=fromStart?'-100':toBarPerc(NProgress.status||0),parent=document.querySelector(Settings.parent),spinner;css(bar,{transition:'all 0 linear',transform:'translate3d('+perc+'%,0,0)'});if(!Settings.showSpinner){spinner=progress.querySelector(Settings.spinnerSelector);spinner&&removeElement(spinner)}if(parent!=document.body){addClass(parent,'nprogress-custom-parent')}parent.appendChild(progress);return progress};NProgress.remove=function(){removeClass(document.documentElement,'nprogress-busy');removeClass(document.querySelector(Settings.parent),'nprogress-custom-parent');var progress=document.getElementById('nprogress');progress&&removeElement(progress)};NProgress.isRendered=function(){return!!document.getElementById('nprogress')};NProgress.getPositioningCSS=function(){var bodyStyle=document.body.style;var vendorPrefix=('WebkitTransform'in bodyStyle)?'Webkit':('MozTransform'in bodyStyle)?'Moz':('msTransform'in bodyStyle)?'ms':('OTransform'in bodyStyle)?'O':'';if(vendorPrefix+'Perspective'in bodyStyle){return'translate3d'}else if(vendorPrefix+'Transform'in bodyStyle){return'translate'}else{return'margin'}};function clamp(n,min,max){if(n<min)return min;if(n>max)return max;return n}function toBarPerc(n){return(-1+n)*100}function barPositionCSS(n,speed,ease){var barCSS;if(Settings.positionUsing==='translate3d'){barCSS={transform:'translate3d('+toBarPerc(n)+'%,0,0)'}}else if(Settings.positionUsing==='translate'){barCSS={transform:'translate('+toBarPerc(n)+'%,0)'}}else{barCSS={'margin-left':toBarPerc(n)+'%'}}barCSS.transition='all '+speed+'ms '+ease;return barCSS}var queue=(function(){var pending=[];function next(){var fn=pending.shift();if(fn){fn(next)}}return function(fn){pending.push(fn);if(pending.length==1)next()}})();var css=(function(){var cssPrefixes=['Webkit','O','Moz','ms'],cssProps={};function camelCase(string){return string.replace(/^-ms-/,'ms-').replace(/-([\da-z])/gi,function(match,letter){return letter.toUpperCase()})}function getVendorProp(name){var style=document.body.style;if(name in style)return name;var i=cssPrefixes.length,capName=name.charAt(0).toUpperCase()+name.slice(1),vendorName;while(i--){vendorName=cssPrefixes[i]+capName;if(vendorName in style)return vendorName}return name}function getStyleProp(name){name=camelCase(name);return cssProps[name]||(cssProps[name]=getVendorProp(name))}function applyCss(element,prop,value){prop=getStyleProp(prop);element.style[prop]=value}return function(element,properties){var args=arguments,prop,value;if(args.length==2){for(prop in properties){value=properties[prop];if(value!==undefined&&properties.hasOwnProperty(prop))applyCss(element,prop,value)}}else{applyCss(element,args[1],args[2])}}})();function hasClass(element,name){var list=typeof element=='string'?element:classList(element);return list.indexOf(' '+name+' ')>=0}function addClass(element,name){var oldList=classList(element),newList=oldList+name;if(hasClass(oldList,name))return;element.className=newList.substring(1)}function removeClass(element,name){var oldList=classList(element),newList;if(!hasClass(element,name))return;newList=oldList.replace(' '+name+' ',' ');element.className=newList.substring(1,newList.length-1)}function classList(element){return(' '+(element&&element.className||'')+' ').replace(/\s+/gi,' ')}function removeElement(element){element&&element.parentNode&&element.parentNode.removeChild(element)}return NProgress});