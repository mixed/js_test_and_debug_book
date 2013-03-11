test("test입니다",function(){
	var actualVal = {"a":1};
	strictEqual(actualVal,{"a":1});//실패
	strictEqual(actualVal,actualVal);//성공

	deepEqual(actualVal,{"a":1});//성공
	deepEqual(actualVal,{"a":"1"});//실패
});