function $(id){
	return document.getElementById(id);
}

function add(name){
	var addLI = document.createElement("LI");
	addLI.innerHTML = name;
	$("tree").appendChild(addLI);
}