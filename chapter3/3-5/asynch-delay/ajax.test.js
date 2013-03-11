test("toggle엘리먼트를 클릭하면 엘리먼트 안에 서버에서 응답으로 반환된 텍스트가 삽입된다..",function(){
		//Given
		attach($("toggle"),"click",click);
		$("toggle").innerHTML = "";
		QUnit.config.testTimeout = 200;
		
		//When
		Mock.fireEvent($("toggle"),"click");
		setTimeout(function(){
			//Then
			equal($("toggle").innerHTML,"\ntest");

			start();
		},100);
		stop();
});