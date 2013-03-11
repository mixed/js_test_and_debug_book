module("모듈",{
	"setup": function(){
		someSetup();
		this.initValue = "init";
	},
	"teardown" : function(){
		someTeardown();
	}
});
test("ok test입니다",function(){
	equal(this.initValue,"init","초기값은 init이다");
});
test("fail test입니다",function(){
	ok(fail,"실패");
});