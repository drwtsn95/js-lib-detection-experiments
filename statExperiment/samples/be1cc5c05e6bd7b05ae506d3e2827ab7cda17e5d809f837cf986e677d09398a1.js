/*
-----------------------------------------------------------------------------
	
	(c) 2018 WebYurt.com -  All rights reserved

-----------------------------------------------------------------------------
Any unauthorized use, such as distributing, copying, modifying or 
republishing is not permitted.
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
*/
$(document).ready(function() {

	$(document).on("click","#btnConvertTextHTML",function(e){ 
		var txt = $('#Text').val();
		var tag = $('input[name=tag]:checked').val();
		var pr = $('input[name=pr]:checked').val();
		var encode = $('input[name=encode]:checked').val();
		var br = '<br>';
		var U = 'xJFwKVzX';
		
		// VALIDATE
		if (jQuery.trim(txt).length !== 0){
						
			if(pr === 'OBR'){ br = '<br />'; }		// BR PREFERENCE

			txt = txt.replace(/\r\n/g,U);			// return, newline
			txt = txt.replace(/\n/g,U);				// newline
			txt = txt.replace(/\r/g,U);				// return
			
			if (encode === 'encode') { txt = HTMLEncode(txt); }
			
			txt = txt.replace(/\s+/g," ");				//\s = anything but a whitespace
			txt = txt.trim();
						
			if (tag === 'BR') {
				txt = txt.replace(new RegExp(U+U,"gi"),br+"\r\n"+br+"\r\n");
				txt = txt.replace(new RegExp(U,"gi"),br+"\r\n");
			}
			if (tag === 'P') {
				txt = txt.replace(new RegExp(U+U,"gi"),"</p><p>");
				txt = txt.replace(new RegExp(U,"gi")," ");
			}
			if (tag === 'PBR') {
				txt = txt.replace(new RegExp(U+U,"gi"),"</p><p>");
				txt = txt.replace(new RegExp(U,"gi"),br+"\r\n");
			}

			if (tag !== 'BR') {
				txt ='<p>'+txt+'</p>';
			}

			txt = txt.replace("<p><\/p>","");
			txt = txt.replace("\r\n\r\n","");
			txt = txt.replace(/<\/p><p>/g,"</p>\r\n\r\n<p>");
			txt = txt.replace(/<p><br \/>/g,"<p>");
			txt = txt.replace(/<p><br>/g,"<p>");
			
			$('#res').removeClass('_hide');
			$('#HTML').val(txt);
		}
		
		
		return false;
	});

	//-------------------------------------
	// ECNODE
	//-------------------------------------
	function HTMLEncode(str){
		var i = str.length;
		var arr = [];
	    while (i--) {
			var iC = str[i].charCodeAt();
			// total=126 | 96=` | 38=& | 34="
			if (iC > 127 || iC === 96 || (iC === 38) || iC === 34) {
				arr[i] = '&#'+iC+';';
			} else {
				arr[i] = str[i];
			}
		}
		str = arr.join('');
		str = str.replace(/\&\#9\;/g," ");	// TAB
		str = str.replace(/\&\#10\;/g," ");	// LINE FEED
		str = str.replace(/\&\#32\;/g," ");	// SPACE
		str = encodeHTMLEntities(str);
		return str;
		
	}//func
	
	
	//-------------------------------------
	// ENCODE
	//-------------------------------------
	function encodeHTMLEntities(str) {
		var entities = [	
			['&#169;','&copy;','??'], ['&#174;','&reg;','??'], ['&#178;','&sup2;','??'], ['&#179;','&sup3;','??'], ['&#34;','&quot;','"'], ['&#38;','&amp;','&'], ['&#8211;','&ndash;','???'], ['&#8212;','&mdash;','???'], ['&#8216;','&lsquo;','???'], ['&#8217;','&rsquo;','???'], ['&#8220;','&ldquo;','???'], ['&#8221;','&rdquo;','???'], ['&#8226;','&bull;','???'], ['&#8224;','&dagger;','???'], ['&#8225;','&Dagger;','???'], ['&#8242;','&prime;','???'], ['&#8243;','&Prime;','???'], ['&#8249;','&lsaquo;','???'], ['&#8250;','&rsaquo;','???'], ['&#8364;','&euro;','???'], ['&#8482;','&trade;','???'], ['&#732;','&tilde;','??'], ['&#710;','&circ;','??'], ['&#9824;','&spades;','???'], ['&#9827;','&clubs;','???'], ['&#9829;','&hearts;','???'], ['&#9830;','&diams;','???'], ['&#9674;','&loz;','???'], ['&#8592;','&larr;','???'], ['&#8594;','&rarr;','???'], ['&#8593;','&uarr;','???'], ['&#8595;','&darr;','???'], ['&#8596;','&harr;','???'], ['&#172;','&not;','??'], ['&#161;','&iexcl;','??'], ['&#162;','&cent;','??'], ['&#163;','&pound;','??'], ['&#164;','&curren;','??'], ['&#165;','&yen;','??'], ['&#166;','&brvbar;','??'], ['&#167;','&sect;','??'], ['&#168;','&uml;','??'], ['&#170;','&ordf;','??'], ['&#171;','&laquo;','??'], ['&#172;','&not;','??'], ['&#173;','&shy;','??'], ['&#175;','&macr;','??'], ['&#176;','&deg;','??'], ['&#177;','&plusmn;','??'], ['&#180;','&acute;','??'], ['&#181;','&micro;','??'], ['&#182;','&para;','??'], ['&#183;','&middot;','??'], ['&#184;','&cedil;','??'], ['&#185;','&sup1;','??'], ['&#186;','&ordm;','??'], ['&#187;','&raquo;','??'], ['&#188;','&frac14;','??'], ['&#189;','&frac12;','??'], ['&#190;','&frac34;','??'], ['&#191;','&iquest;','??'], ['&#192;','&Agrave;','??'], ['&#193;','&Aacute;','??'], ['&#194;','&Acirc;','??'], ['&#195;','&Atilde;','??'], ['&#196;','&Auml;','??'], ['&#197;','&Aring;','??'], ['&#198;','&AElig;','??'], ['&#199;','&Ccedil;','??'], ['&#200;','&Egrave;','??'], ['&#201;','&Eacute;','??'], ['&#202;','&Ecirc;','??'], ['&#203;','&Euml;','??'], ['&#204;','&Igrave;','??'], ['&#205;','&Iacute;','??'], ['&#206;','&Icirc;','??'], ['&#207;','&Iuml;','??'], ['&#208;','&ETH;','??'], ['&#209;','&Ntilde;','??'], ['&#210;','&Ograve;','??'], ['&#211;','&Oacute;','??'], ['&#212;','&Ocirc;','??'], ['&#213;','&Otilde;','??'], ['&#214;','&Ouml;','??'], ['&#215;','&times;','??'], ['&#216;','&Oslash;','??'], ['&#217;','&Ugrave;','??'], ['&#218;','&Uacute;','??'], ['&#219;','&Ucirc;','??'], ['&#220;','&Uuml;','??'], ['&#221;','&Yacute;','??'], ['&#222;','&THORN;','??'], ['&#223;','&szlig;','??'], ['&#224;','&agrave;','??'], ['&#225;','&aacute;','??'], ['&#226;','&acirc;','??'], ['&#227;','&atilde;','??'], ['&#228;','&auml;','??'], ['&#229;','&aring;','??'], ['&#230;','&aelig;','??'], ['&#231;','&ccedil;','??'], ['&#232;','&egrave;','??'], ['&#233;','&eacute;','??'], ['&#234;','&ecirc;','??'], ['&#235;','&euml;','??'], ['&#236;','&igrave;','??'], ['&#237;','&iacute;','??'], ['&#238;','&icirc;','??'], ['&#239;','&iuml;','??'], ['&#240;','&eth;','??'], ['&#241;','&ntilde;','??'], ['&#242;','&ograve;','??'], ['&#243;','&oacute;','??'], ['&#244;','&ocirc;','??'], ['&#245;','&otilde;','??'], ['&#246;','&ouml;','??'], ['&#247;','&divide;','??'], ['&#248;','&oslash;','??'], ['&#249;','&ugrave;','??'], ['&#250;','&uacute;','??'], ['&#251;','&ucirc;','??'], ['&#252;','&uuml;','??'], ['&#253;','&yacute;','??'], ['&#254;','&thorn;','??'], ['&#255;','&yuml;','??']
		];
		for (var i = 0, max = entities.length; i < max; ++i) {
			str = str.replace(new RegExp(entities[i][0],'g'), entities[i][1]);
		}
		return str;
	}
	
	//-------------------------------------
	// RESET
	//-------------------------------------
	$(document).on("click","#btnReset",function(){ 
		$('#Text').val('');
		$('#HTML').val('');
	});

	
}); //ready