test("test입니다",function(){
	notStrictEqual("1",1,"타입까지 비교 하지 않는다."); //성공
	notStrictEqual("1","1","타입까지 비교 하지 않는다."); //실패
});