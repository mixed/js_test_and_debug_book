test("비동기 테스트",2,function(){
	ok(true,"성공");
	stop();
	setTimeout(function(){
		ok(true,"setTimeout 성공.");
		start();	
	},100);
}); //성공

test("호출 횟수를 추가한 비동기 테스트",2,function(){
	ok(true,"성공");
	stop(2);
	setTimeout(function(){
		ok(true,"setTimeout 성공.");
		start();
		start();	
	},100);
}); //성공

QUnit.config.testTimeout = 30;
asyncTest("비동기 테스트",2,function(){
	ok(true,"성공");
	setTimeout(function(){
		ok(true,"setTimeout 성공.");
	},100);
}); //실패