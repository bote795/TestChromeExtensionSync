var TaskManager =  function () {
    this.key = "task";
}
inheritsFrom(TaskManager, Manager);

TaskManager.prototype.completed = function(pos) {
    var array= this.load();
    historyManager.add(array[pos]);
    array.splice(pos,1);
    this.save(array);
};
TaskManager.prototype.reOrder = function(arrayPos) {
    var array= this.load();
    var tempArray= [];
    for (var i = arrayPos.length - 1; i >= 0; i--) {
    	tempArray.push(array[parseInt(arrayPos[i])]);
    };
    console.log(tempArray);
   this.save(tempArray);
};
var taskManager = new TaskManager(); 