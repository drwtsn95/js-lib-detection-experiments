!function(a,b){"use strict";var c,d,e,f,g;c={},d={},e=/(?:&|<|>|\"|\')/g,f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"},g=function(a){return f[a]},d._getEnv=function(){return!c.env||"d1"!==c.env&&"f1"!==c.env&&"l1"!==c.env?".":"."+c.env+"."},d._getSOID=function(){var a,b;return b=document.getElementById("archiveList"),b&&(a=b.getAttribute("data-m")),a||(a=0),a},d._getLimit=function(){var a,b;return b=document.getElementById("archiveList"),b&&(a=b.getAttribute("data-archive-count")),a||(a=10),a},d._encodeSubject=function(a){return e.test(a)?a.replace(e,g):a},c.drawArchives=function(a){var b,c,e;if(c="",a&&a.length){c="<ul>";for(var f=0;f<a.length;f++)b=a[f],b&&b.subject&&b.campaign_url&&(c=c+'<li><a href="'+b.campaign_url+'" target="_blank">'+d._encodeSubject(b.subject)+"</a></li>");c+="</ul>"}e=document.getElementById("archiveList"),e&&(e.innerHTML=c)},d._createCORSRequest=function(){var b,c,e;return c=a.location.protocol+"//campaign"+d._getEnv()+"constantcontact.com/archive?m="+d._getSOID(),e=d._getLimit(),e&&(c=c+"&l="+e),b=new XMLHttpRequest,"withCredentials"in b?b.open("GET",c,!0):"undefined"!=typeof XDomainRequest?(b=new XDomainRequest,b.open("GET",c)):b=null,b},d._handleError=function(){},c.getArchives=function(){var a;a=d._createCORSRequest(),a&&(a.onload=function(){var b,e;if(200===a.status&&a.responseText&&a.responseText.length){if(b=a.responseText,b&&b.length)try{e=JSON.parse(b),c.drawArchives(e)}catch(f){d._handleError()}}else d._handleError()},a.onerror=function(){d._handleError()},a.send())},b&&(c.testHooks=d),document.addEventListener("DOMContentLoaded",function(){!b&&document.getElementById("archiveList")&&c.getArchives()}),a.ctct=a.ctct||{},a.ctct.archive=c}(window,window.archiveTestMode);
//# sourceMappingURL=archive-static.min.js.map