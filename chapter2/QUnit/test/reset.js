test("너무 많은 테스트",function(){
	SomeMock.method();
	equal(SomeMock.get(1),"return val1");
	equal(SomeMock.get(2),"return val2");
	
	QUnit.reset();
	
	SomeMock.method2();
	equal(SomeMock.get(1),"return val1");
	equal(SomeMock.get(2),"return val2");
});