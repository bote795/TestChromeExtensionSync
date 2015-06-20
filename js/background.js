chrome.storage.onChanged.addListener(function(changes, namespace) {
  localStorage['task']=JSON.stringify(changes.task.newValue);
   chrome.runtime.sendMessage({method: "Update"},
        function (response) {
          if (response.status === 200) {
            console.log("sucess");
          }
        });
});