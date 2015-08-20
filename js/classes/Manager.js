var Manager = function() {
	//key for storing tasks
    this.key = "key";
 };       
    Manager.prototype.load = function(){
        if (localStorage[this.key] == undefined) 
        {
            localStorage[this.key]= JSON.stringify([]);
        };
    	return JSON.parse(localStorage[this.key]);
    };
    Manager.prototype.save = function(Array){
			localStorage[this.key]=JSON.stringify(Array);
			this.sync(Array);
    };
    Manager.prototype.add = function(newItem) {
    	var array= this.load();
		array.push(newItem);
		this.save(array);
    };
    Manager.prototype.edit = function(id, newItem){
        var array = this.load();
        array[id]=newItem;
        this.save(array);
    }
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