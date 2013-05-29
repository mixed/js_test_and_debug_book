test("입금 테스트",function(){
	Bank.setAmount(0);
	Bank.deposit(10);
	equal(Bank.getAmount(),0,"10 입금");
});

test("출금 테스트",function(){
	Bank.setAmount(10);
	Bank.withdraw(10);
	equal(Bank.getAmount(),0,"10 출금");
});