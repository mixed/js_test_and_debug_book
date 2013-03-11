function toggle (el) {
	var beforeClass = el.className, afterClass;
	if((" "+beforeClass+" ").indexOf(" on ") > -1){
		afterClass = beforeClass.replace(/(?:\s+|^)on(?:\s+|$)/g,"");
	}else{
		afterClass = beforeClass + " on";
	}
	el.className = afterClass;
}

function clickEvent(e){
	var e = e||window.event;
	var el = e.target || e.srcElement;
	toggle(el);
}
