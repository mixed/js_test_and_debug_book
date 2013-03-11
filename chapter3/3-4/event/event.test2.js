test("on클래스가 없는 상태에서 엘리먼트를 클릭하면 on클래스가 추가된다.",function(){
	//Given
	$("toggle").className = "";

	//When
	toggle({"target":$("toggle")});

	//Then
	ok($("toggle").className.indexOf("on") > -1,"클릭한 후에는 on 클래스가 추가되어야 한다.");
});

test("on클래스가 있는 상태에서 엘리먼트를 클릭하면 on클래스가 삭제된다.",function(){
	//Given
	$("toggle").className = "on";

	//When
	toggle({"target":$("toggle")});

	//Then
	ok($("toggle").className.indexOf("on") === -1,"클릭한 후에는 on 클래스가 삭제되어야 한다.");
});