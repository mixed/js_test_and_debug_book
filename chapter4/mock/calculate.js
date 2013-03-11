var Calculate = {
	exec : function(){
		var type = $("type").value;
		var period = $("period").value;
		var money = $("money").value;
		var rate = $("rate").value;
		var result;

		if(type == 0){
			result = Interest.installment(period,money,rate);
		}else{
			result = Interest.deposit(period,money,rate);
		}

		$("result").innerHTML = result;
	}
};

// var Interest = {
// 	installment : function(period,money){
// 		return period*money;
// 	},
// 	deposit : function(period,money){
// 		return period+money;
// 	}
// }