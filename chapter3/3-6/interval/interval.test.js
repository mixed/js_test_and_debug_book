test("interval()은 10ms의 시간이 흐를때 마다 nCount가 1씩 증가한다.",function(){
	//Given
	TimerMock.replace();
	count = 0;
	
	//When
	interval(10);
	TimerMock.flow(10);
	//Then
	equal(count,1,"count는 1이어야 한다.");
	
	//When	
	TimerMock.flow(80);
	//Then
	equal(count,9,"count는 9여야 한다.");
	
	//When
	TimerMock.flow(100);
	//Then
	equal(count,10,"count는 10이어야 한다.");
	
	//When
	TimerMock.flow(120);
	//Then
	equal(count,10,"count는 여전히 1이어야 한다.");
	TimerMock.restore();
});