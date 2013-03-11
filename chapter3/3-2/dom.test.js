test("add메서드는 인자로 받은 문자를 li로 만들어서 ul에 삽입한다.",function(){
	//Given
	$("fakeTreeForTesting").innerHTML = "<li>한국</li><li>일본</li><li>중국</li><li>미국</li>";
	
	//When
	add("미국");
	
	//Then
	equal($("tree").innerHTML,$("fakeTreeForTesting").innerHTML);
});