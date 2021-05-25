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
			['&#169;','&copy;','©'], ['&#174;','&reg;','®'], ['&#178;','&sup2;','²'], ['&#179;','&sup3;','³'], ['&#34;','&quot;','"'], ['&#38;','&amp;','&'], ['&#8211;','&ndash;','–'], ['&#8212;','&mdash;','—'], ['&#8216;','&lsquo;','‘'], ['&#8217;','&rsquo;','’'], ['&#8220;','&ldquo;','“'], ['&#8221;','&rdquo;','”'], ['&#8226;','&bull;','•'], ['&#8224;','&dagger;','†'], ['&#8225;','&Dagger;','‡'], ['&#8242;','&prime;','′'], ['&#8243;','&Prime;','″'], ['&#8249;','&lsaquo;','‹'], ['&#8250;','&rsaquo;','›'], ['&#8364;','&euro;','€'], ['&#8482;','&trade;','™'], ['&#732;','&tilde;','˜'], ['&#710;','&circ;','ˆ'], ['&#9824;','&spades;','♠'], ['&#9827;','&clubs;','♣'], ['&#9829;','&hearts;','♥'], ['&#9830;','&diams;','♦'], ['&#9674;','&loz;','◊'], ['&#8592;','&larr;','←'], ['&#8594;','&rarr;','→'], ['&#8593;','&uarr;','↑'], ['&#8595;','&darr;','↓'], ['&#8596;','&harr;','↔'], ['&#172;','&not;','¬'], ['&#161;','&iexcl;','¡'], ['&#162;','&cent;','¢'], ['&#163;','&pound;','£'], ['&#164;','&curren;','¤'], ['&#165;','&yen;','¥'], ['&#166;','&brvbar;','¦'], ['&#167;','&sect;','§'], ['&#168;','&uml;','¨'], ['&#170;','&ordf;','ª'], ['&#171;','&laquo;','«'], ['&#172;','&not;','¬'], ['&#173;','&shy;','­'], ['&#175;','&macr;','¯'], ['&#176;','&deg;','°'], ['&#177;','&plusmn;','±'], ['&#180;','&acute;','´'], ['&#181;','&micro;','µ'], ['&#182;','&para;','¶'], ['&#183;','&middot;','·'], ['&#184;','&cedil;','¸'], ['&#185;','&sup1;','¹'], ['&#186;','&ordm;','º'], ['&#187;','&raquo;','»'], ['&#188;','&frac14;','¼'], ['&#189;','&frac12;','½'], ['&#190;','&frac34;','¾'], ['&#191;','&iquest;','¿'], ['&#192;','&Agrave;','À'], ['&#193;','&Aacute;','Á'], ['&#194;','&Acirc;','Â'], ['&#195;','&Atilde;','Ã'], ['&#196;','&Auml;','Ä'], ['&#197;','&Aring;','Å'], ['&#198;','&AElig;','Æ'], ['&#199;','&Ccedil;','Ç'], ['&#200;','&Egrave;','È'], ['&#201;','&Eacute;','É'], ['&#202;','&Ecirc;','Ê'], ['&#203;','&Euml;','Ë'], ['&#204;','&Igrave;','Ì'], ['&#205;','&Iacute;','Í'], ['&#206;','&Icirc;','Î'], ['&#207;','&Iuml;','Ï'], ['&#208;','&ETH;','Ð'], ['&#209;','&Ntilde;','Ñ'], ['&#210;','&Ograve;','Ò'], ['&#211;','&Oacute;','Ó'], ['&#212;','&Ocirc;','Ô'], ['&#213;','&Otilde;','Õ'], ['&#214;','&Ouml;','Ö'], ['&#215;','&times;','×'], ['&#216;','&Oslash;','Ø'], ['&#217;','&Ugrave;','Ù'], ['&#218;','&Uacute;','Ú'], ['&#219;','&Ucirc;','Û'], ['&#220;','&Uuml;','Ü'], ['&#221;','&Yacute;','Ý'], ['&#222;','&THORN;','Þ'], ['&#223;','&szlig;','ß'], ['&#224;','&agrave;','à'], ['&#225;','&aacute;','á'], ['&#226;','&acirc;','â'], ['&#227;','&atilde;','ã'], ['&#228;','&auml;','ä'], ['&#229;','&aring;','å'], ['&#230;','&aelig;','æ'], ['&#231;','&ccedil;','ç'], ['&#232;','&egrave;','è'], ['&#233;','&eacute;','é'], ['&#234;','&ecirc;','ê'], ['&#235;','&euml;','ë'], ['&#236;','&igrave;','ì'], ['&#237;','&iacute;','í'], ['&#238;','&icirc;','î'], ['&#239;','&iuml;','ï'], ['&#240;','&eth;','ð'], ['&#241;','&ntilde;','ñ'], ['&#242;','&ograve;','ò'], ['&#243;','&oacute;','ó'], ['&#244;','&ocirc;','ô'], ['&#245;','&otilde;','õ'], ['&#246;','&ouml;','ö'], ['&#247;','&divide;','÷'], ['&#248;','&oslash;','ø'], ['&#249;','&ugrave;','ù'], ['&#250;','&uacute;','ú'], ['&#251;','&ucirc;','û'], ['&#252;','&uuml;','ü'], ['&#253;','&yacute;','ý'], ['&#254;','&thorn;','þ'], ['&#255;','&yuml;','ÿ']
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