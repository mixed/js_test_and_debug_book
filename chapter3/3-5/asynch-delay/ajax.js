Util.ajax.init(true);//false을 true로 변경
function click(we){
	Util.ajax.onload = function(req){
		var json = eval("("+req.responseText+")");// "{'test':'test'}"
		$("toggle").innerHTML += "\n"+json.test;
	}
	Util.ajax.request("../../../asset/etc/api.json");
}