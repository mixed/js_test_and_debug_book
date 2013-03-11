function toggle (e) {
	var e = e||window.event;
	var ele = e.target || e.srcElement;
	var beforeClass = ele.className, afterClass;

	if((" "+beforeClass+" ").indexOf(" on ") > -1){
		afterClass = beforeClass.replace(/(?:\s+|^)on(?:\s+|$)/g,"");
	}else{
		afterClass = beforeClass + " on";
	}

	ele.className = afterClass;
}
