try{jQuery(document).ready(function(){function setBlockerCookie(c_name,value,exdays)
{var exdate=new Date();exdate.setDate(exdate.getDate()+exdays);var c_value=escape(value)+((exdays==null)?"":"; expires="+exdate.toUTCString())+"; path=/";document.cookie=c_name+"="+c_value;}
function readBlockerCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
setTimeout(function(blockerdetector){var $popup_box=jQuery('#blockerdetector');var $bd_info_close=jQuery('.bd_info_close');var $bd_close=jQuery('.bd_close');var blockerdetector=readBlockerCookie('blockerdetector');var $bd_cortina=jQuery('#bd_cortina');if(typeof(window.google_jobrunner)==="undefined"&&!(blockerdetector=="yes")){$bd_cortina.fadeIn('fast');$popup_box.delay(1000).slideDown('fast');$bd_info_close.click(function(){$bd_info.fadeOut("slow");});$bd_close.click(function(){setBlockerCookie("blockerdetector","yes",2);jQuery.post('https://www.webcamtaxi.com/en/andorra.html','set_blockercookie=1',function(){});$popup_box.slideUp('slow');$bd_cortina.remove();});}},10000);});}catch(e){console.error('Error in script declaration; Error:'+e.message);};
