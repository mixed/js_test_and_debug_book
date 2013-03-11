
test("timer()를 실행하면 isCall 값이 true로 변경되어야 한다.(mock)",function(){
	//Given
	TimerMock.replace();
	isCall = false;
	//When
	timer(20);
	TimerMock.flow(20);
	//Then
	ok(isCall,"true로 변경되었다.");
	
	TimerMock.restore();
});