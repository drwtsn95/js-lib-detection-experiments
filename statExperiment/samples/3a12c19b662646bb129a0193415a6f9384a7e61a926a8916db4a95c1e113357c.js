function initEcAd() {
document.all.AdLayer1.style.posTop = -200;
document.all.AdLayer1.style.visibility = 'visible'
document.all.AdLayer2.style.posTop = -200;
document.all.AdLayer2.style.visibility = 'visible'
document.all.AdLayer3.style.posTop = -200;
document.all.AdLayer3.style.visibility = 'visible'
document.all.AdLayer4.style.posTop = -200;
document.all.AdLayer4.style.visibility = 'visible'
document.all.AdLayer5.style.posTop = -200;
document.all.AdLayer5.style.visibility = 'visible'
document.all.AdLayer6.style.posTop = -200;
document.all.AdLayer6.style.visibility = 'visible'
MoveLeftLayer1('AdLayer1');
MoveLeftLayer2('AdLayer2');
MoveLeftLayer3('AdLayer3');
MoveRightLayer5('AdLayer5');
MoveRightLayer6('AdLayer6');
MoveRightLayer4('AdLayer4');
}

function MoveLeftLayer1(layerName) {
var x = 0;
var y = 32;// 左侧广告距离页首高度
var diff = (document.documentElement.scrollTop + y - document.all.AdLayer1.style.posTop)*.10;
var y = document.documentElement.scrollTop + y - diff;
eval("document.all." + layerName + ".style.posTop = parseInt(y)");
eval("document.all." + layerName + ".style.posLeft = x");
setTimeout("MoveLeftLayer1('AdLayer1');", 0);
}

function MoveLeftLayer2(layerName) {
var x = 0;
var y = 408;// 左侧广告距离页首高度
var diff = (document.documentElement.scrollTop + y - document.all.AdLayer2.style.posTop)*.10;
var y = document.documentElement.scrollTop + y - diff;
eval("document.all." + layerName + ".style.posTop = parseInt(y)");
eval("document.all." + layerName + ".style.posLeft = x");
setTimeout("MoveLeftLayer2('AdLayer2');", 0);
}

function MoveLeftLayer3(layerName) {
var x = 0;
var y = 230;// 左侧广告距离页首高度
var diff = (document.documentElement.scrollTop + y - document.all.AdLayer3.style.posTop)*.10;
var y = document.documentElement.scrollTop + y - diff;
eval("document.all." + layerName + ".style.posTop = parseInt(y)");
eval("document.all." + layerName + ".style.posLeft = x");
setTimeout("MoveLeftLayer3('AdLayer3');", 0);
}

function MoveRightLayer4(layerName) {
var x = 0;
var y = 32;// 右侧广告距离页首高度
var diff = (document.documentElement.scrollTop + y - document.all.AdLayer4.style.posTop)*.10;
var y = document.documentElement.scrollTop + y - diff;
eval("document.all." + layerName + ".style.posTop = y");
eval("document.all." + layerName + ".style.posRight = x");
setTimeout("MoveRightLayer4('AdLayer4');", 0);
}

function MoveRightLayer5(layerName) {
var x = 0;
var y = 408;// 右侧广告距离页首高度
var diff = (document.documentElement.scrollTop + y - document.all.AdLayer5.style.posTop)*.10;
var y = document.documentElement.scrollTop + y - diff;
eval("document.all." + layerName + ".style.posTop = y");
eval("document.all." + layerName + ".style.posRight = x");
setTimeout("MoveRightLayer5('AdLayer5');", 0);
}

function MoveRightLayer6(layerName) {
var x = 0;
var y = 230;// 右侧广告距离页首高度
var diff = (document.documentElement.scrollTop + y - document.all.AdLayer6.style.posTop)*.10;
var y = document.documentElement.scrollTop + y - diff;
eval("document.all." + layerName + ".style.posTop = y");
eval("document.all." + layerName + ".style.posRight = x");
setTimeout("MoveRightLayer6('AdLayer6');", 0);
}

document.write("<div id=AdLayer1 style='position: absolute;visibility:hidden;z-index:1'><div><a onclick='HiddenDiv()' style='cursor:hand;color:#0066FF;'>关闭</a></div><a href='http://www.cenx-elec.com' target='_blank'><img src='images/cx_ad.gif' border='0'></a></div>"
+"<div id=AdLayer2 style='position: absolute;visibility:hidden;z-index:1'><div><a onclick='HiddenDiv()' style='cursor:hand;color:#0066FF;'> </a></div><a href='http://szasdz.dzsc.com' target='_blank'><img src='images/asydz_ad.gif' border='0'></a></div>"
+"<div id=AdLayer3 style='position: absolute;visibility:hidden;z-index:1'><div><a onclick='HiddenDiv()' style='cursor:hand;color:#0066FF;'> </a></div><a href='http://www.kimwood.com.cn' target='_blank'><img src='images/szjydz_ad.jpg' border='0'></a></div>"
+"<div id=AdLayer4 style='position: absolute;visibility:hidden;z-index:1'><div><a onclick='HiddenDiv()' style='cursor:hand;color:#0066FF;'>关闭</a></div><a href='http://www.tcy-ic.com' target='_blank'><img src='images/tcy_ad.gif' border='0'></a></div>"
+"<div id=AdLayer5 style='position: absolute;visibility:hidden;z-index:1'><div><a onclick='HiddenDiv()' style='cursor:hand;'> </a></div><a href='http://szmeilong.dzsc.com/' target='_blank'><img src='images/ml_ad.gif' border='0'></a></div>"
+"<div id=AdLayer6 style='position: absolute;visibility:hidden;z-index:1'><div><a onclick='HiddenDiv()' style='cursor:hand;'> </a></div><a href='http://hkt.dzsc.com/' target='_blank'><img src='images/hkt_ad.gif' border='0'></a></div>");
initEcAd()

function HiddenDiv(){
	$("#AdLayer1").hide();
	$("#AdLayer2").hide();
	$("#AdLayer3").hide();
	$("#AdLayer4").hide();
	$("#AdLayer5").hide();
	$("#AdLayer6").hide();
}