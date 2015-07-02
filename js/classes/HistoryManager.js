var HistoryManager = function() {
	this.key = "history";
};
inheritsFrom(HistoryManager, Manager);
HistoryManager.prototype.add = function(newItem) {
	var array= this.load();
	array.push([newItem,Date.now()]);
	alert("Task has been stored in history");
	this.save(array);
};
HistoryManager.prototype.restore = function(pos) {
    var array= this.load();
    taskManager.add(array[pos][0]);
    array.splice(pos,1);
    this.save(array);
};
var historyManager = new HistoryManager(); 