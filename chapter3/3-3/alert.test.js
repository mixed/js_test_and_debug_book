test("checkNumber는 숫자가 아닌 경우 경고창을 띄운다.",function(){
	//Given
	Mock.set();
	
	//When 
	checkNumber("a");
	//Then
	equal(Mock.getAlertMsg(),"a은(는) 숫자가 아닙니다.","경고창을 띄워야 한다.");
	Mock.reset();
});	

test("confirmDelete에서 삭제한다.",function(){
	//Given
	Mock.set();
	Mock.confirmResult(true);
	
	//When, Then
	equal(confirmDelete(),"yes","확인 버튼을 누르면 'yes'를 반환한다.");
	equal(Mock.getConfirmMsg(),"삭제하시겠습니까?","시스탬 창의 문구 확인한다.");
});

test("confirmDelete에서 삭제 취소를 한다.",function(){
	//Given
	Mock.set();
	Mock.confirmResult(false);
	
	//When, Then
	equal(confirmDelete(),"no","취소 버튼을 누르면 'no'를 반환한다");
	equal(Mock.getConfirmMsg(),"삭제하시겠습니까?","시스탬 창의 문구 확인한다.");
});