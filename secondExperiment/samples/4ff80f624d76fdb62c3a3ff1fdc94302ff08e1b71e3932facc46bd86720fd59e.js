$(function(){
	/*主大图切换*/
	$(".box1-left .focus").sudyfocus({      
		p:50,
		zWidth:330,
		zHeight:255,
		title:{
			isAutoWidth: false,
			active:true
		},
		 text:{
			 active: false,
			 isAutoHeight: false,
			 href: false
		},
		response: true,
		speed:700, 
		pagination: true,
		navigation: false,
		isNavHover: false,
		href:true,
		effect: 'fade'
	});
});
