
QUnit.testStart = function(obj){
	console.log(obj.name+"-시작");
}

QUnit.testDone = function(obj){
	console.log(obj.name+"-끝");
	console.log("결과");
	console.log("성공 = " + obj.passed);
	console.log("실패 = " + obj.failed);
	console.log("전체 = " + obj.total);
}

test("테스트",function(){
	ok(true,"ok 테스트");
	ok(false,"ok 테스트2");
});

//로그 결과
//테스트-시작
//테스트-끝
//결과
//성공 = 1
//실패 = 1
//전체 = 2