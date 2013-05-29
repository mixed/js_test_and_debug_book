var CoverageCalculate = {
  "calculate" : function(oData, fpCheck){
		var total = 0;
		var pass = 0;
		for(var i in oData){
			total++;
			if(fpCheck(oData[i])){
				pass++;
			}
		}
		return {"total":total,"pass":pass};
	},
	"statement" : function(oData){
		return this.calculate(oData,function (oDecision){
			return !!oDecision;
		});
	},
	"branch" : function(oData){
		return this.calculate(oData,function (oData){
			return oData[0]&&oData[1];
		});
	},
	"function" : function(oData){
		return this.statement(oData);
	},
	"total" : function(){
		if(__coverage__){
			var coverage;
			for(var i in __coverage__){
				console.log("--------------------"+i+"--------------------");
				coverage = __coverage__[i];
				console.log(this.print("구문", this.statement(coverage.s)));
				console.log(this.print("분기", this.branch(coverage.b)));
				console.log(this.print("함수", this.function(coverage.f)));
				console.log("===================="+i+"====================");
			}
		}
		
	},
	"print" : function(sType, oData){
		var total = oData.total;
		var pass = oData.pass;
		var rate = (Math.round((pass/total)*1000)/10);
		return sType+" 커버리지는 전체"+total+"개 중 "+pass+"개를 통과했으며 "+rate+"% 입니니다.";
	}
};
