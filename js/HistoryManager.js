var HistoryManager = new function() {
	this.history = "History";

	this.load = function(){
    	return JSON.parse(localStorage[this.history]);
    };
    this.save = function(Array){
			localStorage[this.history]=JSON.stringify(Array);
			this.sync(Array);
    };

};