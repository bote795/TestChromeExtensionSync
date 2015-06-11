
// popup.js
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

document.getElementById("set").onclick = function() {
	var d = document.getElementById("task").value;
	taskManager.add(d);
}
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
		$tbody.append(createRow(Tasks[i]));
	};
}
function createRow(data)
{
	return "<tr>"+
			"<td>" + data +
				"<a href='#'' class='btn btn-primary btn-xs pull-right'>Delete</a>"+
			"</td>"+
			"</tr>";
}
