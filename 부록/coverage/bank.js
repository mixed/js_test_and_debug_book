var Bank = {
	"amount" : 0,
	"deposit" : function(amount){
		if(amount > 100){
			this.amount = this.amount*100;
		}
	},
	"withdraw" : function(amount){
		this.amount = this.amount - amount;
		if(amount > 100){
			
		}
	},
	"getAmount" : function(){
		return this.amount;
	},
	"setAmount" : function(amount){
		this.amount = amount;
	}
};