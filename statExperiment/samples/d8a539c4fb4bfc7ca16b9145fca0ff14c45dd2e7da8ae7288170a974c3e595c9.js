previous_selected_optionid = ""

function change_option(arg_selectbox, arg_optionid) {
	var src_part, href;
	src_part =  global_Config_StoreFolderName;
	src_part += unescape(global_src_part_Config_ProductPhotosFolder);
	src_part += '/';
	src_part += 'options';
	src_part += '/';
	src_part += global_Current_ProductCode + '-';
	
	var form = document.forms['MainForm'];

//	var alternate_product_photo = document.getElementById('alternate_product_photo_' + arg_photo_number);
//	var previous_alternate_product_photo = document.getElementById('alternate_product_photo_' + previous_selected_photo);
	var product_photo_zoom_url = document.getElementById('product_photo_zoom_url');
	var product_photo_zoom_url2 = document.getElementById('product_photo_zoom_url2');
	var product_photo = document.getElementById('product_photo');

	//HIDE all previously open spans (if they exist)
	if (document.getElementById("optionimg_" + previous_selected_optionid)) {
		removeClassName(document.getElementById("optionimg_" + previous_selected_optionid), 'selected');
	}
	
	//SHOW the selected SPAN tag + GROUP BY span tag (if they exist)
	if (document.getElementById('optionimg_' + arg_optionid)) {
		change_product_photo(2); // reset selected alternate view back to first view
		addClassName(document.getElementById("optionimg_" + arg_optionid), 'selected');
		product_photo.src = src_part + arg_optionid + '-T.jpg' + global_ImageSeed;
		// href = "javascript:OpenNewWindow(global_SEOImage + '?ShowDesc=N&PhotoURL=' + global_Config_StoreFolderName + global_Config_ProductPhotosFolder + '/options/' + '" + escape(global_Current_ProductCode) + "-" + arg_optionid + ".jpg" + global_ImageSeed + "', 640, 480); void(0);";
		href = Shadowbox ? src_part + arg_optionid + ".jpg" + global_ImageSeed : "javascript:OpenNewWindow(global_SEOImage + '?ShowDesc=N&PhotoURL=' + global_Config_StoreFolderName + global_Config_ProductPhotosFolder + '/options/' + '" + escape(global_Current_ProductCode) + "-" + arg_optionid + ".jpg" + global_ImageSeed + "', 640, 480); void(0);";
		
		if (product_photo_zoom_url) {
			product_photo_zoom_url.href  = href;
		}
		if (product_photo_zoom_url2) {
			product_photo_zoom_url2.href = href;
		}
	}

	var rebuildOptions = (typeof(TCN_reload) == 'function') ? true : false;
	//Loop through the dropdown to find and make this OptionID selected
	//Check for select boxes
	if (form.elements[arg_selectbox] &&  form.elements[arg_selectbox].options && form.elements[arg_selectbox].options.length > 0) {
	    for (loop = form.elements[arg_selectbox].options.length - 1; loop >= 0; loop--)
		{
			if (form.elements[arg_selectbox].options[loop].value == arg_optionid) {
				form.elements[arg_selectbox].selectedIndex = loop;
				if (rebuildOptions) {
					TCN_reload(form.elements[arg_selectbox]);
				}
			}
		}
	}
	//Then check for radio buttons and checkboxes
	else if (form.elements[arg_selectbox] && form.elements[arg_selectbox].length > 1) {
	for (loop = form.elements[arg_selectbox].length - 1; loop >= 0; loop--) {
			if (form.elements[arg_selectbox][loop].value == arg_optionid) {
				form.elements[arg_selectbox][loop].checked = true;
				if (rebuildOptions) {
					TCN_reload(form.elements[arg_selectbox]);
				}
			}
		}
	}
	
	//SAVE the previous span to global variable for next call of this function
	previous_selected_optionid = arg_optionid

	if (document.getElementById("altviews") && document.getElementById('optionimg_' + arg_optionid)) { document.getElementById("altviews").style.visibility = "visible"; }

}
previous_selected_photo = "";
function change_product_photo(arg_photo_number) {
	var src_part, ext, href;
	var popup = global_Config_EnablePhotosPopup;
	src_part =  global_Config_StoreFolderName;
	src_part += unescape(global_src_part_Config_ProductPhotosFolder);
	src_part += '/';
	src_part += global_Current_ProductCode + '-';

	var alternate_product_photo = document.getElementById('alternate_product_photo_' + arg_photo_number);
	var previous_alternate_product_photo = document.getElementById('alternate_product_photo_' + previous_selected_photo);
	var product_photo_zoom_url = document.getElementById('product_photo_zoom_url');
	var product_photo_zoom_url2 = document.getElementById('product_photo_zoom_url2');
	var product_photo = document.getElementById('product_photo');

	//HIDE all previously open spans (if they exist)
	if (previous_alternate_product_photo) {
		removeClassName(previous_alternate_product_photo, 'selected');
	}

	//SHOW the selected SPAN tag + GROUP BY span tag (if they exist)
	if (alternate_product_photo) {
	    addClassName(alternate_product_photo, 'selected');
	    ext = alternate_product_photo.src;
	    ext = ext.substr(ext.lastIndexOf('.') + 1);
	    product_photo.src = src_part + arg_photo_number + 'T.' + ext;

	    href = product_photo.src;
	    var srcParentElement = alternate_product_photo.parentElement;

	    if (product_photo_zoom_url) {
	        product_photo_zoom_url.href = href;
	        if (product_photo_zoom_url.tagName == "A" && srcParentElement != null && srcParentElement.tagName == "A") {
	            product_photo_zoom_url.shadowboxCacheKey = srcParentElement.getAttribute('data-sbkey');  
	        }
	    }
	    if (product_photo_zoom_url2) {
	        product_photo_zoom_url2.href = href;
	        if (product_photo_zoom_url2.tagName == "A" && srcParentElement != null && srcParentElement.tagName == "A") {
	            product_photo_zoom_url2.shadowboxCacheKey = srcParentElement.getAttribute('data-sbkey'); 
	        }
	    }
	}

    //SAVE the previous span to global variable for next call of this function
    previous_selected_photo = arg_photo_number;
}

function OpenNewWindow(url, width, height) 
{
	window.open(url, null, 'top=10,left=10,toolbar=no,titlebar=no,location=no,directories=no,status=no,menubar=no,resizable=1,scrollbars=1,width=' + width + ',height=' + height);
} 
function Change_Info_Tab(tab, info_section) {
	var tabs = [v$('description_header'), v$('tech_specs_header'), v$('extended_info_header')];
	var info_sections = [v$('description_section') || v$('features_section'), v$('tech_specs_section'), v$('extended_info_section')];
	tab = v$(tab);
	info_section = v$(info_section);
	
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i]) {
			if (tab == tabs[i]) {
				addClassName(tabs[i], 'selected');
				addClassName(info_sections[i], 'selected');
			}
			else {
				removeClassName(tabs[i], 'selected');
				removeClassName(info_sections[i], 'selected');
			}
		}
	}
}

function removeClassName(element, className) {
	element.className = element.className.replace(className, '');
	element.className = element.className.replace('  ', '');
}

function addClassName(element, className) {
	if (element.className.indexOf(className) == -1) {
		element.className += ' ' + className;
	}
}

function openWishpotWindow(element) {
	window.WISHPOT_FORM=element.parentNode;
	if(document.getElementById){
		var x=document.getElementsByTagName('head').item(0);
		var o=document.createElement('script');
		if(typeof(o)!='object') o=document.standardCreateElement('script');
		o.setAttribute('src','//www.wishpot.com/scripts/bm.js?v=101');
		o.setAttribute('type','text/javascript');
		x.appendChild(o);
	} 
	return false;
}


var ProductDetails_TabSelected = 'ProductDetails';

function ProductDetail_ProductDetails() {
	if (ProductDetails_TabSelected == 'ProductDetails') { return; }
	ProductDetail_Toggle('ProductDetails');
}

function ProductDetail_TechSpecs() {
	if (ProductDetails_TabSelected == 'TechSpecs') { return; }
	ProductDetail_Toggle('TechSpecs');
}

function ProductDetail_ExtInfo() {
	if (ProductDetails_TabSelected == 'ExtInfo') { return; }
	ProductDetail_Toggle('ExtInfo');
}

function ProductDetail_Toggle(newid) {
	ProductDetail_TabOff('ProductDetail_' + ProductDetails_TabSelected);
	ProductDetails_TabSelected = newid;
	ProductDetail_TabOn('ProductDetail_' + ProductDetails_TabSelected);
	var el = document.getElementById('ProductDetails_MainBorder');
	if (newid == 'ProductDetails') {
		el.style.display = 'none';
	} else {
		el.style.display = '';
	}
}

function ProductDetail_TabOff(id) {
	var el = document.getElementById('Header_' + id);
	el.style.cursor = 'pointer';
	jQuery('#Header_' + id).removeClass('vCSS_tab_selected').addClass('vCSS_tab_unselected');
	var el = document.getElementById('Header_' + id + '_span');
	el.style.fontWeight = 'normal';
	var el = document.getElementById(id + '_div');
	el.style.display = 'none';
	var el = document.getElementById(id + '_div2');
	if (el) { el.style.display = 'none'; }	
}

function ProductDetail_TabOn(id) {
	var el = document.getElementById('Header_' + id);
	el.style.cursor = '';
	jQuery('#Header_' + id).addClass('vCSS_tab_selected').removeClass('vCSS_tab_unselected');
	var el = document.getElementById('Header_' + id + '_span');
	el.style.fontWeight = 'bold';
	var el = document.getElementById(id + '_div');
	el.style.display = '';
	var el = document.getElementById(id + '_div2');
	if (el) { el.style.display = ''; }
}

