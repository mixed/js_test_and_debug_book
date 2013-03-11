test("계좌의 상태를 반환하는 테스트 ",function(){
	//Given
	stub("Account").should_receive("getTotalInfo").and_return({"stock":"1,000","deposit":"10,000","installment":"40,000"});
	//Then
	//When
	equal(accountStatus(1234), "주식 : 1,000원\n 예금 : 10,000원\n 적금 : 40,000원");
});