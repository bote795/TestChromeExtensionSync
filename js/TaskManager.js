var taskManager = new function() {
	//key for storing tasks
    this.tasks = "Tasks";

    this.load = function(){
    	return JSON.parse(localStorage[this.tasks]);
    };
    this.save = function(Array){
			localStorage[this.tasks]=JSON.stringify(Array);
			this.sync(Array);
    };
    this.add = function(newTask) {
    	var Tasks= this.load();
		Tasks.push(newTask);
		this.save(Tasks);
		populateTable();
    };
    this.sync = function (Tasks) {
		chrome.storage.sync.set({ "data" : Tasks }, function() {
			if (chrome.runtime.error) {
				console.log("Runtime error.");
			}
		});
    }
    this.delete = function(pos) {
    	var Tasks= this.load();
    	Tasks.splie(pos,1);
    	this.save(Tasks);
    };
    this.deleteAll = function(){
    	this.save([]);
    };
}