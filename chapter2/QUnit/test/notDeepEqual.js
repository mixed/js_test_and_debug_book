test("test입니다",function(){
	deepEqual({"a":1},{"a":1});//실패
	notDeepEqual({"a":1},{"a":"1"});//성공
});