//options.js
jQuery(function( $ ) {
document.body.onload = function() {
	//check if data must be let go
	historyManager.cleanData();
	UI.populateOptionsTable($);
	UI.checkEvent($, "options");
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method === "Update") {
    	UI.populateOptionsTable($);
    	sendResponse({status: 200});
    }
});

});//close jquery