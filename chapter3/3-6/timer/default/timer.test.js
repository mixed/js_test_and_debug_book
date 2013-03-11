test("timer()를 실행하면 isCall 값이 true로 변경되어야 한다.",function(){
	//Given
	isCall = false;
	QUnit.config.testTimeout = 100;
	//When
	timer(10);	 	
	setTimeout(function(){
		//Then
		ok(isCall,"true로 변경되었다.");
		start();
	},10);
	stop();
});