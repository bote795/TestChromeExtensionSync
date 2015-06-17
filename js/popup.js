// popup.js
jQuery(function( $ ) {
  if(localStorage[taskManager.tasks] == "[]"){
	chrome.storage.sync.get("data", function(items) {
		if (!chrome.runtime.error) {
			console.log(items);
			if(typeof items == "undefined")
			{
				localStorage[taskManager.tasks]= JSON.stringify([]);
			}
			else
			{
				localStorage[taskManager.tasks]=JSON.stringify(items.data);
			}
		}
	});
}
document.body.onload = function() {
	UI.populateTable($);
	UI.autoClickSave($);
	UI.buttonDelete($);
}
document.getElementById("add").onclick = function() {
	var d = taskManager.getTask();
	taskManager.add(d,UI.populateTable,$);
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



