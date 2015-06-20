var Manager = function() {
	//key for storing tasks
    this.key = "key";
 };       
    Manager.prototype.load = function(){
        console.log(this.key);
    	return JSON.parse(localStorage[this.key]);
    };
    Manager.prototype.save = function(Array){
			localStorage[this.key]=JSON.stringify(Array);
			this.sync(Array);
    };
    Manager.prototype.add = function(newItem, populateTable,$) {
    	var array= this.load();
        console.log(array);
		array.push(newItem);
		this.save(array);
		populateTable($);
    };
    Manager.prototype.sync = function (array) {
        var save={};
        save[this.key]=array;
		chrome.storage.sync.set(save, function() {
			if (chrome.runtime.error) {
				console.log("Runtime error.");
			}
		});
    }
    Manager.prototype.delete = function(pos) {
    	var array= this.load();
    	array.splice(pos,1);
    	this.save(array);
    };
    Manager.prototype.deleteAll = function(){
    	this.save([]);
    };
    Manager.prototype.getTask = function  () {
        var temp = document.getElementById(this.key).value;
        document.getElementById(this.key).value = ' ';
        return temp;
    };


var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};