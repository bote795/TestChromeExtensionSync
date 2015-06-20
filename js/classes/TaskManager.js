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

var taskManager = new TaskManager(); 