
// popup.js
if(!localStorage["Tasks"]){
	localStorage["Tasks"]= JSON.stringify([]);
}
document.body.onload = function() {
	populateTable();
}

document.getElementById("set").onclick = function() {
	var d = document.getElementById("task").value;
	var Tasks=JSON.parse(localStorage["Tasks"]);
	Tasks.push(d);
	localStorage["Tasks"]=JSON.stringify(Tasks);
	populateTable();
	chrome.storage.sync.set({ "data" : Tasks }, function() {
		if (chrome.runtime.error) {
			console.log("Runtime error.");
		}
	});
	//window.close();
}

function populateTable(){
	var Tasks=JSON.parse(localStorage["Tasks"]);
	var $tbody= $("tbody");
	$tbody.empty();
	for (var i = Tasks.length - 1; i >= 0; i--) {
		$tbody.append(createRow(Tasks[i]));
	};
}
function createRow(data)
{
	return "<tr>"+
			"<td>" + data +"</td>"+
			"</tr>";
}
