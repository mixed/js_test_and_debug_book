test("적금을 선택하면 정상적으로 계산되어야 한다.",function(){
	//Given
	$("type").selectedIndex = 0;
	$("period").value = 12;
	$("money").value = 1000;
	$("rate").value = 4.4;
	mock("Interest").should_receive("installment").with_param(12,1000,4.4).and_return(12248);
	//When
	Calculate.exec();
	//Then
	equal($("result").innerHTML,12248);
	mock("Interest").verify("installment");
});