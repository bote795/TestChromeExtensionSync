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
}
document.getElementById("add").onclick = function() {
	var d = document.getElementById("task").value;
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
function createRow(data, id)
{
	return "<tr>"+
			"<td>" + data +
				"<button type='button' href='#' class='btn btn-primary btn-xs pull-right delete' data-index="+id+">Delete</a>"+
			"</td>"+
			"</tr>";
}

function addJquerys()
{
	buttonDelete();
}
function buttonDelete () {
	$(".delete").on('click', function() {
		taskManager.delete(this["data-index"]);
	});
}
});//close jquery



