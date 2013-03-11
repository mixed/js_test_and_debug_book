var Bank = {
	"amount" : 0,
	"deposit" : function(amount){
		this.amount = this.amount + amount;
	},
	"withdraw" : function(amount){
		this.amount = this.amount - amount;
	},
	"getAmount" : function(){
		return this.amount;
	},
	"setAmount" : function(amount){
		this.amount = amount;
	}
};