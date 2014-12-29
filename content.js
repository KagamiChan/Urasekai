﻿var MOUSE_LEFT = 0;
var MENU_ID = "menu_id";
var MENU_LOCATION_OFFSET = 14;

function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

function createMenu(x, y)
{
	var text = document.getSelection().toString();
	if (text == "")
	{
		return;
	}

	var menu = document.createElement("div");
	menu.id = MENU_ID;
	menu.style["position"] = "absolute";
	menu.style["left"] = x + "px";
	menu.style["top"] = (MENU_LOCATION_OFFSET + y) + "px";
	menu.style["z-index"] = 0xffffffff;
	menu.style["width"] = "200px";
	menu.style["background-color"] = "#00FF00";
	menu.style["padding"] = "5px";
	menu.style["line-height"] = "normal";
	menu.style["word-break"] = "break-all";
	document.body.appendChild(menu);
	
	var base64_text = document.createElement("div");
	base64_text.innerHTML = "Base64:" + utf8_to_b64(text);
	menu.appendChild(base64_text);
	var re = new RegExp("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$");
	if(re.test(text)){
		var real_text = document.createElement("div");
		real_text.innerHTML = "Real text:" + b64_to_utf8(text);
		menu.appendChild(real_text);	
	}
}

function isInside(region, x, y){
	if (x >= region.offsetLeft && x <= (region.offsetLeft + region.offsetWidth)
		&& y >= region.offsetTop && y <= (region.offsetTop + region.offsetHeight)){
		return true;
	}
	else{
		return false;
	}
}

document.addEventListener("mouseup", function() {
	var menu = document.getElementById(MENU_ID);

	if (event.button != MOUSE_LEFT){
		if(menu){
			document.body.removeChild(menu);
		}
		return;
	}

	var x = event.pageX;
	var y = event.pageY;
	
	if (!menu){
		createMenu(x, y);
		return;
	}
	else{
		if(isInside(menu, x, y)){
			return;
		}
		else{
			document.body.removeChild(menu);
		}
	}

}, false);