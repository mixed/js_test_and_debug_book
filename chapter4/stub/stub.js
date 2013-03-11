function grade(data, type){
	var averageResult = average(data);
	if(averageResult == null){
		throw new Error("평균값 오류");
	}
	var gradeResult  = checkGrade(averageResult, type);
	return gradeResult;
}