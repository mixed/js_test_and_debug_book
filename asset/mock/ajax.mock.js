var _AjaxStrage={};

Util.ajax.request = function (sUrl,oParam){
	Util.ajax.onload(_AjaxStrage[sUrl+this._makeQueryString(oParam)]);
}

Util.ajax.mock = function(sUrl,oParam,sExpect){
	var sKey = sUrl+this._makeQueryString(oParam);
	_AjaxStrage[sKey] = {responseText:sExpect};
}