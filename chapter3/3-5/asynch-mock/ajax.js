Util.ajax.init(true);
function click(we){
	Util.ajax.onload = function(req){
		var json = eval("("+req.responseText+")");
		$("toggle").innerHTML += "\n"+json.test;
	}
	Util.ajax.request("../../../asset/etc/api.json");
}
