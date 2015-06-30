//options.js
jQuery(function( $ ) {
document.body.onload = function() {
	UI.populateOptionsTable($);
	UI.checkEvent($, "options");
}

});//close jquery