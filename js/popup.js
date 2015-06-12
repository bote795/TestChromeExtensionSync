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
	populateTable();
	autoClickSave();
	buttonDelete();
}
document.getElementById("add").onclick = function() {
	var d = taskManager.getTask();
	taskManager.add(d,populateTable);
}

document.getElementById("deleteAll").onclick = function() {
	taskManager.deleteAll();
}

//re-draws table with tasks when a new item has been added
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method === "Update") {
    	populateTable();
    	sendResponse({status: 200});
    }

});
function populateTable(){
	var Tasks=taskManager.load();
	var $tbody= $("tbody");
	$tbody.empty();
	for (var i = Tasks.length - 1; i >= 0; i--) {
		$tbody.append(createRow(Tasks[i],i));
	};
	addJquerys();
}
function MenuCreation () {
	var dataInMenu="<button type='button' href='#' class='btn btn-primary btn-xs pull-right delete'>Delete</a>";
	return dataInMenu;
}
function createRow(data, id)
{
	var menu = "<a class='btn btn-xs btn-danger pull-right' role='button' data-toggle='popover' title='' data-placement='left'>Menu</a>";

	return "<tr>"+
			"<td data-value="+id+">" + data +
				menu +
			"</td>"+
			"</tr>";
}
//function usd to reload all functons that are used by
//the items generated dynamically
function addJquerys()
{
	$('[data-toggle="popover"]').popover({animation:true, content:MenuCreation(), html:true});
	
}
//handles click for delete one item button
function buttonDelete () {
	$("body").on('click', ".delete", function() {
		var rowId=this.parentElement.parentElement.parentNode["attributes"][0]["nodeValue"];
		taskManager.delete(rowId);
	});
}

function autoClickSave () {
	// save task
	$(".add").keydown( function(e) {
			// Enter - save task
			if (e.keyCode == 13 && !e.ctrlKey && !e.shiftKey) {
				e.preventDefault();
				$('#add').click();
			} 
	});
}
});//close jquery



