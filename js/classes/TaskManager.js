var TaskManager =  function () {
    this.key = "task";
}
inheritsFrom(TaskManager, Manager);
//used when item checked saves into historyManager instead of perm delete
TaskManager.prototype.completed = function(pos) {
    var array= this.load();
    historyManager.add(array[pos]);
    array.splice(pos,1);
    this.save(array);
};
//called when an item is dropped and fixs the sync order 
//to localStorage and sync
TaskManager.prototype.reOrder = function(arrayPos) {
    var array= this.load();
    var tempArray= [];
    for (var i = arrayPos.length - 1; i >= 0; i--) {
        var index = arrayPos[i].replace("Order", "")
    	tempArray.push(array[parseInt(arrayPos[i])]);
    };
    console.log(tempArray);
   this.save(tempArray);
};
var taskManager = new TaskManager(); 