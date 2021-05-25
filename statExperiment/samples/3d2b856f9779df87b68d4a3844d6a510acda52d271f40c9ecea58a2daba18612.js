if(!window.jQuery){
		document.write('<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>');
}
var metrikaInit = 0;
var metrikaCheckActive;
$(document).ready(function() {
	if(metrikaInit == 0)
	{
		metrikaSendPageOpenInfo(0);
		setTimeout(metrikaSendPageOpenInfo, 15000, 0);
		setTimeout(metrikaSendPageOpenInfo, 30000, 0);
		setTimeout(metrikaSendPageOpenInfo, 45000, 0);
		setInterval(metrikaSendPageOpenInfo, 60000, 0);
		$("body").bind('touchmove',function( event ) {
			metrikaCheckActive = 1;
		});
		$("body").bind('mousemove',function( event ) {
			metrikaCheckActive = 1;
		});
		$("body").bind('keydown',function( event ) {
			metrikaCheckActive = 1;
		});
		metrikaInit = 1;
	}
});
$(window).unload(function(){ 
  metrikaSendPageOpenInfo(1);
});

function metrikaSendPageOpenInfo(close)
{	time = (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart)/1000;
	timegen = (window.performance.timing.responseEnd-window.performance.timing.requestStart)/1000;
	if(timegen > 0 && time >= timegen)
		$.post("/metrika/sendInfo/", {pageid:1779413, pageload:time, pagegen:timegen, title:$(document).attr('title'), active: metrikaCheckActive, close: close});
	else if (time > 0)
		$.post("/metrika/sendInfo/", {pageid:1779413, pageload:time, title:$(document).attr('title'), active: metrikaCheckActive, close: close});
	else		
		$.post("/metrika/sendInfo/", {pageid:1779413, 	title:$(document).attr('title'), active: metrikaCheckActive, close: close});
	metrikaCheckActive = 0;
}
