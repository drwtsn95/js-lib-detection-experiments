var covera=new Object();covera.A=[8,1,2,3,4,5,6,7];covera.F=[0];covera.L=[3];covera.R=[7];covera.U=[5];covera.D=[1];covera.UD=[1,5];covera.LR=[3,7];covera.a={slices:"1",time:1000,delay:"100",style:"v",ease:"",ani:{start:{it:"n",css:[{opacity:"0"},{opacity:"0",marginTop:"-100%"},{opacity:"0",marginTop:"-100%",marginLeft:"100%"},{opacity:"0",marginLeft:"100%"},{opacity:"0",marginTop:"100%",marginLeft:"100%"},{opacity:"0",marginTop:"100%"},{opacity:"0",marginLeft:"-100%",marginTop:"100%"},{opacity:"0",marginLeft:"-100%"},{opacity:"0",marginLeft:"-100%",marginTop:"-100%"}]},on:{it:"n",css:[{opacity:"1",marginLeft:"0%",marginTop:"0%"}]},off:{it:"n",css:[{opacity:"0"},{opacity:"0",marginTop:"100%"},{opacity:"0",marginTop:"100%",marginLeft:"-100%"},{opacity:"0",marginLeft:"-100%"},{opacity:"0",marginTop:"-100%",marginLeft:"-100%"},{opacity:"0",marginTop:"-100%"},{opacity:"0",marginLeft:"100%",marginTop:"-100%"},{opacity:"0",marginLeft:"100%"},{opacity:"0",marginLeft:"100%",marginTop:"100%"}]}}};function coverani(D,B,E,C,A){this.vn=D;this.vb=B;this.re=E;this.e=null;this.be=null;this.cfgs=C;this.cfstr=A;this.cfg=null;this.wid=0;this.hi=0;this.ini=false;this.slc=0;this.i=0;this.cfd=null;this.setcfg=function(){if(this.cfgs==null){this.cfgs=this.cfstr.split(",")}this.cfg=new Array(this.cfgs.length);this.cfd=new Array(this.cfg.length);for(var L=0;L<this.cfgs.length;L++){var T=this.cfgs[L];var U=T.split(".");var S=U[0].split("-");this.cfg[L]=covera[S[0]];var G=this.cfg[L];var I=new Object();this.cfd[L]=I;I.style=G.style;I.slices=G.slices;I.time=G.time;I.delay=G.delay;var H=null;if(S[1].length>1){var M=S[1].charAt(0);var P=S[1].substring(1);H=covera[P];I.style=M}var F="n";for(var R=1;R<U.length;R++){var Q=U[R].charAt(0);var O=U[R].substring(1);if(Q=="d"){I.delay=O}else{if(Q=="t"){I.time=(O*1)}else{if(Q=="s"){I.slices=O}else{if(Q=="q"){F=O}}}}}var J=I.slices*1;if(J>100){I.slices=100}I.ani={start:{it:F},on:{it:F,css:[{marginTop:"0%",marginLeft:"0%",opacity:"1"}]},off:{it:F}};if(H!=null){I.ani.start.it=G.ani.start.it;I.ani.off.it=G.ani.off.it;I.ani.start.css=new Array(H.length);I.ani.off.css=new Array(H.length);for(var K=0;K<H.length;K++){var N=H[K];I.ani.start.css[K]=G.ani.start.css[N];I.ani.off.css[K]=G.ani.off.css[N]}}else{I.ani.start=G.ani.start;I.ani.off=G.ani.off}}};this.getret=function(){return this.re};this.setret=function(F){this.re=F};this.gc=function(){return this.cfg[this.i]};this.gd=function(){return this.cfd[this.i]};this.init=function(){if(this.ini==true){return }this.ini=true;this.be=document.getElementById(this.vb);this.e=document.getElementById(this.vb+"i");this.be.style.display="block";this.hi=this.be.clientHeight;this.wid=this.be.clientWidth;this.be.style.display="none";var G="";for(var F=0;F<this.cfg.length;F++){var J=this.cfg[F];var I=this.cfd[F];I.bname=this.vn+J.style+F+"-"+I.slices+"-";var H=I.style;I.slc=I.slices;ti="";if(H=="h"){ti=this.inithz(J,I)}else{if(H=="v"){ti=this.initvz(J,I)}else{ti=this.initbz(J,I)}}G=G+ti}this.e.innerHTML=G};this.inithz=function(L,K){K.inc=Math.ceil(this.hi/K.slices);K.inc=K.inc+1;var H="";var J=0;for(var F=0;F<K.slc;F++){var G=J*K.inc;J++;var I='<div id="'+K.bname+J+'" style="position:absolute;top:'+(F*K.inc)+"px;width:"+this.wid+"px;height:"+K.inc+"px;background-position:0px -"+G+'px;"></div>';H=H+I}return H};this.initvz=function(M,L){if(L.slc==1){L.inc=Math.ceil(this.wid/L.slc)}else{L.inc=Math.ceil(this.wid/L.slc);L.inc=L.inc+2}var H="";var J=0;for(var F=0;F<L.slc;F++){var G=J*L.inc;J++;var K="background-position:-"+G+"px 0px;";if(L.slc==1){K=""}var I='<div id="'+L.bname+J+'" style="position:absolute;left:'+(F*L.inc)+"px;width:"+L.inc+"px;height:"+this.hi+"px;"+K+'"></div>';H=H+I}return H};this.initbz=function(L,K){K.inc=Math.ceil(this.wid/K.slices);K.slc=0;var H="";var J=0;for(var M=0;M<this.hi;M=M+K.inc){for(var F=0;F<K.slices;F++){K.slc++;var G=F*K.inc;J++;var I='<div id="'+K.bname+K.slc+'" style="position:absolute;top:'+M+"px;left:"+(F*K.inc)+"px;width:"+K.inc+"px;height:"+K.inc+"px;background-position:-"+G+"px -"+M+'px;"></div>';H=H+I}}return H};this.hide=function(F){if(F==0){this.be.style.display="none";this.done()}else{var G=this;var H=function(){G.done()};j$(this.be).fadeOut(F,H)}};this.reseton=function(){this.reset(this.gd().ani.on);this.be.style.display="block"};this.resetoff=function(){this.reset(this.gd().ani.off)};this.reset=function(G){this.init();var H=0;for(var F=1;F<=this.gd().slc;F++){H=F%G.css.length;j$("#"+this.gd().bname+F).css(G.css[H])}};this.setbk=function(G){this.init();for(var F=1;F<=this.gd().slc;F++){j$("#"+this.gd().bname+F).css(G)}};this.on=function(F){this.setbk(F,null);this.be.style.display="block";this.reset(this.gd().ani.start);this.e.style.display="block";this.start(this.gd().ani.on)};this.off=function(){this.init();this.e.style.display="block";this.start(this.gd().ani.off)};this.done=function(){this.resetoff();this.next()};this.next=function(){this.i++;if(this.i>=this.cfg.length){this.i=0}};this.retf=function(){if(this.re!=null){this.re()}};this.doani=function(F,G,I){var M=null;var J=this.gc();var K=this.gd();K.anict++;if(K.anict==1){G=0}if(K.anict==K.slc){var L=this;M=function(){L.retf()}}var H=F%I.length;j$("#"+this.gd().bname+F).stop().delay(G).animate(I[H],K.time,J.ease,M)};this.start=function(F){var H=this.gc();var J=this.gd();J.anict=0;var L=0;if(F.it=="n"){for(var O=1;O<=J.slc;O++){this.doani(O,O*J.delay,F.css,O)}}if(F.it=="ra"){var K=new Array(J.slc);for(var O=0;O<J.slc;O++){K[O]=(O+1)}for(var O=1;O<=J.slc;O++){var I=Math.floor(Math.random()*J.slc);var N=0;if(K[I]!=0){N=K[I];K[I]=0}else{for(var M=I;M<J.slc;M++){if(K[M]!=0){N=K[M];K[M]=0;M=J.slc+100}}if(N==0){for(var M=0;M<J.slc;M++){if(K[M]!=0){N=K[M];K[M]=0;M=J.slc+100}}}}this.doani(N,O*J.delay,F.css,O)}}else{if(F.it=="r"){for(var O=J.slc;O>=1;O--){L++;var Q=L*J.delay;this.doani(O,Q,F.css,O)}}else{if(F.it=="io"){L=0;var P=Math.round(J.slc/2)+1;for(var O=P;O>=1;O--){this.doani(O,L*J.delay,F.css,O);this.doani((P+L),L++*J.delay,F.css,O)}}else{if(F.it=="oi"){L=0;var P=Math.round(J.slc/2);var G=J.slc;for(var O=1;O<=P;O++){this.doani(O,L*J.delay,F.css,O);this.doani((G-L),L++*J.delay,F.css,O)}}else{if(F.it=="oe"){L=0;var G=J.slc;for(var O=1;O<=G;O=O+2){this.doani(O,L++*J.delay,F.css,O)}for(var O=2;O<=G;O=O+2){this.doani(O,L++*J.delay,F.css,O)}}}}}}};this.setcfg()};