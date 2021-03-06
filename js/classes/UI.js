var UI = new function() {
	//adds data inside the popover
	this.popover = function() {
		var menu = "<a class='btn btn-xs btn-info pull-right' role='button' data-toggle='popover' title='' data-placement='left'><span class='glyphicon glyphicon-option-horizontal' aria-hidden='true'></span></a>";
		var edit = "<a class='btn btn-xs btn-danger pull-right edit' role='button'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span></a>";
		var drag = "<a class='btn btn-xs btn pull-right drag' role='button'><span class='drag glyphicon glyphicon-th' aria-hidden='true style='cursor: -webkit-grabbing;'></span></a>";
		return menu+edit+drag;
	}
	
	//creates what goes inside the pop up when pressing ".."
	this.MenuCreation = function() {
		var dataInMenu="<button type='button' href='#' class='btn btn-primary btn-xs pull-right delete'>Delete</a>";
		return dataInMenu;
	}

	//creates ReadMe
	this.readMe = function(data,id) {
	   var toggle= "<span class='glyphicon glyphicon-collapse-down' aria-hidden='true'></span>"; //ask for input
	   var temp =data.substring(0,40) +"</label><a data-toggle='collapse' data-target='#"+id+"'> See More..." + this.popover() +"</a>"+
	  "<div id='"+id+"' class='collapse'>"+
	    data.substring(50,data.length-1)+
	  "</div>"
	  return temp;
	}
	//adds the editable textarea
	this.edit = function (id,data) {
		return "<textarea class='editable editable"+id+"'>"+ data +"</textarea>";
	}
	//creates row for popup.html
	this.createRow =function (data, id)
	{
		
		var row="<li class='list-group-item ui-state-default' id='"+id+"Order'>"+
				"<div class='checkbox checkbox-circle' nodeValue='"+id+"''><div class='noneEditable"+id+"'><input type='checkbox' id='"+id+"checkbox' class='styled'><label for='"+id+"checkbox'>"; 
		 		//if more than 50 make it have a ReadMore collapse
		 		//if doesnt fit in one line add a readmore so it dsnt cloge up UI
				if (data.length > 50) 
				{
					row += this.readMe(data,id);
				}
				else
				{	
					row +=data+"</label>"; 
					row += this.popover();
				}
				row+= "</div>"+this.edit(id,data);
				row +="</div></li>";
		return row;
	}
	//creates row for options.html
	this.createOptionsRow = function(data, id)
	{
		var row="<li class='list-group-item'>"+
				"<div class='checkbox checkbox-circle' nodeValue='"+id+"''><div><input type='checkbox' id='"+id+"checkbox' class='styled'><label for='"+id+"checkbox'>"; 
		row +=data+"</div></label>";

		return row;
	}
	//------------------Jquery based APIS---------------------
	//adds the elements dynamically
	this.populateTable = function ($){
		var Tasks=taskManager.load();
		var $tbody= $("ul");
		$tbody.empty();
		for (var i = Tasks.length - 1; i >= 0; i--) {
			$tbody.append(UI.createRow(Tasks[i],i));
		};
		UI.addJquerys($);
	}
	
	//adds the elements dynamically
	this.populateOptionsTable = function ($){
		var Tasks=historyManager.load();
		var $tbody= $("#data");
		$tbody.empty();
		for (var i = Tasks.length - 1; i >= 0; i--) {
			$tbody.append(UI.createOptionsRow(Tasks[i][0],i));
		};
		if (Tasks.length == 0)
		{
			$tbody.append("<p>This is no history. History is deleted every two weeks if not restored.</p>");
		}
	}

	//function usd to reload all functons that are used by
	//the items generated dynamically
	this.addJquerys = function ($)
	{
		$('[data-toggle="popover"]').popover({animation:true, content:this.MenuCreation($), html:true});
		$( "#data" ).sortable({
			 axis: "y",
			 update: function( event, ui ) {
			 	var temp=$('#data').sortable('toArray');
			 	taskManager.reOrder(temp);
			 }
		});
	    $( "#data" ).disableSelection();	
		//lose focus save edit
	   	$("ul").on('blur', 'textarea.editable', function() {
	   		var rowId=this.parentElement.parentElement["attributes"][1]["nodeValue"];
			var rowId = rowId.replace("Order", "");
			UI.saveEditTask($,rowId,this.value);
		})	
		//$(".editable").keydown( function(e) {
		$("ul").on('keydown', 'textarea.editable', function(e) {
			// Enter - save task
			var rowId=this.parentElement.parentElement["attributes"][1]["nodeValue"];
			if (e.keyCode == 13 && !e.ctrlKey && !e.shiftKey) {
				e.preventDefault();
				var rowId = rowId.replace("Order", "");
				UI.saveEditTask($,rowId,this.value);
			} 
		});
	}
	//handles click for delete one item button
	this.buttonDelete =function  ($) {
		$("body").on('click', ".delete", function() { //for any buttons with delete will receieve the request
			var rowId=this.parentElement.parentElement.parentElement.parentNode["attributes"][1]["nodeValue"];
			taskManager.delete(rowId);
		});
	}

	this.autoClickSave =function  ($) {
		// save task
		$(".add").keydown( function(e) {
				// Enter - save task
				if (e.keyCode == 13 && !e.ctrlKey && !e.shiftKey) {
					e.preventDefault();
					$('#add').click();
				} 
		});
	}

	//handles the check going to history
	this.checkEvent = function ($, page){
		page = typeof page !== 'undefined' ? page : 'popup';
		$("body").on('change', "input[type='checkbox']", function(){
	        var rowId=this.parentElement.parentElement["attributes"][1]["nodeValue"];
			if(this.checked && page == 'popup') {
				taskManager.completed(rowId);
				//TODO: add a banner that pops up n says saved to history
		    }
			else if(this.checked && page == 'options') {
		        historyManager.restore(rowId);
		    }

		});
	}

	//handles the hiding of the item and pulls up the edit textbox
	this.editButton = function ($){
		$("body").on('click', ".edit", function() { //for any buttons with delete will receieve the request
			var rowId=this.parentElement.parentElement["attributes"][1]["nodeValue"];
			$(".noneEditable"+rowId+"").hide();
			var $edit=$(".editable"+rowId+"");
			$edit.show();
			autosize($edit);
			$edit.focus();
			//set to cursor to last piece of text
			$edit[0].selectionStart = $edit[0].value.length;
			$edit[0].selectionEnd   = $edit[0].value.length;
			$edit[0].focus();
		});
	}
	//handles saving the edit and takes care of UI
	this.saveEditTask = function ($,rowId,value) {
		taskManager.edit(rowId, value);
		$(".noneEditable"+rowId+"").show();
		$(".editable"+rowId+"").hide();
	}
};