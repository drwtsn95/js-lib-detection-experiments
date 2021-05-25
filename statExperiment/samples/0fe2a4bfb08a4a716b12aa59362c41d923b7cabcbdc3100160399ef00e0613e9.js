/**
 * StopSpam Prestashop module
 *
 * @author    Ancode
 * @copyright 2020 Ancode
 * @license   Commercial license
**/
var _sb_query = "input[name=submitNewsletter], button[name=submitNewsletter], input[name=submitMessage], button[name=submitMessage], input[name=submitLogin], button[name=submitLogin], input[name=submitCreate], button[name=submitCreate]";
var _sb_submits = document.querySelectorAll(_sb_query);
for (i = 0; i < _sb_submits.length; i++) {
	var _sb_hrefs = _sb_submits[i].form.querySelectorAll("input[name=sbhref]");
	if (_sb_hrefs.length == 0) {
		addEvent(_sb_submits[i].form, 'submit', submitWait);
		if (typeof prestashop != "undefined") {
			_sb_addElement(_sb_submits[i].form, 'input', 'hidden', 'sbhref', prestashop.urls.current_url);
		} else {
			_sb_addElement(_sb_submits[i].form, 'input', 'hidden', 'sbhref', baseUri);
		}
	}
}

function addEvent(elem, event, fn) {
    function listenHandler(e) {
      var ret = fn.apply(this, arguments);
      if (ret === false) {
        e.stopPropagation();
        e.preventDefault();
      }
      return(ret);
    }
    
    function attachHandler() {
      var ret = fn.call(elem, window.event);   
      if (ret === false) {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
      }
      return(ret);
    }
    
    if (elem.addEventListener) {
      elem.addEventListener(event, listenHandler, false);
    } else {
      elem.attachEvent("on" + event, attachHandler);
    }
}    
  
function submitWait() {
	var length = this.elements.length;
    for (i = 0; i < length; i++) {
      formElement = this.elements[i];
      if (formElement.type == "submit") {
        formElement.disabled = true;
        _sb_addElement(this, 'input', 'hidden', formElement.name, formElement.value);
      }
    }
    _sb_addElements(this);
    return false;
}

function _sb_addElements(form) {
	if (typeof prestashop != "undefined") {
		_sb_xhr("GET", prestashop.urls.base_url + "module/stopspam/ajax?action=get-token", _sb_addElement, form);
	} else {
		_sb_xhr("GET", baseUri + "?fc=module&module=stopspam&controller=ajax&action=get-token", _sb_addElement, form);
	}
}

function _sb_addElement(parent, element, type, name, value) {
    var newElement = document.createElement(element);
    newElement.setAttribute('type', type);
    newElement.setAttribute('name', name);
    newElement.setAttribute('value', value);
	parent.appendChild(newElement);
}

function _sb_xhr(type, url, callback, form){
	var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        	let json = JSON.parse(xmlhttp.responseText);
        	callback(form, 'input', 'hidden', 'sbtk', json.token);
        	callback(form, 'input', 'hidden', 'sbx', json.x);
        	form.submit();
        }
    }

    xmlhttp.open(type, url, true);
    xmlhttp.send();
}
