//
// js/ads/karma-ads-init.js
//
window.karma=window.karma||{};window.karma.config=window.karma.config||{};(function(){var b=window.karma.config.targeting||{},c=(typeof window.Toggles==="object")?window.Toggles:false,a=(c)?c.AdTest:false;
if(window.karma.config.targeting=="undefined"||window.karma.config.targeting==null){return}if(window.karma.config.site===undefined){if(a){window.karma.config.site=(window.karma.config.isMobile)?"test.ew.mdp.mob":"test.ew.mdp.com"
}else{window.karma.config.site=(window.karma.config.isMobile)?"ew.mdp.mob":"ew.mdp.com"}}b.breakpoint=(window.karma.config.isMobile)?"mobile":false||(window.innerWidth<1024)?"tablet-portrait":"desktop"
})();
//
// js/ads/karma-ads-helper.js
//
(function(){window.googletag=window.googletag||{};googletag.cmd=googletag.cmd||[];var a=function(){var i=document.getElementsByClassName("slider-container")[0];
var h=function(){if((pageYOffset||0)>99){i.className=i.className.replace(" ad-docked","");i.className+=" ad-hiding"}else{i.className=i.className.replace(" ad-docked","")
}};var j=function(){i.className=i.className.replace(" ad-hiding","")};var g=function(){i.className+=" ad-docked";setTimeout(h,10000)
};d.addEventListener("transitionend",j,false);googletag.cmd.push(function(){googletag.pubads().addEventListener("slotRenderEnded",function(k){if(k.slot.getSlotId().getDomId()==="div-gpt-leaderboard-flex-1"&&!k.isEmpty){g()
}})})};var d=document.getElementById("docking-leaderboard-container");if(d&&window.TransitionEvent){a()}googletag.cmd.push(function(){googletag.pubads().addEventListener("slotRenderEnded",function(g){f(g)
})});var e=0;var c=false;var b=function(){var g=0,j,h;if(window.karma&&typeof window.karma.getSlotCount==="function"){g=window.karma.getSlotCount()
}else{j=adService.gptSlots;for(h in j){if(j.hasOwnProperty(h)){g++}}}return g};var f=function(h){e++;if(h){var g=$("#"+h.slot.getSlotId().getDomId());
if(h.isEmpty||g.clientHeight===0){var k=g.parents("[data-ad-container-autocollapse]");if(k.length){k.hide()}var i=g.parents("[data-ad-container-masonry-autocollapse]");
var j=g.data("sponsored-slot");if(i.length&&!j){i.hide();c=true}}}if(!c||b()!==e){return}window.pubsub.broadcast("MasonryGridReload");
if(window.console.error){window.console.error("Masonry grid is being reloaded due to an ad slot not being targeted.")}c=false
}})();
//
// vendor/angularjs/1.3.11/angular.min.js
//
/*
 AngularJS v1.3.11
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(M,Y,t){'use strict';function T(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.11/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Ta(b){if(null==b||Ua(b))return!1;var a=b.length;return b.nodeType===
oa&&a?!0:F(b)||D(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function s(b,a,c){var d,e;if(b)if(G(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(D(b)||Ta(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==s)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Ed(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
b[d[e]],d[e]);return d}function kc(b){return function(a,c){b(c,a)}}function Fd(){return++nb}function lc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function z(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var l=f[g];b[l]=e[l]}}lc(b,a);return b}function ba(b){return parseInt(b,10)}function H(){}function pa(b){return b}function da(b){return function(){return b}}function A(b){return"undefined"===typeof b}function y(b){return"undefined"!==
typeof b}function I(b){return null!==b&&"object"===typeof b}function F(b){return"string"===typeof b}function V(b){return"number"===typeof b}function qa(b){return"[object Date]"===Da.call(b)}function G(b){return"function"===typeof b}function ob(b){return"[object RegExp]"===Da.call(b)}function Ua(b){return b&&b.window===b}function Va(b){return b&&b.$evalAsync&&b.$watch}function Wa(b){return"boolean"===typeof b}function mc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Gd(b){var a={};
b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function ua(b){return Q(b.nodeName||b[0]&&b[0].nodeName)}function Xa(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Ea(b,a,c,d){if(Ua(b)||Va(b))throw Ka("cpws");if(a){if(b===a)throw Ka("cpi");c=c||[];d=d||[];if(I(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(D(b))for(var f=a.length=0;f<b.length;f++)e=Ea(b[f],null,c,d),I(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);else{var g=a.$$hashKey;D(a)?a.length=
0:s(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Ea(b[f],null,c,d),I(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);lc(a,g)}}else if(a=b)D(b)?a=Ea(b,[],c,d):qa(b)?a=new Date(b.getTime()):ob(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):I(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Ea(b,e,c,d));return a}function ra(b,a){if(D(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(I(b))for(c in a=a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=
b[c];return a||b}function fa(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(D(b)){if(!D(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!fa(b[d],a[d]))return!1;return!0}}else{if(qa(b))return qa(a)?fa(b.getTime(),a.getTime()):!1;if(ob(b)&&ob(a))return b.toString()==a.toString();if(Va(b)||Va(a)||Ua(b)||Ua(a)||D(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!G(b[d])){if(!fa(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&
"$"!==d.charAt(0)&&a[d]!==t&&!G(a[d]))return!1;return!0}return!1}function Ya(b,a,c){return b.concat(Za.call(a,c))}function nc(b,a){var c=2<arguments.length?Za.call(arguments,2):[];return!G(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,Ya(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Hd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=t:Ua(a)?c="$WINDOW":a&&Y===a?c="$DOCUMENT":Va(a)&&
(c="$SCOPE");return c}function $a(b,a){if("undefined"===typeof b)return t;V(a)||(a=a?2:null);return JSON.stringify(b,Hd,a)}function oc(b){return F(b)?JSON.parse(b):b}function va(b){b=B(b).clone();try{b.empty()}catch(a){}var c=B("<div>").append(b).html();try{return b[0].nodeType===pb?Q(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+Q(b)})}catch(d){return Q(c)}}function pc(b){try{return decodeURIComponent(b)}catch(a){}}function qc(b){var a={},c,d;s((b||"").split("&"),function(b){b&&
(c=b.replace(/\+/g,"%20").split("="),d=pc(c[0]),y(d)&&(b=y(c[1])?pc(c[1]):!0,rc.call(a,d)?D(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Nb(b){var a=[];s(b,function(b,d){D(b)?s(b,function(b){a.push(Fa(d,!0)+(!0===b?"":"="+Fa(b,!0)))}):a.push(Fa(d,!0)+(!0===b?"":"="+Fa(b,!0)))});return a.length?a.join("&"):""}function qb(b){return Fa(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Fa(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,
":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Id(b,a){var c,d,e=rb.length;b=B(b);for(d=0;d<e;++d)if(c=rb[d]+a,F(c=b.attr(c)))return c;return null}function Jd(b,a){var c,d,e={};s(rb,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});s(rb,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Id(c,"strict-di"),a(c,d?[d]:[],e))}function sc(b,
a,c){I(c)||(c={});c=z({strictDi:!1},c);var d=function(){b=B(b);if(b.injector()){var d=b[0]===Y?"document":va(b);throw Ka("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=Ob(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return d},
e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;M&&e.test(M.name)&&(c.debugInfoEnabled=!0,M.name=M.name.replace(e,""));if(M&&!f.test(M.name))return d();M.name=M.name.replace(f,"");ga.resumeBootstrap=function(b){s(b,function(b){a.push(b)});d()}}function Kd(){M.name="NG_ENABLE_DEBUG_INFO!"+M.name;M.location.reload()}function Ld(b){b=ga.element(b).injector();if(!b)throw Ka("test");return b.get("$$testability")}function tc(b,a){a=a||"_";return b.replace(Md,function(b,d){return(d?a:"")+b.toLowerCase()})}
function Nd(){var b;uc||((sa=M.jQuery)&&sa.fn.on?(B=sa,z(sa.fn,{scope:La.scope,isolateScope:La.isolateScope,controller:La.controller,injector:La.injector,inheritedData:La.inheritedData}),b=sa.cleanData,sa.cleanData=function(a){var c;if(Pb)Pb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=sa._data(e,"events"))&&c.$destroy&&sa(e).triggerHandler("$destroy");b(a)}):B=R,ga.element=B,uc=!0)}function Qb(b,a,c){if(!b)throw Ka("areq",a||"?",c||"required");return b}function sb(b,a,c){c&&D(b)&&(b=b[b.length-1]);
Qb(G(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ma(b,a){if("hasOwnProperty"===b)throw Ka("badname",a);}function vc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&G(b)?nc(e,b):b}function tb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return B(c)}function ha(){return Object.create(null)}function Od(b){function a(a,b,c){return a[b]||
(a[b]=c())}var c=T("$injector"),d=T("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||T;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return u}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],q=a("$injector","invoke","push",d),u={_invokeQueue:b,_configBlocks:d,_runBlocks:e,requires:g,name:f,provider:a("$provide",
"provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:q,run:function(a){e.push(a);return this}};h&&q(h);return u})}})}function Pd(b){z(b,{bootstrap:sc,copy:Ea,extend:z,equals:fa,element:B,forEach:s,injector:Ob,noop:H,bind:nc,toJson:$a,
fromJson:oc,identity:pa,isUndefined:A,isDefined:y,isString:F,isFunction:G,isObject:I,isNumber:V,isElement:mc,isArray:D,version:Qd,isDate:qa,lowercase:Q,uppercase:ub,callbacks:{counter:0},getTestability:Ld,$$minErr:T,$$csp:ab,reloadWithDebugInfo:Kd});bb=Od(M);try{bb("ngLocale")}catch(a){bb("ngLocale",[]).provider("$locale",Rd)}bb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Sd});a.provider("$compile",wc).directive({a:Td,input:xc,textarea:xc,form:Ud,script:Vd,select:Wd,style:Xd,
option:Yd,ngBind:Zd,ngBindHtml:$d,ngBindTemplate:ae,ngClass:be,ngClassEven:ce,ngClassOdd:de,ngCloak:ee,ngController:fe,ngForm:ge,ngHide:he,ngIf:ie,ngInclude:je,ngInit:ke,ngNonBindable:le,ngPluralize:me,ngRepeat:ne,ngShow:oe,ngStyle:pe,ngSwitch:qe,ngSwitchWhen:re,ngSwitchDefault:se,ngOptions:te,ngTransclude:ue,ngModel:ve,ngList:we,ngChange:xe,pattern:yc,ngPattern:yc,required:zc,ngRequired:zc,minlength:Ac,ngMinlength:Ac,maxlength:Bc,ngMaxlength:Bc,ngValue:ye,ngModelOptions:ze}).directive({ngInclude:Ae}).directive(vb).directive(Cc);
a.provider({$anchorScroll:Be,$animate:Ce,$browser:De,$cacheFactory:Ee,$controller:Fe,$document:Ge,$exceptionHandler:He,$filter:Dc,$interpolate:Ie,$interval:Je,$http:Ke,$httpBackend:Le,$location:Me,$log:Ne,$parse:Oe,$rootScope:Pe,$q:Qe,$$q:Re,$sce:Se,$sceDelegate:Te,$sniffer:Ue,$templateCache:Ve,$templateRequest:We,$$testability:Xe,$timeout:Ye,$window:Ze,$$rAF:$e,$$asyncCallback:af,$$jqLite:bf})}])}function cb(b){return b.replace(cf,function(a,b,d,e){return e?d.toUpperCase():d}).replace(df,"Moz$1")}
function Ec(b){b=b.nodeType;return b===oa||!b||9===b}function Fc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Rb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(ef.exec(b)||["",""])[1].toLowerCase();d=ia[d]||ia._default;c.innerHTML=d[1]+b.replace(ff,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=Ya(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";s(f,function(a){e.appendChild(a)});return e}function R(b){if(b instanceof
R)return b;var a;F(b)&&(b=U(b),a=!0);if(!(this instanceof R)){if(a&&"<"!=b.charAt(0))throw Sb("nosel");return new R(b)}if(a){a=Y;var c;b=(c=gf.exec(b))?[a.createElement(c[1])]:(c=Fc(b,a))?c.childNodes:[]}Gc(this,b)}function Tb(b){return b.cloneNode(!0)}function wb(b,a){a||xb(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)xb(c[d])}function Hc(b,a,c,d){if(y(d))throw Sb("offargs");var e=(d=yb(b))&&d.events,f=d&&d.handle;if(f)if(a)s(a.split(" "),function(a){if(y(c)){var d=
e[a];Xa(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function xb(b,a){var c=b.ng339,d=c&&zb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Hc(b)),delete zb[c],b.ng339=t))}function yb(b,a){var c=b.ng339,c=c&&zb[c];a&&!c&&(b.ng339=c=++hf,c=zb[c]={events:{},data:{},handle:t});return c}function Ub(b,a,c){if(Ec(b)){var d=y(c),e=!d&&a&&!I(a),f=!a;b=(b=yb(b,!e))&&b.data;
if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];z(b,a)}}}function Ab(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Bb(b,a){a&&b.setAttribute&&s(a.split(" "),function(a){b.setAttribute("class",U((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+U(a)+" "," ")))})}function Cb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");s(a.split(" "),function(a){a=
U(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",U(c))}}function Gc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Ic(b,a){return Db(b,"$"+(a||"ngController")+"Controller")}function Db(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=D(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=B.data(b,a[d]))!==t)return c;b=b.parentNode||11===b.nodeType&&b.host}}
function Jc(b){for(wb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Kc(b,a){a||wb(b);var c=b.parentNode;c&&c.removeChild(b)}function jf(b,a){a=a||M;if("complete"===a.document.readyState)a.setTimeout(b);else B(a).on("load",b)}function Lc(b,a){var c=Eb[a.toLowerCase()];return c&&Mc[ua(b)]&&c}function kf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Nc[a]}function lf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:
0;if(g){if(A(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=ra(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||f[l].call(b,c)}};c.elem=b;return c}function bf(){this.$get=function(){return z(R,{hasClass:function(b,a){b.attr&&(b=b[0]);return Ab(b,a)},addClass:function(b,
a){b.attr&&(b=b[0]);return Cb(b,a)},removeClass:function(b,a){b.attr&&(b=b[0]);return Bb(b,a)}})}}function Na(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Fd)():c+":"+b}function db(b,a){if(a){var c=0;this.nextUid=function(){return++c}}s(b,this.put,this)}function mf(b){return(b=b.toString().replace(Oc,"").match(Pc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Vb(b,
a,c){var d;if("function"===typeof b){if(!(d=b.$inject)){d=[];if(b.length){if(a)throw F(c)&&c||(c=b.name||mf(b)),Ga("strictdi",c);a=b.toString().replace(Oc,"");a=a.match(Pc);s(a[1].split(nf),function(a){a.replace(of,function(a,b,c){d.push(c)})})}b.$inject=d}}else D(b)?(a=b.length-1,sb(b[a],"fn"),d=b.slice(0,a)):sb(b,"fn",!0);return d}function Ob(b,a){function c(a){return function(b,c){if(I(b))s(b,kc(a));else return a(b,c)}}function d(a,b){Ma(a,"service");if(G(b)||D(b))b=q.instantiate(b);if(!b.$get)throw Ga("pget",
a);return n[a+"Provider"]=b}function e(a,b){return function(){var c=r.invoke(b,this);if(A(c))throw Ga("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;s(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=q.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{F(a)?(c=bb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):G(a)?b.push(q.invoke(a)):D(a)?b.push(q.invoke(a)):sb(a,"module")}catch(e){throw D(a)&&
(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ga("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===l)throw Ga("cdep",a+" <- "+k.join(" <- "));return b[a]}try{return k.unshift(a),b[a]=l,b[a]=c(a,e)}catch(f){throw b[a]===l&&delete b[a],f;}finally{k.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[],k=Vb(b,a,g),l,q,n;q=0;for(l=k.length;q<l;q++){n=k[q];if("string"!==
typeof n)throw Ga("itkn",n);h.push(f&&f.hasOwnProperty(n)?f[n]:d(n,g))}D(b)&&(b=b[l]);return b.apply(c,h)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((D(a)?a[a.length-1]:a).prototype||null);a=e(a,d,b,c);return I(a)||G(a)?a:d},get:d,annotate:Vb,has:function(a){return n.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var l={},k=[],m=new db([],!0),n={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),
value:c(function(a,b){return f(a,da(b),!1)}),constant:c(function(a,b){Ma(a,"constant");n[a]=b;u[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=r.invoke(d,c);return r.invoke(b,null,{$delegate:a})}}}},q=n.$injector=h(n,function(a,b){ga.isString(b)&&k.push(b);throw Ga("unpr",k.join(" <- "));}),u={},r=u.$injector=h(u,function(a,b){var c=q.get(a+"Provider",b);return r.invoke(c.$get,c,t,a)});s(g(b),function(a){r.invoke(a||H)});return r}function Be(){var b=!0;this.disableAutoScrolling=
function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ua(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;G(c)?c=c():mc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):V(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?
f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||jf(function(){d.$evalAsync(g)})});return g}]}function af(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function pf(b,a,c,d){function e(a){try{a.apply(null,Za.call(arguments,1))}finally{if(v--,0===v)for(;w.length;)try{w.pop()()}catch(b){c.error(b)}}}function f(a,b){(function N(){s(L,function(a){a()});C=b(N,
a)})()}function g(){h();l()}function h(){x=b.history.state;x=A(x)?null:x;fa(x,J)&&(x=J);J=x}function l(){if(E!==m.url()||P!==x)E=m.url(),P=x,s(W,function(a){a(m.url(),x)})}function k(a){try{return decodeURIComponent(a)}catch(b){return a}}var m=this,n=a[0],q=b.location,u=b.history,r=b.setTimeout,O=b.clearTimeout,p={};m.isMock=!1;var v=0,w=[];m.$$completeOutstandingRequest=e;m.$$incOutstandingRequestCount=function(){v++};m.notifyWhenNoOutstandingRequests=function(a){s(L,function(a){a()});0===v?a():
w.push(a)};var L=[],C;m.addPollFn=function(a){A(C)&&f(100,r);L.push(a);return a};var x,P,E=q.href,S=a.find("base"),X=null;h();P=x;m.url=function(a,c,e){A(e)&&(e=null);q!==b.location&&(q=b.location);u!==b.history&&(u=b.history);if(a){var f=P===e;if(E===a&&(!d.history||f))return m;var g=E&&Ha(E)===Ha(a);E=a;P=e;!d.history||g&&f?(g||(X=a),c?q.replace(a):g?(c=q,e=a.indexOf("#"),a=-1===e?"":a.substr(e+1),c.hash=a):q.href=a):(u[c?"replaceState":"pushState"](e,"",a),h(),P=x);return m}return X||q.href.replace(/%27/g,
"'")};m.state=function(){return x};var W=[],wa=!1,J=null;m.onUrlChange=function(a){if(!wa){if(d.history)B(b).on("popstate",g);B(b).on("hashchange",g);wa=!0}W.push(a);return a};m.$$checkUrlChange=l;m.baseHref=function(){var a=S.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var ea={},y="",ca=m.baseHref();m.cookies=function(a,b){var d,e,f,g;if(a)b===t?n.cookie=encodeURIComponent(a)+"=;path="+ca+";expires=Thu, 01 Jan 1970 00:00:00 GMT":F(b)&&(d=(n.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+
";path="+ca).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(n.cookie!==y)for(y=n.cookie,d=y.split("; "),ea={},f=0;f<d.length;f++)e=d[f],g=e.indexOf("="),0<g&&(a=k(e.substring(0,g)),ea[a]===t&&(ea[a]=k(e.substring(g+1))));return ea}};m.defer=function(a,b){var c;v++;c=r(function(){delete p[c];e(a)},b||0);p[c]=!0;return c};m.defer.cancel=function(a){return p[a]?(delete p[a],O(a),e(H),!0):!1}}function De(){this.$get=["$window",
"$log","$sniffer","$document",function(b,a,c,d){return new pf(b,d,a,c)}]}function Ee(){this.$get=function(){function b(b,d){function e(a){a!=n&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,n),n=a,n.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw T("$cacheFactory")("iid",b);var g=0,h=z({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,m={},n=null,q=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!A(b))return a in l||g++,l[a]=b,g>k&&this.remove(q.key),
b},get:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;b==n&&(n=b.p);b==q&&(q=b.n);f(b.n,b.p);delete m[a]}delete l[a];g--},removeAll:function(){l={};g=0;m={};n=q=null},destroy:function(){m=h=l=null;delete a[b]},info:function(){return z({},h,{size:g})}}}var a={};b.info=function(){var b={};s(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Ve(){this.$get=["$cacheFactory",
function(b){return b("templates")}]}function wc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};s(a,function(a,e){var f=a.match(c);if(!f)throw ja("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d={},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Gd("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/;this.directive=function n(a,e){Ma(a,"directive");F(a)?(Qb(e,
"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];s(d[a],function(d,g){try{var h=b.invoke(d);G(h)?h={compile:da(h)}:!h.compile&&h.link&&(h.compile=da(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";I(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(l){e(l)}});return f}])),d[a].push(e)):s(a,kc(n));return this};this.aHrefSanitizationWhitelist=
function(b){return y(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var k=!0;this.debugInfoEnabled=function(a){return y(a)?(k=a,this):k};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,r,O,p,v,w,L,C,x){function P(a,b){try{a.addClass(b)}catch(c){}}
function E(a,b,c,d,e){a instanceof B||(a=B(a));s(a,function(b,c){b.nodeType==pb&&b.nodeValue.match(/\S+/)&&(a[c]=B(b).wrap("<span></span>").parent()[0])});var f=S(a,b,a,c,d,e);E.$$addScopeClass(a);var g=null;return function(b,c,d){Qb(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ua(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?B(Wb(g,B("<div>").append(a).html())):
c?La.clone.call(a):a;if(h)for(var l in h)d.data("$"+l+"Controller",h[l].instance);E.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function S(a,b,c,d,e,f){function g(a,c,d,e){var f,l,k,q,n,p,w;if(r)for(w=Array(c.length),q=0;q<h.length;q+=3)f=h[q],w[f]=c[f];else w=c;q=0;for(n=h.length;q<n;)l=w[h[q++]],c=h[q++],f=h[q++],c?(c.scope?(k=a.$new(),E.$$addScopeInfo(B(l),k)):k=a,p=c.transcludeOnThisElement?X(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?X(a,
b):null,c(f,k,l,d,p)):f&&f(a,l.childNodes,t,e)}for(var h=[],l,k,q,n,r,p=0;p<a.length;p++){l=new Xb;k=W(a[p],[],l,0===p?d:t,e);(f=k.length?ea(k,a[p],l,b,c,null,[],[],f):null)&&f.scope&&E.$$addScopeClass(l.$$element);l=f&&f.terminal||!(q=a[p].childNodes)||!q.length?null:S(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||l)h.push(p,f,l),n=!0,r=r||f;f=null}return n?g:null}function X(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,
{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function W(a,b,c,d,g){var h=c.$attr,l;switch(a.nodeType){case oa:ca(b,ya(ua(a)),"E",d,g);for(var k,q,n,r=a.attributes,p=0,w=r&&r.length;p<w;p++){var O=!1,L=!1;k=r[p];l=k.name;q=U(k.value);k=ya(l);if(n=fb.test(k))l=l.replace(Rc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});var u=k.replace(/(Start|End)$/,"");A(u)&&k===u+"Start"&&(O=l,L=l.substr(0,l.length-5)+"end",l=l.substr(0,l.length-6));k=ya(l.toLowerCase());
h[k]=l;if(n||!c.hasOwnProperty(k))c[k]=q,Lc(a,k)&&(c[k]=!0);Pa(a,b,q,k,n);ca(b,k,"A",d,g,O,L)}a=a.className;I(a)&&(a=a.animVal);if(F(a)&&""!==a)for(;l=f.exec(a);)k=ya(l[2]),ca(b,k,"C",d,g)&&(c[k]=U(l[3])),a=a.substr(l.index+l[0].length);break;case pb:M(b,a.nodeValue);break;case 8:try{if(l=e.exec(a.nodeValue))k=ya(l[1]),ca(b,k,"M",d,g)&&(c[k]=U(l[2]))}catch(v){}}b.sort(N);return b}function wa(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);a.nodeType==
oa&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return B(d)}function J(a,b,c){return function(d,e,f,g,h){e=wa(e[0],b,c);return a(d,e,f,g,h)}}function ea(a,d,e,f,g,l,k,n,r){function w(a,b,c,d){if(a){c&&(a=J(a,c,d));a.require=K.require;a.directiveName=z;if(S===K||K.$$isolateScope)a=Z(a,{isolateScope:!0});k.push(a)}if(b){c&&(b=J(b,c,d));b.require=K.require;b.directiveName=z;if(S===K||K.$$isolateScope)b=Z(b,{isolateScope:!0});n.push(b)}}function L(a,
b,c,d){var e,f="data",g=!1,l=c,k;if(F(b)){k=b.match(h);b=b.substring(k[0].length);k[3]&&(k[1]?k[3]=null:k[1]=k[3]);"^"===k[1]?f="inheritedData":"^^"===k[1]&&(f="inheritedData",l=c.parent());"?"===k[2]&&(g=!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||l[f]("$"+b+"Controller");if(!e&&!g)throw ja("ctreq",b,a);return e||null}D(b)&&(e=[],s(b,function(b){e.push(L(a,b,c,d))}));return e}function v(a,c,f,g,h){function l(a,b,c){var d;Va(a)||(c=b,b=a,a=t);H&&(d=P);c||(c=H?W.parent():W);return h(a,
b,d,c,wa)}var r,w,u,x,P,eb,W,J;d===f?(J=e,W=e.$$element):(W=B(f),J=new Xb(W,e));S&&(x=c.$new(!0));h&&(eb=l,eb.$$boundTransclude=h);C&&(X={},P={},s(C,function(a){var b={$scope:a===S||a.$$isolateScope?x:c,$element:W,$attrs:J,$transclude:eb};u=a.controller;"@"==u&&(u=J[a.name]);b=p(u,b,!0,a.controllerAs);P[a.name]=b;H||W.data("$"+a.name+"Controller",b.instance);X[a.name]=b}));if(S){E.$$addScopeInfo(W,x,!0,!(ka&&(ka===S||ka===S.$$originalDirective)));E.$$addScopeClass(W,!0);g=X&&X[S.name];var xa=x;g&&
g.identifier&&!0===S.bindToController&&(xa=g.instance);s(x.$$isolateBindings=S.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,l,k;switch(a.mode){case "@":J.$observe(e,function(a){xa[d]=a});J.$$observers[e].$$scope=c;J[e]&&(xa[d]=b(J[e])(c));break;case "=":if(f&&!J[e])break;h=O(J[e]);k=h.literal?fa:function(a,b){return a===b||a!==a&&b!==b};l=h.assign||function(){g=xa[d]=h(c);throw ja("nonassign",J[e],S.name);};g=xa[d]=h(c);f=function(a){k(a,xa[d])||(k(a,g)?l(c,a=xa[d]):xa[d]=a);
return g=a};f.$stateful=!0;f=a.collection?c.$watchCollection(J[e],f):c.$watch(O(J[e],f),null,h.literal);x.$on("$destroy",f);break;case "&":h=O(J[e]),xa[d]=function(a){return h(c,a)}}})}X&&(s(X,function(a){a()}),X=null);g=0;for(r=k.length;g<r;g++)w=k[g],$(w,w.isolateScope?x:c,W,J,w.require&&L(w.directiveName,w.require,W,P),eb);var wa=c;S&&(S.template||null===S.templateUrl)&&(wa=x);a&&a(wa,f.childNodes,t,h);for(g=n.length-1;0<=g;g--)w=n[g],$(w,w.isolateScope?x:c,W,J,w.require&&L(w.directiveName,w.require,
W,P),eb)}r=r||{};for(var x=-Number.MAX_VALUE,P,C=r.controllerDirectives,X,S=r.newIsolateScopeDirective,ka=r.templateDirective,ea=r.nonTlbTranscludeDirective,ca=!1,A=!1,H=r.hasElementTranscludeDirective,aa=e.$$element=B(d),K,z,N,Aa=f,Q,M=0,R=a.length;M<R;M++){K=a[M];var Pa=K.$$start,fb=K.$$end;Pa&&(aa=wa(d,Pa,fb));N=t;if(x>K.priority)break;if(N=K.scope)K.templateUrl||(I(N)?(Oa("new/isolated scope",S||P,K,aa),S=K):Oa("new/isolated scope",S,K,aa)),P=P||K;z=K.name;!K.templateUrl&&K.controller&&(N=K.controller,
C=C||{},Oa("'"+z+"' controller",C[z],K,aa),C[z]=K);if(N=K.transclude)ca=!0,K.$$tlb||(Oa("transclusion",ea,K,aa),ea=K),"element"==N?(H=!0,x=K.priority,N=aa,aa=e.$$element=B(Y.createComment(" "+z+": "+e[z]+" ")),d=aa[0],V(g,Za.call(N,0),d),Aa=E(N,f,x,l&&l.name,{nonTlbTranscludeDirective:ea})):(N=B(Tb(d)).contents(),aa.empty(),Aa=E(N,f));if(K.template)if(A=!0,Oa("template",ka,K,aa),ka=K,N=G(K.template)?K.template(aa,e):K.template,N=Sc(N),K.replace){l=K;N=Rb.test(N)?Tc(Wb(K.templateNamespace,U(N))):[];
d=N[0];if(1!=N.length||d.nodeType!==oa)throw ja("tplrt",z,"");V(g,aa,d);R={$attr:{}};N=W(d,[],R);var ba=a.splice(M+1,a.length-(M+1));S&&y(N);a=a.concat(N).concat(ba);Qc(e,R);R=a.length}else aa.html(N);if(K.templateUrl)A=!0,Oa("template",ka,K,aa),ka=K,K.replace&&(l=K),v=T(a.splice(M,a.length-M),aa,e,g,ca&&Aa,k,n,{controllerDirectives:C,newIsolateScopeDirective:S,templateDirective:ka,nonTlbTranscludeDirective:ea}),R=a.length;else if(K.compile)try{Q=K.compile(aa,e,Aa),G(Q)?w(null,Q,Pa,fb):Q&&w(Q.pre,
Q.post,Pa,fb)}catch(qf){c(qf,va(aa))}K.terminal&&(v.terminal=!0,x=Math.max(x,K.priority))}v.scope=P&&!0===P.scope;v.transcludeOnThisElement=ca;v.elementTranscludeOnThisElement=H;v.templateOnThisElement=A;v.transclude=Aa;r.hasElementTranscludeDirective=H;return v}function y(a){for(var b=0,c=a.length;b<c;b++){var d=b,e;e=z(Object.create(a[b]),{$$isolateScope:!0});a[d]=e}}function ca(b,e,f,g,h,l,k){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var q;e=a.get(e+"Directive");for(var r=0,p=e.length;r<
p;r++)try{if(q=e[r],(g===t||g>q.priority)&&-1!=q.restrict.indexOf(f)){if(l){var w={$$start:l,$$end:k};q=z(Object.create(q),w)}b.push(q);h=q}}catch(O){c(O)}}return h}function A(b){if(d.hasOwnProperty(b))for(var c=a.get(b+"Directive"),e=0,f=c.length;e<f;e++)if(b=c[e],b.multiElement)return!0;return!1}function Qc(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;s(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});s(b,function(b,f){"class"==f?(P(e,b),a["class"]=
(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function T(a,b,c,d,e,f,g,h){var l=[],k,q,n=b[0],p=a.shift(),w=z({},p,{templateUrl:null,transclude:null,replace:null,$$originalDirective:p}),O=G(p.templateUrl)?p.templateUrl(b,c):p.templateUrl,u=p.templateNamespace;b.empty();r(L.getTrustedResourceUrl(O)).then(function(r){var L,v;r=Sc(r);if(p.replace){r=Rb.test(r)?Tc(Wb(u,
U(r))):[];L=r[0];if(1!=r.length||L.nodeType!==oa)throw ja("tplrt",p.name,O);r={$attr:{}};V(d,b,L);var x=W(L,[],r);I(p.scope)&&y(x);a=x.concat(a);Qc(c,r)}else L=n,b.html(r);a.unshift(w);k=ea(a,L,c,e,b,p,f,g,h);s(d,function(a,c){a==L&&(d[c]=b[0])});for(q=S(b[0].childNodes,e);l.length;){r=l.shift();v=l.shift();var C=l.shift(),E=l.shift(),x=b[0];if(!r.$$destroyed){if(v!==n){var J=v.className;h.hasElementTranscludeDirective&&p.replace||(x=Tb(L));V(C,B(v),x);P(B(x),J)}v=k.transcludeOnThisElement?X(r,k.transclude,
E):E;k(q,r,x,d,v)}}l=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(k.transcludeOnThisElement&&(a=X(b,k.transclude,e)),k(q,b,c,d,a)))}}function N(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Oa(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,va(d));}function M(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&E.$$addBindingClass(a);return function(a,c){var e=c.parent();
b||E.$$addBindingClass(e);E.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Wb(a,b){a=Q(a||"html");switch(a){case "svg":case "math":var c=Y.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function R(a,b){if("srcdoc"==b)return L.HTML;var c=ua(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return L.RESOURCE_URL}function Pa(a,c,d,e,f){var h=R(a,e);f=g[e]||f;var k=b(d,!0,
h,f);if(k){if("multiple"===e&&"select"===ua(a))throw ja("selmulti",va(a));c.push({priority:100,compile:function(){return{pre:function(a,c,g){c=g.$$observers||(g.$$observers={});if(l.test(e))throw ja("nodomevents");var n=g[e];n!==d&&(k=n&&b(n,!0,h,f),d=n);k&&(g[e]=k(a),(c[e]||(c[e]=[])).$$inter=!0,(g.$$observers&&g.$$observers[e].$$scope||a).$watch(k,function(a,b){"class"===e&&a!=b?g.$updateClass(a,b):g.$set(e,a)}))}}}})}}function V(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<
h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var l=a.length;g<l;g++,h++)h<l?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=Y.createDocumentFragment();a.appendChild(d);B(c).data(B(d).data());sa?(Pb=!0,sa.cleanData([d])):delete B.cache[d[B.expando]];d=1;for(e=b.length;d<e;d++)f=b[d],B(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Z(a,b){return z(function(){return a.apply(null,arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,
va(d))}}var Xb=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};Xb.prototype={$normalize:ya,$addClass:function(a){a&&0<a.length&&C.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&C.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Uc(a,b);c&&c.length&&C.addClass(this.$$element,c);(c=Uc(b,a))&&c.length&&C.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=
Lc(f,a),h=kf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=tc(a,"-"));g=ua(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=x(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=U(b),l=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,l=/\s/.test(h)?l:/(,)/,h=h.split(l),l=Math.floor(h.length/2),k=0;k<l;k++)var q=2*k,g=g+x(U(h[q]),!0),g=g+(" "+U(h[q+1]));h=U(h[2*k]).split(/\s/);g+=x(U(h[0]),!0);2===h.length&&
(g+=" "+U(h[1]));this[a]=b=g}!1!==d&&(null===b||b===t?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&s(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ha()),e=d[a]||(d[a]=[]);e.push(b);v.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){Xa(e,b)}}};var Aa=b.startSymbol(),ka=b.endSymbol(),Sc="{{"==Aa||"}}"==ka?pa:function(a){return a.replace(/\{\{/g,Aa).replace(/}}/g,ka)},fb=
/^ngAttr[A-Z]/;E.$$addBindingInfo=k?function(a,b){var c=a.data("$binding")||[];D(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:H;E.$$addBindingClass=k?function(a){P(a,"ng-binding")}:H;E.$$addScopeInfo=k?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:H;E.$$addScopeClass=k?function(a,b){P(a,b?"ng-isolate-scope":"ng-scope")}:H;return E}]}function ya(b){return cb(b.replace(Rc,""))}function Uc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=
d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Tc(b){b=B(b);var a=b.length;if(1>=a)return b;for(;a--;)8===b[a].nodeType&&rf.call(b,a,1);return b}function Fe(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){Ma(a,"controller");I(a)?z(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!I(a.$scope))throw T("$controller")("noscp",d,b);a.$scope[b]=c}return function(g,h,
l,k){var m,n,q;l=!0===l;k&&F(k)&&(q=k);F(g)&&(k=g.match(c),n=k[1],q=q||k[3],g=b.hasOwnProperty(n)?b[n]:vc(h.$scope,n,!0)||(a?vc(e,n,!0):t),sb(g,n,!0));if(l)return l=(D(g)?g[g.length-1]:g).prototype,m=Object.create(l||null),q&&f(h,q,m,n||g.name),z(function(){d.invoke(g,m,h,n);return m},{instance:m,identifier:q});m=d.instantiate(g,h,n);q&&f(h,q,m,n||g.name);return m}}]}function Ge(){this.$get=["$window",function(b){return B(b.document)}]}function He(){this.$get=["$log",function(b){return function(a,
c){b.error.apply(b,arguments)}}]}function Yb(b,a){if(F(b)){var c=b.replace(sf,"").trim();if(c){var d=a("Content-Type");(d=d&&0===d.indexOf(Vc))||(d=(d=c.match(tf))&&uf[d[0]].test(c));d&&(b=oc(c))}}return b}function Wc(b){var a=ha(),c,d,e;if(!b)return a;s(b.split("\n"),function(b){e=b.indexOf(":");c=Q(U(b.substr(0,e)));d=U(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Xc(b){var a=I(b)?b:t;return function(c){a||(a=Wc(b));return c?(c=a[Q(c)],void 0===c&&(c=null),c):a}}function Yc(b,
a,c,d){if(G(d))return d(b,a,c);s(d,function(d){b=d(b,a,c)});return b}function Ke(){var b=this.defaults={transformResponse:[Yb],transformRequest:[function(a){return I(a)&&"[object File]"!==Da.call(a)&&"[object Blob]"!==Da.call(a)&&"[object FormData]"!==Da.call(a)?$a(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ra(Zb),put:ra(Zb),patch:ra(Zb)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return y(b)?(a=!!b,this):a};var c=this.interceptors=
[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(d,e,f,g,h,l){function k(a){function c(a){var b=z({},a);b.data=a.data?Yc(a.data,a.headers,a.status,e.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:h.reject(b)}function d(a){var b,c={};s(a,function(a,d){G(a)?(b=a(),null!=b&&(c[d]=b)):c[d]=a});return c}if(!ga.isObject(a))throw T("$http")("badreq",a);var e=z({method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},
a);e.headers=function(a){var c=b.headers,e=z({},a.headers),f,g,c=z({},c.common,c[Q(a.method)]);a:for(f in c){a=Q(f);for(g in e)if(Q(g)===a)continue a;e[f]=c[f]}return d(e)}(a);e.method=ub(e.method);var f=[function(a){var d=a.headers,e=Yc(a.data,Xc(d),t,a.transformRequest);A(e)&&s(d,function(a,b){"content-type"===Q(b)&&delete d[b]});A(a.withCredentials)&&!A(b.withCredentials)&&(a.withCredentials=b.withCredentials);return m(a,e).then(c,c)},t],g=h.when(e);for(s(u,function(a){(a.request||a.requestError)&&
f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var l=f.shift(),g=g.then(a,l)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,e)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,e)});return g};return g}function m(c,f){function l(b,c,d,e){function f(){m(c,b,d,e)}P&&(200<=b&&300>b?P.put(X,[b,c,Wc(d),e]):P.remove(X));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function m(a,
b,d,e){b=Math.max(b,0);(200<=b&&300>b?C.resolve:C.reject)({data:a,status:b,headers:Xc(d),config:c,statusText:e})}function w(a){m(a.data,a.status,ra(a.headers()),a.statusText)}function u(){var a=k.pendingRequests.indexOf(c);-1!==a&&k.pendingRequests.splice(a,1)}var C=h.defer(),x=C.promise,P,E,s=c.headers,X=n(c.url,c.params);k.pendingRequests.push(c);x.then(u,u);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(P=I(c.cache)?c.cache:I(b.cache)?b.cache:q);P&&(E=P.get(X),y(E)?E&&
G(E.then)?E.then(w,w):D(E)?m(E[1],E[0],ra(E[2]),E[3]):m(E,200,{},"OK"):P.put(X,x));A(E)&&((E=Zc(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:t)&&(s[c.xsrfHeaderName||b.xsrfHeaderName]=E),d(c.method,X,f,l,s,c.timeout,c.withCredentials,c.responseType));return x}function n(a,b){if(!b)return a;var c=[];Ed(b,function(a,b){null===a||A(a)||(D(a)||(a=[a]),s(a,function(a){I(a)&&(a=qa(a)?a.toISOString():$a(a));c.push(Fa(b)+"="+Fa(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));
return a}var q=f("$http"),u=[];s(c,function(a){u.unshift(F(a)?l.get(a):l.invoke(a))});k.pendingRequests=[];(function(a){s(arguments,function(a){k[a]=function(b,c){return k(z(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){s(arguments,function(a){k[a]=function(b,c,d){return k(z(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");k.defaults=b;return k}]}function vf(){return new M.XMLHttpRequest}function Le(){this.$get=["$browser","$window","$document",function(b,a,c){return wf(b,
vf,b.defer,a.angular.callbacks,c[0])}]}function wf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,u="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),u=a.type,g="error"===a.type?404:200);c&&c(g,u)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,
h,l,k,m,n,q,u){function r(){v&&v();w&&w.abort()}function O(a,d,e,f,g){C!==t&&c.cancel(C);v=w=null;a(d,e,f,g);b.$$completeOutstandingRequest(H)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==Q(e)){var p="_"+(d.counter++).toString(36);d[p]=function(a){d[p].data=a;d[p].called=!0};var v=f(h.replace("JSON_CALLBACK","angular.callbacks."+p),p,function(a,b){O(k,a,d[p].data,"",b);d[p]=H})}else{var w=a();w.open(e,h,!0);s(m,function(a,b){y(a)&&w.setRequestHeader(b,a)});w.onload=function(){var a=w.statusText||
"",b="response"in w?w.response:w.responseText,c=1223===w.status?204:w.status;0===c&&(c=b?200:"file"==Ba(h).protocol?404:0);O(k,c,b,w.getAllResponseHeaders(),a)};e=function(){O(k,-1,null,null,"")};w.onerror=e;w.onabort=e;q&&(w.withCredentials=!0);if(u)try{w.responseType=u}catch(L){if("json"!==u)throw L;}w.send(l||null)}if(0<n)var C=c(r,n);else n&&G(n.then)&&n.then(r)}}function Ie(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):
a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,u,r){function O(c){return c.replace(k,b).replace(m,a)}function p(a){try{var b=a;a=u?e.getTrusted(u,b):e.valueOf(b);var c;if(r&&!y(a))c=a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=$a(a)}c=a}return c}catch(g){c=$b("interr",f,g.toString()),d(c)}}r=!!r;for(var v,w,L=0,C=[],x=[],P=f.length,E=[],s=[];L<P;)if(-1!=(v=f.indexOf(b,L))&&-1!=
(w=f.indexOf(a,v+h)))L!==v&&E.push(O(f.substring(L,v))),L=f.substring(v+h,w),C.push(L),x.push(c(L,p)),L=w+l,s.push(E.length),E.push("");else{L!==P&&E.push(O(f.substring(L)));break}if(u&&1<E.length)throw $b("noconcat",f);if(!g||C.length){var X=function(a){for(var b=0,c=C.length;b<c;b++){if(r&&A(a[b]))return;E[s[b]]=a[b]}return E.join("")};return z(function(a){var b=0,c=C.length,e=Array(c);try{for(;b<c;b++)e[b]=x[b](a);return X(e)}catch(g){a=$b("interr",f,g.toString()),d(a)}},{exp:f,expressions:C,$$watchDelegate:function(a,
b,c){var d;return a.$watchGroup(x,function(c,e){var f=X(c);G(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,l=a.length,k=new RegExp(b.replace(/./g,f),"g"),m=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function Je(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,l,k){var m=a.setInterval,n=a.clearInterval,q=0,u=y(k)&&!k,r=(u?d:c).defer(),O=r.promise;l=y(l)?l:0;O.then(null,null,e);O.$$intervalId=
m(function(){r.notify(q++);0<l&&q>=l&&(r.resolve(q),n(O.$$intervalId),delete f[O.$$intervalId]);u||b.$apply()},h);f[O.$$intervalId]=r;return O}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function Rd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,
lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",
fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function ac(b){b=b.split("/");for(var a=b.length;a--;)b[a]=qb(b[a]);return b.join("/")}function $c(b,a){var c=Ba(b);a.$$protocol=c.protocol;a.$$host=c.hostname;a.$$port=ba(c.port)||xf[c.protocol]||null}function ad(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Ba(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?
d.pathname.substring(1):d.pathname);a.$$search=qc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function za(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ha(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function bd(b){return b.replace(/(#.+)|#$/,"$1")}function bc(b){return b.substr(0,Ha(b).lastIndexOf("/")+1)}function cc(b,a){this.$$html5=!0;a=a||"";var c=bc(b);$c(b,this);this.$$parse=function(a){var b=za(c,a);if(!F(b))throw Fb("ipthprfx",
a,c);ad(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Nb(this.$$search),b=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=za(b,d))!==t?(g=f,g=(f=za(a,f))!==t?c+(za("/",f)||f):b+g):(f=za(c,d))!==t?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function dc(b,a){var c=bc(b);$c(b,this);this.$$parse=
function(d){d=za(b,d)||za(c,d);var e;"#"===d.charAt(0)?(e=za(a,d),A(e)&&(e=d)):e=this.$$html5?d:"";ad(e,this);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Nb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ha(b)==Ha(a)?(this.$$parse(a),!0):
!1}}function cd(b,a){this.$$html5=!0;dc.apply(this,arguments);var c=bc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ha(d)?f=d:(g=za(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=function(){var c=Nb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Gb(b){return function(){return this[b]}}function dd(b,a){return function(c){if(A(c))return this[b];
this[b]=a(c);this.$$compose();return this}}function Me(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return y(a)?(b=a,this):b};this.html5Mode=function(b){return Wa(b)?(a.enabled=b,this):I(b)?(Wa(b.enabled)&&(a.enabled=b.enabled),Wa(b.requireBase)&&(a.requireBase=b.requireBase),Wa(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=k.url(),
f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function l(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,m;m=d.baseHref();var n=d.url(),q;if(a.enabled){if(!m&&a.requireBase)throw Fb("nobase");q=n.substring(0,n.indexOf("/",n.indexOf("//")+2))+(m||"/");m=e.history?cc:cd}else q=Ha(n),m=dc;k=new m(q,"#"+b);k.$$parseLinkUrl(n,n);k.$$state=d.state();var u=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&
!b.metaKey&&!b.shiftKey&&2!=b.which&&2!=b.button){for(var e=B(b.target);"a"!==ua(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),l=e.attr("href")||e.attr("xlink:href");I(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=Ba(h.animVal).href);u.test(h)||!h||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(h,l)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});k.absUrl()!=n&&d.url(k.absUrl(),!0);var r=!0;d.onUrlChange(function(a,
b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,h(d,!1,e)):(r=!1,l(d,e)))});c.$$phase||c.$digest()});c.$watch(function(){var a=bd(d.url()),b=bd(k.absUrl()),f=d.state(),g=k.$$replace,q=a!==b||k.$$html5&&e.history&&f!==k.$$state;if(r||q)r=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===
b&&(d?(k.$$parse(a),k.$$state=f):(q&&h(b,g,f===k.$$state?null:k.$$state),l(a,f)))});k.$$replace=!1});return k}]}function Ne(){var b=!0,a=this;this.debugEnabled=function(a){return y(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||H;a=!1;try{a=!!e.apply}catch(l){}return a?
function(){var a=[];s(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function ta(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw la("isecfld",a);return b}function ma(b,a){if(b){if(b.constructor===b)throw la("isecfn",a);if(b.window===
b)throw la("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw la("isecdom",a);if(b===Object)throw la("isecobj",a);}return b}function ec(b){return b.constant}function gb(b,a,c,d,e){ma(b,e);ma(a,e);c=c.split(".");for(var f,g=0;1<c.length;g++){f=ta(c.shift(),e);var h=0===g&&a&&a[f]||b[f];h||(h={},b[f]=h);b=ma(h,e)}f=ta(c.shift(),e);ma(b[f],e);return b[f]=d}function Qa(b){return"constructor"==b}function ed(b,a,c,d,e,f,g){ta(b,f);ta(a,f);ta(c,f);ta(d,f);ta(e,f);var h=function(a){return ma(a,
f)},l=g||Qa(b)?h:pa,k=g||Qa(a)?h:pa,m=g||Qa(c)?h:pa,n=g||Qa(d)?h:pa,q=g||Qa(e)?h:pa;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=l(h[b]);if(!a)return h;if(null==h)return t;h=k(h[a]);if(!c)return h;if(null==h)return t;h=m(h[c]);if(!d)return h;if(null==h)return t;h=n(h[d]);return e?null==h?t:h=q(h[e]):h}}function yf(b,a){return function(c,d){return b(c,d,ma,a)}}function zf(b,a,c){var d=a.expensiveChecks,e=d?Af:Bf,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=
6>h?ed(g[0],g[1],g[2],g[3],g[4],c,d):function(a,b){var e=0,f;do f=ed(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=t,a=f;while(e<h);return f};else{var l="";d&&(l+="s = eso(s, fe);\nl = eso(l, fe);\n");var k=d;s(g,function(a,b){ta(a,c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;if(d||Qa(a))e="eso("+e+", fe)",k=!0;l+="if(s == null) return undefined;\ns="+e+";\n"});l+="return s;";a=new Function("s","l","eso","fe",l);a.toString=da(l);k&&(a=yf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,
c,d){return gb(a,d,b,c,b)};return e[b]=f}function fc(b){return G(b.valueOf)?b.valueOf():Cf.call(b)}function Oe(){var b=ha(),a=ha();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===
typeof a&&(a=fc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===e.length){var l=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,l)||(h=d(a),l=b&&fc(b));return h},b,c)}for(var k=[],q=0,n=e.length;q<n;q++)k[q]=g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var l=e[c](a);if(b||(b=!g(l,k[c])))k[c]=l&&fc(l)}b&&(h=d(a));return h},b,c)}function l(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,
c,d){f=a;G(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function k(a,b,c,d){function e(a){var b=!0;s(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;G(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function m(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){G(b)&&b.apply(this,arguments);e()},c)}function n(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==k&&
c!==l?function(c,d){var e=a(c,d);return b(e,c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);return y(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=[a]);return c}var q={csp:d.csp,expensiveChecks:!1},u={csp:d.csp,expensiveChecks:!0};return function(d,f,g){var v,w,L;switch(typeof d){case "string":L=d=d.trim();var C=g?a:b;v=C[L];v||(":"===d.charAt(0)&&":"===d.charAt(1)&&(w=!0,d=d.substring(2)),g=g?u:q,v=new gc(g),v=(new hb(v,
c,g)).parse(d),v.constant?v.$$watchDelegate=m:w?(v=e(v),v.$$watchDelegate=v.literal?k:l):v.inputs&&(v.$$watchDelegate=h),C[L]=v);return n(v,f);case "function":return n(d,f);default:return n(H,f)}}}]}function Qe(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return fd(function(a){b.$evalAsync(a)},a)}]}function Re(){this.$get=["$browser","$exceptionHandler",function(b,a){return fd(function(a){b.defer(a)},a)}]}function fd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,
b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=t;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{G(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);
this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=T("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?
this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(I(b)||G(b))d=b&&b.then;G(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=
this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(G(b)?b(c):c)}catch(h){a(h)}}})}};var l=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{G(c)&&(d=c())}catch(e){return l(e,!1)}return d&&G(d.then)?d.then(function(){return l(a,b)},function(a){return l(a,!1)}):l(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},
n=function u(a){if(!G(a))throw h("norslvr",a);if(!(this instanceof u))return new u(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};n.defer=function(){return new g};n.reject=function(a){var b=new g;b.reject(a);return b.promise};n.when=m;n.all=function(a){var b=new g,c=0,d=D(a)?[]:{};s(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};
return n}function $e(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Pe(){var b=10,a=T("$rootScope"),c=null,d=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector",
"$exceptionHandler","$parse","$browser",function(e,f,g,h){function l(){this.$id=++nb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function k(b){if(r.$$phase)throw a("inprog",r.$$phase);r.$$phase=b}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function n(){}
function q(){for(;v.length;)try{v.shift()()}catch(a){f(a)}d=null}function u(){null===d&&(d=h.defer(function(){r.$apply(q)}))}l.prototype={constructor:l,$new:function(a,b){function c(){d.$$destroyed=!0}var d;b=b||this;a?(d=new l,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=++nb;this.$$ChildScope=null},this.$$ChildScope.prototype=this),d=new this.$$ChildScope);
d.$parent=b;d.$$prevSibling=b.$$childTail;b.$$childHead?(b.$$childTail.$$nextSibling=d,b.$$childTail=d):b.$$childHead=b.$$childTail=d;(a||b!=this)&&d.$on("$destroy",c);return d},$watch:function(a,b,d){var e=g(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,d,e);var f=this.$$watchers,h={fn:b,last:n,get:e,exp:a,eq:!!d};c=null;G(b)||(h.fn=H);f||(f=this.$$watchers=[]);f.unshift(h);return function(){Xa(f,h);c=null}},$watchGroup:function(a,b){function c(){h=!1;l?(l=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),
e=Array(a.length),f=[],g=this,h=!1,l=!0;if(!a.length){var k=!0;g.$evalAsync(function(){k&&b(e,e,g)});return function(){k=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});s(a,function(a,b){var l=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(l)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!A(e)){if(I(e))if(Ta(e))for(f!==q&&(f=q,u=f.length=0,k++),a=e.length,u!==
a&&(k++,f.length=u=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(k++,f[b]=g);else{f!==m&&(f=m={},u=0,k++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(k++,f[b]=g)):(u++,f[b]=g,k++));if(u>a)for(b in k++,f)e.hasOwnProperty(b)||(u--,delete f[b])}else f!==e&&(f=e,k++);return k}}c.$stateful=!0;var d=this,e,f,h,l=1<b.length,k=0,n=g(a,c),q=[],m={},p=!0,u=0;return this.$watch(n,function(){p?(p=!1,b(e,e,d)):b(e,h,d);if(l)if(I(e))if(Ta(e)){h=Array(e.length);
for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)rc.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var e,g,l,m,u,v,s=b,t,W=[],y,J;k("$digest");h.$$checkUrlChange();this===r&&null!==d&&(h.defer.cancel(d),q());c=null;do{v=!1;for(t=this;O.length;){try{J=O.shift(),J.scope.$eval(J.expression,J.locals)}catch(B){f(B)}c=null}a:do{if(m=t.$$watchers)for(u=m.length;u--;)try{if(e=m[u])if((g=e.get(t))!==(l=e.last)&&!(e.eq?fa(g,l):"number"===typeof g&&"number"===typeof l&&isNaN(g)&&isNaN(l)))v=
!0,c=e,e.last=e.eq?Ea(g,null):g,e.fn(g,l===n?g:l,t),5>s&&(y=4-s,W[y]||(W[y]=[]),W[y].push({msg:G(e.exp)?"fn: "+(e.exp.name||e.exp.toString()):e.exp,newVal:g,oldVal:l}));else if(e===c){v=!1;break a}}catch(A){f(A)}if(!(m=t.$$childHead||t!==this&&t.$$nextSibling))for(;t!==this&&!(m=t.$$nextSibling);)t=t.$parent}while(t=m);if((v||O.length)&&!s--)throw r.$$phase=null,a("infdig",b,W);}while(v||O.length);for(r.$$phase=null;p.length;)try{p.shift()()}catch(ca){f(ca)}},$destroy:function(){if(!this.$$destroyed){var a=
this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==r){for(var b in this.$$listenerCount)m(this,this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=H;this.$on=this.$watch=this.$watchGroup=
function(){return H};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){r.$$phase||O.length||h.defer(function(){O.length&&r.$digest()});O.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){p.push(a)},$apply:function(a){try{return k("$apply"),this.$eval(a)}catch(b){f(b)}finally{r.$$phase=null;try{r.$digest()}catch(c){throw f(c),c;
}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&v.push(b);u()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,m(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},
l=Ya([h],arguments,1),k,m;do{d=e.$$listeners[a]||c;h.currentScope=e;k=0;for(m=d.length;k<m;k++)if(d[k])try{d[k].apply(null,l)}catch(n){f(n)}else d.splice(k,1),k--,m--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=Ya([e],arguments,1),h,l;c=d;){e.currentScope=c;d=c.$$listeners[a]||
[];h=0;for(l=d.length;h<l;h++)if(d[h])try{d[h].apply(null,g)}catch(k){f(k)}else d.splice(h,1),h--,l--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var r=new l,O=r.$$asyncQueue=[],p=r.$$postDigestQueue=[],v=r.$$applyAsyncQueue=[];return r}]}function Sd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return y(a)?
(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Ba(c).href;return""===f||f.match(e)?c:"unsafe:"+f}}}function Df(b){if("self"===b)return b;if(F(b)){if(-1<b.indexOf("***"))throw Ca("iwcard",b);b=gd(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(ob(b))return new RegExp("^"+b.source+"$");throw Ca("imatcher");}function hd(b){var a=[];y(b)&&s(b,function(b){a.push(Df(b))});
return a}function Te(){this.SCE_CONTEXTS=na;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=hd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=hd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?Zc(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};
return b}var f=function(a){throw Ca("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[na.HTML]=e(g);h[na.CSS]=e(g);h[na.URL]=e(g);h[na.JS]=e(g);h[na.RESOURCE_URL]=e(h[na.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ca("icontext",a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw Ca("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===t||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof
g)return e.$$unwrapTrustedValue();if(c===na.RESOURCE_URL){var g=Ba(e.toString()),n,q,u=!1;n=0;for(q=b.length;n<q;n++)if(d(b[n],g)){u=!0;break}if(u)for(n=0,q=a.length;n<q;n++)if(d(a[n],g)){u=!1;break}if(u)return e;throw Ca("insecurl",e.toString());}if(c===na.HTML)return f(e);throw Ca("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Se(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&
8>Ra)throw Ca("iequirks");var d=ra(na);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=pa);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;s(na,function(a,b){var c=Q(b);d[cb("parse_as_"+c)]=function(b){return e(a,b)};d[cb("get_trusted_"+c)]=function(b){return f(a,b)};d[cb("trust_as_"+
c)]=function(b){return g(a,b)}});return d}]}function Ue(){this.$get=["$window","$document",function(b,a){var c={},d=ba((/android (\d+)/.exec(Q((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,l=f.body&&f.body.style,k=!1,m=!1;if(l){for(var n in l)if(k=h.exec(n)){g=k[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in l&&"webkit");k=!!("transition"in l||g+"Transition"in l);m=!!("animation"in l||g+"Animation"in
l);!d||k&&m||(k=F(f.body.style.webkitTransition),m=F(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===a&&11>=Ra)return!1;if(A(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:ab(),vendorPrefix:g,transitions:k,animations:m,android:d}}]}function We(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;var g=a.defaults&&a.defaults.transformResponse;D(g)?g=g.filter(function(a){return a!==
Yb}):g===Yb&&(g=null);return a.get(e,{cache:b,transformResponse:g}).finally(function(){d.totalPendingRequests--}).then(function(a){return a.data},function(a){if(!f)throw ja("tpload",e);return c.reject(a)})}d.totalPendingRequests=0;return d}]}function Xe(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];s(a,function(a){var d=ga.element(a).data("$binding");d&&s(d,function(d){c?(new RegExp("(^|\\s)"+
gd(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var l=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(l.length)return l}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function Ye(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",
function(b,a,c,d,e){function f(f,l,k){var m=y(k)&&!k,n=(m?d:c).defer(),q=n.promise;l=a.defer(function(){try{n.resolve(f())}catch(a){n.reject(a),e(a)}finally{delete g[q.$$timeoutId]}m||b.$apply()},l);q.$$timeoutId=l;g[l]=n;return q}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Ba(b){Ra&&(Z.setAttribute("href",b),b=Z.href);Z.setAttribute("href",b);return{href:Z.href,protocol:Z.protocol?
Z.protocol.replace(/:$/,""):"",host:Z.host,search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,port:Z.port,pathname:"/"===Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function Zc(b){b=F(b)?Ba(b):b;return b.protocol===id.protocol&&b.host===id.host}function Ze(){this.$get=da(M)}function Dc(b){function a(c,d){if(I(c)){var e={};s(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+
"Filter")}}];a("currency",jd);a("date",kd);a("filter",Ef);a("json",Ff);a("limitTo",Gf);a("lowercase",Hf);a("number",ld);a("orderBy",md);a("uppercase",If)}function Ef(){return function(b,a,c){if(!D(b))return b;var d;switch(typeof a){case "function":break;case "boolean":case "number":case "string":d=!0;case "object":a=Jf(a,c,d);break;default:return b}return b.filter(a)}}function Jf(b,a,c){var d=I(b)&&"$"in b;!0===a?a=fa:G(a)||(a=function(a,b){if(I(a)||I(b))return!1;a=Q(""+a);b=Q(""+b);return-1!==a.indexOf(b)});
return function(e){return d&&!I(e)?Ia(e,b.$,a,!1):Ia(e,b,a,c)}}function Ia(b,a,c,d,e){var f=typeof b,g=typeof a;if("string"===g&&"!"===a.charAt(0))return!Ia(b,a.substring(1),c,d);if(D(b))return b.some(function(b){return Ia(b,a,c,d)});switch(f){case "object":var h;if(d){for(h in b)if("$"!==h.charAt(0)&&Ia(b[h],a,c,!0))return!0;return e?!1:Ia(b,a,c,!1)}if("object"===g){for(h in a)if(e=a[h],!G(e)&&(f="$"===h,!Ia(f?b:b[h],e,c,f,f)))return!1;return!0}return c(b,a);case "function":return!1;default:return c(b,
a)}}function jd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){A(d)&&(d=a.CURRENCY_SYM);A(e)&&(e=a.PATTERNS[1].maxFrac);return null==b?b:nd(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function ld(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:nd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function nd(b,a,c,d,e){if(!isFinite(b)||I(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",l=[],k=!1;if(-1!==g.indexOf("e")){var m=g.match(/([\d\.]+)e(-?)(\d+)/);m&&
"-"==m[2]&&m[3]>e+1?b=0:(h=g,k=!0)}if(k)0<e&&1>b&&(h=b.toFixed(e),b=parseFloat(h));else{g=(g.split(od)[1]||"").length;A(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(od),k=g[0],g=g[1]||"",n=0,q=a.lgSize,u=a.gSize;if(k.length>=q+u)for(n=k.length-q,m=0;m<n;m++)0===(n-m)%u&&0!==m&&(h+=c),h+=k.charAt(m);for(m=n;m<k.length;m++)0===(k.length-m)%q&&0!==m&&(h+=c),h+=k.charAt(m);for(;g.length<e;)g+="0";e&&"0"!==e&&(h+=d+g.substr(0,
e))}0===b&&(f=!1);l.push(f?a.negPre:a.posPre,h,f?a.negSuf:a.posSuf);return l.join("")}function Hb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Hb(e,a,d)}}function Ib(b,a){return function(c,d){var e=c["get"+b](),f=ub(a?"SHORT"+b:b);return d[f][e]}}function pd(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function qd(b){return function(a){var c=
pd(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Hb(a,b)}}function kd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=ba(b[9]+b[10]),g=ba(b[9]+b[11]));h.call(a,ba(b[1]),ba(b[2])-1,ba(b[3]));f=ba(b[4]||0)-f;g=ba(b[5]||0)-g;h=ba(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,e,f){var g="",h=[],l,k;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;F(c)&&(c=Kf.test(c)?ba(c):a(c));V(c)&&(c=new Date(c));if(!qa(c))return c;for(;e;)(k=Lf.exec(e))?(h=Ya(h,k,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));s(h,function(a){l=Mf[a];g+=l?l(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ff(){return function(b,a){A(a)&&(a=2);return $a(b,a)}}function Gf(){return function(b,
a){V(b)&&(b=b.toString());return D(b)||F(b)?(a=Infinity===Math.abs(Number(a))?Number(a):ba(a))?0<a?b.slice(0,a):b.slice(a):F(b)?"":[]:b}}function md(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function g(a){return null===a?"null":"function"===typeof a.valueOf&&(a=a.valueOf(),f(a))||"function"===typeof a.toString&&(a=a.toString(),f(a))?a:""}function h(a,b){var c=
typeof a,d=typeof b;c===d&&"object"===c&&(a=g(a),b=g(b));return c===d?("string"===c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Ta(a))return a;c=D(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||pa;if(F(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);if(""===a)return e(h,c);d=b(a);if(d.constant){var f=d();return e(function(a,b){return h(a[f],b[f])},c)}}return e(function(a,b){return h(d(a),d(b))},c)});return Za.call(a).sort(e(function(a,
b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ja(b){G(b)&&(b={link:b});b.restrict=b.restrict||"AC";return da(b)}function rd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Jb;f.$error={};f.$$success={};f.$pending=t;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){s(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){s(g,
function(a){a.$commitViewValue()})};f.$addControl=function(a){Ma(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];s(f.$pending,function(b,c){f.$setValidity(c,null,a)});s(f.$error,function(b,c){f.$setValidity(c,null,a)});s(f.$$success,function(b,c){f.$setValidity(c,null,a)});Xa(g,a)};sd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];
d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Xa(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Sa);d.addClass(b,Kb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Sa,Kb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;s(g,function(a){a.$setPristine()})};f.$setUntouched=function(){s(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");
f.$submitted=!0;h.$setSubmitted()}}function hc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function ib(b,a,c,d,e,f){var g=Q(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;l()})}var l=function(b){k&&(f.defer.cancel(k),k=null);if(!h){var e=a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=U(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,b)}};if(e.hasEvent("input"))a.on("input",
l);else{var k,m=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",m)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)}}function Lb(b,a){return function(c,d){var e,f;if(qa(c))return c;if(F(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(Nf.test(c))return new Date(c);b.lastIndex=
0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},s(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function jb(b,a,c,d){return function(e,f,g,h,l,k,m){function n(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function q(a){return y(a)?qa(a)?a:c(a):t}td(e,f,g,h);
ib(e,f,g,h,l,k);var u=h&&h.$options&&h.$options.timezone,r;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,r),"UTC"===u&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):t});h.$formatters.push(function(a){if(a&&!qa(a))throw Mb("datefmt",a);if(n(a)){if((r=a)&&"UTC"===u){var b=6E4*r.getTimezoneOffset();r=new Date(r.getTime()+b)}return m("date")(a,d,u)}r=null;return""});if(y(g.min)||g.ngMin){var s;h.$validators.min=function(a){return!n(a)||A(s)||c(a)>=s};
g.$observe("min",function(a){s=q(a);h.$validate()})}if(y(g.max)||g.ngMax){var p;h.$validators.max=function(a){return!n(a)||A(p)||c(a)<=p};g.$observe("max",function(a){p=q(a);h.$validate()})}}}function td(b,a,c,d){(d.$$hasNativeValidators=I(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?t:b})}function ud(b,a,c,d,e){if(y(d)){b=b(d);if(!b.constant)throw T("ngModel")("constexpr",c,d);return b(a)}return e}function ic(b,a){b="ngClass"+b;return["$animate",
function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!D(a)){if(F(a))return a.split(" ");if(I(a)){var b=[];s(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function l(a,b){var c=g.data("$classCounts")||{},d=[];s(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===
a||f.$index%2===a){var k=e(b||[]);if(!m){var u=l(k,1);h.$addClass(u)}else if(!fa(b,m)){var r=e(m),u=d(k,r),k=d(r,k),u=l(u,1),k=l(k,-1);u&&u.length&&c.addClass(g,u);k&&k.length&&c.removeClass(g,k)}}m=ra(b)}var m;f.$watch(h[b],k,!0);h.$observe("class",function(a){k(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var k=e(f.$eval(h[b]));g===a?(g=l(k,1),h.$addClass(g)):(g=l(k,-1),h.$removeClass(g))}})}}}]}function sd(b){function a(a,b){b&&!f[a]?(k.addClass(e,a),
f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+tc(b,"-"):"";a(kb+b,!0===c);a(vd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,l=b.parentForm,k=b.$animate;f[vd]=!(f[kb]=e.hasClass(kb));d.$setValidity=function(b,e,f){e===t?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&h(d.$pending,b,f),wd(d.$pending)&&(d.$pending=t));Wa(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(xd,
!0),d.$valid=d.$invalid=t,c("",null)):(a(xd,!1),d.$valid=wd(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?t:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);l.$setValidity(b,e,d)}}function wd(b){if(b)for(var a in b)return!1;return!0}var Of=/^\/(.+)\/([a-z]*)$/,Q=function(b){return F(b)?b.toLowerCase():b},rc=Object.prototype.hasOwnProperty,ub=function(b){return F(b)?b.toUpperCase():b},Ra,B,sa,Za=[].slice,rf=[].splice,Pf=[].push,Da=Object.prototype.toString,Ka=T("ng"),ga=M.angular||
(M.angular={}),bb,nb=0;Ra=Y.documentMode;H.$inject=[];pa.$inject=[];var D=Array.isArray,U=function(b){return F(b)?b.trim():b},gd=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},ab=function(){if(y(ab.isActive_))return ab.isActive_;var b=!(!Y.querySelector("[ng-csp]")&&!Y.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return ab.isActive_=b},rb=["ng-","data-ng-","ng:","x-ng-"],Md=/[A-Z]/g,uc=!1,Pb,oa=1,pb=3,Qd={full:"1.3.11",major:1,
minor:3,dot:11,codeName:"spiffy-manatee"};R.expando="ng339";var zb=R.cache={},hf=1;R._data=function(b){return this.cache[b[this.expando]]||{}};var cf=/([\:\-\_]+(.))/g,df=/^moz([A-Z])/,Qf={mouseleave:"mouseout",mouseenter:"mouseover"},Sb=T("jqLite"),gf=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Rb=/<|&#?\w+;/,ef=/<([\w:]+)/,ff=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ia={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>",
"</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option;ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead;ia.th=ia.td;var La=R.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===Y.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),R(M).on("load",a))},toString:function(){var b=[];s(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=
b?B(this[b]):B(this[this.length+b])},length:0,push:Pf,sort:[].sort,splice:[].splice},Eb={};s("multiple selected checked disabled readOnly required open".split(" "),function(b){Eb[Q(b)]=b});var Mc={};s("input select option textarea button form details".split(" "),function(b){Mc[b]=!0});var Nc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};s({data:Ub,removeData:xb},function(b,a){R[a]=b});s({data:Ub,inheritedData:Db,scope:function(b){return B.data(b,"$scope")||
Db(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return B.data(b,"$isolateScope")||B.data(b,"$isolateScopeNoTemplate")},controller:Ic,injector:function(b){return Db(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Ab,css:function(b,a,c){a=cb(a);if(y(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=Q(a);if(Eb[d])if(y(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||H).specified?
d:t;else if(y(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?t:b},prop:function(b,a,c){if(y(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(A(b)){var d=a.nodeType;return d===oa||d===pb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(A(a)){if(b.multiple&&"select"===ua(b)){var c=[];s(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(A(a))return b.innerHTML;
wb(b,!0);b.innerHTML=a},empty:Jc},function(b,a){R.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Jc&&(2==b.length&&b!==Ab&&b!==Ic?a:d)===t){if(I(a)){for(e=0;e<g;e++)if(b===Ub)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});s({removeData:xb,on:function a(c,d,e,f){if(y(f))throw Sb("onargs");if(Ec(c)){var g=yb(c,!0);f=g.events;var h=g.handle;h||(h=
g.handle=lf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],l=g.length;l--;){d=g[l];var k=f[d];k||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Qf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),k=f[d]);k.push(e)}}},off:Hc,one:function(a,c,d){a=B(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;wb(a);s(new R(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,
a);d=c})},children:function(a){var c=[];s(a.childNodes,function(a){a.nodeType===oa&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===oa||11===d){c=new R(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===oa){var d=a.firstChild;s(new R(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=B(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},
remove:Kc,detach:function(a){Kc(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new R(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:Cb,removeClass:Bb,toggleClass:function(a,c,d){c&&s(c.split(" "),function(c){var f=d;A(f)&&(f=!Ab(a,c));(f?Cb:Bb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Tb,
triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=yb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:H,type:g,target:a},c.type&&(e=z(e,c)),c=ra(h),f=d?[e].concat(d):[e],s(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,
f)})}},function(a,c){R.prototype[c]=function(c,e,f){for(var g,h=0,l=this.length;h<l;h++)A(g)?(g=a(this[h],c,e,f),y(g)&&(g=B(g))):Gc(g,a(this[h],c,e,f));return y(g)?g:this};R.prototype.bind=R.prototype.on;R.prototype.unbind=R.prototype.off});db.prototype={put:function(a,c){this[Na(a,this.nextUid)]=c},get:function(a){return this[Na(a,this.nextUid)]},remove:function(a){var c=this[a=Na(a,this.nextUid)];delete this[a];return c}};var Pc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,nf=/,/,of=/^\s*(_?)(\S+?)\1\s*$/,
Oc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ga=T("$injector");Ob.$$annotate=Vb;var Rf=T("$animate"),Ce=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Rf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,
g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=ha();s((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});s(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function l(){m||(m=a.defer(),d(function(){m.resolve();m=null}));return m.promise}function k(a,
c){if(ga.isObject(c)){var d=z(c.from||{},c.to||{});a.css(d)}}var m;return{animate:function(a,c,d){k(a,{from:c,to:d});return l()},enter:function(a,c,d,e){k(a,e);d?d.after(a):c.prepend(a);return l()},leave:function(a,c){a.remove();return l()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=B(a);c=F(c)?c:D(c)?c.join(" "):"";s(a,function(a){Cb(a,c)});k(a,d);return l()},removeClass:function(a,c,d){return this.setClass(a,
[],c,d)},$$removeClassImmediately:function(a,c,d){a=B(a);c=F(c)?c:D(c)?c.join(" "):"";s(a,function(a){Bb(a,c)});k(a,d);return l()},setClass:function(a,c,d,e){var k=this,l=!1;a=B(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=ga.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=D(c)?c:c.split(" ");d=D(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&
k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,c);d&&this.$$removeClassImmediately(a,d);k(a,e);return l()},enabled:H,cancel:H}}]}],ja=T("$compile");wc.$inject=["$provide","$$sanitizeUriProvider"];var Rc=/^((?:x|data)[\:\-_])/i,Vc="application/json",Zb={"Content-Type":Vc+";charset=utf-8"},tf=/^\[|^\{(?!\{)/,uf={"[":/]$/,"{":/}$/},sf=/^\)\]\}',?\n/,$b=T("$interpolate"),Sf=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
xf={http:80,https:443,ftp:21},Fb=T("$location"),Tf={$$html5:!1,$$replace:!1,absUrl:Gb("$$absUrl"),url:function(a){if(A(a))return this.$$url;var c=Sf.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Gb("$$protocol"),host:Gb("$$host"),port:Gb("$$port"),path:dd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;
case 1:if(F(a)||V(a))a=a.toString(),this.$$search=qc(a);else if(I(a))a=Ea(a,{}),s(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Fb("isrcharg");break;default:A(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:dd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};s([cd,dc,cc],function(a){a.prototype=Object.create(Tf);a.prototype.state=function(c){if(!arguments.length)return this.$$state;
if(a!==cc||!this.$$html5)throw Fb("nostate");this.$$state=A(c)?null:c;return this}});var la=T("$parse"),Uf=Function.prototype.call,Vf=Function.prototype.apply,Wf=Function.prototype.bind,lb=ha();s({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;lb[c]=a});lb["this"]=function(a){return a};lb["this"].sharedGetter=!0;var mb=z(ha(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return y(d)?y(e)?
d+e:d:y(e)?e:t},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(y(d)?d:0)-(y(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,
c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Xf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},gc=function(a){this.options=a};gc.prototype={constructor:gc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||
"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=mb[c],f=mb[d];mb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==
c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=y(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,
d)+"]":" "+d;throw la("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=Q(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,
text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||
this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=Xf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var hb=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};hb.ZERO=z(function(){return 0},{sharedGetter:!0,constant:!0});hb.prototype={constructor:hb,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);
a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier&&this.peek().text in lb?a=lb[this.consume().text]:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",
this.peek());for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw la("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw la("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,
c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){if(0===this.tokens.length)throw la("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},unaryFn:function(a,c){var d=mb[a];return z(function(a,f){return d(a,f,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,
c,d,e){var f=mb[c];return z(function(c,e){return f(c,e,a,d)},{constant:a.constant&&d.constant,inputs:!e&&[a,d]})},identifier:function(){for(var a=this.consume().text;this.peek(".")&&this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return zf(a,this.options,this.text)},constant:function(){var a=this.consume().value;return z(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",
";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.$filter(this.consume().text),d,e;if(this.peek(":"))for(d=[],e=[];this.expect(":");)d.push(this.expression());var f=[a].concat(d||[]);return z(function(f,h){var l=a(f,h);if(e){e[0]=l;for(l=d.length;l--;)e[l+1]=d[l](f,h);return c.apply(t,
e)}return c(l)},{constant:!c.$stateful&&f.every(ec),inputs:!c.$stateful&&f})},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),z(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c;if(this.expect("?")&&(c=this.assignment(),this.consume(":"))){var d=
this.assignment();return z(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})}return a},logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},logicalAND:function(){for(var a=this.equality(),c;c=this.expect("&&");)a=this.binaryFn(a,c.text,this.equality(),!0);return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=","===","!==");)a=this.binaryFn(a,c.text,this.relational());
return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a=this.binaryFn(a,c.text,this.additive());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.text,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.text,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(hb.ZERO,
a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var c=this.identifier();return z(function(d,e,f){d=f||a(d,e);return null==d?t:c(d)},{assign:function(d,e,f){var g=a(d,f);g||a.assign(d,g={},f);return c.assign(g,e)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return z(function(e,f){var g=a(e,f),h=d(e,f);ta(h,c);return g?ma(g[h],c):t},{assign:function(e,f,g){var h=ta(d(e,g),c),l=ma(a(e,g),c);l||a.assign(e,
l={},g);return l[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var l=c?c(g,h):y(c)?t:g,k=a(g,h,l)||H;if(f)for(var m=d.length;m--;)f[m]=ma(d[m](g,h),e);ma(l,e);if(k){if(k.constructor===k)throw la("isecfn",e);if(k===Uf||k===Vf||k===Wf)throw la("isecff",e);}l=k.apply?k.apply(l,f):k(f[0],f[1],f[2],f[3],f[4]);return ma(l,e)}},arrayDeclaration:function(){var a=
[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return z(function(c,d){for(var e=[],f=0,g=a.length;f<g;f++)e.push(a[f](c,d));return e},{literal:!0,constant:a.every(ec),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.consume();d.constant?a.push(d.value):d.identifier?a.push(d.text):this.throwError("invalid key",d);this.consume(":");c.push(this.expression())}while(this.expect(","))
}this.consume("}");return z(function(d,f){for(var g={},h=0,l=c.length;h<l;h++)g[a[h]]=c[h](d,f);return g},{literal:!0,constant:c.every(ec),inputs:c})}};var Bf=ha(),Af=ha(),Cf=Object.prototype.valueOf,Ca=T("$sce"),na={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ja=T("$compile"),Z=Y.createElement("a"),id=Ba(M.location.href);Dc.$inject=["$provide"];jd.$inject=["$locale"];ld.$inject=["$locale"];var od=".",Mf={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:Ib("Month"),
MMM:Ib("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:Ib("Day"),EEE:Ib("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Hb(Math[0<a?"floor":"ceil"](a/60),2)+Hb(Math.abs(a%60),2))},ww:qd(2),w:qd(1)},Lf=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,
Kf=/^\-?\d+$/;kd.$inject=["$locale"];var Hf=da(Q),If=da(ub);md.$inject=["$parse"];var Td=da({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){if("a"===c[0].nodeName.toLowerCase()){var f="[object SVGAnimatedString]"===Da.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}}),vb={};s(Eb,function(a,c){if("multiple"!=a){var d=ya("ng-"+c);vb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],
function(a){g.$set(c,!!a)})}}}}});s(Nc,function(a,c){vb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Of))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});s(["src","srcset","href"],function(a){var c=ya("ng-"+a);vb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Da.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",
g=null);f.$observe(c,function(c){c?(f.$set(h,c),Ra&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Jb={$addControl:H,$$renameControl:function(a,c){a.$name=c},$removeControl:H,$setValidity:H,$setDirty:H,$setPristine:H,$setSubmitted:H};rd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var yd=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:rd,compile:function(a){a.addClass(Sa).addClass(kb);return{pre:function(a,d,g,h){if(!("action"in
g)){var l=function(c){a.$apply(function(){h.$commitViewValue();h.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",l,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",l,!1)},0,!1)})}var k=h.$$parentForm,m=h.$name;m&&(gb(a,null,m,h,m),g.$observe(g.name?"name":"ngForm",function(c){m!==c&&(gb(a,null,m,t,m),m=c,gb(a,null,m,h,m),k.$$renameControl(h,m))}));d.on("$destroy",function(){k.$removeControl(h);m&&gb(a,null,m,t,m);z(h,Jb)})}}}}}]},Ud=yd(),ge=yd(!0),
Nf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Yf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Zf=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,$f=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,zd=/^(\d{4})-(\d{2})-(\d{2})$/,Ad=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,jc=/^(\d{4})-W(\d\d)$/,Bd=/^(\d{4})-(\d\d)$/,Cd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Dd=
{text:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);hc(e)},date:jb("date",zd,Lb(zd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":jb("datetimelocal",Ad,Lb(Ad,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:jb("time",Cd,Lb(Cd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:jb("week",jc,function(a,c){if(qa(a))return a;if(F(a)){jc.lastIndex=0;var d=jc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,l=0,k=pd(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),l=c.getMilliseconds());
return new Date(e,0,k.getDate()+f,d,g,h,l)}}return NaN},"yyyy-Www"),month:jb("month",Bd,Lb(Bd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){td(a,c,d,e);ib(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:$f.test(a)?parseFloat(a):t});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!V(a))throw Mb("numfmt",a);a=a.toString()}return a});if(d.min||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||A(h)||a>=h};d.$observe("min",function(a){y(a)&&
!V(a)&&(a=parseFloat(a,10));h=V(a)&&!isNaN(a)?a:t;e.$validate()})}if(d.max||d.ngMax){var l;e.$validators.max=function(a){return e.$isEmpty(a)||A(l)||a<=l};d.$observe("max",function(a){y(a)&&!V(a)&&(a=parseFloat(a,10));l=V(a)&&!isNaN(a)?a:t;e.$validate()})}},url:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);hc(e);e.$$parserName="url";e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||Yf.test(d)}},email:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);hc(e);e.$$parserName="email";e.$validators.email=function(a,
c){var d=a||c;return e.$isEmpty(d)||Zf.test(d)}},radio:function(a,c,d,e){A(d.name)&&c.attr("name",++nb);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,l){var k=ud(l,a,"ngTrueValue",d.ngTrueValue,!0),m=ud(l,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};
e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return fa(a,k)});e.$parsers.push(function(a){return a?k:m})},hidden:H,button:H,submit:H,reset:H,file:H},xc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,l){l[0]&&(Dd[Q(h.type)]||Dd.text)(f,g,h,l[0],c,a,d,e)}}}}],ag=/^(true|false|\d+)$/,ye=function(){return{restrict:"A",priority:100,compile:function(a,c){return ag.test(c.ngValue)?function(a,c,f){f.$set("value",
a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},Zd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===t?"":a})}}}}],ae=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];
g.$observe("ngBindTemplate",function(a){f.textContent=a===t?"":a})}}}}],$d=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],xe=da({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
be=ic("",!0),de=ic("Odd",0),ce=ic("Even",1),ee=Ja({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),fe=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Cc={},bg={blur:!0,focus:!0};s("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=ya("ng-"+a);Cc[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=
d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};bg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var ie=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,l,k;c.$watch(e.ngIf,function(c){c?l||g(function(c,f){l=f;c[c.length++]=Y.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=
tb(h.clone),a.leave(k).then(function(){k=null}),h=null))})}}}],je=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ga.noop,compile:function(f,g){var h=g.ngInclude||g.src,l=g.onload||"",k=g.autoscroll;return function(f,g,q,s,r){var t=0,p,v,w,L=function(){v&&(v.remove(),v=null);p&&(p.$destroy(),p=null);w&&(d.leave(w).then(function(){v=null}),v=w,w=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=
function(){!y(k)||k&&!f.$eval(k)||c()},q=++t;e?(a(e,!0).then(function(a){if(q===t){var c=f.$new();s.template=a;a=r(c,function(a){L();d.enter(a,null,g).then(h)});p=c;w=a;p.$emit("$includeContentLoaded",e);f.$eval(l)}},function(){q===t&&(L(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(L(),s.template=null)})}}}}],Ae=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Fc(f.template,
Y).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],ke=Ja({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),we=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?U(f):f;e.$parsers.push(function(a){if(!A(a)){var c=[];a&&s(a.split(h),function(a){a&&c.push(g?U(a):a)});return c}});e.$formatters.push(function(a){return D(a)?
a.join(f):t});e.$isEmpty=function(a){return!a||!a.length}}}},kb="ng-valid",vd="ng-invalid",Sa="ng-pristine",Kb="ng-dirty",xd="ng-pending",Mb=new T("ngModel"),cg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,l,k,m){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=t;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;
this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=t;this.$name=m(d.name||"",!1)(a);var n=f(d.ngModel),q=n.assign,u=n,r=q,O=null,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");u=function(a){var d=n(a);G(d)&&(d=c(a));return d};r=function(a,c){G(n(a))?g(a,{$$$p:p.$modelValue}):q(a,p.$modelValue)}}else if(!n.assign)throw Mb("nonassign",d.ngModel,va(e));
};this.$render=H;this.$isEmpty=function(a){return A(a)||""===a||null===a||a!==a};var v=e.inheritedData("$formController")||Jb,w=0;sd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:v,$animate:g});this.$setPristine=function(){p.$dirty=!1;p.$pristine=!0;g.removeClass(e,Kb);g.addClass(e,Sa)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=!1;g.removeClass(e,Sa);g.addClass(e,Kb);v.$setDirty()};this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;g.setClass(e,
"ng-untouched","ng-touched")};this.$setTouched=function(){p.$touched=!0;p.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(O);p.$viewValue=p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!V(p.$modelValue)||!isNaN(p.$modelValue)){var a=p.$$rawModelValue,c=p.$valid,d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;p.$$runValidators(p.$error[p.$$parserName||"parse"]?!1:t,a,p.$$lastCommittedViewValue,function(f){e||c===f||(p.$modelValue=
f?a:t,p.$modelValue!==d&&p.$$writeModelToScope())})}};this.$$runValidators=function(a,c,d,e){function f(){var a=!0;s(p.$validators,function(e,f){var g=e(c,d);a=a&&g;h(f,g)});return a?!0:(s(p.$asyncValidators,function(a,c){h(c,null)}),!1)}function g(){var a=[],e=!0;s(p.$asyncValidators,function(f,g){var l=f(c,d);if(!l||!G(l.then))throw Mb("$asyncValidators",l);h(g,t);a.push(l.then(function(){h(g,!0)},function(a){e=!1;h(g,!1)}))});a.length?k.all(a).then(function(){l(e)},H):l(!0)}function h(a,c){m===
w&&p.$setValidity(a,c)}function l(a){m===w&&e(a)}w++;var m=w;(function(a){var c=p.$$parserName||"parse";if(a===t)h(c,null);else if(h(c,a),!a)return s(p.$validators,function(a,c){h(c,null)}),s(p.$asyncValidators,function(a,c){h(c,null)}),!1;return!0})(a)?f()?g():l(!1):l(!1)};this.$commitViewValue=function(){var a=p.$viewValue;h.cancel(O);if(p.$$lastCommittedViewValue!==a||""===a&&p.$$hasNativeValidators)p.$$lastCommittedViewValue=a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=
function(){var c=p.$$lastCommittedViewValue,d=A(c)?t:!0;if(d)for(var e=0;e<p.$parsers.length;e++)if(c=p.$parsers[e](c),A(c)){d=!1;break}V(p.$modelValue)&&isNaN(p.$modelValue)&&(p.$modelValue=u(a));var f=p.$modelValue,g=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=c;g&&(p.$modelValue=c,p.$modelValue!==f&&p.$$writeModelToScope());p.$$runValidators(d,c,p.$$lastCommittedViewValue,function(a){g||(p.$modelValue=a?c:t,p.$modelValue!==f&&p.$$writeModelToScope())})};this.$$writeModelToScope=function(){r(a,
p.$modelValue);s(p.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};this.$setViewValue=function(a,c){p.$viewValue=a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=p.$options;e&&y(e.debounce)&&(e=e.debounce,V(e)?d=e:V(e[c])?d=e[c]:V(e["default"])&&(d=e["default"]));h.cancel(O);d?O=h(function(){p.$commitViewValue()},d):l.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var c=
u(a);if(c!==p.$modelValue){p.$modelValue=p.$$rawModelValue=c;for(var d=p.$formatters,e=d.length,f=c;e--;)f=d[e](f);p.$viewValue!==f&&(p.$viewValue=p.$$lastCommittedViewValue=f,p.$render(),p.$$runValidators(t,c,f,H))}return c})}],ve=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:cg,priority:1,compile:function(c){c.addClass(Sa).addClass("ng-untouched").addClass(kb);return{pre:function(a,c,f,g){var h=g[0],l=g[1]||Jb;h.$$setOptions(g[2]&&g[2].$options);
l.$addControl(h);f.$observe("name",function(a){h.$name!==a&&l.$$renameControl(h,a)});a.$on("$destroy",function(){l.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],dg=/(\s+|^)default(\s+|$)/,ze=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=
this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==t?(this.$options.updateOnDefault=!1,this.$options.updateOn=U(this.$options.updateOn.replace(dg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},le=Ja({terminal:!0,priority:1E3}),me=["$locale","$interpolate",function(a,c){var d=/{}/g,e=/^when(Minus)?(.+)$/;return{restrict:"EA",link:function(f,g,h){function l(a){g.text(a||"")}var k=h.count,m=h.$attr.when&&g.attr(h.$attr.when),n=h.offset||
0,q=f.$eval(m)||{},u={},m=c.startSymbol(),r=c.endSymbol(),t=m+k+"-"+n+r,p=ga.noop,v;s(h,function(a,c){var d=e.exec(c);d&&(d=(d[1]?"-":"")+Q(d[2]),q[d]=g.attr(h.$attr[c]))});s(q,function(a,e){u[e]=c(a.replace(d,t))});f.$watch(k,function(c){c=parseFloat(c);var d=isNaN(c);d||c in q||(c=a.pluralCat(c-n));c===v||d&&isNaN(v)||(p(),p=f.$watch(u[c],l),v=c)})}}}],ne=["$parse","$animate",function(a,c){var d=T("ngRepeat"),e=function(a,c,d,e,k,m,n){a[d]=e;k&&(a[k]=m);a.$index=c;a.$first=0===c;a.$last=c===n-1;
a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,l=Y.createComment(" end ngRepeat: "+h+" "),k=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw d("iexp",h);var m=k[1],n=k[2],q=k[3],u=k[4],k=m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!k)throw d("iidexp",m);var r=k[3]||k[1],
y=k[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(q)))throw d("badident",q);var p,v,w,A,z={$id:Na};u?p=a(u):(w=function(a,c){return Na(c)},A=function(a){return a});return function(a,f,g,k,m){p&&(v=function(c,d,e){y&&(z[y]=c);z[r]=d;z.$index=e;return p(a,z)});var u=ha();a.$watchCollection(n,function(g){var k,p,n=f[0],E,z=ha(),H,S,N,D,G,C,I;q&&(a[q]=g);if(Ta(g))G=g,p=v||w;else{p=v||A;G=[];for(I in g)g.hasOwnProperty(I)&&
"$"!=I.charAt(0)&&G.push(I);G.sort()}H=G.length;I=Array(H);for(k=0;k<H;k++)if(S=g===G?k:G[k],N=g[S],D=p(S,N,k),u[D])C=u[D],delete u[D],z[D]=C,I[k]=C;else{if(z[D])throw s(I,function(a){a&&a.scope&&(u[a.id]=a)}),d("dupes",h,D,N);I[k]={id:D,scope:t,clone:t};z[D]=!0}for(E in u){C=u[E];D=tb(C.clone);c.leave(D);if(D[0].parentNode)for(k=0,p=D.length;k<p;k++)D[k].$$NG_REMOVED=!0;C.scope.$destroy()}for(k=0;k<H;k++)if(S=g===G?k:G[k],N=g[S],C=I[k],C.scope){E=n;do E=E.nextSibling;while(E&&E.$$NG_REMOVED);C.clone[0]!=
E&&c.move(tb(C.clone),null,B(n));n=C.clone[C.clone.length-1];e(C.scope,k,r,N,y,S,H)}else m(function(a,d){C.scope=d;var f=l.cloneNode(!1);a[a.length++]=f;c.enter(a,null,B(n));n=f;C.clone=a;z[C.id]=C;e(C.scope,k,r,N,y,S,H)});u=z})}}}}],oe=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],he=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,
d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],pe=Ja(function(a,c,d){a.$watchCollection(d.ngStyle,function(a,d){d&&a!==d&&s(d,function(a,d){c.css(d,"")});a&&c.css(a)})}),qe=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],l=[],k=[],m=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;
for(e=l.length;d<e;++d)a.cancel(l[d]);d=l.length=0;for(e=k.length;d<e;++d){var r=tb(h[d].clone);k[d].$destroy();(l[d]=a.leave(r)).then(m(l,d))}h.length=0;k.length=0;(g=f.cases["!"+c]||f.cases["?"])&&s(g,function(c){c.transclude(function(d,e){k.push(e);var f=c.element;d[d.length++]=Y.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],re=Ja({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=
e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),se=Ja({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),ue=Ja({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw T("ngTransclude")("orphan",va(c));f(function(a){c.empty();c.append(a)})}}),Vd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==
d.type&&a.put(d.id,c[0].text)}}}],eg=T("ngOptions"),te=da({restrict:"A",terminal:!0}),Wd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:H};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var l=this,k={},m=e,n;l.databound=d.ngModel;
l.init=function(a,c,d){m=a;n=d};l.addOption=function(c,d){Ma(c,'"option value"');k[c]=!0;m.$viewValue==c&&(a.val(c),n.parent()&&n.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};l.removeOption=function(a){this.hasOption(a)&&(delete k[a],m.$viewValue===a&&this.renderUnknownOption(a))};l.renderUnknownOption=function(c){c="? "+Na(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};l.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){l.renderUnknownOption=
H})}],link:function(e,g,h,l){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(C.parent()&&C.remove(),c.val(a),""===a&&p.prop("selected",!0)):A(a)&&p?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){C.parent()&&C.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new db(d.$viewValue);s(c.find("option"),function(c){c.selected=y(a.get(c.value))})};a.$watch(function(){fa(e,d.$viewValue)||(e=ra(d.$viewValue),
d.$render())});c.on("change",function(){a.$apply(function(){var a=[];s(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function h(a,c,d){T[x]=d;G&&(T[G]=c);return a(e,T)}function k(a){var c;if(u)if(M&&D(a)){c=new db([]);for(var d=0;d<a.length;d++)c.put(h(M,null,a[d]),!0)}else c=new db(a);else M&&(a=h(M,null,a));return function(d,e){var f;f=M?M:B?B:F;return u?y(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){v||(e.$$postDigest(p),v=!0)}function m(a,
c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function p(){v=!1;var a={"":[]},c=[""],d,l,n,r,t;n=g.$viewValue;r=P(e)||[];var B=G?Object.keys(r).sort():r,x,A,D,F,N={};t=k(n);var J=!1,U,V;Q={};for(F=0;D=B.length,F<D;F++){x=F;if(G&&(x=B[F],"$"===x.charAt(0)))continue;A=r[x];d=h(I,x,A)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=t(x,A);J=J||d;A=h(C,x,A);A=y(A)?A:"";V=M?M(e,T):G?B[F]:F;M&&(Q[V]=x);l.push({id:V,label:A,selected:d})}u||(z||null===n?a[""].unshift({id:"",label:"",selected:!J}):J||a[""].unshift({id:"?",label:"",
selected:!0}));x=0;for(B=c.length;x<B;x++){d=c[x];l=a[d];R.length<=x?(n={element:H.clone().attr("label",d),label:l.label},r=[n],R.push(r),f.append(n.element)):(r=R[x],n=r[0],n.label!=d&&n.element.attr("label",n.label=d));J=null;F=0;for(D=l.length;F<D;F++)d=l[F],(t=r[F+1])?(J=t.element,t.label!==d.label&&(m(N,t.label,!1),m(N,d.label,!0),J.text(t.label=d.label),J.prop("label",t.label)),t.id!==d.id&&J.val(t.id=d.id),J[0].selected!==d.selected&&(J.prop("selected",t.selected=d.selected),Ra&&J.prop("selected",
t.selected))):(""===d.id&&z?U=z:(U=w.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),r.push(t={element:U,label:d.label,id:d.id,selected:d.selected}),m(N,d.label,!0),J?J.after(U):n.element.append(U),J=U);for(F++;r.length>F;)d=r.pop(),m(N,d.label,!1),d.element.remove()}for(;R.length>x;){l=R.pop();for(F=1;F<l.length;++F)m(N,l[F].label,!1);l[0].element.remove()}s(N,function(a,c){0<a?q.addOption(c):0>a&&q.removeOption(c)})}var n;if(!(n=r.match(d)))throw eg("iexp",
r,va(f));var C=c(n[2]||n[1]),x=n[4]||n[6],A=/ as /.test(n[0])&&n[1],B=A?c(A):null,G=n[5],I=c(n[3]||""),F=c(n[2]?n[1]:x),P=c(n[7]),M=n[8]?c(n[8]):null,Q={},R=[[{element:f,label:""}]],T={};z&&(a(z)(e),z.removeClass("ng-scope"),z.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=P(e)||[],c;if(u)c=[],s(f.val(),function(d){d=M?Q[d]:d;c.push("?"===d?t:""===d?null:h(B?B:F,d,a[d]))});else{var d=M?Q[f.val()]:f.val();c="?"===d?t:""===d?null:h(B?B:F,d,a[d])}g.$setViewValue(c);p()})});g.$render=
p;e.$watchCollection(P,l);e.$watchCollection(function(){var a=P(e),c;if(a&&D(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(C,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(C,d,a[d]));return c},l);u&&e.$watchCollection(function(){return g.$modelValue},l)}if(l[1]){var q=l[0];l=l[1];var u=h.multiple,r=h.ngOptions,z=!1,p,v=!1,w=B(Y.createElement("option")),H=B(Y.createElement("optgroup")),C=w.clone();h=0;for(var x=g.children(),G=x.length;h<G;h++)if(""===x[h].value){p=z=x.eq(h);
break}q.init(l,z,C);u&&(l.$isEmpty=function(a){return!a||0===a.length});r?n(e,g,l):u?m(e,g,l):k(e,g,l,q)}}}}],Yd=["$interpolate",function(a){var c={addOption:H,removeOption:H};return{restrict:"E",priority:100,compile:function(d,e){if(A(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),m=k.data("$selectController")||k.parent().data("$selectController");m&&m.databound||(m=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&m.removeOption(c);m.addOption(a,
d)}):m.addOption(e.value,d);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],Xd=da({restrict:"E",terminal:!1}),zc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},yc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){F(a)&&0<a.length&&
(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw T("ngPattern")("noregexp",g,a,va(c));f=a||t;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||A(f)||f.test(a)}}}}},Bc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=ba(a);f=isNaN(a)?-1:a;e.$validate()});e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(a)||c.length<=f}}}}},Ac=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,
d,e){if(e){var f=0;d.$observe("minlength",function(a){f=ba(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}};M.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(Nd(),Pd(ga),B(Y).ready(function(){Jd(Y,sc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map

//
// vendor/angular-file-upload/angular-file-upload-shim.min.js
//
/*! 1.4.0 */
!function(){function a(a){if(!a.__listeners){a.upload||(a.upload={}),a.__listeners=[];var b=a.upload.addEventListener;a.upload.addEventListener=function(c,d){a.__listeners[c]=d,b&&b.apply(this,arguments)}}}var b=function(){try{var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(a)return!0}catch(b){if(void 0!=navigator.mimeTypes["application/x-shockwave-flash"])return!0}return!1},c=function(a,b){window.XMLHttpRequest.prototype[a]=b(window.XMLHttpRequest.prototype[a])};if(window.XMLHttpRequest&&(window.FormData?c("setRequestHeader",function(a){return function(b,c){if("__setXHR_"===b){var d=c(this);d instanceof Function&&d(this)}else a.apply(this,arguments)}}):(c("open",function(b){return function(c,d,e){a(this),this.__url=d,b.apply(this,[c,d,e])}}),c("getResponseHeader",function(a){return function(b){return this.__fileApiXHR?this.__fileApiXHR.getResponseHeader(b):a.apply(this,[b])}}),c("getAllResponseHeaders",function(a){return function(){return this.__fileApiXHR?this.__fileApiXHR.abort():null==a?null:a.apply(this)}}),c("abort",function(a){return function(){return this.__fileApiXHR?this.__fileApiXHR.abort():null==a?null:a.apply(this)}}),c("setRequestHeader",function(b){return function(c,d){if("__setXHR_"===c){a(this);var e=d(this);e instanceof Function&&e(this)}else this.__requestHeaders=this.__requestHeaders||{},this.__requestHeaders[c]=d,b.apply(this,arguments)}}),c("send",function(a){return function(){var c=this;if(arguments[0]&&arguments[0].__isShim){var d=arguments[0],e={url:c.__url,complete:function(a,b){!a&&c.__listeners.load&&c.__listeners.load({type:"load",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),!a&&c.__listeners.loadend&&c.__listeners.loadend({type:"loadend",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),"abort"===a&&c.__listeners.abort&&c.__listeners.abort({type:"abort",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),void 0!==b.status&&Object.defineProperty(c,"status",{get:function(){return b.status}}),void 0!==b.statusText&&Object.defineProperty(c,"statusText",{get:function(){return b.statusText}}),Object.defineProperty(c,"readyState",{get:function(){return 4}}),void 0!==b.response&&Object.defineProperty(c,"response",{get:function(){return b.response}}),Object.defineProperty(c,"responseText",{get:function(){return b.responseText}}),c.__fileApiXHR=b,c.onreadystatechange()},fileprogress:function(a){a.target=c,c.__listeners.progress&&c.__listeners.progress(a),c.__total=a.total,c.__loaded=a.loaded},headers:c.__requestHeaders};e.data={},e.files={};for(var f=0;f<d.data.length;f++){var g=d.data[f];null!=g.val&&null!=g.val.name&&null!=g.val.size&&null!=g.val.type?e.files[g.key]=g.val:e.data[g.key]=g.val}setTimeout(function(){if(!b())throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';c.__fileApiXHR=FileAPI.upload(e)},1)}else a.apply(c,arguments)}})),window.XMLHttpRequest.__isShim=!0),!window.FormData){var d=function(a){if(!b())throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';if(!a.__isWrapped&&(null!=a.getAttribute("ng-file-select")||null!=a.getAttribute("data-ng-file-select"))){var c=document.createElement("div");c.innerHTML='<div class="js-fileapi-wrapper" style="position:relative; overflow:hidden"></div>',c=c.firstChild;var d=a.parentNode;d.insertBefore(c,a),d.removeChild(a),c.appendChild(a),a.__isWrapped=!0}},e=function(a){return function(b){var c=FileAPI.getFiles(b);b.target||(b.target={}),b.target.files=c,b.target.files.item=function(a){return b.target.files[a]||null},a(b)}},f=function(a,b){return("change"===b.toLowerCase()||"onchange"===b.toLowerCase())&&"file"==a.getAttribute("type")};HTMLInputElement.prototype.addEventListener&&(HTMLInputElement.prototype.addEventListener=function(a){return function(b,c,g,h){f(this,b)?(d(this),a.apply(this,[b,e(c),g,h])):a.apply(this,[b,c,g,h])}}(HTMLInputElement.prototype.addEventListener)),HTMLInputElement.prototype.attachEvent&&(HTMLInputElement.prototype.attachEvent=function(a){return function(b,c){f(this,b)?(d(this),a.apply(this,[b,e(c)])):a.apply(this,[b,c])}}(HTMLInputElement.prototype.attachEvent)),window.FormData=FormData=function(){return{append:function(a,b,c){this.data.push({key:a,val:b,name:c})},data:[],__isShim:!0}},function(){if(window.FileAPI||(window.FileAPI={}),!FileAPI.upload){var a,c,d,e,f,g=document.createElement("script"),h=document.getElementsByTagName("script");if(window.FileAPI.jsUrl)a=window.FileAPI.jsUrl;else if(window.FileAPI.jsPath)c=window.FileAPI.jsPath;else for(d=0;d<h.length;d++)if(f=h[d].src,e=f.indexOf("angular-file-upload-shim.js"),-1==e&&(e=f.indexOf("angular-file-upload-shim.min.js")),e>-1){c=f.substring(0,e);break}null==FileAPI.staticPath&&(FileAPI.staticPath=c),g.setAttribute("src",a||c+"FileAPI.min.js"),document.getElementsByTagName("head")[0].appendChild(g),FileAPI.hasFlash=b()}}()}window.FileReader||(window.FileReader=function(){function a(a,c){var d={type:a,target:b,loaded:c.loaded,total:c.total,error:c.error};return null!=c.result&&(d.target.result=c.result),d}var b=this,c=!1;this.listeners={},this.addEventListener=function(a,c){b.listeners[a]=b.listeners[a]||[],b.listeners[a].push(c)},this.removeEventListener=function(a,c){b.listeners[a]&&b.listeners[a].splice(b.listeners[a].indexOf(c),1)},this.dispatchEvent=function(a){var c=b.listeners[a.type];if(c)for(var d=0;d<c.length;d++)c[d].call(b,a)},this.onabort=this.onerror=this.onload=this.onloadstart=this.onloadend=this.onprogress=null;var d=function(d){if(c||(c=!0,b.onloadstart&&this.onloadstart(a("loadstart",d))),"load"===d.type){b.onloadend&&b.onloadend(a("loadend",d));var e=a("load",d);b.onload&&b.onload(e),b.dispatchEvent(e)}else if("progress"===d.type){var e=a("progress",d);b.onprogress&&b.onprogress(e),b.dispatchEvent(e)}else{var e=a("error",d);b.onerror&&b.onerror(e),b.dispatchEvent(e)}};this.readAsArrayBuffer=function(a){FileAPI.readAsBinaryString(a,d)},this.readAsBinaryString=function(a){FileAPI.readAsBinaryString(a,d)},this.readAsDataURL=function(a){FileAPI.readAsDataURL(a,d)},this.readAsText=function(a){FileAPI.readAsText(a,d)}})}();
//
// vendor/angular-file-upload/angular-file-upload.min.js
//
/*! 1.4.0 */
!function(){var a=angular.module("angularFileUpload",[]);a.service("$upload",["$http","$timeout",function(a,b){function c(c){c.method=c.method||"POST",c.headers=c.headers||{},c.transformRequest=c.transformRequest||function(b,c){return window.ArrayBuffer&&b instanceof window.ArrayBuffer?b:a.defaults.transformRequest[0](b,c)},window.XMLHttpRequest.__isShim&&(c.headers.__setXHR_=function(){return function(a){a&&(c.__XHR=a,c.xhrFn&&c.xhrFn(a),a.upload.addEventListener("progress",function(a){c.progress&&b(function(){c.progress&&c.progress(a)})},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&c.progress&&c.progress(a)},!1))}});var d=a(c);return d.progress=function(a){return c.progress=a,d},d.abort=function(){return c.__XHR&&b(function(){c.__XHR.abort()}),d},d.xhr=function(a){return c.xhrFn=a,d},d.then=function(a,b){return function(d,e,f){c.progress=f||c.progress;var g=b.apply(a,[d,e,f]);return g.abort=a.abort,g.progress=a.progress,g.xhr=a.xhr,g.then=a.then,g}}(d,d.then),d}this.upload=function(b){b.headers=b.headers||{},b.headers["Content-Type"]=void 0,b.transformRequest=b.transformRequest||a.defaults.transformRequest;var d=new FormData,e=b.transformRequest,f=b.data;return b.transformRequest=function(a,c){if(f)if(b.formDataAppender)for(var d in f){var g=f[d];b.formDataAppender(a,d,g)}else for(var d in f){var g=f[d];if("function"==typeof e)g=e(g,c);else for(var h=0;h<e.length;h++){var i=e[h];"function"==typeof i&&(g=i(g,c))}a.append(d,g)}if(null!=b.file){var j=b.fileFormDataName||"file";if("[object Array]"===Object.prototype.toString.call(b.file))for(var k="[object String]"===Object.prototype.toString.call(j),h=0;h<b.file.length;h++)a.append(k?j+h:j[h],b.file[h],b.file[h].name);else a.append(j,b.file,b.file.name)}return a},b.data=d,c(b)},this.http=function(a){return c(a)}}]),a.directive("ngFileSelect",["$parse","$timeout",function(a,b){return function(c,d,e){var f=a(e.ngFileSelect);d.bind("change",function(a){var d,e,g=[];if(d=a.target.files,null!=d)for(e=0;e<d.length;e++)g.push(d.item(e));b(function(){f(c,{$files:g,$event:a})})}),("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)&&d.bind("touchend",function(a){a.preventDefault(),a.target.click()})}}]),a.directive("ngFileDropAvailable",["$parse","$timeout",function(a,b){return function(c,d,e){if("draggable"in document.createElement("span")){var f=a(e.ngFileDropAvailable);b(function(){f(c)})}}}]),a.directive("ngFileDrop",["$parse","$timeout",function(a,b){return function(c,d,e){function f(a,b){if(b.isDirectory){var c=b.createReader();i++,c.readEntries(function(b){for(var c=0;c<b.length;c++)f(a,b[c]);i--})}else i++,b.file(function(b){i--,a.push(b)})}if("draggable"in document.createElement("span")){var g=null,h=a(e.ngFileDrop);d[0].addEventListener("dragover",function(a){b.cancel(g),a.stopPropagation(),a.preventDefault(),d.addClass(e.ngFileDragOverClass||"dragover")},!1),d[0].addEventListener("dragleave",function(){g=b(function(){d.removeClass(e.ngFileDragOverClass||"dragover")})},!1);var i=0;d[0].addEventListener("drop",function(a){a.stopPropagation(),a.preventDefault(),d.removeClass(e.ngFileDragOverClass||"dragover");var g=[],j=a.dataTransfer.items;if(j&&j.length>0&&j[0].webkitGetAsEntry)for(var k=0;k<j.length;k++)f(g,j[k].webkitGetAsEntry());else{var l=a.dataTransfer.files;if(null!=l)for(var k=0;k<l.length;k++)g.push(l.item(k))}!function m(d){b(function(){i?m(10):h(c,{$files:g,$event:a})},d||0)}()},!1)}}}])}();
//
// vendor/angularjs/1.3.11/angular-route.min.js
//
/*
 AngularJS v1.3.11
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,d,C){'use strict';function v(r,h,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,f,y){function z(){k&&(g.cancel(k),k=null);l&&(l.$destroy(),l=null);m&&(k=g.leave(m),k.then(function(){k=null}),m=null)}function x(){var b=r.current&&r.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),f=r.current;m=y(b,function(b){g.enter(b,null,m||c).then(function(){!d.isDefined(t)||t&&!a.$eval(t)||h()});z()});l=f.scope=b;l.$emit("$viewContentLoaded");
l.$eval(w)}else z()}var l,m,k,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,h,g){return{restrict:"ECA",priority:-400,link:function(a,c){var b=g.current,f=b.locals;c.html(f.$template);var y=d(c.contents());b.controller&&(f.$scope=a,f=h(b.controller,f),b.controllerAs&&(a[b.controllerAs]=f),c.data("$ngControllerController",f),c.children().data("$ngControllerController",f));y(a)}}}p=d.module("ngRoute",["ng"]).provider("$route",function(){function r(a,c){return d.extend(Object.create(a),
c)}function h(a,d){var b=d.caseInsensitiveMatch,f={originalPath:a,regexp:a},g=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;g.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=new RegExp("^"+a+"$",b?"i":"");return f}var g={};this.when=function(a,c){var b=d.copy(c);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);g[a]=d.extend(b,a&&h(a,b));if(a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";g[f]=d.extend({redirectTo:a},h(f,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,c,b,f,h,p,x){function l(b){var e=s.current;
(v=(n=k())&&e&&n.$$route===e.$$route&&d.equals(n.pathParams,e.pathParams)&&!n.reloadOnSearch&&!w)||!e&&!n||a.$broadcast("$routeChangeStart",n,e).defaultPrevented&&b&&b.preventDefault()}function m(){var u=s.current,e=n;if(v)u.params=e.params,d.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?c.path(t(e.redirectTo,e.params)).search(e.params).replace():c.url(e.redirectTo(e.pathParams,c.path(),c.search())).replace()),f.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,c;d.forEach(a,function(b,e){a[e]=d.isString(b)?h.get(b):h.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(c=e.templateUrl)&&(d.isFunction(c)&&(c=c(e.params)),c=x.getTrustedResourceUrl(c),d.isDefined(c)&&(e.loadedTemplateUrl=c,b=p(c)));d.isDefined(b)&&(a.$template=b);return f.all(a)}}).then(function(c){e==s.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function k(){var a,b;d.forEach(g,function(f,g){var q;if(q=!b){var h=c.path();q=f.keys;var l={};if(f.regexp)if(h=f.regexp.exec(h)){for(var k=1,m=h.length;k<m;++k){var n=q[k-1],p=h[k];n&&p&&(l[n.name]=p)}q=l}else q=null;else q=null;q=a=q}q&&(b=r(f,{params:d.extend({},c.search(),a),pathParams:a}),b.$$route=f)});return b||g[null]&&r(g[null],{params:{},pathParams:{}})}function t(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
g=f[1];c.push(b[g]);c.push(f[2]||"");delete b[g]}});return c.join("")}var w=!1,n,v,s={routes:g,reload:function(){w=!0;a.$evalAsync(function(){l();m()})},updateParams:function(a){if(this.current&&this.current.$$route){var b={},f=this;d.forEach(Object.keys(a),function(c){f.current.pathParams[c]||(b[c]=a[c])});a=d.extend({},this.current.params,a);c.path(t(this.current.$$route.originalPath,a));c.search(d.extend({},c.search(),b))}else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",
m);return s}]});var B=d.$$minErr("ngRoute");p.provider("$routeParams",function(){this.$get=function(){return{}}});p.directive("ngView",v);p.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

//
// vendor/angularjs/1.3.11/angular-resource.min.js
//
/*
 AngularJS v1.3.11
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(I,d,B){'use strict';function D(f,q){q=q||{};d.forEach(q,function(d,h){delete q[h]});for(var h in f)!f.hasOwnProperty(h)||"$"===h.charAt(0)&&"$"===h.charAt(1)||(q[h]=f[h]);return q}var w=d.$$minErr("$resource"),C=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;d.module("ngResource",["ng"]).provider("$resource",function(){var f=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$q",function(q,h){function t(d,g){this.template=d;this.defaults=s({},f.defaults,g);this.urlParams={}}function v(x,g,l,m){function c(b,k){var c={};k=s({},g,k);r(k,function(a,k){u(a)&&(a=a());var d;if(a&&a.charAt&&"@"==a.charAt(0)){d=b;var e=a.substr(1);if(null==e||""===e||"hasOwnProperty"===e||!C.test("."+e))throw w("badmember",e);for(var e=e.split("."),n=0,g=e.length;n<g&&d!==B;n++){var h=e[n];d=null!==d?d[h]:B}}else d=a;c[k]=d});return c}function F(b){return b.resource}function e(b){D(b||
{},this)}var G=new t(x,m);l=s({},f.defaults.actions,l);e.prototype.toJSON=function(){var b=s({},this);delete b.$promise;delete b.$resolved;return b};r(l,function(b,k){var g=/^(POST|PUT|PATCH)$/i.test(b.method);e[k]=function(a,y,m,x){var n={},f,l,z;switch(arguments.length){case 4:z=x,l=m;case 3:case 2:if(u(y)){if(u(a)){l=a;z=y;break}l=y;z=m}else{n=a;f=y;l=m;break}case 1:u(a)?l=a:g?f=a:n=a;break;case 0:break;default:throw w("badargs",arguments.length);}var t=this instanceof e,p=t?f:b.isArray?[]:new e(f),
A={},v=b.interceptor&&b.interceptor.response||F,C=b.interceptor&&b.interceptor.responseError||B;r(b,function(b,a){"params"!=a&&"isArray"!=a&&"interceptor"!=a&&(A[a]=H(b))});g&&(A.data=f);G.setUrlParams(A,s({},c(f,b.params||{}),n),b.url);n=q(A).then(function(a){var c=a.data,g=p.$promise;if(c){if(d.isArray(c)!==!!b.isArray)throw w("badcfg",k,b.isArray?"array":"object",d.isArray(c)?"array":"object");b.isArray?(p.length=0,r(c,function(a){"object"===typeof a?p.push(new e(a)):p.push(a)})):(D(c,p),p.$promise=
g)}p.$resolved=!0;a.resource=p;return a},function(a){p.$resolved=!0;(z||E)(a);return h.reject(a)});n=n.then(function(a){var b=v(a);(l||E)(b,a.headers);return b},C);return t?n:(p.$promise=n,p.$resolved=!1,p)};e.prototype["$"+k]=function(a,b,c){u(a)&&(c=b,b=a,a={});a=e[k].call(this,a,this,b,c);return a.$promise||a}});e.bind=function(b){return v(x,s({},g,b),l)};return e}var E=d.noop,r=d.forEach,s=d.extend,H=d.copy,u=d.isFunction;t.prototype={setUrlParams:function(f,g,l){var m=this,c=l||m.template,h,
e,q=m.urlParams={};r(c.split(/\W/),function(b){if("hasOwnProperty"===b)throw w("badname");!/^\d+$/.test(b)&&b&&(new RegExp("(^|[^\\\\]):"+b+"(\\W|$)")).test(c)&&(q[b]=!0)});c=c.replace(/\\:/g,":");g=g||{};r(m.urlParams,function(b,k){h=g.hasOwnProperty(k)?g[k]:m.defaults[k];d.isDefined(h)&&null!==h?(e=encodeURIComponent(h).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),c=c.replace(new RegExp(":"+
k+"(\\W|$)","g"),function(b,a){return e+a})):c=c.replace(new RegExp("(/?):"+k+"(\\W|$)","g"),function(b,a,c){return"/"==c.charAt(0)?c:a+c})});m.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");f.url=c.replace(/\/\\\./,"/.");r(g,function(b,c){m.urlParams[c]||(f.params=f.params||{},f.params[c]=b)})}};return v}]})})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map

//
// vendor/angularjs/1.3.11/angular-cookies.min.js
//
/*
 AngularJS v1.3.11
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,f,n){'use strict';f.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(e,b){var c={},g={},h,k=!1,l=f.copy,m=f.isUndefined;b.addPollFn(function(){var a=b.cookies();h!=a&&(h=a,l(a,g),l(a,c),k&&e.$apply())})();k=!0;e.$watch(function(){var a,d,e;for(a in g)m(c[a])&&b.cookies(a,n);for(a in c)d=c[a],f.isString(d)||(d=""+d,c[a]=d),d!==g[a]&&(b.cookies(a,d),e=!0);if(e)for(a in d=b.cookies(),c)c[a]!==d[a]&&(m(d[a])?delete c[a]:c[a]=d[a])});return c}]).factory("$cookieStore",
["$cookies",function(e){return{get:function(b){return(b=e[b])?f.fromJson(b):b},put:function(b,c){e[b]=f.toJson(c)},remove:function(b){delete e[b]}}}])})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map

//
// vendor/angularjs/1.3.11/angular-sanitize.min.js
//
/*
 AngularJS v1.3.11
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n,h,p){'use strict';function E(a){var d=[];s(d,h.noop).chars(a);return d.join("")}function g(a){var d={};a=a.split(",");var c;for(c=0;c<a.length;c++)d[a[c]]=!0;return d}function F(a,d){function c(a,b,c,l){b=h.lowercase(b);if(t[b])for(;f.last()&&u[f.last()];)e("",f.last());v[b]&&f.last()==b&&e("",b);(l=w[b]||!!l)||f.push(b);var m={};c.replace(G,function(a,b,d,c,e){m[b]=r(d||c||e||"")});d.start&&d.start(b,m,l)}function e(a,b){var c=0,e;if(b=h.lowercase(b))for(c=f.length-1;0<=c&&f[c]!=b;c--);
if(0<=c){for(e=f.length-1;e>=c;e--)d.end&&d.end(f[e]);f.length=c}}"string"!==typeof a&&(a=null===a||"undefined"===typeof a?"":""+a);var b,k,f=[],m=a,l;for(f.last=function(){return f[f.length-1]};a;){l="";k=!0;if(f.last()&&x[f.last()])a=a.replace(new RegExp("(.*)<\\s*\\/\\s*"+f.last()+"[^>]*>","i"),function(a,b){b=b.replace(H,"$1").replace(I,"$1");d.chars&&d.chars(r(b));return""}),e("",f.last());else{if(0===a.indexOf("\x3c!--"))b=a.indexOf("--",4),0<=b&&a.lastIndexOf("--\x3e",b)===b&&(d.comment&&d.comment(a.substring(4,
b)),a=a.substring(b+3),k=!1);else if(y.test(a)){if(b=a.match(y))a=a.replace(b[0],""),k=!1}else if(J.test(a)){if(b=a.match(z))a=a.substring(b[0].length),b[0].replace(z,e),k=!1}else K.test(a)&&((b=a.match(A))?(b[4]&&(a=a.substring(b[0].length),b[0].replace(A,c)),k=!1):(l+="<",a=a.substring(1)));k&&(b=a.indexOf("<"),l+=0>b?a:a.substring(0,b),a=0>b?"":a.substring(b),d.chars&&d.chars(r(l)))}if(a==m)throw L("badparse",a);m=a}e()}function r(a){if(!a)return"";var d=M.exec(a);a=d[1];var c=d[3];if(d=d[2])q.innerHTML=
d.replace(/</g,"&lt;"),d="textContent"in q?q.textContent:q.innerText;return a+d+c}function B(a){return a.replace(/&/g,"&amp;").replace(N,function(a){var c=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(c-55296)+(a-56320)+65536)+";"}).replace(O,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(a,d){var c=!1,e=h.bind(a,a.push);return{start:function(a,k,f){a=h.lowercase(a);!c&&x[a]&&(c=a);c||!0!==C[a]||(e("<"),e(a),h.forEach(k,function(c,f){var k=
h.lowercase(f),g="img"===a&&"src"===k||"background"===k;!0!==P[k]||!0===D[k]&&!d(c,g)||(e(" "),e(f),e('="'),e(B(c)),e('"'))}),e(f?"/>":">"))},end:function(a){a=h.lowercase(a);c||!0!==C[a]||(e("</"),e(a),e(">"));a==c&&(c=!1)},chars:function(a){c||e(B(a))}}}var L=h.$$minErr("$sanitize"),A=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,z=/^<\/\s*([\w:-]+)[^>]*>/,G=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,K=/^</,
J=/^<\//,H=/\x3c!--(.*?)--\x3e/g,y=/<!DOCTYPE([^>]*?)>/i,I=/<!\[CDATA\[(.*?)]]\x3e/g,N=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,O=/([^\#-~| |!])/g,w=g("area,br,col,hr,img,wbr");n=g("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");p=g("rp,rt");var v=h.extend({},p,n),t=h.extend({},n,g("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),u=h.extend({},p,g("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
n=g("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use");var x=g("script,style"),C=h.extend({},w,t,u,v,n),D=g("background,cite,href,longdesc,src,usemap,xlink:href");n=g("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width");
p=g("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan");
var P=h.extend({},D,p,n),q=document.createElement("pre"),M=/^(\s*)([\s\S]*?)(\s*)$/;h.module("ngSanitize",[]).provider("$sanitize",function(){this.$get=["$$sanitizeUri",function(a){return function(d){var c=[];F(d,s(c,function(c,b){return!/^unsafe/.test(a(c,b))}));return c.join("")}}]});h.module("ngSanitize").filter("linky",["$sanitize",function(a){var d=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/,c=/^mailto:/;return function(e,b){function k(a){a&&g.push(E(a))}
function f(a,c){g.push("<a ");h.isDefined(b)&&g.push('target="',b,'" ');g.push('href="',a.replace(/"/g,"&quot;"),'">');k(c);g.push("</a>")}if(!e)return e;for(var m,l=e,g=[],n,p;m=l.match(d);)n=m[0],m[2]||m[4]||(n=(m[3]?"http://":"mailto:")+n),p=m.index,k(l.substr(0,p)),f(n,m[0].replace(c,"")),l=l.substring(p+m[0].length);k(l);return a(g.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map

//
// vendor/angular-local-storage/angular-local-storage.min.js
//
/**
 * An Angular module that gives you access to the browsers local storage
 * @version v0.1.5 - 2014-11-04
 * @link https://github.com/grevory/angular-local-storage
 * @author grevory <greg@gregpike.ca>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */!function(a,b){"use strict";function c(a){return/^-?\d+\.?\d*$/.test(a.replace(/["']/g,""))}var d=b.isDefined,e=b.isUndefined,f=b.isNumber,g=b.isObject,h=b.isArray,i=b.extend,j=b.toJson,k=b.fromJson,l=b.module("LocalStorageModule",[]);l.provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){return this.prefix=a,this},this.setStorageType=function(a){return this.storageType=a,this},this.setStorageCookie=function(a,b){return this.cookie={expiry:a,path:b},this},this.setStorageCookieDomain=function(a){return this.cookie.domain=a,this},this.setNotify=function(a,b){return this.notify={setItem:a,removeItem:b},this},this.$get=["$rootScope","$window","$document","$parse",function(a,b,l,m){var n,o=this,p=o.prefix,q=o.cookie,r=o.notify,s=o.storageType;l?l[0]&&(l=l[0]):l=document,"."!==p.substr(-1)&&(p=p?p+".":"");var t=function(a){return p+a},u=function(){try{var c=s in b&&null!==b[s],d=t("__"+Math.round(1e7*Math.random()));return c&&(n=b[s],n.setItem(d,""),n.removeItem(d)),c}catch(e){return s="cookie",a.$broadcast("LocalStorageModule.notification.error",e.message),!1}}(),v=function(b,c){if(e(c)?c=null:(g(c)||h(c)||f(+c||c))&&(c=j(c)),!u||"cookie"===o.storageType)return u||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),B(b,c);try{(g(c)||h(c))&&(c=j(c)),n&&n.setItem(t(b),c),r.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:o.storageType})}catch(d){return a.$broadcast("LocalStorageModule.notification.error",d.message),B(b,c)}return!0},w=function(b){if(!u||"cookie"===o.storageType)return u||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),C(b);var d=n?n.getItem(t(b)):null;return d&&"null"!==d?"{"===d.charAt(0)||"["===d.charAt(0)||c(d)?k(d):d:null},x=function(b){if(!u||"cookie"===o.storageType)return u||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:"cookie"}),D(b);try{n.removeItem(t(b)),r.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:o.storageType})}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),D(b)}return!0},y=function(){if(!u)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var b=p.length,c=[];for(var d in n)if(d.substr(0,b)===p)try{c.push(d.substr(b))}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.Description),[]}return c},z=function(b){b=b||"";var c=p.slice(0,-1),d=new RegExp(c+"."+b);if(!u||"cookie"===o.storageType)return u||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),E();var e=p.length;for(var f in n)if(d.test(f))try{x(f.substr(e))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.message),E()}return!0},A=function(){try{return b.navigator.cookieEnabled||"cookie"in l&&(l.cookie.length>0||(l.cookie="test").indexOf.call(l.cookie,"test")>-1)}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),!1}}(),B=function(b,c){if(e(c))return!1;if((h(c)||g(c))&&(c=j(c)),!A)return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var d="",f=new Date,i="";if(null===c?(f.setTime(f.getTime()+-864e5),d="; expires="+f.toGMTString(),c=""):0!==q.expiry&&(f.setTime(f.getTime()+24*q.expiry*60*60*1e3),d="; expires="+f.toGMTString()),b){var k="; path="+q.path;q.domain&&(i="; domain="+q.domain),l.cookie=t(b)+"="+encodeURIComponent(c)+d+k+i}}catch(m){return a.$broadcast("LocalStorageModule.notification.error",m.message),!1}return!0},C=function(b){if(!A)return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var c=l.cookie&&l.cookie.split(";")||[],d=0;d<c.length;d++){for(var e=c[d];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(t(b)+"=")){var f=decodeURIComponent(e.substring(p.length+b.length+1,e.length));try{var g=JSON.parse(f);return k(g)}catch(h){return f}}}return null},D=function(a){B(a,null)},E=function(){for(var a=null,b=p.length,c=l.cookie.split(";"),d=0;d<c.length;d++){for(a=c[d];" "===a.charAt(0);)a=a.substring(1,a.length);var e=a.substring(b,a.indexOf("="));D(e)}},F=function(){return s},G=function(a,b,c,e){e=e||b;var f=w(e);return null===f&&d(c)?f=c:g(f)&&g(c)&&(f=i(c,f)),m(b).assign(a,f),a.$watch(b,function(a){v(e,a)},g(a[b]))},H=function(){for(var a=0,c=b[s],d=0;d<c.length;d++)0===c.key(d).indexOf(p)&&a++;return a};return{isSupported:u,getStorageType:F,set:v,add:v,get:w,keys:y,remove:x,clearAll:z,bind:G,deriveKey:t,length:H,cookie:{isSupported:A,set:B,add:B,get:C,remove:D,clearAll:E}}}]})}(window,window.angular);
//
// vendor/angular-cookie/angular-cookie.min.js
//
angular.module("ivpusic.cookie",["ipCookie"]),angular.module("ipCookie",["ng"]).factory("ipCookie",["$document",function(e){"use strict";function i(e){try{return decodeURIComponent(e)}catch(i){}}return function(){function t(t,n,r){var o,s,p,u,a,c,x,d,f;if(r=r||{},void 0!==n)return n="object"==typeof n?JSON.stringify(n):n+"","number"==typeof r.expires&&(f=r.expires,r.expires=new Date,-1===f?r.expires=new Date("Thu, 01 Jan 1970 00:00:00 GMT"):void 0!==r.expirationUnit?"hours"===r.expirationUnit?r.expires.setHours(r.expires.getHours()+f):"minutes"===r.expirationUnit?r.expires.setMinutes(r.expires.getMinutes()+f):"seconds"===r.expirationUnit?r.expires.setSeconds(r.expires.getSeconds()+f):r.expires.setDate(r.expires.getDate()+f):r.expires.setDate(r.expires.getDate()+f)),e[0].cookie=[encodeURIComponent(t),"=",encodeURIComponent(n),r.expires?"; expires="+r.expires.toUTCString():"",r.path?"; path="+r.path:"",r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join("");for(s=[],d=e[0].cookie,d&&(s=d.split("; ")),o={},x=!1,p=0;s.length>p;++p)if(s[p]){if(u=s[p],a=u.indexOf("="),c=u.substring(0,a),n=i(u.substring(a+1)),angular.isUndefined(n))continue;if(void 0===t||t===c){try{o[c]=JSON.parse(n)}catch(g){o[c]=n}if(t===c)return o[c];x=!0}}return x&&void 0===t?o:void 0}return t.remove=function(e,i){var n=void 0!==t(e);return n&&(i||(i={}),i.expires=-1,t(e,"",i)),n},t}()}]);
//
// vendor/angular-modal/js/ngDialog.js
//
(function(b,a){if(typeof module!=="undefined"&&module.exports){module.exports=a(require("angular"))}else{if(typeof define==="function"&&define.amd){define(["angular"],a)
}else{a(b.angular)}}}(this,function(b,k){var h=b.module("ngDialog",[]);var a=b.element;var g=b.isDefined;var j=(document.body||document.documentElement).style;
var d=g(j.animation)||g(j.WebkitAnimation)||g(j.MozAnimation)||g(j.MsAnimation)||g(j.OAnimation);var c="animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend";
var e="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
var f=false;var i;h.provider("ngDialog",function(){var m=this.defaults={className:"ngdialog-theme-default",plain:false,showClose:true,closeByDocument:true,closeByEscape:true,closeByNavigation:false,appendTo:false,preCloseCallback:false,overlay:true,cache:true,trapFocus:true,preserveFocus:true,ariaAuto:true,ariaRole:null,ariaLabelledById:null,ariaLabelledBySelector:null,ariaDescribedById:null,ariaDescribedBySelector:null};
this.setForceBodyReload=function(q){f=q||false};this.setDefaults=function(q){b.extend(m,q)};var p=0,o=0,l,n={};this.$get=["$document","$templateCache","$compile","$q","$http","$rootScope","$timeout","$window","$controller",function(t,y,r,w,v,x,z,A,s){var q=t.find("body");
var u=t.find("html");if(f){x.$on("$locationChangeSuccess",function(){q=t.find("body")})}var B={onDocumentKeydown:function(D){if(D.keyCode===27){C.close("$escape")
}},activate:function(D){var E=D.data("$ngDialogOptions");if(E.trapFocus){D.on("keydown",B.onTrapFocusKeydown);q.on("keydown",B.onTrapFocusKeydown)
}},deactivate:function(D){D.off("keydown",B.onTrapFocusKeydown);q.off("keydown",B.onTrapFocusKeydown)},deactivateAll:function(D){b.forEach(function(F){var E=b.element(F);
B.deactivate(E)})},setBodyPadding:function(E){var D=parseInt((q.css("padding-right")||0),10);q.css("padding-right",(D+E)+"px");
q.data("ng-dialog-original-padding",D)},resetBodyPadding:function(){var D=q.data("ng-dialog-original-padding");if(D){q.css("padding-right",D+"px")
}else{q.css("padding-right","")}},setBodyTopPosition:function(){var E;var F=q.css("top");if(F!="auto"&&F!=""){E=parseInt(F,10)
}else{E=0}var D=A.pageYOffset;q.css("top",-(E+D)+"px");q.data("ng-dialog-original-top",E);q.data("ng-dialog-original-scroll",D)
},resetBodyTopPosition:function(){var D=q.data("ng-dialog-original-top");var E=q.data("ng-dialog-original-scroll");if(D){q.css("top",D+"px")
}else{q.css("top","")}if(E){A.scrollTo(0,E)}},performCloseDialog:function(D,I){var G=D.attr("id");var E=a(document.getElementById(D.attr("id")+"Modal"));
if(typeof A.Hammer!=="undefined"){var F=i.hammerTime;F.off("tap",l);F.destroy&&F.destroy();delete i.hammerTime}else{D.unbind("click")
}if(o===1){q.unbind("keydown")}if(!D.hasClass("ngdialog-closing")){o-=1}var H=D.data("$ngDialogPreviousFocus");if(H){H.focus()
}x.$broadcast("ngDialog.closing",D);o=o<0?0:o;if(d){i.$destroy();D.unbind(c).bind(c,function(){D.remove();if(o===0){u.removeClass("ngdialog-open");
q.removeClass("ngdialog-open");q.find(".recipe-subNav").show();B.resetBodyPadding();B.resetBodyTopPosition();E.remove()}x.$broadcast("ngDialog.closed",D)
}).addClass("ngdialog-closing");E.unbind(c).bind(c,function(){E.remove()}).addClass("ngdialog-closing")}else{i.$destroy();D.remove();
E.remove();if(o===0){u.removeClass("ngdialog-open");q.removeClass("ngdialog-open");q.find(".recipe-subNav").show();B.resetBodyPadding();
B.resetBodyTopPosition()}x.$broadcast("ngDialog.closed",D)}if(n[G]){n[G].resolve({id:G,value:I,$dialog:D,remainingDialogs:o});
delete n[G]}},closeDialog:function(D,G){var E=D.data("$ngDialogPreCloseCallback");if(E&&b.isFunction(E)){var F=E.call(D,G);if(b.isObject(F)){if(F.closePromise){F.closePromise.then(function(){B.performCloseDialog(D,G)
})}else{F.then(function(){B.performCloseDialog(D,G)},function(){return})}}else{if(F!==false){B.performCloseDialog(D,G)}}}else{B.performCloseDialog(D,G)
}},onTrapFocusKeydown:function(G){var F=b.element(G.currentTarget);var D;if(F.hasClass("ngdialog")){D=F}else{D=B.getActiveDialog();
if(D===null){return}}var H=(G.keyCode===9);var E=(G.shiftKey===true);if(H){B.handleTab(D,G,E)}},handleTab:function(D,H,E){var I=B.getFocusableElements(D);
if(I.length===0){if(document.activeElement){document.activeElement.blur()}return}var G=document.activeElement;var J=Array.prototype.indexOf.call(I,G);
var L=(J===-1);var K=(J===0);var M=(J===I.length-1);var F=false;if(E){if(L||K){I[I.length-1].focus();F=true}}else{if(L||M){I[0].focus();
F=true}}if(F){H.preventDefault();H.stopPropagation()}},autoFocus:function(D){var H=D[0];var E=H.querySelector("*[autofocus]");
if(E!==null){E.focus();if(document.activeElement===E){return}}var I=B.getFocusableElements(D);if(I.length>0){I[0].focus();return
}var G=B.filterVisibleElements(H.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span"));if(G.length>0){var F=G[0];a(F).attr("tabindex","0");
F.focus()}},getFocusableElements:function(D){var E=D[0];var F=E.querySelectorAll(e);return B.filterVisibleElements(F)},filterVisibleElements:function(E){var G=[];
for(var F=0;F<E.length;F++){var D=E[F];if(D.offsetWidth>0||D.offsetHeight>0){G.push(D)}}return G},getActiveDialog:function(){var D=document.querySelectorAll(".ngdialog");
if(D.length===0){return null}return a(D[D.length-1])},applyAriaAttributes:function(D,F){if(F.ariaAuto){if(!F.ariaRole){var E=(B.getFocusableElements(D).length>0)?"dialog":"alertdialog";
F.ariaRole=E}if(!F.ariaLabelledBySelector){F.ariaLabelledBySelector="h1,h2,h3,h4,h5,h6"}if(!F.ariaDescribedBySelector){F.ariaDescribedBySelector="article,section,p"
}}if(F.ariaRole){D.attr("role",F.ariaRole)}B.applyAriaAttribute(D,"aria-labelledby",F.ariaLabelledById,F.ariaLabelledBySelector);
B.applyAriaAttribute(D,"aria-describedby",F.ariaDescribedById,F.ariaDescribedBySelector)},applyAriaAttribute:function(D,E,I,J){if(I){D.attr(E,I)
}if(J){var F=D.attr("id");var G=D[0].querySelector(J);if(!G){return}var H=F+"-"+E;a(G).attr("id",H);D.attr(E,H);return H}}};var C={open:function(J){var K=this;
var I=b.copy(m);J=J||{};b.extend(I,J);p+=1;K.latestID="ngdialog"+p;var F;n[K.latestID]=F=w.defer();i=b.isObject(I.scope)?I.scope.$new():x.$new();
var D,E;w.when(G(I.template||I.templateUrl)).then(function(Q){y.put(I.template||I.templateUrl,Q);if(I.showClose){Q+='<div class="ngdialog-close"></div>'
}K.$result=D=a('<div id="ngdialog'+p+'" class="ngdialog"></div>');D.html('<div class="ngdialog-content" role="document">'+Q+"</div>");
D.data("$ngDialogOptions",I);if(I.data&&b.isString(I.data)){var N=I.data.replace(/^\s*/,"")[0];i.ngDialogData=(N==="{"||N==="[")?b.fromJson(I.data):I.data
}else{if(I.data&&b.isObject(I.data)){i.ngDialogData=I.data}}if(I.controller&&(b.isString(I.controller)||b.isArray(I.controller)||b.isFunction(I.controller))){var M=s(I.controller,{$scope:i,$element:D});
D.data("$ngDialogControllerController",M)}if(I.className){D.addClass(I.className)}if(I.appendTo&&b.isString(I.appendTo)){E=b.element(document.querySelector(I.appendTo))
}else{E=q}B.applyAriaAttributes(D,I);var L;if(I.overlay){L=a('<div id="ngdialog'+p+'Modal" class="ngdialog-overlay"></div>');
D.after(L)}if(I.preCloseCallback){var P;if(b.isFunction(I.preCloseCallback)){P=I.preCloseCallback}else{if(b.isString(I.preCloseCallback)){if(i){if(b.isFunction(i[I.preCloseCallback])){P=i[I.preCloseCallback]
}else{if(i.$parent&&b.isFunction(i.$parent[I.preCloseCallback])){P=i.$parent[I.preCloseCallback]}else{if(x&&b.isFunction(x[I.preCloseCallback])){P=x[I.preCloseCallback]
}}}}}}if(P){D.data("$ngDialogPreCloseCallback",P)}}i.closeThisDialog=function(R){B.closeDialog(D,R)};z(function(){var R=document.querySelectorAll(".ngdialog");
B.deactivateAll(R);r(D)(i);var T=A.innerWidth-q.prop("clientWidth");B.setBodyTopPosition();q.addClass("ngdialog-open");u.addClass("ngdialog-open");
q.find(".recipe-subNav").hide();var S=T-(A.innerWidth-q.prop("clientWidth"));if(S>0){B.setBodyPadding(S)}E.append(D);B.activate(D);
if(I.trapFocus){B.autoFocus(D)}if(I.name){x.$broadcast("ngDialog.opened",{dialog:D,name:I.name})}else{x.$broadcast("ngDialog.opened",D)
}});if(I.closeByEscape){q.bind("keydown",B.onDocumentKeydown)}if(I.closeByNavigation){x.$on("$locationChangeSuccess",function(){B.closeDialog(D)
})}if(I.preserveFocus){D.data("$ngDialogPreviousFocus",document.activeElement)}l=function(R){var T=I.closeByDocument?a(R.target).hasClass("ngdialog-overlay")||a(R.target).hasClass("ngdialog"):false;
var S=a(R.target).hasClass("ngdialog-close");if(T||S){C.close(D.attr("id"),S?"$closeButton":"$document")}};if(typeof A.Hammer!=="undefined"){var O=i.hammerTime=A.Hammer(D[0]);
O.on("tap",l)}else{D.bind("click",l)}o+=1;return C});return{id:"ngdialog"+p,closePromise:F.promise,close:function(L){B.closeDialog(D,L)
}};function H(M,L){return v.get(M,(L||{})).then(function(N){return N.data||""})}function G(L){if(!L){return"Empty template"}if(b.isString(L)&&I.plain){return L
}if(typeof I.cache==="boolean"&&!I.cache){return H(L,{cache:false})}return y.get(L)||H(L,{cache:true})}},openConfirm:function(G){var D=w.defer();
var F={closeByEscape:false,closeByDocument:false};b.extend(F,G);F.scope=b.isObject(F.scope)?F.scope.$new():x.$new();F.scope.confirm=function(I){D.resolve(I);
var H=a(document.getElementById(E.id));B.performCloseDialog(H,I)};var E=C.open(F);E.closePromise.then(function(H){if(H){return D.reject(H.value)
}return D.reject()});return D.promise},close:function(E,F){var D=a(document.getElementById(E));if(D.length){B.closeDialog(D,F)
}else{C.closeAll(F)}return C},closeAll:function(G){var D=document.querySelectorAll(".ngdialog, .ngdialog-overlay");for(var F=D.length;
F>-1;F--){var E=D[F];B.closeDialog(a(E),G)}},getDefaults:function(){return m}};return C}]});h.directive("ngDialog",["ngDialog",function(l){return{restrict:"A",scope:{ngDialogScope:"="},link:function(o,n,m){n.on("click",function(q){q.preventDefault();
var r=b.isDefined(o.ngDialogScope)?o.ngDialogScope:"noScope";b.isDefined(m.ngDialogClosePrevious)&&l.close(m.ngDialogClosePrevious);
var p=l.getDefaults();l.open({template:m.ngDialog,className:m.ngDialogClass||p.className,controller:m.ngDialogController,scope:r,data:m.ngDialogData,showClose:m.ngDialogShowClose==="false"?false:(m.ngDialogShowClose==="true"?true:p.showClose),closeByDocument:m.ngDialogCloseByDocument==="false"?false:(m.ngDialogCloseByDocument==="true"?true:p.closeByDocument),closeByEscape:m.ngDialogCloseByEscape==="false"?false:(m.ngDialogCloseByEscape==="true"?true:p.closeByEscape),preCloseCallback:m.ngDialogPreCloseCallback||p.preCloseCallback})
})}}}]);return h}));
//
// js/util/debounce.js
//
"use strict";var Debounce={};Debounce.debounce=function(a,d,b){var c;return function(){var g=this,e=arguments;var h=function(){c=null;
if(!b){a.apply(g,e)}};var f=b&&!c;clearTimeout(c);c=setTimeout(h,d);if(f){a.apply(g,e)}}};Debounce.throttle=function(c,i,e){var b,a,g;
var h=null;var f=0;if(!e){e={}}var d=function(){f=e.leading===false?0:Date.now();h=null;g=c.apply(b,a);if(!h){b=a=null}};return function(){var j=Date.now();
if(!f&&e.leading===false){f=j}var k=i-(j-f);b=this;a=arguments;if(k<=0||k>i){if(h){clearTimeout(h);h=null}f=j;g=c.apply(b,a);
if(!h){b=a=null}}else{if(!h&&e.trailing!==false){h=setTimeout(d,k)}}return g}};
//
// vendor/salvattore.js
//
/*!
 * Salvattore 1.0.8 by @rnmp and @ppold
 * https://github.com/rnmp/salvattore
 
 MODIFIED FOR ALLRECIPES USE:
     -Implemented ad refresh on grid recreation
     -Added helper methods to assist in ad "lazy" refresh
     -Initializing grid on document ready
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.salvattore = factory();
  }
}(this, function() {
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

if (!window.matchMedia) {
    window.matchMedia = function() {
        "use strict";

        // For browsers that support matchMedium api such as IE 9 and webkit
        var styleMedia = (window.styleMedia || window.media);

        // For those that don't support matchMedium
        if (!styleMedia) {
            var style       = document.createElement('style'),
                script      = document.getElementsByTagName('script')[0],
                info        = null;

            style.type  = 'text/css';
            style.id    = 'matchmediajs-test';

            script.parentNode.insertBefore(style, script);

            // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
            info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

            styleMedia = {
                matchMedium: function(media) {
                    var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                    // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                    if (style.styleSheet) {
                        style.styleSheet.cssText = text;
                    } else {
                        style.textContent = text;
                    }

                    // Test if media query is true or false
                    return info.width === '1px';
                }
            };
        }

        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || 'all'),
                media: media || 'all'
            };
        };
    }();
}

/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
    "use strict";

    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
        handleChange    = function(evt) {
            // Debounce
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    // Update mql.matches value and call listeners
                    // Fire listeners only if transitioning to or from matched state
                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            // Changes would not occur to css media type so return now (Affects IE <= 8)
            if (!hasMediaQueries) {
                return;
            }

            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
            // There should only ever be 1 resize listener running for performance
            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }

            // Push object only if it has not been pushed already
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };

        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };

        return mql;
    };
}());

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    "use strict";

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
            window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

if (typeof window.CustomEvent !== "function") {
  (function() {
    "use strict";
    function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
     }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  })();
}

/* jshint laxcomma: true */
var salvattore = (function (global, document, undefined) {
"use strict";

var self = {},
    grids = [],
    mediaRules = [],
    mediaQueries = [],
    gridAdsToRefresh = [],
    add_to_dataset = function(element, key, value) {
      // uses dataset function or a fallback for <ie10
      if (element.dataset) {
        element.dataset[key] = value;
      } else {
        element.setAttribute("data-" + key, value);
      }
      return;
    };

self.obtainGridSettings = function obtainGridSettings(element) {
  // returns the number of columns and the classes a column should have,
  // from computing the style of the ::before pseudo-element of the grid.

  var computedStyle = global.getComputedStyle(element, ":before")
    , content = computedStyle.getPropertyValue("content").slice(1, -1)
    , matchResult = content.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/)
    //AR specific default. If it cant calculate, draw two columns. This is for the right rail mostly, as it does html/css hiding.
    , numberOfColumns = 2 
    , columnClasses = []
  ;

  if (matchResult) {
    numberOfColumns = matchResult[1];
    columnClasses = matchResult[2];
    columnClasses = columnClasses? columnClasses.split(".") : ["column"];
  } else {
    matchResult = content.match(/^\s*\.(.+)\s+(\d+)\s*$/);
    if (matchResult) {
      columnClasses = matchResult[1];
      numberOfColumns = matchResult[2];
      if (numberOfColumns) {
            numberOfColumns = numberOfColumns.split(".");
      }
    }
  }

  return {
    numberOfColumns: numberOfColumns,
    columnClasses: columnClasses
  };
};


self.addColumns = function addColumns(grid, items) {
  // from the settings obtained, it creates columns with
  // the configured classes and adds to them a list of items.

  var settings = self.obtainGridSettings(grid)
    , numberOfColumns = settings.numberOfColumns
    , columnClasses = settings.columnClasses
    , columnsItems = new Array(+numberOfColumns)
    , columnsFragment = document.createDocumentFragment()
    , i = numberOfColumns
    , selector
  ;

  while (i-- !== 0) {
    selector = "[data-columns] > *:nth-child(" + numberOfColumns + "n-" + i + ")";
    columnsItems.push(items.querySelectorAll(selector));
  }

  columnsItems.forEach(function append_to_grid_fragment(rows) {
    var column = document.createElement("div")
      , rowsFragment = document.createDocumentFragment()
    ;

    column.className = columnClasses.join(" ");

    Array.prototype.forEach.call(rows, function append_to_column(row) {
      rowsFragment.appendChild(row);
    });
    column.appendChild(rowsFragment);
    columnsFragment.appendChild(column);
  });

  grid.appendChild(columnsFragment);
  add_to_dataset(grid, 'columns', numberOfColumns);
};


self.removeColumns = function removeColumns(grid) {
  // removes all the columns from a grid, and returns a list
  // of items sorted by the ordering of columns.

  var range = document.createRange();
  range.selectNodeContents(grid);

  var columns = Array.prototype.filter.call(range.extractContents().childNodes, function filter_elements(node) {
    return node instanceof global.HTMLElement;
  });

  var numberOfColumns = columns.length
    , numberOfRowsInFirstColumn = columns[0].childNodes.length
    , sortedRows = new Array(numberOfRowsInFirstColumn * numberOfColumns)
  ;

  Array.prototype.forEach.call(columns, function iterate_columns(column, columnIndex) {
    Array.prototype.forEach.call(column.children, function iterate_rows(row, rowIndex) {
      sortedRows[rowIndex * numberOfColumns + columnIndex] = row;
    });
  });

  var container = document.createElement("div");
  add_to_dataset(container, 'columns', 0);

  sortedRows.filter(function filter_non_null(child) {
    return !!child;
  }).forEach(function append_row(child) {
    container.appendChild(child);
  });

  return container;
};

self.getAdsToRefresh = function getAdsToRefresh() {
    return gridAdsToRefresh;
};

self.removeAdToRefresh = function removeAdToRefresh(elem) {
    var index = gridAdsToRefresh.indexOf(elem);
    if (index > -1) {
        gridAdsToRefresh.splice(index, 1);
    }
}

function findGridAdSlots(grid) {
    //Parent containers of the grid ad divs
    var adParentContainers = grid.getElementsByClassName("gridad");

    var adRefreshElements = [];

    //Check adService to see if we are serving mobile ads.
    var isMobileAdType = window.adService.mobileAds;

    //Ids that have "mob" in them are mobile slots
    var isCurrentAdSlotType = function(id) {
        if (isMobileAdType) {
            return (id.indexOf("mob") !== -1);
        } else {
            return (id.indexOf("mob") === -1);
        }
    };

    //Get ids of all grid ads to refresh (once that previously had an ad).
    Array.prototype.forEach.call(adParentContainers, function (adParentContainer) {
        var ads = adParentContainer.querySelectorAll("[id^=div-gpt-]");

        Array.prototype.forEach.call(ads, function (ad) {
            if (ad && isCurrentAdSlotType(ad.id)) {
                adRefreshElements.push(ad);
            }
        });
    });

    //Check for sponsored logo ad and then ad to refresh queue
    var sponsoredLogoSlots = [];
    sponsoredLogoSlots.push(document.getElementById("div-gpt-sponsorLogo"));
    sponsoredLogoSlots.push(document.getElementById("div-gpt-mob-sponsorLogo"));

    Array.prototype.forEach.call(sponsoredLogoSlots,
        function(sponsoredLogoSlot) {
            if (sponsoredLogoSlot && isCurrentAdSlotType(sponsoredLogoSlot.id)) {
                adRefreshElements.push(sponsoredLogoSlot);
            }
        });

    //Remove all ad frames.
    Array.prototype.forEach.call(adRefreshElements, function (el) {
        while (el && el.firstChild) {
            el.removeChild(el.firstChild);
        }
    });
    return adRefreshElements;
}

self.recreateColumns = function recreateColumns(grid) {
    // removes all the columns from the grid, and adds them again,
    // it is used when the number of columns change.

    global.requestAnimationFrame(function render_after_css_mediaQueryChange() {
        //Clear out the ads to refresh
        gridAdsToRefresh = [];

        var isAdServiceAvailable = window.adService && window.adService.renderAds;

        if (isAdServiceAvailable) {
            //Purge any refresh adslots
            window.adService.renderAds.purgeRefreshSlots();

            //Get list of all adslots in grid
            var adSlots = findGridAdSlots(grid);
        }

        //Salvattore Grid Recreation
        self.addColumns(grid, self.removeColumns(grid));
        var columnsChange = new CustomEvent("columnsChange");
        grid.dispatchEvent(columnsChange);

        if (isAdServiceAvailable) {
            //Add ids to refreshslots.
            Array.prototype.forEach.call(adSlots,
                function(el) {
                    if (self.isElementInViewport(el)) {
                        adService.renderAds.addToRefreshSlots(el.id);
                    } else {
                        gridAdsToRefresh.push(el);
                    }
                });

            //Refresh Ads
            window.refreshAdFrame();
        }
    });
}

/// Recreates the grid without explicitly reloading ads.
self.recreateColumnsOnDemand = function recreateColumnsOnDemand(grid) {
    // removes all the columns from the grid, and adds them again,
    // it is used when the number of columns change.

    global.requestAnimationFrame(function render_after_css_mediaQueryChange() {
        //Salvattore Grid Recreation
        self.addColumns(grid, self.removeColumns(grid));
        var columnsChange = new CustomEvent("columnsChange");
        grid.dispatchEvent(columnsChange);
    });
}

self.mediaQueryChange = function mediaQueryChange(mql) {
  // recreates the columns when a media query matches the current state
  // of the browser and refreshes ads within the grid.

    if (mql.matches) {
        //Salvattore grid recreation
        Array.prototype.forEach.call(grids, self.recreateColumns);
    }
};

self.isElementInViewport = function(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
};

self.getCSSRules = function getCSSRules(stylesheet) {
  // returns a list of css rules from a stylesheet

  var cssRules;
  try {
    cssRules = stylesheet.sheet.cssRules || stylesheet.sheet.rules;
  } catch (e) {
    return [];
  }

  return cssRules || [];
};


self.getStylesheets = function getStylesheets() {
  // returns a list of all the styles in the document (that are accessible).

  var inlineStyleBlocks = Array.prototype.slice.call(document.querySelectorAll("style"));
  inlineStyleBlocks.forEach(function(stylesheet, idx) {
    if (stylesheet.type !== 'text/css' && stylesheet.type !== '') {
      inlineStyleBlocks.splice(idx, 1);
    }
  });

  return Array.prototype.concat.call(
    inlineStyleBlocks,
    Array.prototype.slice.call(document.querySelectorAll("link[rel='stylesheet']"))
  );
};


self.mediaRuleHasColumnsSelector = function mediaRuleHasColumnsSelector(rules) {
  // checks if a media query css rule has in its contents a selector that
  // styles the grid.

  var i, rule;

  try {
    i = rules.length;
  }
  catch (e) {
    i = 0;
  }

  while (i--) {
    rule = rules[i];
    if (rule.selectorText && rule.selectorText.match(/\[data-columns\](.*)::?before$/)) {
      return true;
    }
  }

  return false;
};


self.scanMediaQueries = function scanMediaQueries() {
  // scans all the stylesheets for selectors that style grids,
  // if the matchMedia API is supported.

  var newMediaRules = [];

  if (!global.matchMedia) {
    return;
  }

  self.getStylesheets().forEach(function extract_rules(stylesheet) {
    Array.prototype.forEach.call(self.getCSSRules(stylesheet), function filter_by_column_selector(rule) {
      // rule.media throws an 'not implemented error' in ie9 for import rules occasionally
      try {
        if (rule.media && rule.cssRules && self.mediaRuleHasColumnsSelector(rule.cssRules)) {
          newMediaRules.push(rule);
        }
      } catch (e) {}
    });
  });

  // remove matchMedia listeners from the old rules
  var oldRules = mediaRules.filter(function (el) {
      return newMediaRules.indexOf(el) === -1;
  });
  mediaQueries.filter(function (el) {
    return oldRules.indexOf(el.rule) !== -1;
  }).forEach(function (el) {
      el.mql.removeListener(self.mediaQueryChange);
  });
  mediaQueries = mediaQueries.filter(function (el) {
    return oldRules.indexOf(el.rule) === -1;
  });

  // add matchMedia listeners to the new rules
  newMediaRules.filter(function (el) {
    return mediaRules.indexOf(el) == -1;
  }).forEach(function (rule) {
      var mql = global.matchMedia(rule.media.mediaText);
      mql.addListener(self.mediaQueryChange);
      mediaQueries.push({rule: rule, mql:mql});
  });

  // swap mediaRules with the new set
  mediaRules.length = 0;
  mediaRules = newMediaRules;
};


self.rescanMediaQueries = function rescanMediaQueries() {
    self.scanMediaQueries();
    Array.prototype.forEach.call(grids, self.recreateColumns);
};


self.nextElementColumnIndex = function nextElementColumnIndex(grid, fragments) {
  // returns the index of the column where the given element must be added.

  var children = grid.children
    , m = children.length
    , lowestRowCount = 0
    , child
    , currentRowCount
    , i
    , index = 0
    , currentHeight = 0
    , lowestHeight = 0
  ;
  for (i = 0; i < m; i++) {
      child = children[i];

      if (child.children.length == 0)
      {
          currentHeight = grid.offsetTop + ((fragments[i].children || fragments[i].childNodes).length * 400);
      } else
      {
          currentHeight = child.children[child.children.length - 1].offsetTop + ((fragments[i].children || fragments[i].childNodes).length * 400);
      }

      currentRowCount = child.children.length + (fragments[i].children || fragments[i].childNodes).length;
      if(lowestHeight === 0) {
          lowestHeight = currentHeight;
      }
      if (currentHeight < lowestHeight) {
          index = i;
          lowestRowCount = currentRowCount;
          lowestHeight = currentHeight;
      }
  }

  return index;
};


self.createFragmentsList = function createFragmentsList(quantity) {
  // returns a list of fragments

  var fragments = new Array(quantity)
    , i = 0
  ;

  while (i !== quantity) {
    fragments[i] = document.createDocumentFragment();
    i++;
  }

  return fragments;
};


self.appendElements = function appendElements(grid, elements) {
    // adds a list of elements to the end of a grid

  var columns = grid.children
    , numberOfColumns = columns.length
    , fragments = self.createFragmentsList(numberOfColumns)
  ;

  Array.prototype.forEach.call(elements, function append_to_next_fragment(element) {
    var columnIndex = self.nextElementColumnIndex(grid, fragments);
    fragments[columnIndex].appendChild(element);
  });

  Array.prototype.forEach.call(columns, function insert_column(column, index) {
    column.appendChild(fragments[index]);
  });
};


self.prependElements = function prependElements(grid, elements) {
  // adds a list of elements to the start of a grid

  var columns = grid.children
    , numberOfColumns = columns.length
    , fragments = self.createFragmentsList(numberOfColumns)
    , columnIndex = numberOfColumns - 1
  ;

  elements.forEach(function append_to_next_fragment(element) {
    var fragment = fragments[columnIndex];
    fragment.insertBefore(element, fragment.firstChild);
    if (columnIndex === 0) {
      columnIndex = numberOfColumns - 1;
    } else {
      columnIndex--;
    }
  });

  Array.prototype.forEach.call(columns, function insert_column(column, index) {
    column.insertBefore(fragments[index], column.firstChild);
  });

  // populates a fragment with n columns till the right
  var fragment = document.createDocumentFragment()
    , numberOfColumnsToExtract = elements.length % numberOfColumns
  ;

  while (numberOfColumnsToExtract-- !== 0) {
    fragment.appendChild(grid.lastChild);
  }

  // adds the fragment to the left
  grid.insertBefore(fragment, grid.firstChild);
};


self.registerGrid = function registerGrid (grid) {
  if (global.getComputedStyle(grid).display === "none") {
    return;
  }

  // retrieve the list of items from the grid itself
  var range = document.createRange();
  range.selectNodeContents(grid);

  var items = document.createElement("div");
  items.appendChild(range.extractContents());


  add_to_dataset(items, 'columns', 0);
  self.addColumns(grid, items);
  grids.push(grid);
};


self.init = function init() {
  // adds required CSS rule to hide 'content' based
  // configuration.

  var css = document.createElement("style");
  css.innerHTML = "[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}";
  document.head.appendChild(css);

  // scans all the grids in the document and generates
  // columns from their configuration.

  var gridElements = document.querySelectorAll("[data-columns]");
  Array.prototype.forEach.call(gridElements, self.registerGrid);
  self.scanMediaQueries();
};

//From https://github.com/rnmp/salvattore/pull/154/commits/4a351eec8d7dca5e640e824f622820f12b46585d
//Allows the media queries to load accross devices and retrieves correct number of columns to init with.
document.addEventListener('DOMContentLoaded', self.init);

return {
  appendElements: self.appendElements,
  prependElements: self.prependElements,
  registerGrid: self.registerGrid,
  recreateColumns: self.recreateColumns,
  rescanMediaQueries: self.rescanMediaQueries,
  init: self.init,
  isElementInViewport: self.isElementInViewport,
  getAdsToRefresh: self.getAdsToRefresh,
  removeAdToRefresh: self.removeAdToRefresh,
  recreateColumnsOnDemand: self.recreateColumnsOnDemand,

  // maintains backwards compatibility with underscore style method names
  append_elements: self.appendElements,
  prepend_elements: self.prependElements,
  register_grid: self.registerGrid,
  recreate_columns: self.recreateColumns,
  rescan_media_queries: self.rescanMediaQueries
};

})(window, window.document);

return salvattore;
}));

//
// mealplan/js/ui.bootstrap.js
//
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdownToggle", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]);
angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/popup.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset-titles.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]);
angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function ($q, $timeout, $rootScope) {

    var $transition = function (element, trigger, options) {
        options = options || {};
        var deferred = $q.defer();
        var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

        var transitionEndHandler = function (event) {
            $rootScope.$apply(function () {
                element.unbind(endEventName, transitionEndHandler);
                deferred.resolve(element);
            });
        };

        if (endEventName) {
            element.bind(endEventName, transitionEndHandler);
        }

        // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
        $timeout(function () {
            if (angular.isString(trigger)) {
                element.addClass(trigger);
            } else if (angular.isFunction(trigger)) {
                trigger(element);
            } else if (angular.isObject(trigger)) {
                element.css(trigger);
            }
            //If browser does not support transitions, instantly resolve
            if (!endEventName) {
                deferred.resolve(element);
            }
        });

        // Add our custom cancel function to the promise that is returned
        // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
        // i.e. it will therefore never raise a transitionEnd event for that transition
        deferred.promise.cancel = function () {
            if (endEventName) {
                element.unbind(endEventName, transitionEndHandler);
            }
            deferred.reject('Transition cancelled');
        };

        return deferred.promise;
    };

    // Work out the name of the transitionEnd event
    var transElement = document.createElement('trans');
    var transitionEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionend'
    };
    var animationEndEventNames = {
        'WebkitTransition': 'webkitAnimationEnd',
        'MozTransition': 'animationend',
        'OTransition': 'oAnimationEnd',
        'transition': 'animationend'
    };
    function findEndEventName(endEventNames) {
        for (var name in endEventNames) {
            if (transElement.style[name] !== undefined) {
                return endEventNames[name];
            }
        }
    }
    $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
    $transition.animationEndEventName = findEndEventName(animationEndEventNames);
    return $transition;
}]);

angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition'])

// The collapsible directive indicates a block of html that will expand and collapse
.directive('collapse', ['$transition', function ($transition) {
    // CSS transitions don't work with height: auto, so we have to manually change the height to a
    // specific value and then once the animation completes, we can reset the height to auto.
    // Unfortunately if you do this while the CSS transitions are specified (i.e. in the CSS class
    // "collapse") then you trigger a change to height 0 in between.
    // The fix is to remove the "collapse" CSS class while changing the height back to auto - phew!
    var fixUpHeight = function (scope, element, height) {
        // We remove the collapse CSS class to prevent a transition when we change to height: auto
        element.removeClass('collapse');
        element.css({ height: height });
        // It appears that  reading offsetWidth makes the browser realise that we have changed the
        // height already :-/
        var x = element[0].offsetWidth;
        element.addClass('collapse');
    };

    return {
        link: function (scope, element, attrs) {

            var isCollapsed;
            var initialAnimSkip = true;
            scope.$watch(function () { return element[0].scrollHeight; }, function (value) {
                //The listener is called when scollHeight changes
                //It actually does on 2 scenarios: 
                // 1. Parent is set to display none
                // 2. angular bindings inside are resolved
                //When we have a change of scrollHeight we are setting again the correct height if the group is opened
                if (element[0].scrollHeight !== 0) {
                    if (!isCollapsed) {
                        if (initialAnimSkip) {
                            fixUpHeight(scope, element, element[0].scrollHeight + 'px');
                        } else {
                            fixUpHeight(scope, element, 'auto');
                        }
                    }
                }
            });

            scope.$watch(attrs.collapse, function (value) {
                if (value) {
                    collapse();
                } else {
                    expand();
                }
            });


            var currentTransition;
            var doTransition = function (change) {
                if (currentTransition) {
                    currentTransition.cancel();
                }
                currentTransition = $transition(element, change);
                currentTransition.then(
                  function () { currentTransition = undefined; },
                  function () { currentTransition = undefined; }
                );
                return currentTransition;
            };

            var expand = function () {
                if (initialAnimSkip) {
                    initialAnimSkip = false;
                    if (!isCollapsed) {
                        fixUpHeight(scope, element, 'auto');
                    }
                } else {
                    doTransition({ height: element[0].scrollHeight + 'px' })
                    .then(function () {
                        // This check ensures that we don't accidentally update the height if the user has closed
                        // the group while the animation was still running
                        if (!isCollapsed) {
                            fixUpHeight(scope, element, 'auto');
                        }
                    });
                }
                isCollapsed = false;
            };

            var collapse = function () {
                isCollapsed = true;
                if (initialAnimSkip) {
                    initialAnimSkip = false;
                    fixUpHeight(scope, element, 0);
                } else {
                    fixUpHeight(scope, element, element[0].scrollHeight + 'px');
                    doTransition({ 'height': '0' });
                }
            };
        }
    };
}]);

angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse'])

.constant('accordionConfig', {
    closeOthers: true
})

.controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {

    // This array keeps track of the accordion groups
    this.groups = [];

    // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
    this.closeOthers = function (openGroup) {
        var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        if (closeOthers) {
            angular.forEach(this.groups, function (group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        }
    };

    // This is called from the accordion-group directive to add itself to the accordion
    this.addGroup = function (groupScope) {
        var that = this;
        this.groups.push(groupScope);

        groupScope.$on('$destroy', function (event) {
            that.removeGroup(groupScope);
        });
    };

    // This is called from the accordion-group directive when to remove itself
    this.removeGroup = function (group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(this.groups.indexOf(group), 1);
        }
    };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('accordion', function () {
    return {
        restrict: 'EA',
        controller: 'AccordionController',
        transclude: true,
        replace: false,
        templateUrl: 'template/accordion/accordion.html'
    };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', ['$parse', '$transition', '$timeout', function ($parse, $transition, $timeout) {
    return {
        require: '^accordion',         // We need this directive to be inside an accordion
        restrict: 'EA',
        transclude: true,              // It transcludes the contents of the directive into the template
        replace: true,                // The element containing the directive will be replaced with the template
        templateUrl: 'template/accordion/accordion-group.html',
        scope: { heading: '@' },        // Create an isolated scope and interpolate the heading attribute onto this scope
        controller: ['$scope', function ($scope) {
            this.setHeading = function (element) {
                this.heading = element;
            };
        }],
        link: function (scope, element, attrs, accordionCtrl) {
            var getIsOpen, setIsOpen;

            accordionCtrl.addGroup(scope);

            scope.isOpen = false;

            if (attrs.isOpen) {
                getIsOpen = $parse(attrs.isOpen);
                setIsOpen = getIsOpen.assign;

                scope.$watch(
                  function watchIsOpen() { return getIsOpen(scope.$parent); },
                  function updateOpen(value) { scope.isOpen = value; }
                );

                scope.isOpen = getIsOpen ? getIsOpen(scope.$parent) : false;
            }

            scope.$watch('isOpen', function (value) {
                if (value) {
                    accordionCtrl.closeOthers(scope);
                }
                if (setIsOpen) {
                    setIsOpen(scope.$parent, value);
                }
            });
        }
    };
}])

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
.directive('accordionHeading', function () {
    return {
        restrict: 'EA',
        transclude: true,   // Grab the contents to be used as the heading
        template: '',       // In effect remove this element!
        replace: true,
        require: '^accordionGroup',
        compile: function (element, attr, transclude) {
            return function link(scope, element, attr, accordionGroupCtrl) {
                // Pass the heading to the accordion-group controller
                // so that it can be transcluded into the right place in the template
                // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
                accordionGroupCtrl.setHeading(transclude(scope, function () { }));
            };
        }
    };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
.directive('accordionTransclude', function () {
    return {
        require: '^accordionGroup',
        link: function (scope, element, attr, controller) {
            scope.$watch(function () { return controller[attr.accordionTransclude]; }, function (heading) {
                if (heading) {
                    element.html('');
                    element.append(heading);
                }
            });
        }
    };
});

angular.module("ui.bootstrap.alert", []).directive('alert', function () {
    return {
        restrict: 'EA',
        templateUrl: 'template/alert/alert.html',
        transclude: true,
        replace: true,
        scope: {
            type: '=',
            close: '&'
        },
        link: function (scope, iElement, iAttrs, controller) {
            scope.closeable = "close" in iAttrs;
        }
    };
});

angular.module('ui.bootstrap.bindHtml', [])

  .directive('bindHtmlUnsafe', function () {
      return function (scope, element, attr) {
          element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
          scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
              element.html(value || '');
          });
      };
  });
angular.module('ui.bootstrap.buttons', [])

  .constant('buttonConfig', {
      activeClass: 'active',
      toggleEvent: 'click'
  })

  .directive('btnRadio', ['buttonConfig', function (buttonConfig) {
      var activeClass = buttonConfig.activeClass || 'active';
      var toggleEvent = buttonConfig.toggleEvent || 'click';

      return {

          require: 'ngModel',
          link: function (scope, element, attrs, ngModelCtrl) {

              //model -> UI
              ngModelCtrl.$render = function () {
                  element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
              };

              //ui->model
              element.bind(toggleEvent, function () {
                  if (!element.hasClass(activeClass)) {
                      scope.$apply(function () {
                          ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                          ngModelCtrl.$render();
                      });
                  }
              });
          }
      };
  }])

  .directive('btnCheckbox', ['buttonConfig', function (buttonConfig) {

      var activeClass = buttonConfig.activeClass || 'active';
      var toggleEvent = buttonConfig.toggleEvent || 'click';

      return {
          require: 'ngModel',
          link: function (scope, element, attrs, ngModelCtrl) {

              function getTrueValue() {
                  var trueValue = scope.$eval(attrs.btnCheckboxTrue);
                  return angular.isDefined(trueValue) ? trueValue : true;
              }

              function getFalseValue() {
                  var falseValue = scope.$eval(attrs.btnCheckboxFalse);
                  return angular.isDefined(falseValue) ? falseValue : false;
              }

              //model -> UI
              ngModelCtrl.$render = function () {
                  element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
              };

              //ui->model
              element.bind(toggleEvent, function () {
                  scope.$apply(function () {
                      ngModelCtrl.$setViewValue(element.hasClass(activeClass) ? getFalseValue() : getTrueValue());
                      ngModelCtrl.$render();
                  });
              });
          }
      };
  }]);
/**
* @ngdoc overview
* @name ui.bootstrap.carousel
*
* @description
* AngularJS version of an image carousel.
*
*/
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
.controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
    var self = this,
      slides = self.slides = [],
      currentIndex = -1,
      currentTimeout, isPlaying;
    self.currentSlide = null;

    /* direction: "prev" or "next" */
    self.select = function (nextSlide, direction) {
        var nextIndex = slides.indexOf(nextSlide);
        //Decide direction if it's not given
        if (direction === undefined) {
            direction = nextIndex > currentIndex ? "next" : "prev";
        }
        if (nextSlide && nextSlide !== self.currentSlide) {
            if ($scope.$currentTransition) {
                $scope.$currentTransition.cancel();
                //Timeout so ng-class in template has time to fix classes for finished slide
                $timeout(goNext);
            } else {
                goNext();
            }
        }
        function goNext() {
            //If we have a slide to transition from and we have a transition type and we're allowed, go
            if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                //We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
                nextSlide.$element.addClass(direction);
                var reflow = nextSlide.$element[0].offsetWidth; //force reflow

                //Set all other slides to stop doing their stuff for the new transition
                angular.forEach(slides, function (slide) {
                    angular.extend(slide, { direction: '', entering: false, leaving: false, active: false });
                });
                angular.extend(nextSlide, { direction: direction, active: true, entering: true });
                angular.extend(self.currentSlide || {}, { direction: direction, leaving: true });

                $scope.$currentTransition = $transition(nextSlide.$element, {});
                //We have to create new pointers inside a closure since next & current will change
                (function (next, current) {
                    $scope.$currentTransition.then(
                      function () { transitionDone(next, current); },
                      function () { transitionDone(next, current); }
                    );
                }(nextSlide, self.currentSlide));
            } else {
                transitionDone(nextSlide, self.currentSlide);
            }
            self.currentSlide = nextSlide;
            currentIndex = nextIndex;
            //every time you change slides, reset the timer
            restartTimer();
        }
        function transitionDone(next, current) {
            angular.extend(next, { direction: '', active: true, leaving: false, entering: false });
            angular.extend(current || {}, { direction: '', active: false, leaving: false, entering: false });
            $scope.$currentTransition = null;
        }
    };

    /* Allow outside people to call indexOf on slides array */
    self.indexOfSlide = function (slide) {
        return slides.indexOf(slide);
    };

    $scope.next = function () {
        var newIndex = (currentIndex + 1) % slides.length;

        //Prevent this user-triggered transition from occurring if there is already one in progress
        if (!$scope.$currentTransition) {
            return self.select(slides[newIndex], 'next');
        }
    };

    $scope.prev = function () {
        var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;

        //Prevent this user-triggered transition from occurring if there is already one in progress
        if (!$scope.$currentTransition) {
            return self.select(slides[newIndex], 'prev');
        }
    };

    $scope.select = function (slide) {
        self.select(slide);
    };

    $scope.isActive = function (slide) {
        return self.currentSlide === slide;
    };

    $scope.slides = function () {
        return slides;
    };

    $scope.$watch('interval', restartTimer);
    function restartTimer() {
        if (currentTimeout) {
            $timeout.cancel(currentTimeout);
        }
        function go() {
            if (isPlaying) {
                $scope.next();
                restartTimer();
            } else {
                $scope.pause();
            }
        }
        var interval = +$scope.interval;
        if (!isNaN(interval) && interval >= 0) {
            currentTimeout = $timeout(go, interval);
        }
    }
    $scope.play = function () {
        if (!isPlaying) {
            isPlaying = true;
            restartTimer();
        }
    };
    $scope.pause = function () {
        if (!$scope.noPause) {
            isPlaying = false;
            if (currentTimeout) {
                $timeout.cancel(currentTimeout);
            }
        }
    };

    self.addSlide = function (slide, element) {
        slide.$element = element;
        slides.push(slide);
        //if this is the first slide or the slide is set to active, select it
        if (slides.length === 1 || slide.active) {
            self.select(slides[slides.length - 1]);
            if (slides.length == 1) {
                $scope.play();
            }
        } else {
            slide.active = false;
        }
    };

    self.removeSlide = function (slide) {
        //get the index of the slide inside the carousel
        var index = slides.indexOf(slide);
        slides.splice(index, 1);
        if (slides.length > 0 && slide.active) {
            if (index >= slides.length) {
                self.select(slides[index - 1]);
            } else {
                self.select(slides[index]);
            }
        } else if (currentIndex > index) {
            currentIndex--;
        }
    };
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:carousel
 * @restrict EA
 *
 * @description
 * Carousel is the outer container for a set of image 'slides' to showcase.
 *
 * @param {number=} interval The time, in milliseconds, that it will take the carousel to go to the next slide.
 * @param {boolean=} noTransition Whether to disable transitions on the carousel.
 * @param {boolean=} noPause Whether to disable pausing on the carousel (by default, the carousel interval pauses on hover).
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <carousel>
      <slide>
        <img src="http://placekitten.com/150/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>Beautiful!</p>
        </div>
      </slide>
      <slide>
        <img src="http://placekitten.com/100/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>D'aww!</p>
        </div>
      </slide>
    </carousel>
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
 */
.directive('carousel', [function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        controller: 'CarouselController',
        require: 'carousel',
        templateUrl: 'template/carousel/carousel.html',
        scope: {
            interval: '=',
            noTransition: '=',
            noPause: '='
        }
    };
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:slide
 * @restrict EA
 *
 * @description
 * Creates a slide inside a {@link ui.bootstrap.carousel.directive:carousel carousel}.  Must be placed as a child of a carousel element.
 *
 * @param {boolean=} active Model binding, whether or not this slide is currently active.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
<div ng-controller="CarouselDemoCtrl">
  <carousel>
    <slide ng-repeat="slide in slides" active="slide.active">
      <img ng-src="{{slide.image}}" style="margin:auto;">
      <div class="carousel-caption">
        <h4>Slide {{$index}}</h4>
        <p>{{slide.text}}</p>
      </div>
    </slide>
  </carousel>
  <div class="row-fluid">
    <div class="span6">
      <ul>
        <li ng-repeat="slide in slides">
          <button class="btn btn-mini" ng-class="{'btn-info': !slide.active, 'btn-success': slide.active}" ng-disabled="slide.active" ng-click="slide.active = true">select</button>
          {{$index}}: {{slide.text}}
        </li>
      </ul>
      <a class="btn" ng-click="addSlide()">Add Slide</a>
    </div>
    <div class="span6">
      Interval, in milliseconds: <input type="number" ng-model="myInterval">
      <br />Enter a negative number to stop the interval.
    </div>
  </div>
</div>
  </file>
  <file name="script.js">
function CarouselDemoCtrl($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/200',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' '
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) $scope.addSlide();
}
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
*/

.directive('slide', ['$parse', function ($parse) {
    return {
        require: '^carousel',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: 'template/carousel/slide.html',
        scope: {
        },
        link: function (scope, element, attrs, carouselCtrl) {
            //Set up optional 'active' = binding
            if (attrs.active) {
                var getActive = $parse(attrs.active);
                var setActive = getActive.assign;
                var lastValue = scope.active = getActive(scope.$parent);
                scope.$watch(function parentActiveWatch() {
                    var parentActive = getActive(scope.$parent);

                    if (parentActive !== scope.active) {
                        // we are out of sync and need to copy
                        if (parentActive !== lastValue) {
                            // parent changed and it has precedence
                            lastValue = scope.active = parentActive;
                        } else {
                            // if the parent can be assigned then do so
                            setActive(scope.$parent, parentActive = lastValue = scope.active);
                        }
                    }
                    return parentActive;
                });
            }

            carouselCtrl.addSlide(scope, element);
            //when the scope is destroyed then remove the slide from the current slides array
            scope.$on('$destroy', function () {
                carouselCtrl.removeSlide(scope);
            });

            scope.$watch('active', function (active) {
                if (active) {
                    carouselCtrl.select(scope);
                }
            });
        }
    };
}]);

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {

      function getStyle(el, cssprop) {
          if (el.currentStyle) { //IE
              return el.currentStyle[cssprop];
          } else if ($window.getComputedStyle) {
              return $window.getComputedStyle(el)[cssprop];
          }
          // finally try and get inline style
          return el.style[cssprop];
      }

      /**
       * Checks if a given element is statically positioned
       * @param element - raw DOM element
       */
      function isStaticPositioned(element) {
          return (getStyle(element, "position") || 'static') === 'static';
      }

      /**
       * returns the closest, non-statically positioned parentOffset of a given element
       * @param element
       */
      var parentOffsetEl = function (element) {
          var docDomEl = $document[0];
          var offsetParent = element.offsetParent || docDomEl;
          while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
              offsetParent = offsetParent.offsetParent;
          }
          return offsetParent || docDomEl;
      };

      return {
          /**
           * Provides read-only equivalent of jQuery's position function:
           * http://api.jquery.com/position/
           */
          position: function (element) {
              var elBCR = this.offset(element);
              var offsetParentBCR = { top: 0, left: 0 };
              var offsetParentEl = parentOffsetEl(element[0]);
              if (offsetParentEl != $document[0]) {
                  offsetParentBCR = this.offset(angular.element(offsetParentEl));
                  offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                  offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
              }

              return {
                  width: element.prop('offsetWidth'),
                  height: element.prop('offsetHeight'),
                  top: elBCR.top - offsetParentBCR.top,
                  left: elBCR.left - offsetParentBCR.left
              };
          },

          /**
           * Provides read-only equivalent of jQuery's offset function:
           * http://api.jquery.com/offset/
           */
          offset: function (element) {
              var boundingClientRect = element[0].getBoundingClientRect();
              return {
                  width: element.prop('offsetWidth'),
                  height: element.prop('offsetHeight'),
                  top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop),
                  left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft || $document[0].documentElement.scrollLeft)
              };
          }
      };
  }]);

angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.position'])

.constant('datepickerConfig', {
    dayFormat: 'dd',
    monthFormat: 'MMMM',
    yearFormat: 'yyyy',
    dayHeaderFormat: 'EEE',
    dayTitleFormat: 'MMMM yyyy',
    monthTitleFormat: 'yyyy',
    showWeeks: true,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null
})

.controller('DatepickerController', ['$scope', '$attrs', 'dateFilter', 'datepickerConfig', function ($scope, $attrs, dateFilter, dtConfig) {
    var format = {
        day: getValue($attrs.dayFormat, dtConfig.dayFormat),
        month: getValue($attrs.monthFormat, dtConfig.monthFormat),
        year: getValue($attrs.yearFormat, dtConfig.yearFormat),
        dayHeader: getValue($attrs.dayHeaderFormat, dtConfig.dayHeaderFormat),
        dayTitle: getValue($attrs.dayTitleFormat, dtConfig.dayTitleFormat),
        monthTitle: getValue($attrs.monthTitleFormat, dtConfig.monthTitleFormat)
    },
    startingDay = getValue($attrs.startingDay, dtConfig.startingDay),
    yearRange = getValue($attrs.yearRange, dtConfig.yearRange);

    this.minDate = dtConfig.minDate ? new Date(dtConfig.minDate) : null;
    this.maxDate = dtConfig.maxDate ? new Date(dtConfig.maxDate) : null;

    function getValue(value, defaultValue) {
        return angular.isDefined(value) ? $scope.$parent.$eval(value) : defaultValue;
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function getDates(startDate, n) {
        var dates = new Array(n);
        var current = startDate, i = 0;
        while (i < n) {
            dates[i++] = new Date(current);
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }

    function makeDate(date, format, isSelected, isSecondary) {
        return { date: date, label: dateFilter(date, format), selected: !!isSelected, secondary: !!isSecondary };
    }

    this.modes = [
      {
          name: 'day',
          getVisibleDates: function (date, selected) {
              var year = date.getFullYear(), month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1);
              var difference = startingDay - firstDayOfMonth.getDay(),
              numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
              firstDate = new Date(firstDayOfMonth), numDates = 0;

              if (numDisplayedFromPreviousMonth > 0) {
                  firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                  numDates += numDisplayedFromPreviousMonth; // Previous
              }
              numDates += getDaysInMonth(year, month + 1); // Current
              numDates += (7 - numDates % 7) % 7; // Next

              var days = getDates(firstDate, numDates), labels = new Array(7);
              for (var i = 0; i < numDates; i++) {
                  var dt = new Date(days[i]);
                  days[i] = makeDate(dt, format.day, (selected && selected.getDate() === dt.getDate() && selected.getMonth() === dt.getMonth() && selected.getFullYear() === dt.getFullYear()), dt.getMonth() !== month);
              }
              for (var j = 0; j < 7; j++) {
                  labels[j] = dateFilter(days[j].date, format.dayHeader);
              }
              return { objects: days, title: dateFilter(date, format.dayTitle), labels: labels };
          },
          compare: function (date1, date2) {
              return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
          },
          split: 7,
          step: { months: 1 }
      },
      {
          name: 'month',
          getVisibleDates: function (date, selected) {
              var months = new Array(12), year = date.getFullYear();
              for (var i = 0; i < 12; i++) {
                  var dt = new Date(year, i, 1);
                  months[i] = makeDate(dt, format.month, (selected && selected.getMonth() === i && selected.getFullYear() === year));
              }
              return { objects: months, title: dateFilter(date, format.monthTitle) };
          },
          compare: function (date1, date2) {
              return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
          },
          split: 3,
          step: { years: 1 }
      },
      {
          name: 'year',
          getVisibleDates: function (date, selected) {
              var years = new Array(yearRange), year = date.getFullYear(), startYear = parseInt((year - 1) / yearRange, 10) * yearRange + 1;
              for (var i = 0; i < yearRange; i++) {
                  var dt = new Date(startYear + i, 0, 1);
                  years[i] = makeDate(dt, format.year, (selected && selected.getFullYear() === dt.getFullYear()));
              }
              return { objects: years, title: [years[0].label, years[yearRange - 1].label].join(' - ') };
          },
          compare: function (date1, date2) {
              return date1.getFullYear() - date2.getFullYear();
          },
          split: 5,
          step: { years: yearRange }
      }
    ];

    this.isDisabled = function (date, mode) {
        var currentMode = this.modes[mode || 0];
        return ((this.minDate && currentMode.compare(date, this.minDate) < 0) || (this.maxDate && currentMode.compare(date, this.maxDate) > 0) || ($scope.dateDisabled && $scope.dateDisabled({ date: date, mode: currentMode.name })));
    };
}])

.directive('datepicker', ['dateFilter', '$parse', 'datepickerConfig', '$log', function (dateFilter, $parse, datepickerConfig, $log) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/datepicker/datepicker.html',
        scope: {
            dateDisabled: '&'
        },
        require: ['datepicker', '?^ngModel'],
        controller: 'DatepickerController',
        link: function (scope, element, attrs, ctrls) {
            var datepickerCtrl = ctrls[0], ngModel = ctrls[1];

            if (!ngModel) {
                return; // do nothing if no ng-model
            }

            // Configuration parameters
            var mode = 0, selected = new Date(), showWeeks = datepickerConfig.showWeeks;

            if (attrs.showWeeks) {
                scope.$parent.$watch($parse(attrs.showWeeks), function (value) {
                    showWeeks = !!value;
                    updateShowWeekNumbers();
                });
            } else {
                updateShowWeekNumbers();
            }

            if (attrs.min) {
                scope.$parent.$watch($parse(attrs.min), function (value) {
                    datepickerCtrl.minDate = value ? new Date(value) : null;
                    refill();
                });
            }
            if (attrs.max) {
                scope.$parent.$watch($parse(attrs.max), function (value) {
                    datepickerCtrl.maxDate = value ? new Date(value) : null;
                    refill();
                });
            }

            function updateShowWeekNumbers() {
                scope.showWeekNumbers = mode === 0 && showWeeks;
            }

            // Split array into smaller arrays
            function split(arr, size) {
                var arrays = [];
                while (arr.length > 0) {
                    arrays.push(arr.splice(0, size));
                }
                return arrays;
            }

            function refill(updateSelected) {
                var date = null, valid = true;

                if (ngModel.$modelValue) {
                    date = new Date(ngModel.$modelValue);

                    if (isNaN(date)) {
                        valid = false;
                        $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
                    } else if (updateSelected) {
                        selected = date;
                    }
                }
                ngModel.$setValidity('date', valid);

                var currentMode = datepickerCtrl.modes[mode], data = currentMode.getVisibleDates(selected, date);
                angular.forEach(data.objects, function (obj) {
                    obj.disabled = datepickerCtrl.isDisabled(obj.date, mode);
                });

                ngModel.$setValidity('date-disabled', (!date || !datepickerCtrl.isDisabled(date)));

                scope.rows = split(data.objects, currentMode.split);
                scope.labels = data.labels || [];
                scope.title = data.title;
            }

            function setMode(value) {
                mode = value;
                updateShowWeekNumbers();
                refill();
            }

            ngModel.$render = function () {
                refill(true);
            };

            scope.select = function (date) {
                if (mode === 0) {
                    var dt = new Date(ngModel.$modelValue);
                    dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                    ngModel.$setViewValue(dt);
                    refill(true);
                } else {
                    selected = date;
                    setMode(mode - 1);
                }
            };
            scope.move = function (direction) {
                var step = datepickerCtrl.modes[mode].step;
                selected.setMonth(selected.getMonth() + direction * (step.months || 0));
                selected.setFullYear(selected.getFullYear() + direction * (step.years || 0));
                refill();
            };
            scope.toggleMode = function () {
                setMode((mode + 1) % datepickerCtrl.modes.length);
            };
            scope.getWeekNumber = function (row) {
                return (mode === 0 && scope.showWeekNumbers && row.length === 7) ? getISO8601WeekNumber(row[0].date) : null;
            };

            function getISO8601WeekNumber(date) {
                var checkDate = new Date(date);
                checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
                var time = checkDate.getTime();
                checkDate.setMonth(0); // Compare with Jan 1
                checkDate.setDate(1);
                return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
            }
        }
    };
}])

.constant('datepickerPopupConfig', {
    dateFormat: 'yyyy-MM-dd',
    closeOnDateSelection: true
})

.directive('datepickerPopup', ['$compile', '$parse', '$document', '$position', 'dateFilter', 'datepickerPopupConfig',
function ($compile, $parse, $document, $position, dateFilter, datepickerPopupConfig) {
    return {
        restrict: 'EA',
        require: 'ngModel',
        link: function (originalScope, element, attrs, ngModel) {

            var closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection;
            var dateFormat = attrs.datepickerPopup || datepickerPopupConfig.dateFormat;

            // create a child scope for the datepicker directive so we are not polluting original scope
            var scope = originalScope.$new();
            originalScope.$on('$destroy', function () {
                scope.$destroy();
            });

            var getIsOpen, setIsOpen;
            if (attrs.isOpen) {
                getIsOpen = $parse(attrs.isOpen);
                setIsOpen = getIsOpen.assign;

                originalScope.$watch(getIsOpen, function updateOpen(value) {
                    scope.isOpen = !!value;
                });
            }
            scope.isOpen = getIsOpen ? getIsOpen(originalScope) : false; // Initial state

            function setOpen(value) {
                if (setIsOpen) {
                    setIsOpen(originalScope, !!value);
                } else {
                    scope.isOpen = !!value;
                }
            }

            var documentClickBind = function (event) {
                if (scope.isOpen && event.target !== element[0]) {
                    scope.$apply(function () {
                        setOpen(false);
                    });
                }
            };

            var elementFocusBind = function () {
                scope.$apply(function () {
                    setOpen(true);
                });
            };

            // popup element used to display calendar
            var popupEl = angular.element('<datepicker-popup-wrap><datepicker></datepicker></datepicker-popup-wrap>');
            popupEl.attr({
                'ng-model': 'date',
                'ng-change': 'dateSelection()'
            });
            var datepickerEl = popupEl.find('datepicker');
            if (attrs.datepickerOptions) {
                datepickerEl.attr(angular.extend({}, originalScope.$eval(attrs.datepickerOptions)));
            }

            // TODO: reverse from dateFilter string to Date object
            function parseDate(viewValue) {
                if (!viewValue) {
                    ngModel.$setValidity('date', true);
                    return null;
                } else if (angular.isDate(viewValue)) {
                    ngModel.$setValidity('date', true);
                    return viewValue;
                } else if (angular.isString(viewValue)) {
                    var date = new Date(viewValue);
                    if (isNaN(date)) {
                        ngModel.$setValidity('date', false);
                        return undefined;
                    } else {
                        ngModel.$setValidity('date', true);
                        return date;
                    }
                } else {
                    ngModel.$setValidity('date', false);
                    return undefined;
                }
            }
            ngModel.$parsers.unshift(parseDate);

            // Inner change
            scope.dateSelection = function () {
                ngModel.$setViewValue(scope.date);
                ngModel.$render();

                if (closeOnDateSelection) {
                    setOpen(false);
                }
            };

            element.bind('input change keyup', function () {
                scope.$apply(function () {
                    updateCalendar();
                });
            });

            // Outter change
            ngModel.$render = function () {
                var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : '';
                element.val(date);

                updateCalendar();
            };

            function updateCalendar() {
                scope.date = ngModel.$modelValue;
                updatePosition();
            }

            function addWatchableAttribute(attribute, scopeProperty, datepickerAttribute) {
                if (attribute) {
                    originalScope.$watch($parse(attribute), function (value) {
                        scope[scopeProperty] = value;
                    });
                    datepickerEl.attr(datepickerAttribute || scopeProperty, scopeProperty);
                }
            }
            addWatchableAttribute(attrs.min, 'min');
            addWatchableAttribute(attrs.max, 'max');
            if (attrs.showWeeks) {
                addWatchableAttribute(attrs.showWeeks, 'showWeeks', 'show-weeks');
            } else {
                scope.showWeeks = true;
                datepickerEl.attr('show-weeks', 'showWeeks');
            }
            if (attrs.dateDisabled) {
                datepickerEl.attr('date-disabled', attrs.dateDisabled);
            }

            function updatePosition() {
                scope.position = $position.position(element);
                scope.position.top = scope.position.top + element.prop('offsetHeight');
            }

            var documentBindingInitialized = false, elementFocusInitialized = false;
            scope.$watch('isOpen', function (value) {
                if (value) {
                    updatePosition();
                    $document.bind('click', documentClickBind);
                    if (elementFocusInitialized) {
                        element.unbind('focus', elementFocusBind);
                    }
                    element[0].focus();
                    documentBindingInitialized = true;
                } else {
                    if (documentBindingInitialized) {
                        $document.unbind('click', documentClickBind);
                    }
                    element.bind('focus', elementFocusBind);
                    elementFocusInitialized = true;
                }

                if (setIsOpen) {
                    setIsOpen(originalScope, value);
                }
            });

            var $setModelValue = $parse(attrs.ngModel).assign;

            scope.today = function () {
                $setModelValue(originalScope, new Date());
            };
            scope.clear = function () {
                $setModelValue(originalScope, null);
            };

            element.after($compile(popupEl)(scope));
        }
    };
}])

.directive('datepickerPopupWrap', [function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'template/datepicker/popup.html',
        link: function (scope, element, attrs) {
            element.bind('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }
    };
}]);

/*
 * dropdownToggle - Provides dropdown menu functionality in place of bootstrap js
 * @restrict class or attribute
 * @example:
   <li class="dropdown">
     <a class="dropdown-toggle">My Dropdown Menu</a>
     <ul class="dropdown-menu">
       <li ng-repeat="choice in dropChoices">
         <a ng-href="{{choice.href}}">{{choice.text}}</a>
       </li>
     </ul>
   </li>
 */

angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
    var openElement = null,
        closeMenu = angular.noop;
    return {
        restrict: 'CA',
        link: function (scope, element, attrs) {
            scope.$watch('$location.path', function () { closeMenu(); });
            element.parent().bind('click', function () { closeMenu(); });
            element.bind('click', function (event) {

                var elementWasOpen = (element === openElement);

                event.preventDefault();
                event.stopPropagation();

                if (!!openElement) {
                    closeMenu();
                }

                if (!elementWasOpen) {
                    element.parent().addClass('open');
                    openElement = element;
                    closeMenu = function (event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        $document.unbind('click', closeMenu);
                        element.parent().removeClass('open');
                        closeMenu = angular.noop;
                        openElement = null;
                    };
                    $document.bind('click', closeMenu);
                }
            });
        }
    };
}]);
angular.module('ui.bootstrap.modal', [])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
      return {
          createNew: function () {
              var stack = [];

              return {
                  add: function (key, value) {
                      stack.push({
                          key: key,
                          value: value
                      });
                  },
                  get: function (key) {
                      for (var i = 0; i < stack.length; i++) {
                          if (key == stack[i].key) {
                              return stack[i];
                          }
                      }
                  },
                  keys: function () {
                      var keys = [];
                      for (var i = 0; i < stack.length; i++) {
                          keys.push(stack[i].key);
                      }
                      return keys;
                  },
                  top: function () {
                      return stack[stack.length - 1];
                  },
                  remove: function (key) {
                      var idx = -1;
                      for (var i = 0; i < stack.length; i++) {
                          if (key == stack[i].key) {
                              idx = i;
                              break;
                          }
                      }
                      return stack.splice(idx, 1)[0];
                  },
                  removeTop: function () {
                      return stack.splice(stack.length - 1, 1)[0];
                  },
                  length: function () {
                      return stack.length;
                  }
              };
          }
      };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
      return {
          restrict: 'EA',
          replace: true,
          templateUrl: 'template/modal/backdrop.html',
          link: function (scope, element, attrs) {

              //trigger CSS transitions
              $timeout(function () {
                  scope.animate = true;
              });

              scope.close = function (evt) {
                  var modal = $modalStack.getTop();
                  if (modal && modal.value.backdrop && modal.value.backdrop != 'static') {
                      evt.preventDefault();
                      evt.stopPropagation();
                      $modalStack.dismiss(modal.key, 'backdrop click');
                  }
              };
          }
      };
  }])

  .directive('modalWindow', ['$timeout', function ($timeout) {
      return {
          restrict: 'EA',
          scope: {
              index: '@'
          },
          replace: true,
          transclude: true,
          templateUrl: 'template/modal/window.html',
          link: function (scope, element, attrs) {
              scope.windowClass = attrs.windowClass || '';

              //trigger CSS transitions
              $timeout(function () {
                  scope.animate = true;
              });
          }
      };
  }])

  .factory('$modalStack', ['$document', '$compile', '$rootScope', '$$stackedMap',
    function ($document, $compile, $rootScope, $$stackedMap) {

        var backdropjqLiteEl, backdropDomEl;
        var backdropScope = $rootScope.$new(true);
        var body = $document.find('body').eq(0);
        var openedWindows = $$stackedMap.createNew();
        var $modalStack = {};

        function backdropIndex() {
            var topBackdropIndex = -1;
            var opened = openedWindows.keys();
            for (var i = 0; i < opened.length; i++) {
                if (openedWindows.get(opened[i]).value.backdrop) {
                    topBackdropIndex = i;
                }
            }
            return topBackdropIndex;
        }

        $rootScope.$watch(backdropIndex, function (newBackdropIndex) {
            backdropScope.index = newBackdropIndex;
        });

        function removeModalWindow(modalInstance) {

            var modalWindow = openedWindows.get(modalInstance).value;

            //clean up the stack
            openedWindows.remove(modalInstance);

            //remove window DOM element
            modalWindow.modalDomEl.remove();

            //remove backdrop if no longer needed
            if (backdropIndex() == -1) {
                backdropDomEl.remove();
                backdropDomEl = undefined;
            }

            //destroy scope
            modalWindow.modalScope.$destroy();
        }

        $document.bind('keydown', function (evt) {
            var modal;

            if (evt.which === 27) {
                modal = openedWindows.top();
                if (modal && modal.value.keyboard) {
                    $rootScope.$apply(function () {
                        $modalStack.dismiss(modal.key);
                    });
                }
            }
        });

        $modalStack.open = function (modalInstance, modal) {

            openedWindows.add(modalInstance, {
                deferred: modal.deferred,
                modalScope: modal.scope,
                backdrop: modal.backdrop,
                keyboard: modal.keyboard
            });

            var angularDomEl = angular.element('<div modal-window></div>');
            angularDomEl.attr('window-class', modal.windowClass);
            angularDomEl.attr('index', openedWindows.length() - 1);
            angularDomEl.html(modal.content);

            var modalDomEl = $compile(angularDomEl)(modal.scope);
            openedWindows.top().value.modalDomEl = modalDomEl;
            body.append(modalDomEl);

            if (backdropIndex() >= 0 && !backdropDomEl) {
                backdropjqLiteEl = angular.element('<div modal-backdrop></div>');
                backdropDomEl = $compile(backdropjqLiteEl)(backdropScope);
                body.append(backdropDomEl);
            }
        };

        $modalStack.close = function (modalInstance, result) {
            var modal = openedWindows.get(modalInstance);
            if (modal) {
                modal.value.deferred.resolve(result);
                removeModalWindow(modalInstance);
            }
        };

        $modalStack.dismiss = function (modalInstance, reason) {
            var modalWindow = openedWindows.get(modalInstance).value;
            if (modalWindow) {
                modalWindow.deferred.reject(reason);
                removeModalWindow(modalInstance);
            }
        };

        $modalStack.getTop = function () {
            return openedWindows.top();
        };

        return $modalStack;
    }])

  .provider('$modal', function () {

      var $modalProvider = {
          options: {
              backdrop: true, //can be also false or 'static'
              keyboard: true
          },
          $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
            function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

                var $modal = {};

                function getTemplatePromise(options) {
                    return options.template ? $q.when(options.template) :
                      $http.get(options.templateUrl, { cache: $templateCache }).then(function (result) {
                          return result.data;
                      });
                }

                function getResolvePromises(resolves) {
                    var promisesArr = [];
                    angular.forEach(resolves, function (value, key) {
                        if (angular.isFunction(value) || angular.isArray(value)) {
                            promisesArr.push($q.when($injector.invoke(value)));
                        }
                    });
                    return promisesArr;
                }

                $modal.open = function (modalOptions) {

                    var modalResultDeferred = $q.defer();
                    var modalOpenedDeferred = $q.defer();

                    //prepare an instance of a modal to be injected into controllers and returned to a caller
                    var modalInstance = {
                        result: modalResultDeferred.promise,
                        opened: modalOpenedDeferred.promise,
                        close: function (result) {
                            $modalStack.close(modalInstance, result);
                        },
                        dismiss: function (reason) {
                            $modalStack.dismiss(modalInstance, reason);
                        }
                    };

                    //merge and clean up options
                    modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
                    modalOptions.resolve = modalOptions.resolve || {};

                    //verify options
                    if (!modalOptions.template && !modalOptions.templateUrl) {
                        throw new Error('One of template or templateUrl options is required.');
                    }

                    var templateAndResolvePromise =
                      $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


                    templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

                        var modalScope = (modalOptions.scope || $rootScope).$new();
                        modalScope.$close = modalInstance.close;
                        modalScope.$dismiss = modalInstance.dismiss;

                        var ctrlInstance, ctrlLocals = {};
                        var resolveIter = 1;

                        //controllers
                        if (modalOptions.controller) {
                            ctrlLocals.$scope = modalScope;
                            ctrlLocals.$modalInstance = modalInstance;
                            angular.forEach(modalOptions.resolve, function (value, key) {
                                ctrlLocals[key] = tplAndVars[resolveIter++];
                            });

                            ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                        }

                        $modalStack.open(modalInstance, {
                            scope: modalScope,
                            deferred: modalResultDeferred,
                            content: tplAndVars[0],
                            backdrop: modalOptions.backdrop,
                            keyboard: modalOptions.keyboard,
                            windowClass: modalOptions.windowClass
                        });

                    }, function resolveError(reason) {
                        modalResultDeferred.reject(reason);
                    });

                    templateAndResolvePromise.then(function () {
                        modalOpenedDeferred.resolve(true);
                    }, function () {
                        modalOpenedDeferred.reject(false);
                    });

                    return modalInstance;
                };

                return $modal;
            }]
      };

      return $modalProvider;
  });
angular.module('ui.bootstrap.pagination', [])

.controller('PaginationController', ['$scope', '$attrs', '$parse', '$interpolate', function ($scope, $attrs, $parse, $interpolate) {
    var self = this;

    this.init = function (defaultItemsPerPage) {
        if ($attrs.itemsPerPage) {
            $scope.$parent.$watch($parse($attrs.itemsPerPage), function (value) {
                self.itemsPerPage = parseInt(value, 10);
                $scope.totalPages = self.calculateTotalPages();
            });
        } else {
            this.itemsPerPage = defaultItemsPerPage;
        }
    };

    this.noPrevious = function () {
        return this.page === 1;
    };
    this.noNext = function () {
        return this.page === $scope.totalPages;
    };

    this.isActive = function (page) {
        return this.page === page;
    };

    this.calculateTotalPages = function () {
        return this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    };

    this.getAttributeValue = function (attribute, defaultValue, interpolate) {
        return angular.isDefined(attribute) ? (interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute)) : defaultValue;
    };

    this.render = function () {
        this.page = parseInt($scope.page, 10) || 1;
        $scope.pages = this.getPages(this.page, $scope.totalPages);
    };

    $scope.selectPage = function (page) {
        if (!self.isActive(page) && page > 0 && page <= $scope.totalPages) {
            $scope.page = page;
            $scope.onSelectPage({ page: page });
        }
    };

    $scope.$watch('totalItems', function () {
        $scope.totalPages = self.calculateTotalPages();
    });

    $scope.$watch('totalPages', function (value) {
        if ($attrs.numPages) {
            $scope.numPages = value; // Readonly variable
        }

        if (self.page > value) {
            $scope.selectPage(value);
        } else {
            self.render();
        }
    });

    $scope.$watch('page', function () {
        self.render();
    });
}])

.constant('paginationConfig', {
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    rotate: true
})

.directive('pagination', ['$parse', 'paginationConfig', function ($parse, config) {
    return {
        restrict: 'EA',
        scope: {
            page: '=',
            totalItems: '=',
            onSelectPage: ' &',
            numPages: '='
        },
        controller: 'PaginationController',
        templateUrl: 'template/pagination/pagination.html',
        replace: true,
        link: function (scope, element, attrs, paginationCtrl) {

            // Setup configuration parameters
            var maxSize,
            boundaryLinks = paginationCtrl.getAttributeValue(attrs.boundaryLinks, config.boundaryLinks),
            directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks),
            firstText = paginationCtrl.getAttributeValue(attrs.firstText, config.firstText, true),
            previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true),
            nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, true),
            lastText = paginationCtrl.getAttributeValue(attrs.lastText, config.lastText, true),
            rotate = paginationCtrl.getAttributeValue(attrs.rotate, config.rotate);

            paginationCtrl.init(config.itemsPerPage);

            if (attrs.maxSize) {
                scope.$parent.$watch($parse(attrs.maxSize), function (value) {
                    maxSize = parseInt(value, 10);
                    paginationCtrl.render();
                });
            }

            // Create page object used in template
            function makePage(number, text, isActive, isDisabled) {
                return {
                    number: number,
                    text: text,
                    active: isActive,
                    disabled: isDisabled
                };
            }

            paginationCtrl.getPages = function (currentPage, totalPages) {
                var pages = [];

                // Default page limits
                var startPage = 1, endPage = totalPages;
                var isMaxSized = (angular.isDefined(maxSize) && maxSize < totalPages);

                // recompute if maxSize
                if (isMaxSized) {
                    if (rotate) {
                        // Current page is displayed in the middle of the visible ones
                        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
                        endPage = startPage + maxSize - 1;

                        // Adjust if limit is exceeded
                        if (endPage > totalPages) {
                            endPage = totalPages;
                            startPage = endPage - maxSize + 1;
                        }
                    } else {
                        // Visible pages are paginated with maxSize
                        startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

                        // Adjust last page if limit is exceeded
                        endPage = Math.min(startPage + maxSize - 1, totalPages);
                    }
                }

                // Add page number links
                for (var number = startPage; number <= endPage; number++) {
                    var page = makePage(number, number, paginationCtrl.isActive(number), false);
                    pages.push(page);
                }

                // Add links to move between page sets
                if (isMaxSized && !rotate) {
                    if (startPage > 1) {
                        var previousPageSet = makePage(startPage - 1, '...', false, false);
                        pages.unshift(previousPageSet);
                    }

                    if (endPage < totalPages) {
                        var nextPageSet = makePage(endPage + 1, '...', false, false);
                        pages.push(nextPageSet);
                    }
                }

                // Add previous & next links
                if (directionLinks) {
                    var previousPage = makePage(currentPage - 1, previousText, false, paginationCtrl.noPrevious());
                    pages.unshift(previousPage);

                    var nextPage = makePage(currentPage + 1, nextText, false, paginationCtrl.noNext());
                    pages.push(nextPage);
                }

                // Add first & last links
                if (boundaryLinks) {
                    var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
                    pages.unshift(firstPage);

                    var lastPage = makePage(totalPages, lastText, false, paginationCtrl.noNext());
                    pages.push(lastPage);
                }

                return pages;
            };
        }
    };
}])

.constant('pagerConfig', {
    itemsPerPage: 10,
    previousText: '« Previous',
    nextText: 'Next »',
    align: true
})

.directive('pager', ['pagerConfig', function (config) {
    return {
        restrict: 'EA',
        scope: {
            page: '=',
            totalItems: '=',
            onSelectPage: ' &',
            numPages: '='
        },
        controller: 'PaginationController',
        templateUrl: 'template/pagination/pager.html',
        replace: true,
        link: function (scope, element, attrs, paginationCtrl) {

            // Setup configuration parameters
            var previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true),
            nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, true),
            align = paginationCtrl.getAttributeValue(attrs.align, config.align);

            paginationCtrl.init(config.itemsPerPage);

            // Create page object used in template
            function makePage(number, text, isDisabled, isPrevious, isNext) {
                return {
                    number: number,
                    text: text,
                    disabled: isDisabled,
                    previous: (align && isPrevious),
                    next: (align && isNext)
                };
            }

            paginationCtrl.getPages = function (currentPage) {
                return [
                  makePage(currentPage - 1, previousText, paginationCtrl.noPrevious(), true, false),
                  makePage(currentPage + 1, nextText, paginationCtrl.noNext(), false, true)
                ];
            };
        }
    };
}]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module('ui.bootstrap.tooltip', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider('$tooltip', function () {
    // The default options tooltip and popover.
    var defaultOptions = {
        placement: 'top',
        animation: true,
        popupDelay: 0
    };

    // Default hide triggers for each show trigger
    var triggerMap = {
        'mouseenter': 'mouseleave',
        'click': 'click',
        'focus': 'blur'
    };

    // The options specified to the provider globally.
    var globalOptions = {};

    /**
     * `options({})` allows global configuration of all tooltips in the
     * application.
     *
     *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
     *     // place tooltips left instead of top by default
     *     $tooltipProvider.options( { placement: 'left' } );
     *   });
     */
    this.options = function (value) {
        angular.extend(globalOptions, value);
    };

    /**
     * This allows you to extend the set of trigger mappings available. E.g.:
     *
     *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
     */
    this.setTriggers = function setTriggers(triggers) {
        angular.extend(triggerMap, triggers);
    };

    /**
     * This is a helper function for translating camel-case to snake-case.
     */
    function snake_case(name) {
        var regexp = /[A-Z]/g;
        var separator = '-';
        return name.replace(regexp, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }

    /**
     * Returns the actual instance of the $tooltip service.
     * TODO support multiple triggers
     */
    this.$get = ['$window', '$compile', '$timeout', '$parse', '$document', '$position', '$interpolate', function ($window, $compile, $timeout, $parse, $document, $position, $interpolate) {
        return function $tooltip(type, prefix, defaultTriggerShow) {
            var options = angular.extend({}, defaultOptions, globalOptions);

            /**
             * Returns an object of show and hide triggers.
             *
             * If a trigger is supplied,
             * it is used to show the tooltip; otherwise, it will use the `trigger`
             * option passed to the `$tooltipProvider.options` method; else it will
             * default to the trigger supplied to this directive factory.
             *
             * The hide trigger is based on the show trigger. If the `trigger` option
             * was passed to the `$tooltipProvider.options` method, it will use the
             * mapped trigger from `triggerMap` or the passed trigger if the map is
             * undefined; otherwise, it uses the `triggerMap` value of the show
             * trigger; else it will just use the show trigger.
             */
            function getTriggers(trigger) {
                var show = trigger || options.trigger || defaultTriggerShow;
                var hide = triggerMap[show] || show;
                return {
                    show: show,
                    hide: hide
                };
            }

            var directiveName = snake_case(type);

            var startSym = $interpolate.startSymbol();
            var endSym = $interpolate.endSymbol();
            var template =
              '<' + directiveName + '-popup ' +
                'title="' + startSym + 'tt_title' + endSym + '" ' +
                'content="' + startSym + 'tt_content' + endSym + '" ' +
                'placement="' + startSym + 'tt_placement' + endSym + '" ' +
                'animation="tt_animation()" ' +
                'is-open="tt_isOpen"' +
                '>' +
              '</' + directiveName + '-popup>';

            return {
                restrict: 'EA',
                scope: true,
                link: function link(scope, element, attrs) {
                    var tooltip = $compile(template)(scope);
                    var transitionTimeout;
                    var popupTimeout;
                    var $body;
                    var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
                    var triggers = getTriggers(undefined);
                    var hasRegisteredTriggers = false;

                    // By default, the tooltip is not open.
                    // TODO add ability to start tooltip opened
                    scope.tt_isOpen = false;

                    function toggleTooltipBind() {
                        if (!scope.tt_isOpen) {
                            showTooltipBind();
                        } else {
                            hideTooltipBind();
                        }
                    }

                    // Show the tooltip with delay if specified, otherwise show it immediately
                    function showTooltipBind() {
                        if (scope.tt_popupDelay) {
                            popupTimeout = $timeout(show, scope.tt_popupDelay);
                        } else {
                            scope.$apply(show);
                        }
                    }

                    function hideTooltipBind() {
                        scope.$apply(function () {
                            hide();
                        });
                    }

                    // Show the tooltip popup element.
                    function show() {
                        var position,
                            ttWidth,
                            ttHeight,
                            ttPosition;

                        // Don't show empty tooltips.
                        if (!scope.tt_content) {
                            return;
                        }

                        // If there is a pending remove transition, we must cancel it, lest the
                        // tooltip be mysteriously removed.
                        if (transitionTimeout) {
                            $timeout.cancel(transitionTimeout);
                        }

                        // Set the initial positioning.
                        tooltip.css({ top: 0, left: 0, display: 'block' });

                        // Now we add it to the DOM because need some info about it. But it's not 
                        // visible yet anyway.
                        if (appendToBody) {
                            $body = $body || $document.find('body');
                            $body.append(tooltip);
                        } else {
                            element.after(tooltip);
                        }

                        // Get the position of the directive element.
                        position = appendToBody ? $position.offset(element) : $position.position(element);

                        // Get the height and width of the tooltip so we can center it.
                        ttWidth = tooltip.prop('offsetWidth');
                        ttHeight = tooltip.prop('offsetHeight');

                        // Calculate the tooltip's top and left coordinates to center it with
                        // this directive.
                        switch (scope.tt_placement) {
                            case 'right':
                                ttPosition = {
                                    top: position.top + position.height / 2 - ttHeight / 2,
                                    left: position.left + position.width
                                };
                                break;
                            case 'bottom':
                                ttPosition = {
                                    top: position.top + position.height,
                                    left: position.left + position.width / 2 - ttWidth / 2
                                };
                                break;
                            case 'left':
                                ttPosition = {
                                    top: position.top + position.height / 2 - ttHeight / 2,
                                    left: position.left - ttWidth
                                };
                                break;
                            default:
                                ttPosition = {
                                    top: position.top - ttHeight,
                                    left: position.left + position.width / 2 - ttWidth / 2
                                };
                                break;
                        }

                        ttPosition.top += 'px';
                        ttPosition.left += 'px';

                        // Now set the calculated positioning.
                        tooltip.css(ttPosition);

                        // And show the tooltip.
                        scope.tt_isOpen = true;
                    }

                    // Hide the tooltip popup element.
                    function hide() {
                        // First things first: we don't show it anymore.
                        scope.tt_isOpen = false;

                        //if tooltip is going to be shown after delay, we must cancel this
                        $timeout.cancel(popupTimeout);

                        // And now we remove it from the DOM. However, if we have animation, we 
                        // need to wait for it to expire beforehand.
                        // FIXME: this is a placeholder for a port of the transitions library.
                        if (angular.isDefined(scope.tt_animation) && scope.tt_animation()) {
                            transitionTimeout = $timeout(function () { tooltip.remove(); }, 500);
                        } else {
                            tooltip.remove();
                        }
                    }

                    /**
                     * Observe the relevant attributes.
                     */
                    attrs.$observe(type, function (val) {
                        scope.tt_content = val;
                    });

                    attrs.$observe(prefix + 'Title', function (val) {
                        scope.tt_title = val;
                    });

                    attrs.$observe(prefix + 'Placement', function (val) {
                        scope.tt_placement = angular.isDefined(val) ? val : options.placement;
                    });

                    attrs.$observe(prefix + 'Animation', function (val) {
                        scope.tt_animation = angular.isDefined(val) ? $parse(val) : function () { return options.animation; };
                    });

                    attrs.$observe(prefix + 'PopupDelay', function (val) {
                        var delay = parseInt(val, 10);
                        scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;
                    });

                    attrs.$observe(prefix + 'Trigger', function (val) {

                        if (hasRegisteredTriggers) {
                            element.unbind(triggers.show, showTooltipBind);
                            element.unbind(triggers.hide, hideTooltipBind);
                        }

                        triggers = getTriggers(val);

                        if (triggers.show === triggers.hide) {
                            element.bind(triggers.show, toggleTooltipBind);
                        } else {
                            element.bind(triggers.show, showTooltipBind);
                            element.bind(triggers.hide, hideTooltipBind);
                        }

                        hasRegisteredTriggers = true;
                    });

                    attrs.$observe(prefix + 'AppendToBody', function (val) {
                        appendToBody = angular.isDefined(val) ? $parse(val)(scope) : appendToBody;
                    });

                    // if a tooltip is attached to <body> we need to remove it on
                    // location change as its parent scope will probably not be destroyed
                    // by the change.
                    if (appendToBody) {
                        scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess() {
                            if (scope.tt_isOpen) {
                                hide();
                            }
                        });
                    }

                    // Make sure tooltip is destroyed and removed.
                    scope.$on('$destroy', function onDestroyTooltip() {
                        if (scope.tt_isOpen) {
                            hide();
                        } else {
                            tooltip.remove();
                        }
                    });
                }
            };
        };
    }];
})

.directive('tooltipPopup', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
        templateUrl: 'template/tooltip/tooltip-popup.html'
    };
})

.directive('tooltip', ['$tooltip', function ($tooltip) {
    return $tooltip('tooltip', 'tooltip', 'mouseenter');
}])

.directive('tooltipHtmlUnsafePopup', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
        templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
    };
})

.directive('tooltipHtmlUnsafe', ['$tooltip', function ($tooltip) {
    return $tooltip('tooltipHtmlUnsafe', 'tooltip', 'mouseenter');
}]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip'])
.directive('popoverPopup', function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
        templateUrl: 'template/popover/popover.html'
    };
})
.directive('popover', ['$compile', '$timeout', '$parse', '$window', '$tooltip', function ($compile, $timeout, $parse, $window, $tooltip) {
    return $tooltip('popover', 'popover', 'click');
}]);


angular.module('ui.bootstrap.progressbar', ['ui.bootstrap.transition'])

.constant('progressConfig', {
    animate: true,
    autoType: false,
    stackedTypes: ['success', 'info', 'warning', 'danger']
})

.controller('ProgressBarController', ['$scope', '$attrs', 'progressConfig', function ($scope, $attrs, progressConfig) {

    // Whether bar transitions should be animated
    var animate = angular.isDefined($attrs.animate) ? $scope.$eval($attrs.animate) : progressConfig.animate;
    var autoType = angular.isDefined($attrs.autoType) ? $scope.$eval($attrs.autoType) : progressConfig.autoType;
    var stackedTypes = angular.isDefined($attrs.stackedTypes) ? $scope.$eval('[' + $attrs.stackedTypes + ']') : progressConfig.stackedTypes;

    // Create bar object
    this.makeBar = function (newBar, oldBar, index) {
        var newValue = (angular.isObject(newBar)) ? newBar.value : (newBar || 0);
        var oldValue = (angular.isObject(oldBar)) ? oldBar.value : (oldBar || 0);
        var type = (angular.isObject(newBar) && angular.isDefined(newBar.type)) ? newBar.type : (autoType) ? getStackedType(index || 0) : null;

        return {
            from: oldValue,
            to: newValue,
            type: type,
            animate: animate
        };
    };

    function getStackedType(index) {
        return stackedTypes[index];
    }

    this.addBar = function (bar) {
        $scope.bars.push(bar);
        $scope.totalPercent += bar.to;
    };

    this.clearBars = function () {
        $scope.bars = [];
        $scope.totalPercent = 0;
    };
    this.clearBars();
}])

.directive('progress', function () {
    return {
        restrict: 'EA',
        replace: true,
        controller: 'ProgressBarController',
        scope: {
            value: '=percent',
            onFull: '&',
            onEmpty: '&'
        },
        templateUrl: 'template/progressbar/progress.html',
        link: function (scope, element, attrs, controller) {
            scope.$watch('value', function (newValue, oldValue) {
                controller.clearBars();

                if (angular.isArray(newValue)) {
                    // Stacked progress bar
                    for (var i = 0, n = newValue.length; i < n; i++) {
                        controller.addBar(controller.makeBar(newValue[i], oldValue[i], i));
                    }
                } else {
                    // Simple bar
                    controller.addBar(controller.makeBar(newValue, oldValue));
                }
            }, true);

            // Total percent listeners
            scope.$watch('totalPercent', function (value) {
                if (value >= 100) {
                    scope.onFull();
                } else if (value <= 0) {
                    scope.onEmpty();
                }
            }, true);
        }
    };
})

.directive('progressbar', ['$transition', function ($transition) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            width: '=',
            old: '=',
            type: '=',
            animate: '='
        },
        templateUrl: 'template/progressbar/bar.html',
        link: function (scope, element) {
            scope.$watch('width', function (value) {
                if (scope.animate) {
                    element.css('width', scope.old + '%');
                    $transition(element, { width: value + '%' });
                } else {
                    element.css('width', value + '%');
                }
            });
        }
    };
}]);
angular.module('ui.bootstrap.rating', [])

.constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null
})

.controller('RatingController', ['$scope', '$attrs', '$parse', 'ratingConfig', function ($scope, $attrs, $parse, ratingConfig) {

    this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;

    this.createDefaultRange = function (len) {
        var defaultStateObject = {
            stateOn: this.stateOn,
            stateOff: this.stateOff
        };

        var states = new Array(len);
        for (var i = 0; i < len; i++) {
            states[i] = defaultStateObject;
        }
        return states;
    };

    this.normalizeRange = function (states) {
        for (var i = 0, n = states.length; i < n; i++) {
            states[i].stateOn = states[i].stateOn || this.stateOn;
            states[i].stateOff = states[i].stateOff || this.stateOff;
        }
        return states;
    };

    // Get objects used in template
    $scope.range = angular.isDefined($attrs.ratingStates) ? this.normalizeRange(angular.copy($scope.$parent.$eval($attrs.ratingStates))) : this.createDefaultRange(this.maxRange);

    $scope.rate = function (value) {
        if ($scope.readonly || $scope.value === value) {
            return;
        }

        $scope.value = value;
    };

    $scope.enter = function (value) {
        if (!$scope.readonly) {
            $scope.val = value;
        }
        $scope.onHover({ value: value });
    };

    $scope.reset = function () {
        $scope.val = angular.copy($scope.value);
        $scope.onLeave();
    };

    $scope.$watch('value', function (value) {
        $scope.val = value;
    });

    $scope.readonly = false;
    if ($attrs.readonly) {
        $scope.$parent.$watch($parse($attrs.readonly), function (value) {
            $scope.readonly = !!value;
        });
    }
}])

.directive('rating', function () {
    return {
        restrict: 'EA',
        scope: {
            value: '=',
            onHover: '&',
            onLeave: '&'
        },
        controller: 'RatingController',
        templateUrl: 'template/rating/rating.html',
        replace: true
    };
});

/**
 * @ngdoc overview
 * @name ui.bootstrap.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */

angular.module('ui.bootstrap.tabs', [])

.directive('tabs', function () {
    return function () {
        throw new Error("The `tabs` directive is deprecated, please migrate to `tabset`. Instructions can be found at http://github.com/angular-ui/bootstrap/tree/master/CHANGELOG.md");
    };
})

.controller('TabsetController', ['$scope', '$element',
function TabsetCtrl($scope, $element) {

    var ctrl = this,
      tabs = ctrl.tabs = $scope.tabs = [];

    ctrl.select = function (tab) {
        angular.forEach(tabs, function (tab) {
            tab.active = false;
        });
        tab.active = true;
    };

    ctrl.addTab = function addTab(tab) {
        tabs.push(tab);
        if (tabs.length === 1 || tab.active) {
            ctrl.select(tab);
        }
    };

    ctrl.removeTab = function removeTab(tab) {
        var index = tabs.indexOf(tab);
        //Select a new tab if the tab to be removed is selected
        if (tab.active && tabs.length > 1) {
            //If this is the last tab, select the previous tab. else, the next tab.
            var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
            ctrl.select(tabs[newActiveIndex]);
        }
        tabs.splice(index, 1);
    };
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {string=} direction  What direction the tabs should be rendered. Available:
 * 'right', 'left', 'below'.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <tabset>
      <tab heading="Vertical Tab 1"><b>First</b> Content!</tab>
      <tab heading="Vertical Tab 2"><i>Second</i> Content!</tab>
    </tabset>
    <hr />
    <tabset vertical="true">
      <tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</tab>
      <tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</tab>
    </tabset>
  </file>
</example>
 */
.directive('tabset', function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        require: '^tabset',
        scope: {},
        controller: 'TabsetController',
        templateUrl: 'template/tabs/tabset.html',
        compile: function (elm, attrs, transclude) {
            return function (scope, element, attrs, tabsetCtrl) {
                scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
                scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
                scope.direction = angular.isDefined(attrs.direction) ? scope.$parent.$eval(attrs.direction) : 'top';
                scope.tabsAbove = (scope.direction != 'below');
                tabsetCtrl.$scope = scope;
                tabsetCtrl.$transcludeFn = transclude;
            };
        }
    };
})

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link ui.bootstrap.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link ui.bootstrap.tabs.directive:tabset tabset}.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <div ng-controller="TabsDemoCtrl">
      <button class="btn btn-small" ng-click="items[0].active = true">
        Select item 1, using active binding
      </button>
      <button class="btn btn-small" ng-click="items[1].disabled = !items[1].disabled">
        Enable/disable item 2, using disabled binding
      </button>
      <br />
      <tabset>
        <tab heading="Tab 1">First Tab</tab>
        <tab select="alertMe()">
          <tab-heading><i class="icon-bell"></i> Alert me!</tab-heading>
          Second Tab, with alert callback and html heading!
        </tab>
        <tab ng-repeat="item in items"
          heading="{{item.title}}"
          disabled="item.disabled"
          active="item.active">
          {{item.content}}
        </tab>
      </tabset>
    </div>
  </file>
  <file name="script.js">
    function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
  </file>
</example>
 */

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link ui.bootstrap.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <tabset>
      <tab>
        <tab-heading><b>HTML</b> in my titles?!</tab-heading>
        And some content, too!
      </tab>
      <tab>
        <tab-heading><i class="icon-heart"></i> Icon heading?!?</tab-heading>
        That's right.
      </tab>
    </tabset>
  </file>
</example>
 */
.directive('tab', ['$parse', '$http', '$templateCache', '$compile',
function ($parse, $http, $templateCache, $compile) {
    return {
        require: '^tabset',
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/tabs/tab.html',
        transclude: true,
        scope: {
            heading: '@',
            onSelect: '&select', //This callback is called in contentHeadingTransclude
            //once it inserts the tab's content into the dom
            onDeselect: '&deselect'
        },
        controller: function () {
            //Empty controller so other directives can require being 'under' a tab
        },
        compile: function (elm, attrs, transclude) {
            return function postLink(scope, elm, attrs, tabsetCtrl) {
                var getActive, setActive;
                if (attrs.active) {
                    getActive = $parse(attrs.active);
                    setActive = getActive.assign;
                    scope.$parent.$watch(getActive, function updateActive(value) {
                        scope.active = !!value;
                    });
                    scope.active = getActive(scope.$parent);
                } else {
                    setActive = getActive = angular.noop;
                }

                scope.$watch('active', function (active) {
                    setActive(scope.$parent, active);
                    if (active) {
                        tabsetCtrl.select(scope);
                        scope.onSelect();
                    } else {
                        scope.onDeselect();
                    }
                });

                scope.disabled = false;
                if (attrs.disabled) {
                    scope.$parent.$watch($parse(attrs.disabled), function (value) {
                        scope.disabled = !!value;
                    });
                }

                scope.select = function () {
                    if (!scope.disabled) {
                        scope.active = true;
                    }
                };

                tabsetCtrl.addTab(scope);
                scope.$on('$destroy', function () {
                    tabsetCtrl.removeTab(scope);
                });
                if (scope.active) {
                    setActive(scope.$parent, true);
                }


                //We need to transclude later, once the content container is ready.
                //when this link happens, we're inside a tab heading.
                scope.$transcludeFn = transclude;
            };
        }
    };
}])

.directive('tabHeadingTransclude', [function () {
    return {
        restrict: 'A',
        require: '^tab',
        link: function (scope, elm, attrs, tabCtrl) {
            scope.$watch('headingElement', function updateHeadingElement(heading) {
                if (heading) {
                    elm.html('');
                    elm.append(heading);
                }
            });
        }
    };
}])

.directive('tabContentTransclude', ['$compile', '$parse', function ($compile, $parse) {
    return {
        restrict: 'A',
        require: '^tabset',
        link: function (scope, elm, attrs) {
            var tab = scope.$eval(attrs.tabContentTransclude);

            //Now our tab is ready to be transcluded: both the tab heading area
            //and the tab content area are loaded.  Transclude 'em both.
            tab.$transcludeFn(tab.$parent, function (contents) {
                angular.forEach(contents, function (node) {
                    if (isTabHeading(node)) {
                        //Let tabHeadingTransclude know.
                        tab.headingElement = node;
                    } else {
                        elm.append(node);
                    }
                });
            });
        }
    };
    function isTabHeading(node) {
        return node.tagName && (
          node.hasAttribute('tab-heading') ||
          node.hasAttribute('data-tab-heading') ||
          node.tagName.toLowerCase() === 'tab-heading' ||
          node.tagName.toLowerCase() === 'data-tab-heading'
        );
    }
}])

.directive('tabsetTitles', ['$http', function ($http) {
    return {
        restrict: 'A',
        require: '^tabset',
        templateUrl: 'template/tabs/tabset-titles.html',
        replace: true,
        link: function (scope, elm, attrs, tabsetCtrl) {
            if (!scope.$eval(attrs.tabsetTitles)) {
                elm.remove();
            } else {
                //now that tabs location has been decided, transclude the tab titles in
                tabsetCtrl.$transcludeFn(tabsetCtrl.$scope.$parent, function (node) {
                    elm.append(node);
                });
            }
        }
    };
}])

;


angular.module('ui.bootstrap.timepicker', [])

.constant('timepickerConfig', {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: true,
    meridians: ['AM', 'PM'],
    readonlyInput: false,
    mousewheel: true
})

.directive('timepicker', ['$parse', '$log', 'timepickerConfig', function ($parse, $log, timepickerConfig) {
    return {
        restrict: 'EA',
        require: '?^ngModel',
        replace: true,
        scope: {},
        templateUrl: 'template/timepicker/timepicker.html',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return; // do nothing if no ng-model
            }

            var selected = new Date(), meridians = timepickerConfig.meridians;

            var hourStep = timepickerConfig.hourStep;
            if (attrs.hourStep) {
                scope.$parent.$watch($parse(attrs.hourStep), function (value) {
                    hourStep = parseInt(value, 10);
                });
            }

            var minuteStep = timepickerConfig.minuteStep;
            if (attrs.minuteStep) {
                scope.$parent.$watch($parse(attrs.minuteStep), function (value) {
                    minuteStep = parseInt(value, 10);
                });
            }

            // 12H / 24H mode
            scope.showMeridian = timepickerConfig.showMeridian;
            if (attrs.showMeridian) {
                scope.$parent.$watch($parse(attrs.showMeridian), function (value) {
                    scope.showMeridian = !!value;

                    if (ngModel.$error.time) {
                        // Evaluate from template
                        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
                        if (angular.isDefined(hours) && angular.isDefined(minutes)) {
                            selected.setHours(hours);
                            refresh();
                        }
                    } else {
                        updateTemplate();
                    }
                });
            }

            // Get scope.hours in 24H mode if valid
            function getHoursFromTemplate() {
                var hours = parseInt(scope.hours, 10);
                var valid = (scope.showMeridian) ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
                if (!valid) {
                    return undefined;
                }

                if (scope.showMeridian) {
                    if (hours === 12) {
                        hours = 0;
                    }
                    if (scope.meridian === meridians[1]) {
                        hours = hours + 12;
                    }
                }
                return hours;
            }

            function getMinutesFromTemplate() {
                var minutes = parseInt(scope.minutes, 10);
                return (minutes >= 0 && minutes < 60) ? minutes : undefined;
            }

            function pad(value) {
                return (angular.isDefined(value) && value.toString().length < 2) ? '0' + value : value;
            }

            // Input elements
            var inputs = element.find('input'), hoursInputEl = inputs.eq(0), minutesInputEl = inputs.eq(1);

            // Respond on mousewheel spin
            var mousewheel = (angular.isDefined(attrs.mousewheel)) ? scope.$eval(attrs.mousewheel) : timepickerConfig.mousewheel;
            if (mousewheel) {

                var isScrollingUp = function (e) {
                    if (e.originalEvent) {
                        e = e.originalEvent;
                    }
                    //pick correct delta variable depending on event
                    var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
                    return (e.detail || delta > 0);
                };

                hoursInputEl.bind('mousewheel wheel', function (e) {
                    scope.$apply((isScrollingUp(e)) ? scope.incrementHours() : scope.decrementHours());
                    e.preventDefault();
                });

                minutesInputEl.bind('mousewheel wheel', function (e) {
                    scope.$apply((isScrollingUp(e)) ? scope.incrementMinutes() : scope.decrementMinutes());
                    e.preventDefault();
                });
            }

            scope.readonlyInput = (angular.isDefined(attrs.readonlyInput)) ? scope.$eval(attrs.readonlyInput) : timepickerConfig.readonlyInput;
            if (!scope.readonlyInput) {

                var invalidate = function (invalidHours, invalidMinutes) {
                    ngModel.$setViewValue(null);
                    ngModel.$setValidity('time', false);
                    if (angular.isDefined(invalidHours)) {
                        scope.invalidHours = invalidHours;
                    }
                    if (angular.isDefined(invalidMinutes)) {
                        scope.invalidMinutes = invalidMinutes;
                    }
                };

                scope.updateHours = function () {
                    var hours = getHoursFromTemplate();

                    if (angular.isDefined(hours)) {
                        selected.setHours(hours);
                        refresh('h');
                    } else {
                        invalidate(true);
                    }
                };

                hoursInputEl.bind('blur', function (e) {
                    if (!scope.validHours && scope.hours < 10) {
                        scope.$apply(function () {
                            scope.hours = pad(scope.hours);
                        });
                    }
                });

                scope.updateMinutes = function () {
                    var minutes = getMinutesFromTemplate();

                    if (angular.isDefined(minutes)) {
                        selected.setMinutes(minutes);
                        refresh('m');
                    } else {
                        invalidate(undefined, true);
                    }
                };

                minutesInputEl.bind('blur', function (e) {
                    if (!scope.invalidMinutes && scope.minutes < 10) {
                        scope.$apply(function () {
                            scope.minutes = pad(scope.minutes);
                        });
                    }
                });
            } else {
                scope.updateHours = angular.noop;
                scope.updateMinutes = angular.noop;
            }

            ngModel.$render = function () {
                var date = ngModel.$modelValue ? new Date(ngModel.$modelValue) : null;

                if (isNaN(date)) {
                    ngModel.$setValidity('time', false);
                    $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
                } else {
                    if (date) {
                        selected = date;
                    }
                    makeValid();
                    updateTemplate();
                }
            };

            // Call internally when we know that model is valid.
            function refresh(keyboardChange) {
                makeValid();
                ngModel.$setViewValue(new Date(selected));
                updateTemplate(keyboardChange);
            }

            function makeValid() {
                ngModel.$setValidity('time', true);
                scope.invalidHours = false;
                scope.invalidMinutes = false;
            }

            function updateTemplate(keyboardChange) {
                var hours = selected.getHours(), minutes = selected.getMinutes();

                if (scope.showMeridian) {
                    hours = (hours === 0 || hours === 12) ? 12 : hours % 12; // Convert 24 to 12 hour system
                }
                scope.hours = keyboardChange === 'h' ? hours : pad(hours);
                scope.minutes = keyboardChange === 'm' ? minutes : pad(minutes);
                scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
            }

            function addMinutes(minutes) {
                var dt = new Date(selected.getTime() + minutes * 60000);
                selected.setHours(dt.getHours(), dt.getMinutes());
                refresh();
            }

            scope.incrementHours = function () {
                addMinutes(hourStep * 60);
            };
            scope.decrementHours = function () {
                addMinutes(-hourStep * 60);
            };
            scope.incrementMinutes = function () {
                addMinutes(minuteStep);
            };
            scope.decrementMinutes = function () {
                addMinutes(-minuteStep);
            };
            scope.toggleMeridian = function () {
                addMinutes(12 * 60 * ((selected.getHours() < 12) ? 1 : -1));
            };
        }
    };
}]);

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('typeaheadParser', ['$parse', function ($parse) {

      //                      00000111000000000000022200000000000000003333333333333330000000000044000
      var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

      return {
          parse: function (input) {

              var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
              if (!match) {
                  throw new Error(
                    "Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
                      " but got '" + input + "'.");
              }

              return {
                  itemName: match[3],
                  source: $parse(match[4]),
                  viewMapper: $parse(match[2] || match[1]),
                  modelMapper: $parse(match[1])
              };
          }
      };
  }])

  .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
    function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

        var HOT_KEYS = [9, 13, 27, 38, 40];

        return {
            require: 'ngModel',
            link: function (originalScope, element, attrs, modelCtrl) {

                //SUPPORTED ATTRIBUTES (OPTIONS)

                //minimal no of characters that needs to be entered before typeahead kicks-in
                var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

                //minimal wait time after last character typed before typehead kicks-in
                var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

                //should it restrict model values to the ones selected from the popup only?
                var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

                //binding to a variable that indicates if matches are being retrieved asynchronously
                var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

                //a callback executed when a match is selected
                var onSelectCallback = $parse(attrs.typeaheadOnSelect);

                var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

                //INTERNAL VARIABLES

                //model setter executed upon match selection
                var $setModelValue = $parse(attrs.ngModel).assign;

                //expressions used by typeahead
                var parserResult = typeaheadParser.parse(attrs.typeahead);


                //pop-up element used to display matches
                var popUpEl = angular.element('<typeahead-popup></typeahead-popup>');
                popUpEl.attr({
                    matches: 'matches',
                    active: 'activeIdx',
                    select: 'select(activeIdx)',
                    query: 'query',
                    position: 'position'
                });
                //custom item template
                if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
                    popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
                }

                //create a child scope for the typeahead directive so we are not polluting original scope
                //with typeahead-specific data (matches, query etc.)
                var scope = originalScope.$new();
                originalScope.$on('$destroy', function () {
                    scope.$destroy();
                });

                var resetMatches = function () {
                    scope.matches = [];
                    scope.activeIdx = -1;
                };

                var getMatchesAsync = function (inputValue) {

                    var locals = { $viewValue: inputValue };
                    isLoadingSetter(originalScope, true);
                    $q.when(parserResult.source(scope, locals)).then(function (matches) {

                        //it might happen that several async queries were in progress if a user were typing fast
                        //but we are interested only in responses that correspond to the current view value
                        if (inputValue === modelCtrl.$viewValue) {
                            if (matches.length > 0) {

                                scope.activeIdx = 0;
                                scope.matches.length = 0;

                                //transform labels
                                for (var i = 0; i < matches.length; i++) {
                                    locals[parserResult.itemName] = matches[i];
                                    scope.matches.push({
                                        label: parserResult.viewMapper(scope, locals),
                                        model: matches[i]
                                    });
                                }

                                scope.query = inputValue;
                                //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                                //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                                //due to other elements being rendered
                                scope.position = $position.position(element);
                                scope.position.top = scope.position.top + element.prop('offsetHeight');

                            } else {
                                resetMatches();
                            }
                            isLoadingSetter(originalScope, false);
                        }
                    }, function () {
                        resetMatches();
                        isLoadingSetter(originalScope, false);
                    });
                };

                resetMatches();

                //we need to propagate user's query so we can higlight matches
                scope.query = undefined;

                //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
                var timeoutPromise;

                //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
                //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
                modelCtrl.$parsers.unshift(function (inputValue) {

                    resetMatches();
                    if (inputValue && inputValue.length >= minSearch) {
                        if (waitTime > 0) {
                            if (timeoutPromise) {
                                $timeout.cancel(timeoutPromise);//cancel previous timeout
                            }
                            timeoutPromise = $timeout(function () {
                                getMatchesAsync(inputValue);
                            }, waitTime);
                        } else {
                            getMatchesAsync(inputValue);
                        }
                    }

                    if (isEditable) {
                        return inputValue;
                    } else {
                        modelCtrl.$setValidity('editable', false);
                        return undefined;
                    }
                });

                modelCtrl.$formatters.push(function (modelValue) {

                    var candidateViewValue, emptyViewValue;
                    var locals = {};

                    if (inputFormatter) {

                        locals['$model'] = modelValue;
                        return inputFormatter(originalScope, locals);

                    } else {

                        //it might happen that we don't have enough info to properly render input value
                        //we need to check for this situation and simply return model value if we can't apply custom formatting
                        locals[parserResult.itemName] = modelValue;
                        candidateViewValue = parserResult.viewMapper(originalScope, locals);
                        locals[parserResult.itemName] = undefined;
                        emptyViewValue = parserResult.viewMapper(originalScope, locals);

                        return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
                    }
                });

                scope.select = function (activeIdx) {
                    //called from within the $digest() cycle
                    var locals = {};
                    var model, item;

                    locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                    model = parserResult.modelMapper(originalScope, locals);
                    $setModelValue(originalScope, model);
                    modelCtrl.$setValidity('editable', true);

                    onSelectCallback(originalScope, {
                        $item: item,
                        $model: model,
                        $label: parserResult.viewMapper(originalScope, locals)
                    });

                    resetMatches();

                    //return focus to the input element if a mach was selected via a mouse click event
                    element[0].focus();
                };

                //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
                element.bind('keydown', function (evt) {

                    //typeahead is open and an "interesting" key was pressed
                    if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                        return;
                    }

                    evt.preventDefault();

                    if (evt.which === 40) {
                        scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                        scope.$digest();

                    } else if (evt.which === 38) {
                        scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
                        scope.$digest();

                    } else if (evt.which === 13 || evt.which === 9) {
                        scope.$apply(function () {
                            scope.select(scope.activeIdx);
                        });

                    } else if (evt.which === 27) {
                        evt.stopPropagation();

                        resetMatches();
                        scope.$digest();
                    }
                });

                // Keep reference to click handler to unbind it.
                var dismissClickHandler = function (evt) {
                    if (element[0] !== evt.target) {
                        resetMatches();
                        scope.$digest();
                    }
                };

                $document.bind('click', dismissClickHandler);

                originalScope.$on('$destroy', function () {
                    $document.unbind('click', dismissClickHandler);
                });

                element.after($compile(popUpEl)(scope));
            }
        };

    }])

  .directive('typeaheadPopup', function () {
      return {
          restrict: 'E',
          scope: {
              matches: '=',
              query: '=',
              active: '=',
              position: '=',
              select: '&'
          },
          replace: true,
          templateUrl: 'template/typeahead/typeahead-popup.html',
          link: function (scope, element, attrs) {

              scope.templateUrl = attrs.templateUrl;

              scope.isOpen = function () {
                  return scope.matches.length > 0;
              };

              scope.isActive = function (matchIdx) {
                  return scope.active == matchIdx;
              };

              scope.selectActive = function (matchIdx) {
                  scope.active = matchIdx;
              };

              scope.selectMatch = function (activeIdx) {
                  scope.select({ activeIdx: activeIdx });
              };
          }
      };
  })

  .directive('typeaheadMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
      return {
          restrict: 'E',
          scope: {
              index: '=',
              match: '=',
              query: '='
          },
          link: function (scope, element, attrs) {
              var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
              $http.get(tplUrl, { cache: $templateCache }).success(function (tplContent) {
                  element.replaceWith($compile(tplContent.trim())(scope));
              });
          }
      };
  }])

  .filter('typeaheadHighlight', function () {

      function escapeRegexp(queryToEscape) {
          return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
      }

      return function (matchItem, query) {
          return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
      };
  });
angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/accordion/accordion-group.html",
      "<div class=\"accordion-group\">\n" +
      "  <div class=\"accordion-heading\" ><a class=\"accordion-toggle\" ng-click=\"isOpen = !isOpen\" accordion-transclude=\"heading\">{{heading}}</a></div>\n" +
      "  <div class=\"accordion-body\" collapse=\"!isOpen\">\n" +
      "    <div class=\"accordion-inner\" ng-transclude></div>  </div>\n" +
      "</div>");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/accordion/accordion.html",
      "<div class=\"accordion\" ng-transclude></div>");
}]);

angular.module("template/alert/alert.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/alert/alert.html",
      "<div class='alert' ng-class='type && \"alert-\" + type'>\n" +
      "    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n" +
      "    <div ng-transclude></div>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/carousel/carousel.html",
      "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\">\n" +
      "    <ol class=\"carousel-indicators\" ng-show=\"slides().length > 1\">\n" +
      "        <li ng-repeat=\"slide in slides()\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>\n" +
      "    </ol>\n" +
      "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
      "    <a ng-click=\"prev()\" class=\"carousel-control left\" ng-show=\"slides().length > 1\">&lsaquo;</a>\n" +
      "    <a ng-click=\"next()\" class=\"carousel-control right\" ng-show=\"slides().length > 1\">&rsaquo;</a>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/carousel/slide.html",
      "<div ng-class=\"{\n" +
      "    'active': leaving || (active && !entering),\n" +
      "    'prev': (next || active) && direction=='prev',\n" +
      "    'next': (next || active) && direction=='next',\n" +
      "    'right': direction=='prev',\n" +
      "    'left': direction=='next'\n" +
      "  }\" class=\"item\" ng-transclude></div>\n" +
      "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/datepicker/datepicker.html",
      "<table>\n" +
      "  <thead>\n" +
      "    <tr class=\"text-center\">\n" +
      "      <th><button type=\"button\" class=\"btn pull-left\" ng-click=\"move(-1)\"><i class=\"icon-chevron-left\"></i></button></th>\n" +
      "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><button type=\"button\" class=\"btn btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
      "      <th><button type=\"button\" class=\"btn pull-right\" ng-click=\"move(1)\"><i class=\"icon-chevron-right\"></i></button></th>\n" +
      "    </tr>\n" +
      "    <tr class=\"text-center\" ng-show=\"labels.length > 0\">\n" +
      "      <th ng-show=\"showWeekNumbers\">#</th>\n" +
      "      <th ng-repeat=\"label in labels\">{{label}}</th>\n" +
      "    </tr>\n" +
      "  </thead>\n" +
      "  <tbody>\n" +
      "    <tr ng-repeat=\"row in rows\">\n" +
      "      <td ng-show=\"showWeekNumbers\" class=\"text-center\"><em>{{ getWeekNumber(row) }}</em></td>\n" +
      "      <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
      "        <button type=\"button\" style=\"width:100%;\" class=\"btn\" ng-class=\"{'btn-info': dt.selected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{muted: dt.secondary}\">{{dt.label}}</span></button>\n" +
      "      </td>\n" +
      "    </tr>\n" +
      "  </tbody>\n" +
      "</table>\n" +
      "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/datepicker/popup.html",
      "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" class=\"dropdown-menu\">\n" +
      "	<li ng-transclude></li>\n" +
      "	<li class=\"divider\"></li>\n" +
      "	<li style=\"padding: 9px;\">\n" +
      "		<span class=\"btn-group\">\n" +
      "			<button class=\"btn btn-small btn-inverse\" ng-click=\"today()\">Today</button>\n" +
      "			<button class=\"btn btn-small btn-info\" ng-click=\"showWeeks = ! showWeeks\" ng-class=\"{active: showWeeks}\">Weeks</button>\n" +
      "			<button class=\"btn btn-small btn-danger\" ng-click=\"clear()\">Clear</button>\n" +
      "		</span>\n" +
      "		<button class=\"btn btn-small btn-success pull-right\" ng-click=\"isOpen = false\">Close</button>\n" +
      "	</li>\n" +
      "</ul>");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/modal/backdrop.html",
      "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\" ng-click=\"close($event)\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/modal/window.html",
      "<div class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10}\" ng-transclude></div>");
}]);

angular.module("template/pagination/pager.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/pagination/pager.html",
      "<div class=\"pager\">\n" +
      "  <ul>\n" +
      "    <li ng-repeat=\"page in pages\" ng-class=\"{disabled: page.disabled, previous: page.previous, next: page.next}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
      "  </ul>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/pagination/pagination.html",
      "<div class=\"pagination\"><ul>\n" +
      "  <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
      "  </ul>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",
      "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
      "  <div class=\"tooltip-arrow\"></div>\n" +
      "  <div class=\"tooltip-inner\" ng-bind-html-unsafe=\"content\"></div>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tooltip/tooltip-popup.html",
      "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
      "  <div class=\"tooltip-arrow\"></div>\n" +
      "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/popover/popover.html",
      "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
      "  <div class=\"arrow\"></div>\n" +
      "\n" +
      "  <div class=\"popover-inner\">\n" +
      "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
      "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
      "  </div>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/progressbar/bar.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/progressbar/bar.html",
      "<div class=\"bar\" ng-class='type && \"bar-\" + type'></div>");
}]);

angular.module("template/progressbar/progress.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/progressbar/progress.html",
      "<div class=\"progress\"><progressbar ng-repeat=\"bar in bars\" width=\"bar.to\" old=\"bar.from\" animate=\"bar.animate\" type=\"bar.type\"></progressbar></div>");
}]);

angular.module("template/rating/rating.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/rating/rating.html",
      "<span ng-mouseleave=\"reset()\">\n" +
      "	<i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" ng-class=\"$index < val && (r.stateOn || 'icon-star') || (r.stateOff || 'icon-star-empty')\"></i>\n" +
      "</span>");
}]);

angular.module("template/tabs/pane.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tabs/pane.html",
      "<div class=\"tab-pane\" ng-class=\"{active: selected}\" ng-show=\"selected\" ng-transclude></div>\n" +
      "");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tabs/tab.html",
      "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
      "  <a ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
      "</li>\n" +
      "");
}]);

angular.module("template/tabs/tabs.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tabs/tabs.html",
      "<div class=\"tabbable\">\n" +
      "  <ul class=\"nav nav-tabs\">\n" +
      "    <li ng-repeat=\"pane in panes\" ng-class=\"{active:pane.selected}\">\n" +
      "      <a ng-click=\"select(pane)\">{{pane.heading}}</a>\n" +
      "    </li>\n" +
      "  </ul>\n" +
      "  <div class=\"tab-content\" ng-transclude></div>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/tabs/tabset-titles.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tabs/tabset-titles.html",
      "<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n" +
      "</ul>\n" +
      "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tabs/tabset.html",
      "\n" +
      "<div class=\"tabbable\" ng-class=\"{'tabs-right': direction == 'right', 'tabs-left': direction == 'left', 'tabs-below': direction == 'below'}\">\n" +
      "  <div tabset-titles=\"tabsAbove\"></div>\n" +
      "  <div class=\"tab-content\">\n" +
      "    <div class=\"tab-pane\" \n" +
      "         ng-repeat=\"tab in tabs\" \n" +
      "         ng-class=\"{active: tab.active}\"\n" +
      "         tab-content-transclude=\"tab\">\n" +
      "    </div>\n" +
      "  </div>\n" +
      "  <div tabset-titles=\"!tabsAbove\"></div>\n" +
      "</div>\n" +
      "");
}]);

angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/timepicker/timepicker.html",
      "<table class=\"form-inline\">\n" +
      "	<tr class=\"text-center\">\n" +
      "		<td><a ng-click=\"incrementHours()\" class=\"btn btn-link\"><i class=\"icon-chevron-up\"></i></a></td>\n" +
      "		<td>&nbsp;</td>\n" +
      "		<td><a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><i class=\"icon-chevron-up\"></i></a></td>\n" +
      "		<td ng-show=\"showMeridian\"></td>\n" +
      "	</tr>\n" +
      "	<tr>\n" +
      "		<td class=\"control-group\" ng-class=\"{'error': invalidHours}\"><input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"span1 text-center\" ng-mousewheel=\"incrementHours()\" ng-readonly=\"readonlyInput\" maxlength=\"2\" /></td>\n" +
      "		<td>:</td>\n" +
      "		<td class=\"control-group\" ng-class=\"{'error': invalidMinutes}\"><input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"span1 text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\"></td>\n" +
      "		<td ng-show=\"showMeridian\"><button type=\"button\" ng-click=\"toggleMeridian()\" class=\"btn text-center\">{{meridian}}</button></td>\n" +
      "	</tr>\n" +
      "	<tr class=\"text-center\">\n" +
      "		<td><a ng-click=\"decrementHours()\" class=\"btn btn-link\"><i class=\"icon-chevron-down\"></i></a></td>\n" +
      "		<td>&nbsp;</td>\n" +
      "		<td><a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><i class=\"icon-chevron-down\"></i></a></td>\n" +
      "		<td ng-show=\"showMeridian\"></td>\n" +
      "	</tr>\n" +
      "</table>");
}]);

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/typeahead/typeahead-match.html",
      "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/typeahead/typeahead-popup.html",
      "<ul class=\"typeahead dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
      "    <li ng-repeat=\"match in matches\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\">\n" +
      "        <typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></typeahead-match>\n" +
      "    </li>\n" +
      "</ul>");
}]);

angular.module("template/typeahead/typeahead.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/typeahead/typeahead.html",
      "<ul class=\"typeahead dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
      "    <li ng-repeat=\"match in matches\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\">\n" +
      "        <a tabindex=\"-1\" ng-click=\"selectMatch($index)\" ng-bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>\n" +
      "    </li>\n" +
      "</ul>");
}]);
//
// js/angular/eatingwell.js
//
angular.module('eatingWell', ['ngRoute', 'ngResource', 'ngCookies', 'ngSanitize', 'ipCookie', 'ngDialog', 'angularFileUpload', 'ui.bootstrap']);

angular.module('eatingWell')
    .directive('dynamic', [
        '$compile', function ($compile) {
            return {
                restrict: 'A',
                replace: true,
                link: function (scope, ele, attrs) {
                    scope.$watch(attrs.dynamic, function (html) {
                        ele.html(html);
                        $compile(ele.contents())(scope);
                    });
                }
            };
        }
    ]).run(['$rootScope', function ($rootScope) {
        $rootScope.Toggles = window.Toggles;
    }]);

if (typeof adConfiguration !== 'undefined') {
    angular.module('eatingWell').value('adConfiguration', adConfiguration);
}

if (typeof salvattore !== 'undefined') {
    angular.module('eatingWell').value('salvattore', salvattore);
}

if (typeof ew_services_environment !== 'undefined') {
    angular.module('eatingWell').value('ew_services_environment', ew_services_environment);
}

if (typeof siteCollectionId !== 'undefined') {
    angular.module('eatingWell').value('siteCollectionId', siteCollectionId);
}

angular.module('eatingWell').config(['$sceDelegateProvider', '$locationProvider', '$routeProvider', '$windowProvider', function ($sceDelegateProvider, $locationProvider, $routeProvider, $windowProvider) {
    
    // opt in to angular's html5 pushstate history support
    // consequently all links/anchor tags we want to act "normally," 
    //when inside of an angular app, need to have "_self" as their target. See "a" directive below
    var isHtml5Support = window.history && window.history.pushState ? true : false;
    $locationProvider.html5Mode({ enabled: isHtml5Support, requireBase: false });

    var $window = $windowProvider.$get();
    var imageServerUrl = $window.ew_services_environment.scriptServerUrl;

    //Setup whitelist for CDN template support
    $sceDelegateProvider.resourceUrlWhitelist([
        'self', //Allow same origin 
        '**'
        //'http://images.media-allrecipes.com/**',
        //'http://images.localhost.allrecipes.corp/**',
        //'http://images.ci.allrecipes.corp/**',
        //'http://images.test.allrecipes.corp/**',
        //'http://images.perf01-vm.allrecipes.corp/**',
        //'http://images.backstage.allrecipes.corp/**'
    ]);

    $routeProvider.
        when('/mealplan_static/wizard', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/wizard/partials/plan-wizard-step1.html', controller: 'PlanWizardCtrl' }).
        when('/mealplan_static/wizard/step1', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/wizard/partials/plan-wizard-step1.html', controller: 'PlanWizardCtrl' }).
        when('/mealplan_static/wizard/step2', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/wizard/partials/plan-wizard-step2.html', controller: 'PlanWizardCtrl' }).
        when('/mealplan_static/wizard/register', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/wizard/partials/plan-wizard-register.html', controller: 'PlanWizardCtrl' }).
        when('/mealplan_static/wizard/step3', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/wizard/partials/plan-wizard-step3.html', controller: 'PlanWizardCtrl' }).
        when('/mealplan_static/plan/', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/partials/plan-list.html', controller: 'PlanListCtrl' }).
        when('/mealplan_static/plan/plans/:planId/day/', { redirectTo: '/plans/:planId/day/1' }).
        when('/mealplan_static/plan/plans/:planId/day/:dayNum/', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/partials/plan-day-detail.html', controller: 'PlanViewCtrl' }).
        when('/mealplan_static/plan/plans/:planId/3day/', { redirectTo: '/plans/:planId/3day/1' }).
        when('/mealplan_static/plan/plans/:planId/3day/:dayNum/', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/partials/plan-3day-detail.html', controller: 'PlanViewCtrl' }).
        when('/mealplan_static/plan/plans/:planId/week/', { redirectTo: '/plans/:planId/week/1' }).
        when('/mealplan_static/plan/plans/:planId/week/:weekNum/', { templateUrl: imageServerUrl + 'assets/eatingwell/mealplan/partials/plan-week-detail.html', controller: 'PlanViewCtrl' });
}
]);

angular
    .module('eatingWell')
    .directive('a', function () {
        // This directive is a hack in place to prevent angular from
        // going all SPA on us. Adding target="_self" to anchor. 
        // links ensures that angular lets them behave as a link- ie, go request data from the server.
        // A consequence of opting in to pushState above.
        return {
            restrict: 'E',
            link: function (scope, element, attributes) {
                if ((attributes.href || attributes.ngHref) && !attributes.target && !element.data("spa")) element[0].target = '_self';
            }
        }
    });


// place bootstrap always at the last
angular.bootstrap(document.getElementById('searchGlobalApp'), ['eatingWell']);
angular.bootstrap(document.getElementById('messageBanner'), ['eatingWell']);


//
// js/util/uid.js
//
"use strict";

var UID = {};

UID.New = function () {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
};
//
// js/util/string-helper.js
//
"use strict";var StringHelper={};StringHelper.IsNullOrEmpty=function(a){return(a===null||a===undefined||a==="")};
//
// js/angular/models/models.js
//
var ar=ar||{};(function(a){a.recipeboxPost=function(d,g,f,c,b,e){return{recipeID:d,type:g,title:f,imageUrl:c,deferredActionName:b,source:e}
};a.shoppingListIngredientPost=function(c,d,e,b){return{ingredientid:c,recipeid:d,servings:e,deferredActionName:b}};a.shoppingListRecipePost=function(c,d,b){return{recipeid:c,servings:d,deferredActionName:b}
};a.shoppingListWriteInPostItem=function(c,b){return{aisleid:b,displayvalue:c}};a.shoppingListWriteInPost=function(c,b){return{items:c,deferredActionName:b||"addtoshoppinglist"}
};a.shoppingListSaveRecipePostItem=function(b,c){return{recipeid:b,servings:c}};a.shoppingListSaveRecipePost=function(c,b){return{recipes:c,deferredActionName:b||"addRecipeToShoppingListFromAd"}
};a.recipeBoxSaveRecipePostItem=function(b,c){return{RecipeID:b,Type:c}};a.recipeBoxSaveRecipePost=function(c,b){return{recipes:c,deferredActionName:b||"addRecipeToRecipeBoxFromAd"}
};a.photoUploadPost=function(c,b){return{userid:c,recipeid:b}};a.reviewPost=function(b,c){return{rating:b,text:c}};a.madeItPost=function(c,b){return{recipeId:c,deferredActionName:b}
};a.madeItUndo=function(b){return{recipeId:b}};a.followPost=function(b,c){return{userID:b,deferredActionName:c}};a.collectionPost=function(b,c,d){return{collectionId:b,name:c,deferredActionName:d}
};a.navBarPost=function(b,c,d){return{categoryId:b,name:c,orderInList:d}}})(ar.models=ar.models||{});
//
// js/angular/models/event-handler.js
//
"use strict";EventHandler.prototype.Identifier="";function EventHandler(a){this.Identifier=a;this.Functions=[]}EventHandler.prototype.Fire=function(a){this.Handle(a)
};EventHandler.prototype.Handle=function(b){var a;for(a=0;a<this.Functions.length;a+=1){this.Functions[a].Function(b)}};EventHandler.prototype.Add=function(a,b){var c=b;
this.Functions.push({Name:c,Function:a});return c};EventHandler.prototype.Remove=function(a){var b,c=-1;for(b=0;b<this.Functions.length;
b+=1){if(this.Functions[b].Name===a){c=b;break}}if(c!==-1){this.Functions.splice(c,1)}};
//
// vendor/jquery/plugins/moment.js
//
Date.prototype.addMinutes=function(a){return new Date(this.getTime()+(a*60*1000))};Date.prototype.addHours=function(a){return new Date(this.getTime()+(a*60*60*1000))
};Date.prototype.addDays=function(a){return new Date(this.getTime()+(a*24*60*60*1000))};Date.prototype.from=function(a){var e=this.getTime()-a.getTime();
var f={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};
function d(j,h){var i=f[j];var g=i.replace(/%d/i,h);return g}function b(i,j){var h=i>0;var k=f[h?"future":"past"];var g=k.replace(/%s/i,j);
return g}function c(k){var m=Math.round(Math.abs(k)/1000);var l=Math.round(m/60);var j=Math.round(l/60);var h=Math.round(j/24);
var n=Math.round(h/365);var g=m<45&&["s",m]||l===1&&["m"]||l<45&&["mm",l]||j===1&&["h"]||j<22&&["hh",j]||h===1&&["d"]||h<=25&&["dd",h]||h<=45&&["M"]||h<345&&["MM",Math.round(h/30)]||n===1&&["y"]||["yy",n];
var i=d.apply({},g);i=b(k,i);return i}return c(e)};
//
// js/angular/controllers/navigationHeaderInterimController.js
//
angular.module("eatingWell").controller("ewNavigationHeaderInterimController",["$scope","$window",function(a,b){a.rolloverActiveClass="";
a.mobileMenuActiveClass="";var c=0;a.showMagazineRolloverAfterTimeout=function(){if(a.rolloverActiveClass===""){c=b.setTimeout(function(){a.showMagazineRollover()
},1000)}};a.showMagazineRollover=function(){a.rolloverActiveClass="active";a.$apply()};a.resetRollover=function(){if(a.rolloverActiveClass===""){b.clearTimeout(c)
}};a.hideMagazineRollover=function(){a.rolloverActiveClass=""};a.toggleInterimMobileMenu=function(){var d="active";a.mobileMenuActiveClass=a.mobileMenuActiveClass===d?"":d
};a.recipesNavActiveClass=[];a.togglerRecipesSubNav=[];a.toggleRecipesSubNav=function(d,e){b.onclick=null;a.togglerRecipesSubNav[d]=e!=null?e:!a.togglerRecipesSubNav[d];
a.recipesNavActiveClass[d]=a.togglerRecipesSubNav[d]?"active":"";if(a.togglerRecipesSubNav[d]){b.onclick=function(f){a.togglerRecipesSubNav[d]=false;
a.$apply()}}}}]);
//
// js/angular/controllers/searchHeaderController.js
//
angular.module("eatingWell").controller("ewSearchHeaderController",["$scope","$window",function(a,b){a.defaultText="";a.init=function(c){a.defaultText=c;
a.searchText=c};a.search=function(){console.log("starting to search");if(a.searchText){console.log("actually searching");var c=encodeURI(a.searchText);
b.location.href="/search/results/?wt="+c}};a.setFocusText=function(){if(a.searchText===a.defaultText){a.searchText=""}};a.setBlurText=function(){if(a.searchText===""){a.searchText=a.defaultText
}}}]);
//
// js/angular/controllers/navigationHeaderController.js
//
angular.module("eatingWell").controller("ewNavigationHeaderController",["$scope","$window",function(a,b){a.toggleProfileMenu=function(){b.onclick=null;
a.togglerProfileMenu=!a.togglerProfileMenu;a.togglerMobileMenu=false;if(a.togglerProfileMenu){b.onclick=function(c){a.togglerProfileMenu=false;
a.$apply()}}};a.toggleMobileMenu=function(){b.onclick=null;a.togglerMobileMenu=!a.togglerMobileMenu;a.togglerProfileMenu=false;
if(a.togglerMobileMenu){b.onclick=function(c){a.togglerMobileMenu=false;a.$apply()}}}}]);
//
// js/angular/services/login-service.js
//
"use strict";angular.module("eatingWell").factory("ewLogin",["$window",function(a){return{userId:((a.userinfo&&a.userinfo.id)?a.userinfo.id:0),goToAuthorizationWelcomePage:function(b){a.location.href="/account/authenticationwelcome/?loginreferrerurl="+b;
if(a.datalayer!=null){a.location.href+="&actionsource="+a.dataLayer.page.category.contentType}},isLoggedIn:function(){var b=a.Utils.getVisitorStatus();
return b!=null&&b.indexOf("loggedin")>0},ensureUserIsLoggedIn:function(b){var c=this;return function(d){if(!d){c.goToAuthorizationWelcomePage(a.location.href);
return null}else{if(typeof b==="function"){return b()}else{return null}}}}}}]);
//
// js/angular/services/apiinterceptor-provider.js
//
"use strict";angular.module("eatingWell").factory("ew_services_apiInterceptor",["$q","$injector","$rootScope","ewLogin",function(b,a,c,d){return{request:function(e){c.$broadcast("loadingindicator_show");
return e},requestError:function(e){c.$emit("notify","Oops! There was a problem. Try again in just a moment.",null,"failure");
c.$broadcast("loadingindicator_hide");return b.reject(e)},response:function(f){var e=a.get("$http");if(e.pendingRequests.length<1){c.$broadcast("loadingindicator_hide")
}return f},responseError:function(f){if(f&&f.status=="401"&&f.config.headers.Authorization.length>8){var e="";if(f.config.data.deferredActionName){e=((window.location.href.indexOf("?")<0)?"?":"&")+"deferred="+encodeURIComponent(JSON.stringify(f.config.data))
}d.goToAuthorizationWelcomePage(encodeURIComponent(window.location.href+e))}else{}c.$broadcast("loadingindicator_hide");return b.reject(f)
}}}]);
//
// js/angular/services/token-provider.js
//
"use strict";angular.module("eatingWell").factory("ew_services_token",["$cookies",function(a){return{token:function(){var b=a.ARToken;
var c="Bearer "+b;return c}}}]).config(["$provide","$httpProvider",function(b,a){a.interceptors.push("ew_services_apiInterceptor")
}]);
//
// js/angular/services/perishable-localstorage-service.js
//
"use strict";angular.module("eatingWell").factory("perishableLocalstorage",["$window","ipCookie","ew_services_environment",function(a,c,b){var f=1800000;
var d=function(g){return a.localStorage.getItem(g+"ExpirationDate")===null||Date.now()>a.localStorage.getItem(g+"ExpirationDate")
};var e=function(){try{var j="Check if local storage is available";var h="ar_localStorage_check";a.localStorage.setItem(h,j);
var i=a.localStorage.getItem(h)==j;localStorage.removeItem(h);return i}catch(g){return false}};return{set:function(i,k,h){var j=f;
if(typeof h!="undefined"){j=h}if(e()){a.localStorage.setItem(i,JSON.stringify(k));if(d(i)){a.localStorage.setItem(i+"ExpirationDate",Date.now()+j)
}}else{var g=b.baseDomain;c(i,JSON.stringify(k),{domain:g,path:"/",expires:30,expirationUnit:"minutes"})}},get:function(g){if(e()){var h=a.localStorage.getItem(g);
h=((h==null)||(h==""))?null:JSON.parse(h);return d(g)?null:h}else{return((c(g)==null)||(c(g)==""))?null:c(g)}},remove:function(g){if(e()){a.localStorage.remove(g+"ExpirationDate");
return a.localStorage.removeItem(g)}else{return c.remove(g)}}}}]);
//
// js/angular/services/current-user-state-service.js
//
"use strict";angular.module("eatingWell").service("ewCurrentUserStateService",["perishableLocalstorage",function(b){var a=undefined;
this.currentUserChangedHandler=new EventHandler("CurrentUserState.CurrentUserChanged");this.followersListChangedHandler=new EventHandler("CurrentUserState.FollowersListChanged");
this.followingListChangedHandler=new EventHandler("CurrentUserState.FollowingListChanged");this.getCurrentUser=function(){if(a===undefined||a===null){var c=b.get("CurrentUserStateModel");
if(c!==""&&c!==undefined&&c!==null){a=c}else{a=null}}return a};this.setCurrentUser=function(c){this.currentUserState=c;this.currentUserChangedHandler.Handle(this.currentUserState)
}}]);
//
// js/angular/services/public-profile-state-service.js
//
"use strict";angular.module("eatingWell").service("ewPublicProfileStateService",["perishableLocalstorage",function(a){var b=undefined;
var c=undefined;this.publicProfileUserChangedHandler=new EventHandler("PublicProfile.PublicProfileUserChanged");this.publicProfileSubViewChangedHandler=new EventHandler("PublicProfile.PublicProfileSubViewChanged");
this.followersListChangedHandler=new EventHandler("PublicProfile.FollowersListChanged");this.followingListChangedHandler=new EventHandler("PublicProfile.FollowingListChanged");
this.getProfileUser=function(){if(b===undefined||b===null){var d=a.get("PublicProfileStateModel");if(d!==""&&d!==undefined&&d!==null){b=d
}else{b=null}}return b};this.setProfileUser=function(d){this.profileUserState=d;this.publicProfileUserChangedHandler.Handle(this.profileUserState)
};this.getPublicProfileSubView=function(){return c};this.setPublicProfileSubView=function(e){var d=c;c=e;this.publicProfileSubViewChangedHandler.Handle({currentView:c,previousView:d})
}}]);
//
// js/angular/services/recipebox-provider.js
//
"use strict";angular.module("eatingWell").factory("ewServicesRecipebox",["ew_services_environment","$resource","ew_services_token",function(b,a,c){var e=b.url+"v1/users/me/recipe-box/recipes";
var d=b.url+"v1/users/me/recipe-box/folders/";return a(e,{id:"@id",cookid:"@cookid"},{save:{url:e,method:"POST",isArray:false,headers:{Authorization:function(){var f=c.token();
return f}}},remove:{url:b.url+"v1/users/me/recipe-box/recipe/:id",method:"DELETE",isArray:false,headers:{Authorization:c.token}},removeFavorite:{url:b.url+"v1/users/me/recipe-box/recipes/:id",method:"DELETE",isArray:false,headers:{Authorization:c.token}},getRecipeIds:{url:b.url+"v1/users/me/recipe-box/recipeids",method:"GET",isArray:true,headers:{Authorization:c.token}},})
}]);
//
// js/angular/services/recipeboxstorage-service.js
//
"use strict";angular.module("eatingWell").factory("ewRecipeBoxStorage",["perishableLocalstorage","ewServicesRecipebox","ewLogin","$q",function(h,e,d,a){var g="RecipeBoxItems"+d.userId;
var f=d.isLoggedIn()?(d.userId!==0?h.get(g):null):null;var i;if(f===null){f={};if(d.isLoggedIn()){i=e.getRecipeIds().$promise;
i.then(function(j){h.set(g,j);f=j})}else{i=a.when(f)}}else{i=a.when(f)}var c=function(j){switch(j.toLowerCase()){case"recipes":case"recipe":case"notset":return 1;
case"personal-recipes":case"personalrecipe":return 5;default:return 0}};var b=function(l,k){if(Object.keys(f).length===0){return false
}var j=f.filter(function(n){var m=c(k);if(m===0){m=1}return n.type===m&&n.id===l});return j.length>0};return{hasRecipeId:function(k,j){return i.then(function(){return b(k,j)
})},filterSavedRecipeIds:function(j){return i.then(function(){var k=[];j.forEach(function(l){if(!b(l.RecipeID,l.Type)){k.push(l)
}});return k})},remove:function(l,k){var j=[];if(f!==null&&f!==undefined){f.forEach(function(m){if(!(m.id===l&&m.type===c(k))){j.push(m)
}});f=j}h.set(g,f)},add:function(k,j){f.push({id:k,type:c(j)});h.set(g,f)}}}]);
//
// js/angular/services/recipesave-service.js
//
"use strict";angular.module("eatingWell").factory("ewRecipeSave",["$window","ewServicesRecipebox","ewRecipeBoxStorage","ewCurrentUserStateService","ewPublicProfileStateService",function(a,e,d,b,c){return{save:function(j,h,m,g,k,f){var i=ar.models.recipeboxPost(j,h,m,g,"AddToRecipeBox",k);
var l=function(p){d.add(j,h);var n=b.getCurrentUser();if(n!==null&&n!==undefined){n.FavoriteCount++;b.setCurrentUser(n);var o=c.getProfileUser();
if(o!==null&&o!==undefined&&n.Id===o.Id){o.FavoriteCount++;c.setProfileUser(o)}}f.success(p)};e.save(i).$promise.then(l,f.failure)
},remove:function(h,g,f){var i=function(l){d.remove(h,g);var j=b.getCurrentUser();if(j!==null&&j!==undefined){j.FavoriteCount--;
b.setCurrentUser(j);var k=c.getProfileUser();if(k!==null&&k!==undefined&&j.userId===k.userId){k.FavoriteCount--;c.setProfileUser(k)
}}f.success(l)};e.remove({id:h}).$promise.then(i,f.failure);a.pubsub.broadcast("Recipe.AddToRecipeBox",[{recipeId:h}])},removeFavorite:function(i,h,g,f){var j=function(m){d.remove(i,g);
var k=b.getCurrentUser();if(k!==null&&k!==undefined){k.FavoriteCount--;b.setCurrentUser(k);var l=c.getProfileUser();if(l!==null&&l!==undefined&&k.userId===l.userId){l.FavoriteCount--;
c.setProfileUser(l)}}f.success(m)};e.removeFavorite({id:h}).$promise.then(j,f.failure);a.pubsub.broadcast("Recipe.AddToRecipeBox",[{recipeId:i}])
},}}]);
//
// js/angular/services/saveitemService-provider.js
//
"use strict";angular.module("eatingWell").factory("ew_saveitem_service_provider",["ewRecipeSave","ewRecipeBoxStorage","$window",function(c,b,a){return{hasItem:function(d,f){var e={};
switch(f.toLowerCase()){case"cook":case"collection":throw"Only recipe save to favorites implemented";case"recipe":case"recipes":case"personalrecipe":case"personal-recipes":case"personal":case"custom":default:return b.hasRecipeId(d,f).then(function(g){angular.extend(e,{saved:g,hoverText:g?"Remove this recipe from your favorites":"Save this recipe",buttonText:g?"Remove from Favorites":"Save to Favorites"});
return e})}},removeItem:function(e,g,f,d){switch(g.toLowerCase()){case"cook":case"collection":throw"Only recipe save to favorites implemented";
case"personalrecipe":case"personal-recipes":case"personal":return d.failure;case"recipe":case"recipes":case"custom":default:if(f>0){c.removeFavorite(e,f,g,{success:d.success,failure:d.failure})
}else{c.remove(e,g,{success:d.success,failure:d.failure})}}},saveItem:function(e,g,f,d){switch(g.toLowerCase()){case"cook":case"collection":throw"Only recipe save to favorites implemented";
case"personalrecipe":case"personal-recipes":case"personal":case"recipe":case"recipes":case"custom":default:c.save(e,g,null,null,"recipe button",{success:d.success,failure:d.failure})
}},broadcastDefferedActionEvent:function(e,h,g,f,d){switch(h.toLowerCase()){case"cook":case"collection":throw"Only recipe save to favorites implemented";
case"personalrecipe":case"personal-recipes":case"personal":case"recipe":case"recipes":case"custom":default:a.pubsub.broadcast("A.Recipe.Save.ClickEvent",[{recipeID:e,type:h,title:g,imageUrl:f,source:"recipe button"}]);
break}}}}]);
//
// js/angular/services/datalayerevent.js
//
"use strict";angular.module("eatingWell").factory("datalayerEvent",["$window","$location",function(b,a){return{push:function(i,h,c,d,f,m,k,l,j,o){if(k==null){k={}
}if(l){dataLayer.page.pageInfo.parameters.referringContentType=l}var g=UID.New();var n=(a&&a.$$url)?a.$$url:null;var e={eventInfo:{eventName:i,eventAction:[c]},attributes:{itemId:(h)?h:null,paginatedUrl:StringHelper.IsNullOrEmpty(m)?n:m,clickId:d?d:null,internalSource:k.internalSource},eventType:f,uid:g,OmnitureOverride:j};
if(b.dataLayer!=null){b.dataLayer.event.push(e)}var p=o?o.page:null;var q=o?o.prevPage:null;b.pubsub.broadcast("An.Event.ToBe.Tracked",[g,e.eventInfo.eventName,p!=null?p:parseInt(a.search().page),q,m])
},pushLocalOffers:function(d){var e=UID.New();var c={eventInfo:{eventName:"local offers impression",eventAction:"Local Offers Loaded"},attributes:{clickId:" ",internalSource:" ",localOffers:d},uid:e};
if(b.dataLayer!=null){b.dataLayer.event.push(c)}b.pubsub.broadcast("An.Event.ToBe.Tracked",[e,c.eventInfo.eventName])},pushError:function(h,g,c,d){var f=UID.New();
var e={eventInfo:{eventName:h,eventAction:[c],errorText:d},attributes:{itemId:g?g:null},uid:f};if(b.dataLayer!=null){b.dataLayer.event.push(e)
}b.pubsub.broadcast("An.Event.ToBe.Tracked",[f,e.eventInfo.eventName,parseInt(a.search().page)])}}}]);
//
// js/angular/services/saveitemCallback-provider.js
//
"use strict";angular.module("eatingWell").factory("ew_saveitem_callback_provider",["$window","$location","$rootScope","datalayerEvent",function(c,a,b,e){var d={success:function(){},failure:function(){}};
return{getRemoveItemCallbacks:function(f){switch(f.type.toLowerCase()){case"cook":case"collection":throw"Only recipe save to favorites implemented";
case"recipe":case"recipes":case"personalrecipe":case"personal-recipes":case"personal":case"custom":default:d.success=function(){b.$emit("notify","Recipe removed from your favorites",null,"success");
c.pubsub.broadcast("Recipe.Heart.ClickEvent",[{recipeId:f.id}]);f.hoverText="Save this recipe"}}return d},getSaveItemCallbacks:function(f){switch(f.type.toLowerCase()){case"cook":case"collection":throw"Only recipe save to favorites implemented";
case"recipe":case"recipes":case"personalrecipe":case"personal-recipes":case"personal":case"custom":default:d.success=function(){c.pubsub.broadcast("Recipe.AddToRecipeBox",[{recipeId:f.id}]);
c.pubsub.broadcast("Recipe.OpenCollectionModal",[{recipeId:f.id,recipeType:f.type,recipeTitle:f.name,recipeImageUrl:f.imageurl}]);
e.push("add to recipe box",f.id,"Action Complete","recipe button");c.pubsub.broadcast("Recipe.Heart.ClickEvent",[{recipeId:f.id}]);
f.hoverText="Remove this recipe from your favorites";b.$emit("notify","Recipe saved to Favorites!",null,"success")}}return d}}
}]);
//
// js/angular/services/saveitemLink.js
//
"use strict";angular.module("eatingWell").factory("ewSaveItemLink",["$rootScope","ewLogin","ew_saveitem_service_provider","ew_saveitem_callback_provider",function(a,b,d,c){return function(h,f){h.showHeart=h.type.toLowerCase()!=="collection"||(h.collectioncreatorid!==b.userId)||!b.isLoggedIn();
function g(){d.hasItem(h.id,h.type.toLowerCase()).then(function(i){h.saved=i.saved;h.hoverText=i.hoverText})}g();var e=function(){if(h.saved==null){g()
}var i;if(h.saved){i=c.getRemoveItemCallbacks(h);d.removeItem(h.id,h.type,h.recipeboxitemid,i)}else{i=c.getSaveItemCallbacks(h);
d.saveItem(h.id,h.type,h.collectiontitle,i)}h.saved=!h.saved};f.off().on("click",function(){if(!b.isLoggedIn()){d.broadcastDefferedActionEvent(h.id,h.type,h.name?h.name:"",h.imageurl?h.imageurl:"",h.collectiontitle?h.collectiontitle:"")
}else{e()}})}}]);
//
// js/angular/directives/notification.js
//
"use strict";angular.module("eatingWell").directive("ewNotification",["$compile","$timeout","$rootScope",function(a,c,b){return{restrict:"E",template:"<div id='msg-toolbar' class='notification hidden'><span class='notification__message'></span></div>",link:function(l,i,e,g){b.$on("notify",function(t,x,z,A,s,q,r,v,u,y,w){l.afterNotification=r;
if(s){d(s,q)}else{k()}h(x,A,z,v,u,y,w)});var n;l.$on("cancelNotification",function(){c.cancel(n);j()});var h=function(t,w,v,r,q,u,s){o(t);
p(w);if(r){f(r,q,u,s)}m();n=c(function(){j()},v!=null?v:3000)};var o=function(q){i.find("span").html(q)};var f=function(t,s,v,u){var r="<a href='/collections/"+s+"'>"+t+"</a>";
if(v>0){u=" + <a href='/cook/my/'>"+v+" more</a>"}else{if(u==null){u=""}}var q=r+u;i.find("span").append(q);i.addClass("notification-for-collections");
a(i)(l)};var p=function(q){if(q==="success"){i.removeClass("failure--message");i.addClass("success--message")}if(q==="failure"){i.removeClass("success--message");
i.addClass("failure--message")}if(q==="progress"){i.removeClass("failure--message");i.removeClass("success--message")}};var m=function(){i.removeClass("hidden");
i.addClass("visible")};var j=function(){i.removeClass("visible");i.addClass("hidden");k();if(l.afterNotification){l.afterNotification()
}};var d=function(s,q){k();var r;if(q){r="<a href='javascript:void(0)' class='btns-one-small btn-made-it' data-ng-click='"+q+"()'>"+s+"</a>"
}else{r='<a href="javascript:void(0)" class="btns-one-small btn-made-it">'+s+"</a>"}i.find("span").after(r);i.addClass("notification-with-button");
a(i)(l)};var k=function(){i.find("a").remove();i.removeClass("notification-with-button");i.removeClass("notification-for-collections")
}},replace:true}}]);
//
// js/angular/directives/saveitem.js
//
"use strict";angular.module("eatingWell").directive("ewSaveItem",["ewSaveItemLink",function(a){return{restrict:"E",template:"<a ng-class='{ highlighted : saved }' title='{{ hoverText }}' data-ng-show='showHeart'><span></span></a>",scope:{id:"=?",type:"=?",recipeboxitemid:"=?",clickid:"=?",name:"=?",imageurl:"=?",collectioncreatorid:"=?",collectiontitle:"=?",page:"=?",brandid:"=?"},controller:["$scope","$element","$window",function(c,b,d){d.pubsub.listen("Recipe.Heart.ClickEvent","SaveItem.directive",function(e){if(c.id===e.recipeId){c.updateHeart=true;
c.hoverText="Remove this recipe from your favorites";c.saved=true;a(c,b)}})}],replace:true,link:a}}]);
//
// js/angular/controllers/deferredActionCtrl.js
//
"use strict";angular.module("eatingWell").controller("ewControllersDeferredAction",["$scope","$window","$location","ewRecipeSave","datalayerEvent","ewRecipeBoxStorage","$anchorScroll",function(c,d,b,h,f,g,a){c.wireupAdIntegrationListeners=function(){if(!d.pubsub.isListening("A.Recipe.Save.ClickEvent","DeferredAction.Controller")){d.pubsub.listen("A.Recipe.Save.ClickEvent","DeferredAction.Controller",e)
}if(!d.pubsub.isListening("A.Recipe.Remove.ClickEvent","DeferredAction.Controller")){d.pubsub.listen("A.Recipe.Remove.ClickEvent","DeferredAction.Controller",j)
}};c.executePostLoginEvents=function(){if(d.location.href.indexOf("/account")>=0){return}var p=d.location.search.split("&");if(p.length===0){return
}var l=p.filter(function(q){return q.indexOf("deferred")>=0});if(l.length===0){return}var n=l[0].split("=");if(n.length!==2){return
}var o;try{o=JSON.parse(decodeURIComponent(n[1].replace(/\+/g," ")))}catch(m){o=null}if(!o||!o.deferredActionName){return}var k=o.deferredActionName.toLowerCase();
switch(k){case"addtorecipebox":e(o,true);break;case"openratingsection":i();break}};function i(){d.pubsub.broadcast("A.Recipe.RateAndReview.ClickEvent",[true,{fromStickyNav:true}]);
b.url(b.path());b.hash("recipeReviewUser");a()}function j(k){h.remove(k.recipeID,k.type,{success:function(){d.pubsub.broadcast("Recipe.Heart.ClickEvent",[{recipeId:k.recipeID}]);
c.$emit("notify","Recipe removed from your favorites",null,"success")}})}function e(l,k){g.hasRecipeId(l.recipeID,l.type).then(function(m){if(m){d.pubsub.broadcast("Recipe.OpenCollectionModal",[{recipeId:l.recipeID,recipeType:l.type,recipeTitle:l.title,recipeImageUrl:l.imageUrl}])
}else{h.save(l.recipeID,l.type,l.title,l.imageUrl,l.source,{success:function(){d.pubsub.broadcast("Recipe.Heart.ClickEvent",[{recipeId:l.recipeID}]);
d.pubsub.broadcast("Recipe.AddToRecipeBox",[{recipeId:l.recipeID}]);d.pubsub.broadcast("Recipe.OpenCollectionModal",[{recipeId:l.recipeID,recipeType:l.type,recipeTitle:l.title,recipeImageUrl:l.imageUrl}]);
f.push("add to recipe box",l.recipeID,"Action Complete",l.source);c.$emit("notify","Recipe saved to Favorites!",null,"success");
b.url(b.path());c.$root.$broadcast("updateRecipePageHeart")},failure:function(){if(k){c.$emit("notify","Oops! We couldn’t add item to the Recipe Box. Try again in just a moment.",null,"failure")
}}})}})}}]);
//
// js/angular/controllers/recipeDetailSummaryController.js
//
"use strict";angular.module("eatingWell").controller("ewRecipeDetailSummaryController",["$scope","$window","ewRecipeBoxStorage",function(a,b,d){a.recipeId=0;
a.type="";a.title="";a.imageurl="";a.saved=false;var e=function(){a.actionBarfavoriteStateClass=a.saved?"actionBarFavorited":"actionBarUnfavorited";
a.recipeDetailSummaryImagefavoriteStateClass=a.saved?"recipeDetailSummaryImageFavorited":"recipeDetailSummaryImageUnfavorited"
};var c=function(){d.hasRecipeId(a.recipeId,a.type).then(function(f){a.saved=f;e()})};a.init=function(g,i,h,f){a.recipeId=g;a.type=i;
a.title=h;a.imageurl=f;c()};a.saveOnClick=function(){if(a.saved){b.pubsub.broadcast("A.Recipe.Remove.ClickEvent",[{recipeID:a.recipeId,type:a.type}])
}else{b.pubsub.broadcast("A.Recipe.Save.ClickEvent",[{recipeID:parseInt(a.recipeId),type:a.type,title:a.title,imageUrl:a.imageurl,source:"sticky nav 1"}])
}a.saved=!a.saved;e()};a.rateItOnClick=function(f){if(!f){var g=((window.location.href.indexOf("?")<0)?"?":"&")+"deferred="+JSON.stringify({deferredActionName:"OpenRatingSection"});
arLogin.goToAuthorizationWelcomePage(encodeURIComponent(window.location.href+g))}else{b.pubsub.broadcast("A.Recipe.RateAndReview.ClickEvent",[f,{fromStickyNav:true}]);
$location.hash("recipeReviewUser");$anchorScroll()}};a.$on("updateRecipePageHeart",function(f){c()})}]);
//
// js/angular/controllers/ewHintsController.js
//
"use strict";angular.module("eatingWell").controller("ewHintsController",["$scope","hintUIProvider","hintDataProvider",function(a,d,c){var e=c.MaxHintBubbleVisits;
var f=c.GetVisitCount();var b=c.HintData;var g=function(h){d.buildHintUI(h)};a.WasExecuted=false;a.ShowHints=function(){if(f<=e){f+=1;
c.SetVisitCount(f);for(var h=0;h<b.length;h++){g(b[h])}a.WasExecuted=true}};a.ShowHints()}]);
//
// js/angular/services/hint-ui-provider.js
//
"use strict";angular.module("eatingWell").factory("hintUIProvider",[function(){return{buildHintUI:function(b){var c=$('<div id="hint_'+b.TopicContainerId+'"></div>');
var e=$("<div></div>");var a=$("<div>X</div>");var f=$("<div></div>");var d=$("<div></div>");e.append(b.HintTitle);d.append(b.HintMessage);
c.addClass("hint");a.addClass("closeHint");f.addClass("hintTopBar");d.addClass("hintMessage");e.addClass("hintTitle");f.append(a);
f.append(e);c.append(f);c.append(d);a.click(function(){$("#hint_"+b.TopicContainerId).remove()});$("#"+b.TopicContainerId).append(c)
}}}]);
//
// js/angular/services/hint-data-provider.js
//
"use strict";angular.module("eatingWell").factory("hintDataProvider",[function(){return{MaxHintBubbleVisits:2,HintData:[{TopicContainerId:"recipeActionBar",HintTitle:"SAVE THIS RECIPE",HintMessage:"Click the hearts to save your favorite recipes."}],GetVisitCount:function(){return eval(localStorage.getItem("hintBubbleNumVisits")==="undefined"||localStorage.getItem("hintBubbleNumVisits")===null?1:localStorage.getItem("hintBubbleNumVisits"))
},SetVisitCount:function(count){localStorage.setItem("hintBubbleNumVisits",count)}}}]);
//
// js/angular/controllers/profileSettingsController.js
//
"use strict";angular.module("eatingWell").controller("ewProfileSettingsController",["$scope",function(a){a.locations=[];a.currentCountry="--";
a.currentRegion=0;a.regionSelectEnabled=false;a.countryOptions=[];a.regionOptions=[];a.init=function(f,e,g){a.locations=JSON.parse(f);
a.currentCountry=e===null||e===undefined||e===""?"US":e;a.currentRegion=g===null||g===undefined||g==="0"||g===""?"1":g;a.countryOptions=b(a.locations);
a.regionOptions=d(a.locations,a.currentCountry);a.regionSelectEnabled=a.regionOptions.length>1};a.handleSelectedCountryChanged=function(){a.currentRegion=1;
a.regionOptions=d(a.locations,a.currentCountry);a.regionSelectEnabled=a.regionOptions.length>1};var c=function(e){switch(e){case"US":return"State";
case"CA":return"Province";default:return"Region"}};var b=function(g){var h=[];var f=Object.keys(g);for(var e=0;e<f.length;e+=1){h.push({id:f[e],name:g[f[e]].Name})
}return h};var d=function(h,e){var j=[];if(h[e]!==undefined&&h[e]!==null){var g=Object.keys(h[e].Regions);for(var f=0;f<g.length;
f+=1){j.push({id:g[f],name:h[e].Regions[g[f]]})}}return j}}]);angular.module("eatingWell").controller("ewProfileSettingsMessageController",["$scope","$timeout",function(a,b){a.init=function(c,d){b(function(){a.showMessage(c,d)
},100)};a.showMessage=function(c,d){if(c){a.$emit("notify",d,3000,"success")}else{a.$emit("notify",d,6000,"failure")}}}]);
//
// js/angular/directives/starRating.js
//
"use strict";angular.module("eatingWell").directive("starRating",["ew_services_environment",function(a){return{restrict:"A",scope:{rating:"@",reviewCount:"@"},templateUrl:a.scriptServerUrl+"js/angular/templates/StarRating.html",link:function(i,d,b){var h,f,g,e,j;
b.$observe("recipeRating",function(l){h=5;f=a.cssServerUrl+"EatingWellAssets/assets/svg/icon/recipe-rating-stars/eating-well-star-full.svg";
g=a.cssServerUrl+"EatingWellAssets/assets/svg/icon/recipe-rating-stars/eating-well-star-half.svg";e=a.cssServerUrl+"EatingWellAssets/assets/svg/icon/recipe-rating-stars/eating-well-star-null.svg";
j=c(l);i.stars=[];for(var k=0;k<5;k++){i.stars.push({src:j[k]})}});function c(p){var r=[];var q=(Math.round(p*2)/2).toFixed(1);
var o=Math.floor(q);for(var m=0;m<o;m++){r.push(f)}if(q!=o){r.push(g)}var l=r.length;for(var n=0;n<h-l;n++){r.push(e)}return r
}}}}]);
//
// js/angular/services/userProvider.js
//
"use strict";angular.module("eatingWell").factory("ewUserServices",["ew_services_environment","$resource","ew_services_token",function(b,a,c){var d=b.url+"v1/users";
return a(d,{userId:"@userId"},{getPrivate:{url:d+"/me",method:"GET",isArray:false,headers:{Authorization:c.token}},getPublic:{url:d+"/:userId",method:"GET",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}}})}]);
//
// js/angular/services/reviewSaveProvider.js
//
"use strict";angular.module("eatingWell").factory("ewReviewRatingServices",["ew_services_environment","$resource","ew_services_token",function(b,a,c){return a(b.url+"v1/recipes/:recipeId/reviews",{recipeId:"@recipeId"},{save:{url:b.url+"v1/recipes/:recipeId/reviews",method:"POST",isArray:false,headers:{Authorization:function(){var d=c.token();
return d}}},savePersonalRecipeReview:{url:b.url+"v1/personal-recipes/:recipeId/reviews",method:"POST",isArray:false,headers:{Authorization:function(){var d=c.token();
return d}}}})}]);
//
// js/angular/controllers/rateAndReviewController.js
//
"use strict";angular.module("eatingWell").controller("ewRateAndReviewController",["$scope","$window","ngDialog","ewLogin","userReview","ew_services_environment",function(a,b,f,d,g,c){a.openRating=function(){if(!d.isLoggedIn()){var h=((b.location.href.indexOf("?")<0)?"?":"&")+"deferred="+JSON.stringify({deferredActionName:"OpenRatingSection"});
d.goToAuthorizationWelcomePage(encodeURIComponent(b.location.href+h))}else{f.openConfirm({trapFocus:false,template:c.scriptServerUrl+"js/angular/templates/RateAndReview.html",data:a.model})
}};var e=function(){a.model={recipeId:g.recipeId,userReview:JSON.parse(JSON.stringify(g.userReview)),inProgressReview:JSON.parse(JSON.stringify(g.userReview))};
if(!b.pubsub.isListening("A.Recipe.RateAndReview.ClickEvent","RateAndReview.Controller")){b.pubsub.listen("A.Recipe.RateAndReview.ClickEvent","RateAndReview.Controller",a.openRating)
}};e()}]);
//
// js/angular/controllers/rateAndReviewModalController.js
//
"use strict";angular.module("eatingWell").controller("ewRateAndReviewModalController",["$scope","$rootScope","datalayerEvent","ewReviewRatingServices","ewUserServices","siteCollectionId",function(b,a,c,d,e,g){b.model=b.ngDialogData;
var f=function(i){b.model.inProgressReview.rating=i;var h=function(k){var j=k<=i?"rateStarSingle starRating":"rateStarSingle";
return j};b.model.inProgressReview.styleStar1=h(1);b.model.inProgressReview.styleStar2=h(2);b.model.inProgressReview.styleStar3=h(3);
b.model.inProgressReview.styleStar4=h(4);b.model.inProgressReview.styleStar5=h(5)};f(b.model.inProgressReview.rating||0);b.starOnClick=function(h){f(h)
};b.cancelEdit=function(){b.model.inProgressReview=JSON.parse(JSON.stringify(b.model.userReview));b.model.ratingWords="";b.confirm()
};b.saveReview=function(){if(typeof b.model.inProgressReview.rating=="undefined"||b.model.inProgressReview.rating<=0){b.$emit("notify","Oops! You need to select a star rating.",null,"failure")
}else{var h=d.save({recipeId:b.model.recipeId,rating:b.model.inProgressReview.rating,text:b.model.inProgressReview.text,ignoreReview:false,collectionId:g});
h.$promise.then(function(j){b.$emit("notify","Review saved.",null,"success");var i=(b.fromStickyNav?"sticky nav 4":"recipe button");
c.push("rate/review recipe",b.model.recipeId,"Action Complete",i);a.$emit("onReviewSaved",true);e.getPrivate().$promise.then(function(k){b.model.user=k
});b.model.userReview=JSON.parse(JSON.stringify(b.model.inProgressReview));b.model.userReview.date=new Date(j.dateUpdated);b.confirm()
},function(i){if(i.status!==401){b.$emit("notify","Oops! We couldn’t save your review. Try again in just a moment.",null,"failure")
}})}}}]);
//
// js/angular/controllers/recipeUserReviewsController.js
//
angular.module("eatingWell").controller("ewRecipeUserReviewsController",["$scope","$window","$http","$location",function(c,d,a,b){c.hideMoreResultsButton=false;
c.divReviews="";c.reviewsPerLoad=0;c.totalReviews=0;c.currentLoad=1;c.model={};c.init=function(g,e,f){c.reviewsPerLoad=g;c.hideMoreResultsButton=e<=g;
c.totalReviews=e;if(f==="reviews"){if(d.location.href.indexOf("page")!==-1){var h=parseInt(b.search().page);var i=h*9;c.hideMoreResultsButton=e>i?false:true;
c.currentLoad=h;c.model={nextPage:h+1}}else{c.model={nextPage:c.currentLoad+1}}}else{c.model={nextPage:c.currentLoad+1}}};c.loadMore=function(f){c.hideMoreResultsButton=true;
var e=c.currentLoad*c.reviewsPerLoad;c.currentLoad=c.currentLoad+1;var g=f+"/?page="+c.currentLoad;a.get(g,{params:{reviews:true}}).success(function(h){c.divReviews=c.divReviews+h;
c.model.nextPage=c.currentLoad+1;var i=$(h).children().length;e=e+i;c.hideMoreResultsButton=c.totalReviews<=e?true:false})}}]);
//
// js/angular/models/models.js
//
var ar=ar||{};(function(a){a.recipeboxPost=function(d,g,f,c,b,e){return{recipeID:d,type:g,title:f,imageUrl:c,deferredActionName:b,source:e}
};a.shoppingListIngredientPost=function(c,d,e,b){return{ingredientid:c,recipeid:d,servings:e,deferredActionName:b}};a.shoppingListRecipePost=function(c,d,b){return{recipeid:c,servings:d,deferredActionName:b}
};a.shoppingListWriteInPostItem=function(c,b){return{aisleid:b,displayvalue:c}};a.shoppingListWriteInPost=function(c,b){return{items:c,deferredActionName:b||"addtoshoppinglist"}
};a.shoppingListSaveRecipePostItem=function(b,c){return{recipeid:b,servings:c}};a.shoppingListSaveRecipePost=function(c,b){return{recipes:c,deferredActionName:b||"addRecipeToShoppingListFromAd"}
};a.recipeBoxSaveRecipePostItem=function(b,c){return{RecipeID:b,Type:c}};a.recipeBoxSaveRecipePost=function(c,b){return{recipes:c,deferredActionName:b||"addRecipeToRecipeBoxFromAd"}
};a.photoUploadPost=function(c,b){return{userid:c,recipeid:b}};a.reviewPost=function(b,c){return{rating:b,text:c}};a.madeItPost=function(c,b){return{recipeId:c,deferredActionName:b}
};a.madeItUndo=function(b){return{recipeId:b}};a.followPost=function(b,c){return{userID:b,deferredActionName:c}};a.collectionPost=function(b,c,d){return{collectionId:b,name:c,deferredActionName:d}
};a.navBarPost=function(b,c,d){return{categoryId:b,name:c,orderInList:d}}})(ar.models=ar.models||{});
//
// js/angular/controllers/photoUploadCtrl.js
//
"use strict";angular.module("eatingWell").controller("ew_controllers_photo_upload",["$scope","$window","ew_services_photoupload","datalayerEvent","ewLogin","$rootScope","$location","ngDialog","ew_services_file_reader","$document","ew_services_environment",function(d,e,j,g,k,c,b,p,i,a,h){d.rateRecipeButtonStyle="rateRecipe btnsTwo-small";
d.rateButtonIsHighlighted=false;d.enablePhotoUpload=k.ensureUserIsLoggedIn();d.hasUploadedPhoto=false;d.photoId=0;d.photoUrl=null;
d.isProfilePhoto=false;d.hasReviewedRecipe=false;e.dataLayer={event:[]};d.init=function(u,s,r,t){d.userId=u||k.userId;d.recipeId=s||0;
d.rateButtonIsHighlighted=d.hasReviewedRecipe=(r)?true:false;d.uploadFrom=t||"recipe page";d.isProfilePhoto=(location.pathname.search("profile-settings")>0)?true:false
};d.makeProfilePhoto=function(){d.isProfilePhoto=!d.isProfilePhoto};var l=function(r){var s=r[0];f();if(s.size>20971520){d.$emit("notify","Photo must be less than 20MB in size.",null,"failure");
return}i.readAsDataUrl(r[0],d).then(function(u){d.userSelectedPhoto=u});var t={template:h.scriptServerUrl+"assets/eatingWell/js/angular/templates/EWPhotoUploadModal.html",className:"ngdialog-theme-default",scope:d};
t.scope.description=null;if(d.recipeId===0){d.showMakeProfile=true}else{d.showMakeProfile=false}p.openConfirm(t).then(function(u){j.uploadPhoto({userId:d.userId,recipeId:d.recipeId,description:u.description,file:s}).then(n,m)
})};d.onFileSelect=l;var n=function(r){d.hasUploadedPhoto=true;d.photoUrl=r.smallPhotoUrl;d.largePhotoUrl=r.largePhotoUrl;d.$emit("notify","Photo added. Thank you!",null,"success",null,null,function(){if(b){if(!d.isProfilePhoto){if(d.recipeId===0){console.debug("Photo finish, changing location: /photos/"+r.photoId+"/");
e.location=e.location+r.photoId}else{e.location=b.path().replace(/\d+\/?$/,r.photoId)}}else{e.location.href="/profile/my/profile-settings"
}}});c.$broadcast("onPhotoUpload",d.largePhotoUrl);g.push("add a photo",d.userId,"Action Complete",d.uploadFrom)};var m=function(r){d.$emit("notify",r,null,"failure")
};var o=function(r){if(!d.rateButtonIsHighlighted){d.rateButtonIsHighlighted=r}else{if(!d.hasReviewedRecipe){d.rateButtonIsHighlighted=r
}}};d.uploadCoverPhoto=function(r){var s=r[0];f();var t={minHeight:120,minWidth:1270,maxSize:20971520};j.readPhotoData(s,d,t).then(function(u){d.src=u.dataUrl;
c.$emit("CoverPhoto.FileUpload.Event",u.dataUrl,s.name)},function(u){e.pubsub.broadcast("ErrorNotifyModal.ErrorMessage",[u.error])
})};c.$on("onRatingClick",function(r,s){o(s)});c.$on("onAddPhoto",function(r,s){d.onFileSelect(s)});c.$on("onReviewSaved",function(r,s){d.hasReviewedRecipe=s
});d.photoUploadToggleRating=k.ensureUserIsLoggedIn(function(){if(d.hasReviewedRecipe){q(true)}else{q(!d.rateButtonIsHighlighted)
}});var q=function(r){c.$emit("onRatingClick",r)};d.$on("onMadeItModalPhotoUpload",function(r,s){d.photoUrl=s;d.hasUploadedPhoto=true
});var f=function(){a.find("[ng-file-select]").val("")}}]);
//
// js/angular/services/fileReader-service.js
//
angular.module("eatingWell").factory("ew_services_file_reader",["$q","$window",function(a,b){var f=function(i,h,j){return function(){j.$apply(function(){h.resolve(i.result)
})}};var d=function(h,j){var i=new b.FileReader();i.onload=f(i,h,j);return i};var c=function(j){var h;if(j.split(",")[0].indexOf("base64")>=0){h=atob(j.split(",")[1])
}else{h=unescape(j.split(",")[1])}var m=j.split(",")[0].split(":")[1].split(";")[0];var l=new Uint8Array(h.length);for(var k=0;
k<h.length;k++){l[k]=h.charCodeAt(k)}return new Blob([l],{type:m})};var e=function(i,j){var h=c(i);h.name=j;return h};var g=function(i,k){var h=a.defer();
var j=d(h,k);j.readAsDataURL(i);return h.promise};return{readAsDataUrl:g,imageFileForDataUrl:e}}]);
//
// js/angular/services/photoupload-service.js
//
angular.module("eatingWell").service("ew_services_imagesizer",["$q",function(a){this.getImageSize=function(b){var c=a.defer();
var d=new Image();d.onload=function(){c.resolve({width:d.width,height:d.height})};d.src=b;return c.promise}}]).service("ew_services_photoupload",["$upload","datalayerEvent","ew_services_environment","ew_services_token","ew_services_file_reader","ew_services_imagesizer","$q",function(g,b,c,f,d,e,a){this.readPhotoData=function(k,m,l){var h=a.defer();
if(k.size>l.maxSize){var j=l.maxSize/(1024*1024);var i="Photo must be less than "+j+"MB in size.";h.reject({error:i})}else{d.readAsDataUrl(k,m).then(function(n){e.getImageSize(n).then(function(o){if(o.width<l.minWidth||o.height<l.minHeight){var p="Please choose an image that's at least "+l.minWidth+" pixels wide and at least "+l.minHeight+" pixels tall.";
h.reject({error:p})}else{h.resolve({dataUrl:n,dimensions:o})}})})}return h.promise};this.calculateOffsets=function(h,k){var j={xOffset:0,yOffset:0};
var l=h.width;var i=h.height;if(l>i){j.xOffset=-(k/i)*(l-i)/2}else{if(i>l){j.yOffset=-(k/l)*(i-l)/2}}return j};this.coverPhotoUpload=function(i){var h=a.defer();
g.upload({url:c.url+"v1/photos/cover",method:"POST",headers:{Authorization:function(){var j=f.token();return j}},file:i}).then(function(){h.resolve()
},function(){var j="We didn't get your photo. Try submitting it again.";h.reject(j)});return h.promise};this.uploadPhoto=function(i){var h=a.defer();
var j=c.url+"v1/recipes/"+i.recipeId+"/photos";if(i.recipeId===0){j=c.url+"v1/photos/my/profile"}if(!i.description){i.description=""
}g.upload({url:j,method:"POST",headers:{Authorization:function(){var k=f.token();return k},"Content-Type":undefined},data:{userid:i.userId,description:i.description},file:i.file}).then(function(k){h.resolve({photoId:k.data.photoId,largePhotoUrl:c.imageServerUrl+"userphotos/250x250/"+k.data.photoId+".jpg",smallPhotoUrl:c.imageServerUrl+"userphotos/70x70/"+k.data.photoId+".jpg"})
},function(l){var m=l.status;var k="We didn't get your photo. Try submitting it again.";if(m!==401){if(l&&l.data){if(l.data.message==="Photo upload failed - PhotoDimensionsAreTooSmall"){k="Photo must be at least 960 x 960.";
b.pushError("add a photo",i.userId,"Error Message",l.data.exceptionMessage)}else{if(l.data.message!=="An error has occurred."){k=l.data.message;
b.pushError("add a photo",i.userId,"Error Message",l.data.exceptionMessage)}else{if(l.data.exceptionMessage==="Parameter is not valid."){k="We didn't get your photo. Try submitting an image file.";
b.pushError("add a photo",i.userId,"Error Message",l.data.exceptionMessage)}}}}}h.reject(k)});return h.promise}}]);
//
// js/angular/controllers/socialShareCtrl.js
//
angular.module("eatingWell").controller("ew_controllers_share_item",["$scope","$window","ewLogin","datalayerEvent","$location",function(b,c,e,d,a){b.socialShareStart=function(h,g,i){pubsub.broadcast("SocialShareStart");
if(i&&i.reviewSocial){d.push("recipe review detail social","recipe review detail - "+h+" button","Action Complete",i.reviewSocial.reviewId)
}else{d.push(g+" button",h,"Action Complete","social "+g)}};b.socialShareNavigate=function(g,h){c.open(g,h)};var f=angular.element("#ad-footer");
b.hideAds=function(){f.hide()};b.showAds=function(){f.show()};b.urlGenerators={getPinterestUrl:function(i,g,h){return"http://pinterest.com/pin/create/button/?url="+i+"&media="+g+"&description="+h
},getFacebookUrl:function(g){return"https://facebook.com/sharer.php?u="+g},getTwitterUrl:function(h,g){return"https://twitter.com/intent/tweet?url="+h+"&text="+g+"&via=EatingWell"
},getStumbleUponUrl:function(g){return"https://www.stumbleupon.com/submit?url="+g}}}]);
//
// js/angular/services/email-provider.js
//
angular.module("eatingWell").factory("ew_services_email",["ew_services_environment","$resource","ew_services_token",function(b,a,c){var d=b.url+"v1/email";
return a(d,{},{send:{url:d,method:"POST",isArray:false,headers:{Authorization:function(){var e=c.token();return e}}}})}]);
//
// js/angular/directives/scrollToAnchor.js
//
"use strict";angular.module("eatingWell").directive("scrollToAnchor",["$anchorScroll",function(a){return{link:function(e,d,c){var b=c.scrollToAnchor;
d.click(function(){if(typeof b!=="undefined"&&b){var f=$("#"+b);var g=f.offset().top-60;var h=(g)<0?0:g;$("html, body").animate({scrollTop:h},"5000");
a()}})}}}]);
//
// js/angular/services/popupManagerService.js
//
"use strict";angular.module("eatingWell").service("popup_manager_service",[function(){var a={};this.GetPopups=function(){return a
};this.triggerClicked=new EventHandler();this.addTrigger=function(c,b){if(a[c]){a[c].trigger.push(b)}else{a[c]={trigger:[b],panel:undefined}
}};this.addPanel=function(c,b){if(a[c]){a[c].panel=b}else{a[c]={trigger:[],panel:b}}};this.triggerPopup=function(b){if(a[b]){this.triggerClicked.Fire(b)
}}}]);
//
// js/angular/directives/popupPanel.js
//
angular.module("eatingWell").directive("popupPanel",["$document","$window","popup_manager_service","global_ui_events_service","$rootScope",function(a,c,e,d,b){return{restrict:"A",link:function(j,g,f){if(!g.context.id){g.context.id=UID.New()
}var h=g.context.id;var i=f.popupPanel;j[i+"_showing"]=false;e.addPanel(i,h);if(g.context.attributes.hideOnResize){angular.element(c).bind("resize",function(){g.context.classList.add("ng-hide")
})}e.triggerClicked.Add(function(k){if(k==i){if(j[i+"_showing"]===true){j.$apply(function(){j[i+"_showing"]=false;g.context.classList.add("ng-hide")
})}else{j.$apply(function(){j[i+"_showing"]=true;g.context.classList.remove("ng-hide")});b.$broadcast("Container-Opened",i)}}});
d.globalClickEventHandler.Add(function(l){if(f.ignoreGlobal!==true&&f.ignoreGlobal!=="true"){if(j[i+"_showing"]===true){var m=false;
var k=l;var n=e.GetPopups();while(k){if(k.attributes.hideWhenClicked!==null&&k.attributes.hideWhenClicked!==undefined){m=false;
break}if(k.id===h||(n[i]&&(n[i].trigger.indexOf(k.id)!==-1))){m=true;break}k=k.parentElement}if(m!==true){j.$apply(function(){j[i+"_showing"]=false;
g.context.classList.add("ng-hide")})}}}})}}}]);
//
// js/angular/directives/popupTrigger.js
//
angular.module("eatingWell").directive("popupTrigger",["$document","popup_manager_service",function(a,b){return{restrict:"A",link:function(g,d,c){if(!d.context.id){d.context.id=UID.New()
}var e=d.context.id;var f=c.popupTrigger;b.addTrigger(f,e);d.bind("click",function(){b.triggerClicked.Fire(f)})}}}]);
//
// js/angular/directives/globalUIEvents.js
//
angular.module("eatingWell").directive("globalUiEvents",["$document","global_ui_events_service",function(a,b){return{restrict:"A",link:function(f,e,c,d){a.bind("click",function(h){var g=h.target;
while(g){if(g.hasAttribute("unsubscribe-global-click-handler")){return}if(g.hasAttribute("do-not-fire-click-event")){h.stopPropagation();
return}g=g.parentElement}b.globalClickEventHandler.Handle(h.target)})}}}]);
//
// js/angular/services/global-ui-event-service.js
//
"use strict";angular.module("eatingWell").service("global_ui_events_service",function(){this.globalClickEventHandler=new EventHandler("GlobalClick")
});
//
// js/angular/directives/loadingindicator.js
//
"use strict";angular.module("eatingWell").directive("loadingIndicator",["ew_services_environment",function(a){return{restrict:"A",templateUrl:a.GetScriptServerUrl()+"assets/js/angular/templates/loadingindicator.html",terminal:true,replace:false,link:function(d,b){var c=b.find("div").eq(0);
c.hide();d.$on("loadingindicator_show",function(){c.show()});d.$on("loadingindicator_hide",function(){c.hide()})}}}]);
//
// js/angular/services/search-service.js
//
"use strict";angular.module("eatingWell").factory("ew_services_search",[function(){return{search:{keywords:"",ingredientsInclude:[],ingredientsExclude:[]}}
}]);
//
// js/angular/services/cookie-service.js
//
"use strict";angular.module("eatingWell").factory("ew_cookie_service",["$document",function(a){return{setCookie:function(b,g,f){var e=new Date();
f=(f==null)?0:f;e.setDate(e.getDate()+f);e=e.toGMTString();var d=a.prop("domain");if(typeof d=="string"&&d.indexOf(".")==-1){d=""
}var c=b+"="+escape(g)+"; expires="+e+"; path=/"+((d=="")?";":("; domain="+d+";"));a[0].cookie=c}}}]);
//
// js/angular/services/url-service.js
//
"use strict";angular.module("eatingWell").factory("ew_services_url",["$window","lowercaseNoSpacesFilter",function(a,d){var b=function(j,h,g){if(h&&h.length>0){var e=angular.copy(h);
for(var f=0;f<e.length;f++){e[f]=e[f].trim();if(e[f].length==0){e.shift();continue}e[f]=encodeURIComponent(e[f])}if(e.length>0){j+="&"+g+e.join()
}}return j};var c=function(g,f,e){var h=b("",[g],"wt=");h=b(h,f,"ingIncl=");h=b(h,e,"ingExcl=");return h.replace(/^&/,"")};return{getRecipeUrl:function(f){var i="";
var e="";var j="";var h="";if(f&&f.itemType){if(f.recipeDetailUrlPrefix){i=f.recipeDetailUrlPrefix}var g=f.itemType.toLowerCase();
switch(g){case"recipe":case"personalrecipe":e=(g=="recipe")?"recipe":"personal-recipe";j=f.slug||d(f.title);h=f.recipeID;break;
case"review":e=(f.recipe.itemType.toLowerCase()=="recipe")?"recipe":"personal-recipe";j=d(f.recipe.title);h=f.recipe.recipeID;
break}i+="/"+e+"/"+h+"/"+j+"/";if(f.recipeDetailUrlSuffix){if(g!="review"){i+=f.recipeDetailUrlSuffix}}}return i},getSearchUrl:function(g,f,e,j){var h=c(g,f,e);
var k="&sort="+(j?j:"re");var i="/search/results/?"+h+k;return i},getQueryStringValue:function(h){var g=a.location.search.substring(1);
var j=g.split("&");for(var e=0;e<j.length;e++){var f=j[e].split("=");if(decodeURIComponent(f[0].toLowerCase())===h.toLowerCase()){return decodeURIComponent(f[1])
}}return undefined}}}]);
//
// js/angular/constants/searchconstants.js
//
"use strict";angular.module("eatingWell").constant("SEARCH_CONSTANTS",{MaxAllowedIngredients:4,MaxIngredientLength:50,EnterKey:13,TabKey:9,BackspaceKey:8,DOM_Element:1,InclIngredHintText:"Ex. chicken",ExclIngredHintText:"Ex. cashews"});
//
// js/angular/controllers/searchCtrl.js
//
angular.module("eatingWell").controller("ew_controllers_search",["$scope","$window","$document","$timeout","ew_services_url","SEARCH_CONSTANTS","ew_services_search","ew_cookie_service",function(b,d,a,c,k,s,j,i){b.search=j.search;
b.includeIngredient=null;b.excludeIngredient=null;var v=function(){b.includeIngHitMax=(b.search.ingredientsInclude.length>=s.MaxAllowedIngredients);
b.excludeIngHitMax=(b.search.ingredientsExclude.length>=s.MaxAllowedIngredients);b.includeIngPlaceholderText=(b.search.ingredientsInclude.length>0?null:s.InclIngredHintText);
b.excludeIngPlaceholderText=(b.search.ingredientsExclude.length>0?null:s.ExclIngredHintText)};var r=function(A){var z=" ";if(A!==undefined){z=A.replace(/[#*|_()<>/\\"]/g," ");
z=z.replace(/(\()/g," ")}return z};var o=function(C){var z=" ";var A=[];if(C.length>0){for(var B=0;B<C.length;B++){if(C[B]!==undefined){z=r(C[B]);
A.push(z)}}}return A};b.initialize=function(){var A=function(B){var C=k.getQueryStringValue(B);return C?C:""};if(!b.search.keywords){b.search.keywords=A("wt")
}var z=function(B){var C=k.getQueryStringValue(B);return C?C.split(","):[]};b.search.ingredientsInclude=z("ingIncl");b.search.ingredientsExclude=z("ingExcl");
v()};b.initialize();b.footerAd=angular.element("#ad-footer");b.hideAds=function(){b.footerAd.hide()};b.showAds=function(){b.footerAd.show()
};b.isEnterKey=function(z){return(z.which===s.EnterKey)};b.isTabKey=function(z){return(z.which===s.TabKey)};b.isBackspaceKey=function(z){return(z.which===s.BackspaceKey)
};b.addIngredientInclude=function(A){if(!b.includeIngredient){return}var z=b.includeIngredient.trim();if(z.length>0){if(b.includeIngHitMax){b.$emit("notify","You can include up to "+s.MaxAllowedIngredients+" ingredients.");
b.includeIngredient=null;return}z=z.substring(0,s.MaxIngredientLength);if(!x(z,b.search.ingredientsInclude)){t(A);b.search.ingredientsInclude.push(z)
}}b.includeIngredient=null;v();c(function(){if(A){w()}})};b.addIngredientExclude=function(A){if(!b.excludeIngredient){return}var z=b.excludeIngredient.trim();
if(z.length>0){if(b.excludeIngHitMax){b.$emit("notify","You can exclude up to "+s.MaxAllowedIngredients+" ingredients.");b.excludeIngredient=null;
return}z=z.substring(0,s.MaxIngredientLength);if(!x(z,b.search.ingredientsExclude)){t(A);b.search.ingredientsExclude.push(z)}}b.excludeIngredient=null;
v();c(function(){if(A){w()}})};b.removeLastIngredientInclude=function(A){if(!b.includeIngredient){var z=b.search.ingredientsInclude;
if(z.length>0){b.removeIngredientInclude(z[z.length-1],A);c(function(){if(A){w()}})}}};b.removeIngredientInclude=function(A,C){for(var z=0;
z<b.search.ingredientsInclude.length;z++){var B=b.search.ingredientsInclude[z];if(B===A){t(C);b.search.ingredientsInclude.splice(z,1);
break}}v();c(function(){if(C){q()}})};b.removeLastIngredientExclude=function(A){if(!b.excludeIngredient){var z=b.search.ingredientsExclude;
if(z.length>0){b.removeIngredientExclude(z[z.length-1],A);c(function(){if(A){w()}})}}};b.removeIngredientExclude=function(A,C){for(var z=0;
z<b.search.ingredientsExclude.length;z++){var B=b.search.ingredientsExclude[z];if(B===A){t(C);b.search.ingredientsExclude.splice(z,1);
break}}v();c(function(){if(C){q()}})};b.performSearch=function(){if(!b.includeIngHitMax){b.addIngredientInclude()}b.includeIngredient=null;
if(!b.excludeIngHitMax){b.addIngredientExclude()}b.excludeIngredient=null;var B=r(b.search.keywords);var A=o(b.search.ingredientsInclude);
var z=o(b.search.ingredientsExclude);if(B.length===0&&A.length===0&&z.length===0){b.$emit("notify","Oops! Enter a recipe or ingredient to search for.",null,"failure")
}else{var C=k.getSearchUrl(B,A,z);i.setCookie("globalNavClick",null,-1);i.setCookie("globalNavClick","global nav|search",1);d.location.href=C
}};b.mouseDown=function(A){t(A);var z=b.currentDragElement;b.horizDisplacement=A.clientX-(z.style.left?parseInt(z.style.left):0);
d.addEventListener("mousemove",p,false);a.bind("mouseup",b.mouseUp);A.preventDefault()};b.mouseUp=function(){d.removeEventListener("mousemove",p,false);
a.unbind("mouseup",b.mouseUp)};b.touchStart=function(A){t(A);var z=b.currentDragElement;b.horizDisplacement=A.originalEvent.targetTouches[0].clientX-(z.style.left?parseInt(z.style.left):0);
d.addEventListener("touchmove",y,false);A.preventDefault()};b.touchEnd=function(){d.removeEventListener("touchmove",y,false)};
var x=function(B,A){for(var z=0;z<A.length;++z){if(A[z]===B){return true}}return false};var t=function(D){if(D){var C=D.target||D.srcElement;
var E=b.scrollableClassHeirarchy.draggableElement;var A=b.scrollableClassHeirarchy.outermostWrapper;var z=b.scrollableClassHeirarchy.clippingFrame;
var B=m(C,E,A);u(B,E,z)}};var u=function(B,A,z){b.currentDragElement=l(B,A);b.currentClippingFrame=l(B,z)};var l=function(A,z){var B=A;
while(B&&(!B.hasAttribute("class")||B.attributes["class"].value.split(" ").indexOf(z)===-1)){B=B.parentElement}return B};var m=function(B,C,z){var A=l(B,z);
var D=e(A,C);return D};var e=function(A,z){var D=[];D.push(A);while(D.length>0){var B=D.shift();if(B.hasAttribute("class")&&B.attributes["class"].value.split(" ").indexOf(z)!==-1){return B
}if(!B.hasChildNodes){continue}for(var C=0;C<B.childNodes.length;++C){if(B.childNodes[C].nodeType===s.DOM_Element){D.push(B.childNodes[C])
}}}return};var p=function(z){h(z.clientX)};var y=function(z){h(z.targetTouches[0].clientX);z.stopPropagation();z.preventDefault()
};var h=function(z){g(z);f();q()};var g=function(A){var z=b.currentDragElement;z.style.top="0px";z.style.left=(A-b.horizDisplacement)+"px"
};var f=function(){var B=n();var z=(B.clippingRect.left>B.dragRect.left?B.clippingRect.left-B.dragRect.left:0);var A=(B.dragRect.right>B.clippingRect.right?B.dragRect.right-B.clippingRect.right:0);
B.dragElement.style.clip="rect(0px,"+(B.dragRect.right-B.dragRect.left+1-A)+"px,"+(B.dragRect.bottom-B.dragRect.top+1)+"px,"+z+"px)"
};var q=function(){var B=n();var A=B.dragRect.right-B.dragRect.left;var z=B.clippingRect.right-B.clippingRect.left;var C=null;
if(A<=z){C=z-A}else{if(B.dragRect.right<B.clippingRect.right){C=z-A}else{if(B.dragRect.left>B.clippingRect.left){C=0}}}if(C!=null){B.dragElement.style.left=C+"px"
}};var w=function(){var B=n();var A=B.dragRect.right-B.dragRect.left;var z=B.clippingRect.right-B.clippingRect.left;if(A>z){var C=z-A;
B.dragElement.style.left=C+"px"}};var n=function(){return{dragElement:b.currentDragElement,dragRect:b.currentDragElement.getBoundingClientRect(),clippingElement:b.currentClippingFrame,clippingRect:b.currentClippingFrame.getBoundingClientRect()}
}}]);
//
// js/angular/filters/lowercaseNoSpaces-filter.js
//
"use strict";angular.module("eatingWell").filter("lowercaseNoSpaces",function(){return function(g){if(!g){return""}var f;var a=[{base:"A",letters:"\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"},{base:"AA",letters:"\uA732"},{base:"AE",letters:"\u00C6\u01FC\u01E2"},{base:"AO",letters:"\uA734"},{base:"AU",letters:"\uA736"},{base:"AV",letters:"\uA738\uA73A"},{base:"AY",letters:"\uA73C"},{base:"B",letters:"\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"},{base:"C",letters:"\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E"},{base:"D",letters:"\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779"},{base:"DZ",letters:"\u01F1\u01C4"},{base:"Dz",letters:"\u01F2\u01C5"},{base:"E",letters:"\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"},{base:"F",letters:"\u0046\u24BB\uFF26\u1E1E\u0191\uA77B"},{base:"G",letters:"\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"},{base:"H",letters:"\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"},{base:"I",letters:"\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"},{base:"J",letters:"\u004A\u24BF\uFF2A\u0134\u0248"},{base:"K",letters:"\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"},{base:"L",letters:"\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"},{base:"LJ",letters:"\u01C7"},{base:"Lj",letters:"\u01C8"},{base:"M",letters:"\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"},{base:"N",letters:"\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"},{base:"NJ",letters:"\u01CA"},{base:"Nj",letters:"\u01CB"},{base:"O",letters:"\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C"},{base:"OI",letters:"\u01A2"},{base:"OO",letters:"\uA74E"},{base:"OU",letters:"\u0222"},{base:"OE",letters:"\u008C\u0152"},{base:"oe",letters:"\u009C\u0153"},{base:"P",letters:"\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"},{base:"Q",letters:"\u0051\u24C6\uFF31\uA756\uA758\u024A"},{base:"R",letters:"\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"},{base:"S",letters:"\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"},{base:"T",letters:"\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"},{base:"TZ",letters:"\uA728"},{base:"U",letters:"\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"},{base:"V",letters:"\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"},{base:"VY",letters:"\uA760"},{base:"W",letters:"\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"},{base:"X",letters:"\u0058\u24CD\uFF38\u1E8A\u1E8C"},{base:"Y",letters:"\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"},{base:"Z",letters:"\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"},{base:"a",letters:"\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"},{base:"aa",letters:"\uA733"},{base:"ae",letters:"\u00E6\u01FD\u01E3"},{base:"ao",letters:"\uA735"},{base:"au",letters:"\uA737"},{base:"av",letters:"\uA739\uA73B"},{base:"ay",letters:"\uA73D"},{base:"b",letters:"\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"},{base:"c",letters:"\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184"},{base:"d",letters:"\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"},{base:"dz",letters:"\u01F3\u01C6"},{base:"e",letters:"\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"},{base:"f",letters:"\u0066\u24D5\uFF46\u1E1F\u0192\uA77C"},{base:"g",letters:"\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"},{base:"h",letters:"\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"},{base:"hv",letters:"\u0195"},{base:"i",letters:"\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"},{base:"j",letters:"\u006A\u24D9\uFF4A\u0135\u01F0\u0249"},{base:"k",letters:"\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"},{base:"l",letters:"\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"},{base:"lj",letters:"\u01C9"},{base:"m",letters:"\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"},{base:"n",letters:"\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"},{base:"nj",letters:"\u01CC"},{base:"o",letters:"\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275"},{base:"oi",letters:"\u01A3"},{base:"ou",letters:"\u0223"},{base:"oo",letters:"\uA74F"},{base:"p",letters:"\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"},{base:"q",letters:"\u0071\u24E0\uFF51\u024B\uA757\uA759"},{base:"r",letters:"\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"},{base:"s",letters:"\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"},{base:"t",letters:"\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"},{base:"tz",letters:"\uA729"},{base:"u",letters:"\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"},{base:"v",letters:"\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"},{base:"vy",letters:"\uA761"},{base:"w",letters:"\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"},{base:"x",letters:"\u0078\u24E7\uFF58\u1E8B\u1E8D"},{base:"y",letters:"\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"},{base:"z",letters:"\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"}];
var b={};for(var c=0;c<a.length;c++){var e=a[c].letters.split("");for(var d=0;d<e.length;d++){b[e[d]]=a[c].base}}f=g.replace(/[^\u0000-\u007E]/g,function(h){return b[h]||h
});f=f.replace(/[^a-z0-9\s-]/gi,"").toLowerCase();f=f.replace(/\s/gi,"-");return f}});
//
// js/angular/directives/assignscrollableclasses.js
//
"use strict";angular.module("eatingWell").directive("ewAssignScrollableClasses",["$parse","snakeCase",function(a,c){var b="ewAssignScrollableClasses";
return{link:function(f,e,d){f.scrollableClassHeirarchy=f.$eval(d[b])}}}]);
//
// js/angular/services/snakecase-service.js
//
"use strict";angular.module("eatingWell").factory("snakeCase",[function(){var a=/[A-Z]/g;return function(b){return b.replace(a,function(c,d){return(d?"-":"")+c.toLowerCase()
})}}]);
//
// js/angular/controllers/categoryGridCtrl.js
//
angular.module("eatingWell").controller("ew_category_grid_ctrl",["$scope","$window","$location","$http",function(c,d,b,a){c.hideMoreResultsButton=false;
c.currentPage=1;c.totalCount=0;c.contentPerLoad=0;c.init=function(f,e){c.contentPerLoad=f;c.totalCount=e;c.hideMoreResultsButton=e<=f;
if(d.location.href.indexOf("page")!==-1){var h=parseInt(b.search().page);var g=h*f;c.hideMoreResultsButton=e>g?false:true;c.currentPage=h
}};c.loadMore=function(e){c.hideMoreResultsButton=true;c.currentPage=c.currentPage+1;b.search("page",c.currentPage).replace();
a.get(e+"?onlyArticleGrid=true&page="+c.currentPage).success(function(h){var g=$(h);$("#category-grid").append(g);var j=c.currentPage*c.contentPerLoad;
c.hideMoreResultsButton=c.totalCount<=j?true:false;var i="div-gpt-square-fixed";var f=$("[id^="+i+"]:empty");$.each(f,function(m,l){var o=l.attributes.id.value;
var n=o.lastIndexOf("-");var q=o.substr(n+1);var p=(q-1)%3+1;var r=p>1?p+1:p;var k="div-gpt-lazy-square-fixed-tier"+r;d.karma.cmd.push(function(){d.karma.createSlot(k,o,false,{refreshable:true})
})});setTimeout(function(){d.karma.cmd.push(window.karma.fillSlots)},50);d.karma.refresh()})}}]);
