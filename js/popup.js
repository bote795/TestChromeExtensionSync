// popup.js
jQuery(function( $ ) {
  if(localStorage[taskManager.key] == "[]" || localStorage[taskManager.key] == undefined){
  	localStorage[taskManager.key]= JSON.stringify([]);
	chrome.storage.sync.get(taskManager.key, function(items) {
		if (!chrome.runtime.error && items.task != undefined) {
			localStorage[taskManager.key]=JSON.stringify(items.task);
		}
	});
}
//chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
document.body.onload = function() {
	UI.populateTable($);
	UI.autoClickSave($);
	UI.buttonDelete($);
	UI.checkEvent($);
}
document.getElementById("add").onclick = function() {
	var d = taskManager.getTask();
	taskManager.add(d);
}

document.getElementById("deleteAll").onclick = function() {
	taskManager.deleteAll();
}


//re-draws table with tasks when a new item has been added
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method === "Update") {
    	UI.populateTable($);
    	sendResponse({status: 200});
    }

});
//----------------UI---------------------------

});//close jquery



