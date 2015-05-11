var count = 0;
function interval(delay){
	var intervalID = setInterval(function(){
		count++;
		if(count==10){
			clearInterval(intervalID);
		}
	},delay);
}