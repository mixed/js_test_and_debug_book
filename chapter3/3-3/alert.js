function checkNumber (num) {
	if(Object.prototype.toString.call(num) === '[object Number]'){
		return num;
	}else{
		alert(num+"은(는) 숫자가 아닙니다.");
	}
}

function confirmDelete(){
	if(confirm("삭제하시겠습니까?")){
		return "yes";
	}else{
		return "no";
	}
}	