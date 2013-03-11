function append(id, parent){
	if(!parent){
		throw new Error("부모가 없습니다.");
	}
	this.id = id;
	this.parent = parent;
}