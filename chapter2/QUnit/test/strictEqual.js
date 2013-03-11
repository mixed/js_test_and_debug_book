test("test입니다",function(){
	strictEqual("1",1,"타입까지 비교한다."); // 실패
	strictEqual("1","1","타입까지 비교한다."); // 성공
});