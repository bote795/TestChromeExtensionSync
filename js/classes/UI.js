var UI = new function() {
	//adds data inside the popover
	this.popover = function() {
		var menu = "<a class='btn btn-xs btn-info pull-right' role='button' data-toggle='popover' title='' data-placement='left'><span class='glyphicon glyphicon-option-horizontal' aria-hidden='true'></span></a>";
		var edit = "<a class='btn btn-xs btn-danger pull-right edit' role='button'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span></a>";
		return edit+menu;
	}
	this.MenuCreation = function() {
		var dataInMenu="<button type='button' href='#' class='btn btn-primary btn-xs pull-right delete'>Delete</a>";
		return dataInMenu;
	}

	//creates ReadMe
	this.readMe = function(data,id) {
	   var toggle= "<span class='glyphicon glyphicon-collapse-down pull-right' aria-hidden='true'></span>"; //ask for input
	   var temp =data.substring(0,40) +"</label><a data-toggle='collapse' data-target='#"+id+"'> See More..." + this.popover() +"</a>"+
	  "<div id='"+id+"' class='collapse'>"+
	    data.substring(50,data.length-1)+
	  "</div>"
	  return temp;
	}
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
			 	console.log(temp);
			 }
		});
	    $( "#data" ).disableSelection();		
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
			//fix this
			$edit.selectionStart=$edit.value.length;
			$edit.selectionEnd =$edit.value.length;
			//
			$(".editable").keydown( function(e) {
				// Enter - save task
				if (e.keyCode == 13 && !e.ctrlKey && !e.shiftKey) {
					e.preventDefault();
					UI.saveEditTask($,rowId,this.value);
				} 
			});
			//lose focus save edit
		   	$("ul").on('blur', 'textarea.editable', function() {
		   		var rowId=this.parentElement.parentElement["attributes"][1]["nodeValue"];
				var rowId = rowId.replace("Order", "");
				UI.saveEditTask($,rowId,this.value);
			})
		});
	}
	//handles saving the edit and takes care of UI
	this.saveEditTask = function ($,rowId,value) {
		taskManager.edit(rowId, value);
		$(".noneEditable"+rowId+"").show();
		$(".editable"+rowId+"").hide();
	}
};