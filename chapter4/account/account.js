function accountStatus(sAccountNo){
	var oAmount = Account.getTotalInfo(sAccountNo);
	return  "주식 : "+ oAmount.stock +"원\n 예금 : " +  oAmount.deposit + "원\n 적금 : " + oAmount.installment+"원";
}