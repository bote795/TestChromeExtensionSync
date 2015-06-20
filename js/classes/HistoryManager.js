var HistoryManager = function() {
	this.key = "history";
};
inheritsFrom(HistoryManager, Manager);
HistoryManager.prototype.add = function(newItem) {
	var array= this.load();
	array.push([newItem,Date.now()]);
	this.save(array);
};
var historyManager = new HistoryManager(); 