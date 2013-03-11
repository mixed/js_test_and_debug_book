Util.ajax.init(false);
function click(e){	
	Util.ajax.onload = function(req){
		var json = eval("("+req.responseText+")");// "{'test':'test'}"
		$("toggle").innerHTML += "\n"+json.test;
	}
	Util.ajax.request("../../../asset/etc/api.json");
}