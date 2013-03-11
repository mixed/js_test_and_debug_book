function attach (eEle,sType,fpCallback) {
	if(eEle.attachEvent){
		attach = function  (eEle,sType,fpCallback) {
			eEle.attachEvent("on"+sType,fpCallback);
		}
	}else{
		attach = function  (eEle,sType,fpCallback) {
			eEle.addEventListener(sType, fpCallback, false);
		}
	}
	attach(eEle,sType,fpCallback);
}

function $ (id) {
	return document.getElementById(id);
}

if (typeof Util === "undefined") {
	Util = {};
}
Util.ajax = {
	req : "",
	init : function(bType){
		this.bType = !!bType;
		if (window.XMLHttpRequest) {
			this.req = new XMLHttpRequest();
		} else if (ActiveXObject) {
			try { 
				this.req =  new ActiveXObject('MSXML2.XMLHTTP'); 
			}catch(e) { 
				this.req =  new ActiveXObject('Microsoft.XMLHTTP'); 
			}
		}
	},
	onload : function(req){
		
	},
	_onload: function(){
		var that = Util.ajax;
		if(/MSIE/.test(window.navigator.userAgent)){
			that._onload = function(){
				var bSuccess = that.req.readyState == 4 && that.req.status == 200;
				var oResult;
				if (that.req.readyState == 4) {
					  try {
							if (that.req.status !== 200){
								oResult = that.onload(that.req);	
							} 
					}finally{
						that.req.abort();
						try { delete that.req.onload; } catch(e) { that.req.onload =undefined;} 
						delete that.req.onreadystatechange;
					}
				}
			}
		}else{
			that._onload =  function(){
				var bSuccess = that.req.readyState == 4 && that.req.status == 200;
				var oResult;
				if (that.req.readyState == 4) {
					try {
						if (that.req.status == 200){
							oResult = that.onload(that.req);
						} 
					}catch(e){}
				}
			}
		}
		that._onload();
	},
	request: function(sUrl,oParam){
		oParam = oParam||{};
		this.req.open("POST", sUrl, this.bType);
		this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
		this.req.setRequestHeader("charset", "utf-8");
		this._setOnload();
		this.req.send(this._makeQueryString(oParam));
	},
	_setOnload: function(){
		var navi = navigator.userAgent;
		var that = this;
		if(this.req.addEventListener&&!(navi.indexOf("Opera") > -1)&&!(navi.indexOf("MSIE") > -1)){
			if(this._loadFunc){ this.req.removeEventListener("load", this._loadFunc, false); }
			this._loadFunc = function(rq){ 
				that._onload(rq); 
			}
			this.req.addEventListener("load", this._loadFunc, false);
		}else{
			if (typeof this.req.onload != "undefined") {
				this.req.onload = function(rq){
					if(this.req.readyState == 4){
						that._onload(rq);
					}
				};
			} else {
				if(navi.match(/(?:MSIE) ([0-9.]+)/)[1]==6){
					var onreadystatechange = function(rq){
						if(that.req.readyState == 4){
							that._onload(rq);
							clearInterval(that._interval);
							that._interval = undefined;
						}
					};
					this._interval = setInterval(onreadystatechange,300);
				}else{
					this.req.onreadystatechange = function(rq){
						if(this.readyState == 4){
							that._onload(rq);
						}
					};
				}
			}
		}

	},
	_makeQueryString : function(oParam){
		var aQuery = ["?"];
		for(var k in oParam) {
			aQuery.push(k+"="+encodeURIComponent(oParam[k]));
		}
		return aQuery.join("&");
	}
};