QUnit.log = function(obj){
	console.log(obj.result);
	console.log(obj.message);
}

test("test입니다",function(){
	ok(true,"ok 테스트");
});
