function setComma (val) {
	var num = val+"";
	if (num.length <= 3) {
		return num;
	}else{
		var len = num.length;
		var mod = len%3;
		mod = mod===0?3:mod;
		var count = (len - mod)/3;
		var retunVal = "";
		retunVal += num.substr(0,mod);
		for(var i=0; count > i ; i++){
			retunVal += ","+num.substr(mod + (3*i),3);
		}
		return retunVal;
	}
}