test("적금을 선택하면 정상적으로 계산되어야 한다.",function(){
	//Given
	stub(window).should_receive("average").and_return(90);
	stub(window).should_receive("checkGrade").and_return("A");
	
	//When
	var gradeResult = grade({"english":90,"math":70},"중간고사");
	
	//Then
	equal(gradeResult,"A");
});