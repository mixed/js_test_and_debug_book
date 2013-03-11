function caluculate(){
	var left = getVal("left");
	var right = getVal("right");
	var operator = getVal("operator");
	var result;
	switch(operator){
		case "plus":
			result = left + right;
			break;
		case "minus":
			result = left - right;
			break;
		case "multi":
			result = left * right;
			break;
		case "division":
			result = left / right;
			break;
	}
	$("result").value = result;
}

function getVal (sId) {
	return $(sId).value;
}

window.onload = function(){
	attach($("calculate"),"click",caluculate);
}