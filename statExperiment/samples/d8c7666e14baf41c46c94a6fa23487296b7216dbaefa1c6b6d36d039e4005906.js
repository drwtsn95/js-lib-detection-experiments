/**
  stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
  @version v3.5.7
  @link https://github.com/dollarshaveclub/stickybits#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
  @license MIT
**/
!function(t,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof define&&define.amd?define(s):t.stickybits=s()}(this,function(){"use strict";var e=function(){function t(t,s){var e=void 0!==s?s:{};this.version="3.5.7",this.userAgent=window.navigator.userAgent||"no `userAgent` provided by the browser",this.props={customStickyChangeNumber:e.customStickyChangeNumber||null,noStyles:e.noStyles||!1,stickyBitStickyOffset:e.stickyBitStickyOffset||0,parentClass:e.parentClass||"js-stickybit-parent",scrollEl:"string"==typeof e.scrollEl?document.querySelector(e.scrollEl):e.scrollEl||window,stickyClass:e.stickyClass||"js-is-sticky",stuckClass:e.stuckClass||"js-is-stuck",stickyChangeClass:e.stickyChangeClass||"js-is-sticky--change",useStickyClasses:e.useStickyClasses||!1,useFixed:e.useFixed||!1,useGetBoundingClientRect:e.useGetBoundingClientRect||!1,verticalPosition:e.verticalPosition||"top"},this.props.positionVal=this.definePosition()||"fixed",this.instances=[];var i=this.props,n=i.positionVal,o=i.verticalPosition,r=i.noStyles,a=i.stickyBitStickyOffset,l=i.useStickyClasses,c="top"!==o||r?"":a+"px",u="fixed"!==n?n:"";this.els="string"==typeof t?document.querySelectorAll(t):t,"length"in this.els||(this.els=[this.els]);for(var f=0;f<this.els.length;f++){var p=this.els[f];if(p.style[o]=c,p.style.position=u,"fixed"===n||l){var h=this.addInstance(p,this.props);this.instances.push(h)}}}var s=t.prototype;return s.definePosition=function(){var t;if(this.props.useFixed)t="fixed";else{for(var s=["","-o-","-webkit-","-moz-","-ms-"],e=document.head.style,i=0;i<s.length;i+=1)e.position=s[i]+"sticky";t=e.position?e.position:"fixed",e.position=""}return t},s.addInstance=function(t,s){var e=this,i={el:t,parent:t.parentNode,props:s};this.isWin=this.props.scrollEl===window;var n=this.isWin?window:this.getClosestParent(i.el,i.props.scrollEl);return this.computeScrollOffsets(i),i.parent.className+=" "+s.parentClass,i.state="default",i.stateContainer=function(){return e.manageState(i)},n.addEventListener("scroll",i.stateContainer),i},s.getClosestParent=function(t,s){var e=s,i=t;if(i.parentElement===e)return e;for(;i.parentElement!==e;)i=i.parentElement;return e},s.getTopPosition=function(t){if(this.props.useGetBoundingClientRect)return t.getBoundingClientRect().top+(this.props.scrollEl.pageYOffset||document.documentElement.scrollTop);for(var s=0;s=t.offsetTop+s,t=t.offsetParent;);return s},s.computeScrollOffsets=function(t){var s=t,e=s.props,i=s.el,n=s.parent,o=!this.isWin&&"fixed"===e.positionVal,r="bottom"!==e.verticalPosition,a=o?this.getTopPosition(e.scrollEl):0,l=o?this.getTopPosition(n)-a:this.getTopPosition(n),c=null!==e.customStickyChangeNumber?e.customStickyChangeNumber:i.offsetHeight,u=l+n.offsetHeight;return s.offset=a+e.stickyBitStickyOffset,s.stickyStart=r?l-s.offset:0,s.stickyChange=s.stickyStart+c,s.stickyStop=r?u-(i.offsetHeight+s.offset):u-window.innerHeight,s},s.toggleClasses=function(t,s,e){var i=t,n=i.className.split(" ");e&&-1===n.indexOf(e)&&n.push(e);var o=n.indexOf(s);-1!==o&&n.splice(o,1),i.className=n.join(" ")},s.manageState=function(t){var s=t,e=s.el,i=s.props,n=s.state,o=s.stickyStart,r=s.stickyChange,a=s.stickyStop,l=e.style,c=i.noStyles,u=i.positionVal,f=i.scrollEl,p=i.stickyClass,h=i.stickyChangeClass,d=i.stuckClass,y=i.verticalPosition,k="bottom"!==y,m=function(t){t()},g=this.isWin&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame)||m,C=this.toggleClasses,v=this.isWin?window.scrollY||window.pageYOffset:f.scrollTop,S=k&&v<=o&&"sticky"===n,w=a<=v&&"sticky"===n;o<v&&v<a&&("default"===n||"stuck"===n)?(s.state="sticky",g(function(){C(e,d,p),l.position=u,c||(l.bottom="",l[y]=i.stickyBitStickyOffset+"px")})):S?(s.state="default",g(function(){C(e,p),"fixed"===u&&(l.position="")})):w&&(s.state="stuck",g(function(){C(e,p,d),"fixed"!==u||c||(l.top="",l.bottom="0",l.position="absolute")}));var b=r<=v&&v<=a;return v<r||a<v?g(function(){C(e,h)}):b&&g(function(){C(e,"stub",h)}),s},s.update=function(){for(var t=0;t<this.instances.length;t+=1){var s=this.instances[t];this.computeScrollOffsets(s)}return this},s.removeInstance=function(t){var s=t.el,e=t.props,i=this.toggleClasses;s.style.position="",s.style[e.verticalPosition]="",i(s,e.stickyClass),i(s,e.stuckClass),i(s.parentNode,e.parentClass)},s.cleanup=function(){for(var t=0;t<this.instances.length;t+=1){var s=this.instances[t];s.props.scrollEl.removeEventListener("scroll",s.stateContainer),this.removeInstance(s)}this.manageState=!1,this.instances=[]},t}();return function(t,s){return new e(t,s)}});
