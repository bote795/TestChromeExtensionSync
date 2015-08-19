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
//go through all history and check if timeStamp is older than a week
//if so erase it
HistoryManager.prototype.cleanData = function() {
    var array= this.load();
    //check if over dates n erase
    for (var i = array.length - 1; i >= 0; i--) {
    	if (this.isExperinced(array[i][1]) )
    	{
    		array.splice(i,1);
    	}
    };
    this.save(array);
};

//add days to a date object
HistoryManager.prototype.addDays = function (myDate,days) {
    return new Date(myDate.getTime() + days*24*60*60*1000);
};

//has event passed already
HistoryManager.prototype.isExperinced = function(timeStamp) {
	var createdDay = new Date(timeStamp); 
	var currentDay = new Date();
	var futureDay = this.addDays(createdDay, 7);
	if( currentDay > futureDay)//its been 7 days
	{
		return true;		
	}
	return false;

};
var historyManager = new HistoryManager(); 