test("toggle엘리먼트를 클릭하면 엘리먼트 안에 test문자가 삽입된다.",function(){
	//Given
	attach($("toggle"),"click",click);
	Util.ajax.mock("../../../asset/etc/api.json",{},"{'test':'test'}");
	$("toggle").innerHTML = "";
	//When
	Mock.fireEvent($("toggle"),"click");
	//Then
	equal($("toggle").innerHTML,"\ntest");
});