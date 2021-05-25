object.define("xn/lib/slider","ua,events",function(_1,_2){
var ua=_1("ua");
var _4=_1("events");
var _5=new Class({"__mixins__":[_4.Events],initialize:function(_6,_7){
_6._callback={};
_6.curpage=0;
_6.conf={con:null,width:400,slideTime:500,controlbar:[],animateType:"linear",activeClass:"active",autoSlideTime:5000,animateTime:200,direction:"auto",noControls:false,autoSlide:true,curpage:0};
object.extend(_6.conf,_7);
if(_6.conf.curpage){
_6.curpage=_6.conf.curpage;
}
_6.checkConf();
if(!_7.imgcon){
_6.imgcon=$(Sizzle(".imgcon",_6.conf.con)[0]);
}
_6.pageItems=Sizzle("li",_6.imgcon);
_6.pages=_6.pageItems.length;
if(_6.pages<2){
return;
}
XN.array.each(_6.pageItems,function(i,v){
_6.pageItems[i]=$(v);
});
_6.init();
},init:function(_a){
if(_a.curpage>0){
_a.rmControlActive(_a.pageItems[_a.curpage],_a.pageItems[0]);
}
_a.pageItems[_a.curpage].addClass("active");
_a.controlItems=[];
if(!_a.conf.noControls){
var _b=_a.packControl();
_a.conf.con=$(_a.conf.con);
_a.conf.con.appendHTML(_b);
_a.control=$(Sizzle(".imgcon-c",_a.conf.con)[0]);
_a.controlItems=$(Sizzle("li",_a.control));
_a.initControlEvents();
}
if(_a.conf.autoSlide){
_a._beginAutoSlide();
}
if(_a.conf.controlbar.length){
_a.conf.controlbar[0][0].addEvent(_a.conf.controlbar[0][1],function(){
_a.preSlider();
});
_a.conf.controlbar[1][0].addEvent(_a.conf.controlbar[1][1],function(){
_a.nextSlider();
});
}
},checkConf:function(_c){
if(_c.animateTime<=_c.autoSlideTime){
_c.autoSlideTime=_c.slideTime+200;
}
if(!_c.conf.autoSlide&&_c.conf.noControls){
throw new Error("\u64e6\uff0c\u8bbe\u7f6e\u7684\u6709\u95ee\u9898\u4e86\uff01\uff01");
}
if(_c.curpage+1>=_c.pages){
throw new Error("\u64e6\uff0c\u5f53\u524d\u9875\u5927\u4e8e\u603b\u9875\u6570\u4e86");
}
if(!_c.conf.con){
throw new Error("\u56fe\u7247\u5bb9\u5668\u662f\u5fc5\u987b\u53c2\u6570");
}
},rmControlActive:function(_d,_e,_f){
if(_d.conf.noControls){
return;
}
XN.element.addClass(_e,_d.conf.activeClass);
XN.element.delClass(_f,_d.conf.activeClass);
},preSlider:function(_10){
var _11=_10.curpage-1;
_10._clearAutoSlideTimer();
if(_11<0){
_11=_10.pages-1;
}
_10.animateControl(_11,_10.controlItems[_11]);
if(_10.conf.autoSlide){
_10._beginAutoSlide();
}
},nextSlider:function(_12){
var _13=_12.curpage+1;
_12._clearAutoSlideTimer();
if(_13>=_12.pages){
_13=0;
}
_12.animateControl(_13,_12.controlItems[_13]);
if(_12.conf.autoSlide){
_12._beginAutoSlide();
}
},_beginAutoSlide:function(_14,_15){
if(_14._autoBegined){
return;
}
_14._autoBegined=true;
_14._autoSliderTimer=setInterval(function(){
_14._autoSlideControl(_15);
_15=null;
},_14.conf.autoSlideTime);
},_clearAutoSlideTimer:function(_16){
if(_16._autoSliderTimer){
clearInterval(_16._autoSliderTimer);
_16._autoBegined=false;
}
},_autoSlideControl:function(_17,_18){
var _19;
if(_18){
_19=_18;
}else{
_19=_17.curpage+1;
}
if(_19==_17.pages){
_19=0;
}
_17.animateControl(_19,_17.controlItems[_19]);
},initControlEvents:function(_1a){
_1a.control.delegate("li","mouseover",function(e){
var _1c=~~this.getAttribute("data-index");
_1a.animateControl(_1c,this);
});
XN.array.each([_1a.control,_1a.imgcon],function(i,v){
v.addEvent("mouseover",function(){
_1a._clearAutoSlideTimer();
});
if(_1a.conf.autoSlide){
v.addEvent("mouseleave",function(){
_1a._beginAutoSlide(_1a.curpage+1);
});
}
});
},animateControl:function(_1f,_20,_21){
var _22=_1f.controlItems[_1f.curpage];
if(_20===_1f.curpage){
return;
}
if(_1f.motion&&_1f.motion.tweening){
_1f._callback.toindex=_20;
_1f._callback.controlItem=_21;
return;
}
_1f._clearHoverTimer();
_1f._hoverTimer=setTimeout(function(){
_1f.rmControlActive(_21,_22);
_1f.animate(_20);
},_1f.conf.animateTime);
},_clearHoverTimer:function(_23){
if(_23._hoverTimer){
clearTimeout(_23._hoverTimer);
}
},animate:function(_24,_25){
var _26="prev";
if(_24.conf.direction=="leftToRight"){
_26="prev";
}else{
if(_24.conf.direction=="rightToLeft"){
_26="next";
}else{
if(_25>_24.curpage){
_26="next";
}
if(_25==0&&_24.curpage===_24.pageItems.length-1){
_26="next";
}
if(_25==_24.pageItems.length-1&&_24.curpage===0){
_26="prev";
}
}
}
var el=_24.pageItems[_24.curpage];
var el2=_24.pageItems[_25];
_24.preMotion=_24.motion;
var _29=new XN.effect.Motion(_24.conf.animateType,_24.conf.slideTime);
_24.motion=_29;
_29.onTweening=function(){
el2.addClass(_24.conf.activeClass);
el2.addClass(_26);
var w;
if(_26==="next"){
w=_24.conf.width;
}else{
w=-_24.conf.width;
}
el.style.left=this.equation(0,-w)+"px";
el2.style.left=this.equation(w,0)+"px";
};
var _2b=_24.curpage,_2c=_25;
_24.fireEvent("beforeSlide",{curpage:_2b,showpage:_2c});
_29.start();
_24.curpage=_25;
_29.onComplete=function(){
el2.delClass(_26);
el.style.left="0px";
el.delClass(_24.conf.activeClass);
if(_24._callback.toindex!=undefined&&_24._callback.toindex!=_24.curpage){
_24.animateControl(_24._callback.toindex,_24._callback.controlItem);
}else{
_24._callback={};
}
_24.fireEvent("endSlide",{curpage:_2b,showpage:_2c});
};
},packControl:function(_2d){
var _2e="<ul class=\"imgcon-c clearfix\">";
for(var i=0;i<_2d.pages;i++){
var _30="";
if(i==_2d.curpage){
_30="active";
}
_2e+="<li data-index="+i+" class=\""+_30+"\"><a hideFocus=true href=\"javascript:;\">"+(i+1)+"</a></li>";
}
_2e+="</ul>";
return _2e;
}});
_2.sliderClass=_5;
});

