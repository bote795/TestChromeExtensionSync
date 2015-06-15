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
//----------------UI---------------------------
//adds the elements dynamically
function populateTable(){
	var Tasks=taskManager.load();
	var $tbody= $("ul");
	$tbody.empty();
	for (var i = Tasks.length - 1; i >= 0; i--) {
		$tbody.append(createRow(Tasks[i],i));
	};
	addJquerys();
}
//adds data inside the popover
function popover () {
	var menu = "<a class='btn btn-xs btn-danger pull-right' role='button' data-toggle='popover' title='' data-placement='left'><span class='glyphicon glyphicon-option-horizontal' aria-hidden='true'></span></a>";
	return menu;
}
function MenuCreation () {
	var dataInMenu="<button type='button' href='#' class='btn btn-primary btn-xs pull-right delete'>Delete</a>";
	return dataInMenu;
}

//creates ReadMe
function readMe (data,id) {
   var toggle= "<span class='glyphicon glyphicon-collapse-down pull-right' aria-hidden='true'></span>"; //ask for input
   var temp =data.substring(0,40) +"</label><a data-toggle='collapse' data-target='#"+id+"'> See More..." + popover() +"</a>"+
  "<div id='"+id+"' class='collapse'>"+
    data.substring(50,data.length-1)+
  "</div>"
  return temp;
}
function createRow(data, id)
{
	
	var row="<li class='list-group-item'>"+
			"<div class='checkbox checkbox-circle'><input type='checkbox' id='"+id+"checkbox' class='styled'><label for='"+id+"checkbox'>"; 
	 		//if more than 50 make it have a ReadMore collapse
	 		//if doesnt fit in one line add a readmore so it dsnt cloge up UI
			if (data.length > 50) 
			{
				row += readMe(data,id);
			}
			else
			{	
				row +=data+"</label>"; 
				row += popover();
			}
			
			row +="</div></li>";
	return row;
}
//function usd to reload all functons that are used by
//the items generated dynamically
function addJquerys()
{
	$('[data-toggle="popover"]').popover({animation:true, content:MenuCreation(), html:true});
	
}
//handles click for delete one item button
function buttonDelete () {
	$("body").on('click', ".delete", function() { //for any buttons with delete will receieve the request
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



