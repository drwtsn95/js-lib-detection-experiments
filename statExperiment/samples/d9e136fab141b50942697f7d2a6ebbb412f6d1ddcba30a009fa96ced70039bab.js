
	    
(function () {	    
	    

	    
	     

			var id              =  125;
			var successResponse = 'https://href.li/?https://doingood3.xyz/index.php?lander=aHR0cHM6Ly9sYW5kaW5nMi5pbnN0YWxsdXNkLmNvbS9kaXNwbGF5L2luZGV4LnBocD9wYWdlPXF1ZXJ5Y3BjL2l0ZW1zLyZhZHVpZD0xMjUmYnV0dG9uPTEmZGlzcGxheXR5cGU9MCZwaWQ9NTczJnRpbWU9MTYxNDkzNjUyOCZoYXNoPTc3NWMzY2I1Y2QxMWJkYzM4OTU3YmQ2ZDk3ZDM2M2FkJnE9SE1BK1BybytWUE4rNS4xLjI1OS4wK0NyYWNrKyslNUJMaWZldGltZSU1RCtMaWNlbnNlK2tleSsyMDIx&pageDisplay=0';
			
			var elements        = document.getElementsByClassName("buttonPress-"+id);

			var clickFunction = function() {
			    
			    if(successResponse != "")
			    window.open(successResponse);	

			    return;
			};

			for (var i = 0; i < elements.length; i++) 
			{
			    elements[i].addEventListener('click', clickFunction, false);
			}
				
		
	})();		
		
	