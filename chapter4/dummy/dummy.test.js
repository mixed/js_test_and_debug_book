test("append는 에러가 발생하지 않는다.",function(){
	//Given
	var dummyParent = {};
	var success = true;
	
	//When
	try{
		append("childEle",dummyParent);
	}catch(e){
		success = false;
	}
	
	//Then
	ok(success,"exception이 발생하면 안 된다.");
});