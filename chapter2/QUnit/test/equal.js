test("test입니다",function(){
	equal(returnOne(),1,"returnOne은 1반환한다.");
	equal(returnOne(),1);
	equal(returnOne(),”1”); //타입비교를 하지 않기 때문에 성공으로 표시한다.
});